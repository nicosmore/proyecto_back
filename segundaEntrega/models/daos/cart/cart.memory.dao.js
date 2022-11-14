const MemoryContainer = require('../../containers/memory.container');
const {HTTP_STATUS} = require('../../../constants/api.constants');
const {HttpError} = require('../../../utils/api.utils');
const ProductsMemoryDAO = require('../products/products.memory.dao');

const productsMemoryDAO = new ProductsMemoryDAO;

const collection = 'carts';

class CartsMemoryContainer extends MemoryContainer{
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

module.exports = CartsMemoryContainer;






