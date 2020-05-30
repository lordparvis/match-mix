const mongoose = require("mongoose");

const connectionString = 'mongodb://localhost:27017/mixandmatch'
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(function() {
  console.log("Mongodb connected...");
})
.catch(function (error) {
  console.log("Mongodb Error", error)
});

module.exports = {
  Bar: require("./Bar"),
  Recipe: require("./Recipe"),
  Ingredient: require("./Ingredient")
}