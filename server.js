const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require("./config/connection")

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//uses my routes and connects them to the server, 3001 in this case
app.use(routes);

// sync sequelize models to the database, then turn on the server
// .then is the same as async and await
//sync mehtod first then the .then
//connects to database through sequelize then it runs the port
//false means do not delete database
//true means connect to database but drops data in the database, this will make you start with nothing 
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});