const FileContainer = require('../../containers/file.container')

const collection = "products"
class ProductsFileDao extends FileContainer {
    constructor(){
        super(collection);

    }
}

module.exports  = ProductsFileDao;