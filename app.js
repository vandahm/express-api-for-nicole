const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Set up our connection to Mongo
var uri = "mongodb://localhost:27017/bingo";
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});
mongoose.set('useFindAndModify', false);

// Sets up the express app
const app = express();

app.use(bodyParser.json());

// Import some REST endpoints
const villagerRouter = require('./endpoints/villagers');
app.use('/villagers/', villagerRouter);

// const cardRouter = require('./endpoints/cards');
// app.use('/cards/', cardRouter);

app.get('/', function(req, res) {
  res.send('The <code>villagers</code> endpoint is <a href="http://localhost:3000/villagers">here</a>');
});

// This just makes sure you have at least something in your Mongo database.
const Villager = require('./models/villager');
Villager.seedWithSampleVillagers();

// Make the Express app listen indefinitely for requests on a TCP port
app.listen(3000);
