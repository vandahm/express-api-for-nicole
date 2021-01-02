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

// This just makes sure you have at least something in your Mongo database.
const Villager = require('./models/villager');
Villager.seedWithSampleVillagers();

// Make a nice intro page.
app.get('/', async function(req, res) {
  var html = '<html><head><title>Hello Nicole</title></head><body><h1>Villager Bingo</h1>';
  html += '<p>Hi Nicole!</p>';
  html += '<p>The <code>villagers</code> endpoint is <a href="http://localhost:3000/villagers">here</a>.</p>';
  html += '<h2>Villagers</h2>';
  html += '<p>You can use the <code>CREATE</code> method to add new villagers, and they will show up here.</p><ul>';

  let villagers = await Villager.find({});

  villagers.forEach(function (villager) {
    html += '<li><a href="/villagers/' + villager.id + '">' + villager.name + '</a></li>';
  });
  html += '</ul></body></html>';
  res.send(html);
});



// Make the Express app listen indefinitely for requests on a TCP port
app.listen(3000);
