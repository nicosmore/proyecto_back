const { HTTP_STATUS } = require("../constants/api.constants");
const { ProductsDao } = require("../models/daos/app.daos");
const { successResponse } = require("../utils/api.utils");

const productsDao = new ProductsDao();

class ProductsControllers {
  
  getProducts = async (req, res,next) => { 
    try {
      const products = await productsDao.getAll();
      const response = successResponse(products)
      res.status(HTTP_STATUS.OK).json(response)
    }
    catch(error){
      next(error);
    }     
  };

  getProductsById = async (req, res, next) => {   
    const { Id } =  req.params;
    try{
      const products = await productsDao.getById(Id);
      const response = successResponse(products);
      res.status(HTTP_STATUS.OK).json(response);
    }
    catch(error){
      next(error)
    }
  };

  saveProduct = async (req, res, next) => {
    try {
      const newProduct = await productsDao.save(req.body);
      const response = successResponse(newProduct);
      res.status(HTTP_STATUS.CREATED).json(response);
    }
    catch(error) {
      next(error);
    }
  };

  updateProductsById = async (req, res,next) => {
    const { Id } = req.params;
    try {
      const updateProduct = await productsDao.update(Id, req.body);
      const response = successResponse(updateProduct);
      res.status(HTTP_STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  };

  deleteProductsById = async (req, res, next) => {
    const { Id } = req.params;
    try {
      const deletedProduct = await productsDao.delete(Id);
      const response = successResponse(deletedProduct);
      res.status(HTTP_STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    };      
  };
}  
  module.exports = ProductsControllers;
  