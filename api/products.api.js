const { promises: fs } = require('fs');
const  dataProductos  = './models/data.json';

class ProductsContainer {
    //static lastProductId = products[products.length - 1].id;
    
    constructor () {
      this.list = dataProductos;
    }

    listProd = async () => {
        const prods = await fs.readFile(this.list, 'utf-8');
        const prodsJson = await JSON.parse(prods).products;
        return prodsJson
    };
  
    getAll = async (req, res) => { 
        const products = await this.listProd();         
        return res.json(products);      
    } 
    
    getById = async (req, res) => {                
        const products = await this.listProd();
        const { Id } =  req.params;
        const product = products.find(product => product.id === +Id);
        if (!product) {
          return res.status(404).json({ success: false, error: `Produccto no id: ${Id} no encontrado`});
        } 
        return res.json({ success: true, result: product });
    }

    save = async (req, res) => {
      const products = await this.listProd();
      const { name, description, code, image, price, stock} = req.body;
      
      if ( !name || !description || !code || !image || !price || !stock) {
        return res.status(400).json({ succes: false, error: 'Faltan datos'});
      }
      const newProduct = {
        id: products.length + 1,
        timestamp: Date.now(),
        name, 
        description,
        code,
        image,
        price: +price,
        stock: +stock     
      };    
      products.push(newProduct);    
      return res.json({ success: true, result: newProduct });
    };
    
    updateById = async (req, res) => {
      const products = await this.listProd();
      const { Id } = req.params;
      const { name, description, code, image, price, stock} = req.body; 
      if ( !name || !description || !code || !image || !price || !stock) {
        return res.status(400).json({ success: false, error: 'Faltan datos' });
      };     
      const productIndex = products.findIndex((producto) => producto.id === +Id);
      if (productIndex < 0) 
      return res.status(404).json({ success: false, error: `Producto id: ${Id} no encontrado`});
      const updatedProduct = {
        ...products[productIndex],
        name,
        description,
        code,
        image,
        price,
        stock
      };
      products[productIndex] = updatedProduct;
      return res.json({success: true, result: updatedProduct});
    }

    deleteById = async (req, res) => {
      const { Id } = req.params;
      const products = await this.listProd();
      const productIndex = products.findIndex((producto) => producto.id === +Id);
      if (productIndex < 0) 
      return res.status(404).json({ success: false, error: `Producto id: ${Id} no encontrado`});
      products.splice(productIndex, 1);
      return res.json({ success: true, result: 'Producto Eliminado'});      
    }
  }  
  module.exports = ProductsContainer;
  
  