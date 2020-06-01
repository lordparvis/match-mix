const mongoose = require("mongoose");

const barSchema = new mongoose.Schema({
  name: {type: String, required: true},
});

const Bar = mongoose.model('Bar', barSchema);

module.exports = Bar;