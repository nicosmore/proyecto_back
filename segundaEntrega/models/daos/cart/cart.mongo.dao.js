const {Schema} = require('mongoose');
const MongoContainer = require('../../containers/mongo.container');
const {HTTP_STATUS} = require('../../../constants/api.constants');
const {HttpError} = require('../../../utils/api.utils');
const ProductsMongoDAO = require('../products/products.mongo.dao')

const productsMongoDAO = new ProductsMongoDAO()

const collection = 'carts';

const cartSchema = new Schema({
    timestamp: { type: Date, default: new Date().toLocaleString() },
    products: { type: Array, required: true, default: [] }
  });

  class CartMongoDao extends MongoContainer{
    constructor(){
        super(collection, cartSchema);
    }

    async getCartProds (cartId){
        const cart = await this.getById(cartId);
        return [...cart.products]
    }

    async addProductToCart(cartId,productId){
        
        const product = await productsMongoDAO.getById(productId);
        const addCartProd = await this.model.updateOne(
            {_id: cartId},
            {$push:{products: productId}},
        )
        if (!addCartProd.matchedCount) {
            const message = `Resource with id ${cartId} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        return product;
    }    

    async removeProductFromCart(cartId, productId){
        
        await productsMongoDAO.getById(productId);
        const deleteProd = await this.model.updateOne(
            {_id: cartId},
            {$pull:{products: productId}}
        )
        if (!deleteProd.matchedCount) {
            const message = `Resource with id ${cartId} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        return deleteProd;
    }
  };

  module.exports = CartMongoDao;