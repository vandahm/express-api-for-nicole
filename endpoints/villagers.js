const express = require('express');
const router = express.Router();

// Model import
const Villager = require('../models/villager');

/**
 * REST Methods
 *
 * I have REST methods for all the important HTTP verbs:
 *    GET, POST, PUT, PATCH, and DELETE
 *
 * GET is for reading data from the server. We want to be able to GET a list
 * of every villager, and also GET only a single villager if we know their MongoDB
 * id, so we have two functions.
 *
 * POST is for creating records. In practice, there's no reason to let users
 * add villagers to the database, but I wrote a simple function for it just
 * so you can see it as a reference.
 *
 * PUT is for modifying records that already exist. Strictly speaking, PUT should
 * replace an ENTIRE record with an entirely new record with the same unique ID.
 * But some APIs are sloppy about that.
 *
 * In job interviews, you sometimes get the chance to sound smart by pointing
 * out that PUT can be used as an idempotent create method. Like, if you know
 * in advance what your unique IDs are instead of letting the database create
 * them for you, you'd be free and clear to create a record with PUT, so long as
 * subsequent PUTs do not create new records with the same data.
 *
 * Animal Crossing is, coincidentally, a good use case for this. You know for a
 * fact that each Villager's name is globally unique, so you could use the villager
 * name instead of the database key for the resource ID. But it's rare that you
 * know this information in advance, with such a strong guarantee.
 *
 * The proper, official way to update an existing record by only specifying the
 * fields that have changed is PATCH. I have both PUT and PATCH records.
 *
 * DELETE does what you think it does: it removes a resource. In practice, you
 * wouldn't do this to Animal Crossing villagers, but I included the method so
 * you could live out everyone's fantasy of permanently deleting Beardo from the game.
 */

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
  villager = await Villager.findById(req.params.id);
  res.json(villager);
});

// Update a villager by passing an *entire* villager record
router.put('/:id', async function(req, res) {
  villager = await Villager.findByIdAndUpdate(req.params.id, req.body, options={new: true, overwrite: true});
  // respond with the modified record
  res.json(villager);
});

// Update a villager by passing a partial villager record
router.patch('/:id', async function(req, res) {
  villager = await Villager.findByIdAndUpdate(req.params.id, req.body, options={new: true});
  // respond with the modified record
  res.json(villager);
});

// Delete a villager
router.delete('/:id', async function(req, res) {
  villager = await Villager.findByIdAndDelete(req.params.id);
  // respond with the deleted record
  res.json(villager);
});

module.exports = router;
