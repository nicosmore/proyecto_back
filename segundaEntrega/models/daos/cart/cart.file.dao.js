const FileContainer = require('../../containers/file.container');
const {HTTP_STATUS} = require('../../../constants/api.constants');
const {HttpError} = require('../../../utils/api.utils');
const ProductsFileDAO = require('../products/products.file.dao');

const productsFileDao = new ProductsFileDAO;

const collection = 'carts';

class CartsFileContainer extends FileContainer{
    constructor(){
        super(collection);
    }

    saveCart (){
        const product = {products:[]};
        const cart = this.save(product);

        return cart;
    }

    getCartProds (cartId){
        const cart = this.getById(cartId);

        return cart.products
    }

    addProductToCart(cartId,productId){
        let id = productId ;
        let cart = this.getById(cartId); 
        const prod = productsFileDao.getById(productId);  
        console.log(prod);                
        cart.products.push({id})               
        this.update(cartId,cart)
        
        return cart   
    }

    removeProductFromCart(cartId, productId){        
        let cart = this.getById(cartId); 
        const index = cart.products.findIndex(item => item.id == productId);

      if (index < 0) {
        const message = `${this.resource} with id ${productId} does not exist in our records`;
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
      }       
        cart.products.splice(index, 1);        
        this.update(cartId,cart)

        return  cart.products
    }
}

module.exports = CartsFileContainer;

