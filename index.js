const express = require('express');
const apiRoutes = require('./routes/app.routes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);
app.use('*', (req, res)=>{
    res.status(404).send({error:-2, descripcion:`ruta ${req.baseUrl} metodo ${req.method} no implementado`})
});

const conectedServer = app.listen(PORT, ()=>{
    console.log(`Server is up and running on port ${PORT}`);
});

conectedServer.on('error',(error)=>{
    console.error('Error:', error);
});