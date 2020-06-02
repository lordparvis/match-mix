const mongoose = require("mongoose");

const barSchema = new mongoose.Schema({
  name: {type: String, required: true},
  ingredients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredient'
  }]
});

const Bar = mongoose.model('Bar', barSchema);

module.exports = Bar;