const express = require('express');
const errorMiddleware = require('./middlewares/error.middleware');
const apiRoutes = require('./routers/app.routes');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}));


app.use('/api', apiRoutes);
app.use(errorMiddleware);

module.exports = app;