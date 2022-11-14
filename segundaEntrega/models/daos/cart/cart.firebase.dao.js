const admin = require('firebase-admin');
const { FieldValue  } = require('firebase-admin/firestore');
const {HTTP_STATUS} = require('../../../constants/api.constants');
const {HttpError} = require('../../../utils/api.utils');
const MemoryContainer = require('../../containers/firebase.container');
const ProductsFirebaseDao = require('../products/products.firebase.dao');



const productsFirebaseDao = new ProductsFirebaseDao();

const collection = 'carts'

class CartFirebaseDao extends MemoryContainer {
    constructor(){
        super(collection);
    }

    async getCartProds (cartId){

        const cart = await this.getById(cartId);
        return cart.products
    }

    async addProductToCart(cartId, productId){

        await productsFirebaseDao.getById(productId)
        const docRef = this.query.doc(cartId);        

        if (!docRef) {
            const message = `Resource with id ${cartId} does not exists`
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
        }
        
        return await docRef.update({ products: FieldValue.arrayUnion(productId) })
    }

    async removeProductFromCart(cartId, productId) {

        await productsFirebaseDAO.getById(productId)
        const docRef = this.query.doc(cartId)        

         if (!docRef) {
            const message = `Resource with id ${cartId} does not exists`
             throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
        }        
        return await docRef.update({ products: FieldValue.arrayRemove(productId) })
    }   
    
}

module.exports = CartFirebaseDao;