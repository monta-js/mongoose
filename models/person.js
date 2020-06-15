const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PersonSchema = new schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  age: { type: Number},
  favoriteFoods : { type: [String]},
});

module.exports = Person = mongoose.model('person', PersonSchema);