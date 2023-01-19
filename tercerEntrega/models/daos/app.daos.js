const envConfig = require('../../config'); 

let ProductsDao;
let CartsDao;
let UsersDao;

switch(envConfig.DATASOURCE) {
  case 'mongo':
    ProductsDao = require('./products/products.mongo.dao');
    CartsDao = require('./cart/cart.mongo.dao'); 
    UsersDao = require('./users/users.mongo.dao');
    break;

  default:
    throw new Error("Invalid Datasource");
  }
  
  module.exports = { ProductsDao, CartsDao, UsersDao };