const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient'
    }],
    description: { type: String, required: true },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;