const { promises: fs } = require('fs');
const  dataProductos  = './models/data.json';

class CarritoContainer {

    constructor(){
        this.list = dataProductos;
    }    

    listCar = async () => {
        const data = await fs.readFile(this.list, 'utf-8');
        const carJson = JSON.parse(data).carrito;
        return carJson
    };  

    getAllProds = async (req, res) => {
        const car = await this.listCar();
        const prodCarrito = car.products
      return res.json({success:true, result:[...prodCarrito]})      
    };    

    getProdsById = async (req, res) => {
        const car = await this.listCar();
        const prodCarrito = car.products
        const {Id} = req.params 
        const carProduct = prodCarrito.find(product => product.id === +Id);
        if (!carProduct) {
            return res.status(404).json({ success: false, error: `Produccto no id: ${Id} no encontrado`});
          } 
          return res.json({ success: true, result: carProduct });
    }
//Crea carrito
 /*    createCar = async(req, res) => {
        const data = await JSON.parse(fs.readFile(this.list, 'utf-8'));        
        const carrito = {
            id: 1,
            timestamp: Date.now(),
            products:[],
        }
        data.push(carrito);
        return res.json(data.carrito.id);
    }; */
    save = async (req, res) => {
        const car = await this.listCar();                
        const newCarrito = {
            id: car.length + 1,
            timestamp: Date.now(),
            products:[],
        };
        car.push(newCarrito);
        return res.json(newCarrito);
    };

    saveProds = async (req, res) => {
        const data = await fs.readFile(this.list, 'utf-8');
        const dataJson = JSON.parse(data);
        const dataCar = dataJson.carrito;
        const dataProd = dataJson.products;
        const {IdCar, IdProd} = req.params;
        const carIndex = dataCar.findIndex(idCarrito => idCarrito.id === +IdCar);
        const prodIndex = dataProd.findIndex(idProduct => idProduct.id === +IdProd);
        if (carIndex < 0)
        return res.status(404).json({ success: false, error: `Carrito id: ${Id} no encontrado`});
        else if (prodIndex < 0)
        return res.status(404).json({ success: false, error: `Producto id: ${Id} no encontrado`});
        dataCar[carIndex].products.push(dataProd[prodIndex])
        return res.json(dataCar);    
    };  

    deleteById = async (req, res) => {
        const products = await this.listCar();
        const { Id } = req.params;        
        const carIndex = products.findIndex((car) => car.id === +Id);
        if (carIndex < 0) 
        return res.status(404).json({ success: false, error: `Produccto no id: ${Id} no encontrado`});
        products.splice(carIndex, 1);
        return res.json({ success: true, result: 'Producto Eliminado'});      
    }    
}

module.exports = CarritoContainer;