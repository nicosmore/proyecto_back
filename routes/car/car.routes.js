const express = require('express');
const CarritoContainer = require('../../api/car.api');
const carCont = new CarritoContainer();

const router = express.Router();

router.get('/', carCont.getAllProds);

router.get('/:Id', carCont.getProdsById);

//router.post('/', carCont.createCar);

router.post('/', carCont.save);

router.post('/:IdCar/:IdProd', carCont.saveProds);

router.delete('/:IdCar/:IdProd', carCont.deleteById);

module.exports = router; 