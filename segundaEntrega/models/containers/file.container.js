const { promises: fs } = require('fs');
const dbConfig = require('../../db/db.config');
const {v4:uuid} = require('uuid');
const {HTTP_STATUS} = require('../../constants/api.constants');
const {HttpError} = require('../../utils/api.utils');

const dataProductos = './db/data/products.json';
const dataCarts = './db/data/cart.json';


const dataFile = dbConfig.file 

class FileContainer {
    constructor(resource) {       
      this.resource = resource;

      if (this.resource === 'products'){
        this.list = dataFile.products;
        this.file = dataProductos
      }
      else {
        this.list = dataFile.carts;
        this.file = dataCarts;
      }
    }    

    saveData(data) {
      const dataStr = JSON.stringify(data, null, 2);      
      fs.writeFile(this.file, dataStr, 'utf-8');
    };
  
    getAll() {      
      return this.list;
    }
  
    getById(id) {  
      const data = this.list;          
      const item = data.find(item => item.id == id);
      
      if (!item) {
        const message = `${this.resource} with id ${id} does not exist in our records`;
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
      }
      return item;
    }
  
    save(item) {
      const data = this.list;
      const newItem = {
        id: uuid(),
        timestamp: Date.now(),
        ...item
      };
      data.push(newItem);      
      this.saveData(data);
      return newItem;
    }
  
    update(id, item) {      
      const data = this.list;
      const index = data.findIndex(item => item.id == id);
      
      if (index < 0) {
        const message = `${this.resource} with id ${id} does not exist in our records`;
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
      }
      const updatedItem = {
        id,
        ...item
      };
      data[index] = updatedItem;
      this.saveData(data);      
      return updatedItem;
    }
  
    delete(id) {
      const data = this.list;
      const index = data.findIndex(item => item.id == id);
      if (index < 0) {
        const message = `${this.resource} with id ${id} does not exist in our records`;
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
      }
      data.splice(index, 1);
      this.saveData(data)

      return data
    }
  } 
  
  module.exports = FileContainer;
  