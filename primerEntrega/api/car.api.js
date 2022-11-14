const { promises: fs } = require('fs');
const  dataProductos  = './models/data.json';

class CarritoContainer {

    constructor(){
        this.list = dataProductos;
    }    

    listCar = async () => {
        const data = await fs.readFile(this.list, 'utf-8');
        const carJson = JSON.parse(data);
        return carJson
    };  

    saveData = async (prods) => {
        const dataStr = JSON.stringify(prods, null, 2);
        await fs.writeFile(this.list, dataStr, 'utf-8');
      };

    getAllProds = async (req, res) => {
        const data = await this.listCar();
        const carrito = data.carrito;
        console.log(carrito[0].products);
      return res.json({success:true, result:carrito[0].products})      
    };    

    getProdsById = async (req, res) => {
        const data = await this.listCar();
        const carrito = data.carrito
        const {Id} = req.params 

        const carProduct = carrito[0].products.find(product => product.id === +Id);
       
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
        const data = await this.listCar();                
        const newCarrito = {
            id: data.carrito.length + 1,
            timestamp: Date.now(),
            products:[],
        };
        data.carrito.push(newCarrito);
        this.saveData(data);
        return res.send({ success: true, result: newCarrito});
    };

    saveProds = async (req, res) => {
        const data = await this.listCar();
        const dataCar = data.carrito;
        const dataProd = data.products;
        const {IdCar, IdProd} = req.params;

        const carIndex = dataCar.findIndex(idCarrito => idCarrito.id === +IdCar);
        const prodIndex = dataProd.findIndex(idProduct => idProduct.id === +IdProd);
        
        if (carIndex < 0)
        return res.status(404).json({ success: false, error: `Carrito id: ${IdCar} no encontrado`});
        else if (prodIndex < 0)
        return res.status(404).json({ success: false, error: `Producto id: ${IdProd} no encontrado`});
        dataCar[carIndex].products.push(dataProd[prodIndex])
        this.saveData(data);
        return res.json(dataCar);    
    };  

    deleteById = async (req, res) => {
        const data = await this.listCar();
        const {IdCar, IdProd} = req.params; 
        const carrito = data.carrito;
        const prodCarrito = data.carrito[(IdCar-1)].products;
             
        const carIndex = carrito.findIndex(idCarrito => idCarrito.id === +IdCar);
        const prodIndex = prodCarrito.findIndex(idProduct => idProduct.id === +IdProd);
       
        if (carIndex < 0)
        return res.status(404).json({ success: false, error: `Carrito id: ${IdCar} no encontrado`});
        else if (prodIndex < 0)
        return res.status(404).json({ success: false, error: `Producto id: ${IdProd} no encontrado`});
        prodCarrito.splice(carIndex, 1);
        this.saveData(data);
        return res.json({ success: true, result: 'Producto Eliminado'});      
    }    
}

module.exports = CarritoContainer;