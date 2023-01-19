const {Schema} = require('mongoose');
const MongoContainer = require('../../containers/mongo.container');
const { HttpError } = require('../../../utils/api.utils');
const {HTTP_STATUS} = require('../../../constants/api.constants');

const collection = 'users';

const usersSchema = new Schema({
    name: {type: String, required: true},    
    address: {type: String, required: true},
    age: {type: Number, required: true},
    /* image: { type: String, required: true}, */
    email: {type: String,
      required: true,
      unique: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email"]
  },   
  password: {type: String, required: true},
    createdAt: {type: Date, default: new Date().toLocaleString()},
    updatedAt: {type: Date, default: new Date().toLocaleString()},
    
});

class UserMongoDao extends MongoContainer {
    constructor() {
        super(collection, usersSchema);      }
    
      async createUser(userItem) {        
        try {          
          const user = await this.save(userItem); 
          console.log('entro a try');
          console.log(user);     
          return user;
        }
        catch(error) {
          if (error.message.toLowerCase().includes('e11000') || error.message.toLowerCase().includes('duplicate')) {
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'User with given email already exist');
          }
          throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    
      };
    
      async getById(id) {
        try {
          const document = await this.model
            .findById(id, { __v: 0 }).lean();
          if (!document) {
            const errorMessage = `Resource with id ${id} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, errorMessage);
          } else {
            return document;
          }
        }
        catch(error) {
          throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
      }
    
      async getByEmail(email) {
        try {
          const document = await this.model.findOne({ email }, { __v: 0 });
          if (!document) {
            const errorMessage = `Wrong username or password`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, errorMessage);
          } else {
            return document;
          }
        }
        catch(error) {
          throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
      }
};
//usersSchema.index({email: 1});
module.exports = UserMongoDao;