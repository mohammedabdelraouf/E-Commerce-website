import Product from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";


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

// @desc    Add a new product
// @route   POST /api/products
// @access  Private/Admin
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // Get files from request (assuming they're already uploaded to temp storage)
    const image1 = req.files["image1"] ? req.files["image1"][0] : null;
    const image2 = req.files["image2"] ? req.files["image2"][0] : null;
    const image3 = req.files["image3"] ? req.files["image3"][0] : null;
    const image4 = req.files["image4"] ? req.files["image4"][0] : null;
    const image5 = req.files["image5"] ? req.files["image5"][0] : null;

    images = [image1, image2, image3, image4, image5].filter(
      (img) => img !== null
    );
    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }
    // Upload each image to Cloudinary manually
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        try {
          const result = await cloudinary.uploader.upload(item.path, {
            folder: "ecommerce-products",
            transformation: [
              { width: 800, height: 800, crop: "limit", quality: "auto" },
              { format: "webp" },
            ],
          });
          return {
            url: result.secure_url,
            public_id: result.public_id,
            secure_url: result.secure_url,
          };
        } catch (error) {
          console.error("Cloudinary upload error:", error);
          throw new Error(`Failed to upload image: ${item.originalname}`);
        }
      })
    );

    // Create product with the uploaded image URLs
    const product = new Product({
      name,
      description,
      price: Number(price),
      image: imagesUrl,
      category,
      subCategory,
      sizes: Array.isArray(sizes) ? sizes : JSON.parse(sizes || "[]"),
      bestseller: bestseller === "true" || bestseller === true,
    });

    const createdProduct = await product.save();
    res.status(201).json({
      success: true,
      createdProduct,
    });
  } catch (error) {
    // Clean up any uploaded images if there's an error
    if (imagesUrl && imagesUrl.length > 0) {
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

    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price ? Number(price) : product.price;
      product.category = category || product.category;
      product.subCategory = subCategory || product.subCategory;
      product.sizes = sizes
        ? Array.isArray(sizes)
          ? sizes
          : JSON.parse(sizes)
        : product.sizes;
      product.bestseller =
        bestseller !== undefined
          ? bestseller === "true" || bestseller === true
          : product.bestseller;

      // If new images are uploaded, update the image array
      if (req.files && req.files.length > 0) {
        const newImageUrls = getImageUrls(req);
        product.image = newImageUrls;
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const removeProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      // TODO: Add logic to delete associated image files from server
      await Product.deleteOne({ _id: product._id });
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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
