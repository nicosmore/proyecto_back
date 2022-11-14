const envConfig = require('../../config'); 

let ProductsDao;
let CartsDao;

switch(envConfig.DATASOURCE) {
  case 'mongo':
    ProductsDao = require('./products/products.mongo.dao');
    CartsDao = require('./cart/cart.mongo.dao');   
  break;
  
  case 'firebase':
    ProductsDao = require('./products/products.firebase.dao');
    CartsDao = require('./cart/cart.firebase.dao');
    break;

  case 'memory':
    ProductsDao = require('./products/products.memory.dao');
    CartsDao = require('./cart/cart.memory.dao');
    break;

  case 'file':
     ProductsDao = require('./products/products.file.dao');
     CartsDao = require('./cart/cart.file.dao');
     break; 

  default:
    throw new Error("Invalid Datasource");
  }
  
  module.exports = { ProductsDao, CartsDao };