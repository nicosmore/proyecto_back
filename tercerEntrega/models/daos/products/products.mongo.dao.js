const { Schema } = require('mongoose');
const MongoContainer = require("../../containers/mongo.container");

const collection = "products";

const productsSchema = new Schema({
  name: { type: String, required: true },
  timestamp: { type: Date, default: new Date()},
  description: { type: String, required: true},
  code: { type: String, required: true, unique: true  },
  image: { type: String, required: true },
  price: { type: Number, required: true},
  stock: { type: Number, required: true }
});

class ProductsMongoDao extends MongoContainer {
  constructor() {
    super(collection, productsSchema);
  }
}

module.exports = ProductsMongoDao;