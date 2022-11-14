const envConfig = require('../config');
const firebaseConfig = require('./firebase/firebase.Config.json');
const prodsJson = require('./data/products.json');
const cartsJson = require('./data/cart.json');

module.exports = {
  file: {
    products: prodsJson,
    carts: cartsJson,
  },
  mongodb: {
    uri: `mongodb+srv://nicosmore:${envConfig.DB_PASSWORD}@coder.3ctyud1.mongodb.net/?retryWrites=true&w=majority`
  },
  firebase: {
    credentials: firebaseConfig
  },
}