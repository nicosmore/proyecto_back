const MemoryContainer  = require('../../containers/memory.container');

const collection = 'products';

class ProductsMemoryDao extends MemoryContainer {
    constructor(){
        super(collection);
    }
}

module.exports = ProductsMemoryDao;