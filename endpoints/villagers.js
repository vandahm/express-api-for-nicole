const express = require('express');
const router = express.Router();

// Model import
const Villager = require('../models/villager');



var villagers = [
  {id: 1, name: "Raymond", species: "CAT", image: "/images/raymond.png"},
  {id: 2, name: "Judy", species: "CUB", image: "/images/judy.png"},
  {id: 3, name: "Wolfgang", species: "WOLF", image: "/images/wolfgang.png"}
]

// Get every villager
router.get('/', async function(req, res) {
  // Fetch every villager in MongoDB
  villagers = await Villager.find({});

  // Update the response object with the JSON
  res.json(villagers);
});

// Create a villager
router.post('/', function(req, res) {
  v = new Villager(req.body); // bodyParser already turned the request into JS for us.
  // Add record to Mongo
  v.save();
  // Return the created record
  res.json(v);
});

// Get a specific villager
router.get('/:id', async function(req, res) {
  villager = await Villager.findbyId(req.params.id);
  res.json(villager.json);
});

// Update a villager by passing an *entire* villger record
router.put('/:id', async function(req, res) {
  villager = await Villager.findByIdAndUpdate(req.params.id, options={new: true, overwrite: true});
  // respond with the modified record
  res.json(villager.json);
});

router.patch('/:id', async function(req, res) {
  villager = await Villager.findByIdAndUpdate(req.params.id, options={new: true});
  // respond with the modified record
  res.json(villager.json);
});

// Delete a villager
router.delete('/:id', async function(req, res) {
  villager = await Villager.findbyIdAndRemove(req.params.id);
  // respond with the deleted record
  res.json(villager);
});

module.exports = router;
