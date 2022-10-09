const express = require('express');
const productsRoutes = require('./products/products.routes');
const carRoutes = require('./car/car.routes')

const router = express.Router();

router.use('/products', productsRoutes);
router.use('/carrito', carRoutes);


module.exports = router;