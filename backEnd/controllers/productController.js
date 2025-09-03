import Product from "../models/productModel.js";
import cloudinary from '../config/cloudinary.js';


// Utility function to normalize strings
const normalizeString = (str) => (str ? str.trim() : str);

// @desc    Add a new product
// @route   POST /api/products
// @access  Private/Admin
const addProduct = async (req, res) => {
  console.log("Received addProduct request");
  let imagesUrl = []; // Initialize early to avoid reference errors

  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    console.log("Request body:", req.body);
    // Collect uploaded images
    const images = [
      req.files?.image1?.[0],
      req.files?.image2?.[0],
      req.files?.image3?.[0],
      req.files?.image4?.[0],
      req.files?.image5?.[0],
    ].filter(Boolean);
    console.log(`Number of images received: ${images.length}`);
    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    console.log("Images to upload:", images.length);

    // Upload images to Cloudinary
    console.log("Starting upload to Cloudinary...");
    imagesUrl = await Promise.all(
      images.map(async (item) => {
        console.log("Uploading:", item.path);
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        console.log("Uploaded:", result.secure_url);
        return {
          url: result.secure_url,
          public_id: result.public_id,
          secure_url: result.secure_url,
        };
      })
    );
    console.log("All uploads finished.");

    // Parse sizes safely
    let parsedSizes;
    try {
      parsedSizes = Array.isArray(sizes) ? sizes : JSON.parse(sizes || "[]");
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid sizes format. Must be a JSON array.",
      });
    }

    // Create and save product
    const product = new Product({
      name,
      description,
      price: Number(price),
      image: imagesUrl,
      category,
      subCategory,
      sizes: parsedSizes,
      bestseller: bestseller === "true" || bestseller === true,
    });

    const createdProduct = await product.save();
    return res.status(201).json({
      success: true,
      createdProduct,
    });

  } catch (error) {
    console.error("Error in addProduct:", error.message);

    // Cleanup uploaded images
    if (imagesUrl.length > 0) {
      await Promise.all(
        imagesUrl.map(async (image) => {
          try {
            await cloudinary.uploader.destroy(image.public_id);
          } catch (deleteError) {
            console.error("Error deleting image from Cloudinary:", deleteError);
          }
        })
      );
    }

    return res.status(500).json({ success: false, message: error.message });
  }
};


// @desc    Get all products
// @route   GET /api/products
// @access  Public
const listProducts = async (req, res) => {
  try {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const categoryFilter = req.query.category
      ? { category: req.query.category }
      : {};

    const subCategoryFilter = req.query.subCategory
      ? { subCategory: req.query.subCategory }
      : {};

    const bestsellerFilter = req.query.bestseller
      ? { bestseller: req.query.bestseller === "true" }
      : {};

    const count = await Product.countDocuments({
      ...keyword,
      ...categoryFilter,
      ...subCategoryFilter,
      ...bestsellerFilter,
    });

    const products = await Product.find({
      ...keyword,
      ...categoryFilter,
      ...subCategoryFilter,
      ...bestsellerFilter,
    })
      .sort({ date: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const singleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ==========================================
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
// ==========================================
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    console.log("Request body for update:", req.body);
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Update basic fields
    if (name) product.name = name.trim();
    if (description) product.description = description.trim();
    if (price) product.price = Number(price);
    if (category) product.category = category.trim();
    if (subCategory) product.subCategory = subCategory.trim();
    if (sizes) {
      product.sizes = Array.isArray(sizes) ? sizes : JSON.parse(sizes);
    }
    if (bestseller !== undefined) {
      product.bestseller = bestseller === "true" || bestseller === true;
    }

    // Handle new image uploads
    if (req.files && Object.keys(req.files).length > 0) {
      // Delete old images from Cloudinary
      for (const img of product.image) {
        await cloudinary.uploader.destroy(img.public_id);
      }

      // Upload new images
      const newImages = await Promise.all(
        Object.values(req.files).flat().map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "image",
          });
          return {
            url: result.secure_url,
            public_id: result.public_id,
            secure_url: result.secure_url,
          };
        })
      );

      product.image = newImages;
    }
    console.log("Updated product data:", product);
    const updatedProduct = await product.save();
    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ==========================================
// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
// ==========================================
const removeProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Delete images from Cloudinary
    for (const img of product.image) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await Product.deleteOne({ _id: product._id });

    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get top bestselling products
// @route   GET /api/products/top/bestsellers
// @access  Public
const getBestsellers = async (req, res) => {
  try {
    const products = await Product.find({ bestseller: true })
      .sort({ date: -1 })
      .limit(8);

    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.category,
    }).sort({ date: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all categories
// @route   GET /api/products/categories/all
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  listProducts,
  singleProduct,
  addProduct,
  updateProduct,
  removeProduct,
  getBestsellers,
  getProductsByCategory,
  getCategories,
};
