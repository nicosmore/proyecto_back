const app = require('./app');
const MongoContainer = require('./models/containers/mongo.container');

const PORT = process.env.PORT || 8080;


app.listen(PORT, async () => {
  MongoContainer.connect()
  .then(() => {
    console.log('Connected to DB!');
    console.log('Server is up and running on port: ', + PORT);
  });
});