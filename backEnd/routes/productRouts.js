import express from 'express';
import { uploadProductImages, handleMulterError } from '../middleware/multer.js';
import {
  listProducts,
  singleProduct,
  addProduct,
  updateProduct,
  removeProduct,
  getBestsellers,
  getProductsByCategory,
  getCategories
} from '../controllers/productController.js';

const router = express.Router();

router.route('/')
  .get(listProducts)
  .post(uploadProductImages, handleMulterError, addProduct);

router.route('/bestsellers')
  .get(getBestsellers);

router.route('/categories/all')
  .get(getCategories);

router.route('/category/:category')
  .get(getProductsByCategory);

router.route('/:id')
  .get(singleProduct)
  .put(updateProduct)
  .delete(removeProduct);

export default router;