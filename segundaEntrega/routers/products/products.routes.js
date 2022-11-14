const express = require('express');
const ProductsController = require('../../controllers/products.controller');
const productCont = new ProductsController();

const router = express.Router();

router.get('/', productCont.getProducts);
router.get('/:Id', productCont.getProductsById);
router.post('/', productCont.saveProduct);
router.put('/:Id', productCont.updateProductsById);
router.delete('/:Id', productCont.deleteProductsById);

module.exports = router;