const { HTTP_STATUS } = require("../constants/api.constants");
const { CartsDao } = require('../models/daos/app.daos');
const { successResponse } = require("../utils/api.utils");

const cartsDao = new CartsDao();

class CartsControllers {

  createCart = async (req, res, next) => {
    try{
      const newCart = await cartsDao.saveCart(); 
      const response = successResponse(newCart);
      res.status(HTTP_STATUS.CREATED).json(response);
    }
    catch(error){
      next(error);
    }   
  };  

  deleteCart = async (req, res, next) => {
    const { Id } =  req.params;
    try{
      const delCart = await CartDao.delete(Id);
      const response = successResponse(delCart);
      res.status(HTTP_STATUS.CREATED).json(response);
    }
    catch(error){
      next(error);
    }  
  };

  listCartProds = async (req, res,next) => { 
  const { Id } =  req.params;
    try {
      const products = await cartsDao.getCartProds(Id)
      const response = successResponse(products)
      res.status(HTTP_STATUS.OK).json(response)
    }
    catch(error){
    next(error);
    }     
  };

  addProds = async (req, res, next) => {
    const { IdCar, IdProd } =  req.params;    
    try {
      const products = await cartsDao.addProductToCart(IdCar, IdProd)
      const response = successResponse(products)
      res.status(HTTP_STATUS.OK).json(response)
    }
    catch(error){
    next(error);
    }     
  }

  deleteProductCart = async (req , res, next) => {
    const { IdCar,IdProd } =  req.params;
    try {
      const products = await cartsDao.removeProductFromCart(IdCar, IdProd)
      const response = successResponse(products)
      res.status(HTTP_STATUS.OK).json(response)
    }
    catch(error){
    next(error);
    }     
 }
 
}

module.exports = CartsControllers