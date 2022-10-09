const express = require('express');
const ProductsContainer = require('../../api/products.api');
const productCont = new ProductsContainer();

const router = express.Router();

router.get('/', productCont.getAll);

router.get('/:Id', productCont.getById);

router.post('/', productCont.save);

router.put('/:Id', productCont.updateById);

router.delete('/:Id', productCont.deleteById);

module.exports = router;