const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// These are the attributes of the Mongo model
const VillagerSchema = new Schema({
  name: String,
  species: String,
  personality: String,
  photo: String
});

// Don't worry about this advanced feature of Mongoose
VillagerSchema.statics.seedWithSampleVillagers = function() {
  const self = this;
  const seedVillagers = [
    {name: 'Raymond', species: 'CAT', personality: 'SMUG', photo: '/images/raymond.jpg'},
    {name: 'Judy', species: 'CUB', personality: 'SNOOTY', photo: '/images/judy.jpg'},
    {name: 'Wolfgang', species: 'WOLF', personality: 'CRANKY', photo: '/images/wolfgang.jpg'},
  ];

  seedVillagers.forEach(function(villager) {
    var candidate = villager;
    self.findOne({name: candidate.name}, async function(err, result) {
      console.log(candidate);
      if (result) {
        console.log(result);
      } else {
        await self.create(candidate);
        console.log("Created: " + candidate.name);
      }
    });
  });
};

// Compile the model and export it
module.exports = mongoose.model('Villager', VillagerSchema);
