const express = require('express');
const productsRoutes = require('./products/products.routes');
const carRoutes = require('./cart/cart.routes');

const router = express.Router();

router.use('/products', productsRoutes);
router.use('/cart', carRoutes);


module.exports = router;