const express = require('express')
const router = express.Router();

const db = require("../models")


//index
router.get('/', function(req, res) {
    db.Recipe.find({}, function(err, allRecipes) {
        if (err) {
            console.log(err);
            res.send({ message: "Internal server error." });
        } else {
            const context = { recipes: allRecipes }
            res.render("recipes/index", context);
        }
    });
});

//new
router.get("/new", function (req, res) {
    res.render("recipes/new");
  });

//create
router.post("/", function(req, res) {
    db.Recipe.create(req.body, function(err, createdRecipe) {
        if (err) {
            console.log(err);
            res.send({ message: "Internal Server Error" });
        } else {
            db.Recipe.findById(createdRecipe.recipe, function(err, foundRecipe) {
                if (err) {
                    console.log(err);
                    res.send({ message: "Internal Server Error" });
                } else {
                    foundRecipe.recipes.push(createdRecipe);
                    foundRecipe.save();
                    res.redirect("/recipes");
                }
            });
        }
    });
});

//show
router.get("/:id", function(req, res) {
    db.Recipe.findById(req.params.id).populate("recipe").exec(function(err, foundRecipe) {
        if (err) {
            console.log(err);
            res.send({ message: "Internal Server Error" });
        } else {
            const context = { recipe: foundRecipe }
            res.render("recipe/show", context);
        }
    });
});

//edit
router.get("/:id/edit", function(req, res) {
    db.Recipe.findById(req.params.id, function(err, foundRecipe) {
        if (err) {
            console.log(err);
            res.send({ message: "Internal Server Error" });
        } else {
            const context = { recipe: foundRecipe }
            res.render("recipe/edit", context);
        }
    });
});

//update
router.put("/:id", function(req, res) {
    db.Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, updatedRecipe) {
        if (err) {
            console.log(err);
            res.send({ message: "Internal Server Error" });
        } else {
            res.redirect(`/recipes/${updatedRecipe._id}`);
        }
    });
});

//delete
router.delete("/:id", function(req, res) {
    db.Recipe.findByIdAndDelete(req.params.id, function(err, deletedRecipe) {
        if (err) {
            console.log(err);
            res.send({ message: "Internal Server Error" });
        } else {
            db.Recipe.findById(deletedRecipe.recipe, function(err, foundRecipe) {
                if (err) {
                    console.log(err);
                    res.send({ message: "Internal Server Error" });
                } else {
                    foundRecipe.recipes.remove(deletedRecipe);
                    foundRecipe.save();
                    res.redirect('/recipes');
                }
            });
        }
    });
});

module.exports = router;