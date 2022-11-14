const app = require('./app');
const envConfig = require('./config');

const PORT  = process.env.PORT || 8080;

const ASYNC_DATASURCE ={
  mongo: require('./models/containers/mongo.container'),
}
//Object.keys => ['mongo']  Object.values => [MongoContainer]  Object.entries => ['mongo', MongoContainer]

app.listen(PORT, () => {
  if(Object.keys(ASYNC_DATASURCE).includes(envConfig.DATASOURCE || '')){
    ASYNC_DATASURCE[envConfig.DATASOURCE].connect()
      .then(() => {
        console.log('Conected to' + envConfig.DATASOURCE);
      })
  }    
    console.log(`Server is up and running on port: `, PORT);  
});