const express = require("express");
const router = express.Router();

const db = require("../models");

/* Root route /ingredients */
router.get("/", function (req, res) {
  db.Ingredient.find({}, function (error, allIngredients) {
    if(error) {
      console.log(error);
      res.send({message:"Internal Server Error"});
    } else {
      const context = {ingredients: allIngredients};
      res.render("ingredients/index", context);
    }
  });
});

/* New ingredient route */
router.get("/new", function (req, res) {
  res.render("ingredients/new");
});

/* Create new ingredient */
router.post("/", function (req, res) {
  db.Ingredient.create(req.body, function (error, createdIngredient) {
    if(error) {
      console.log(error);
      res.send({message: "Internal Server Error"});
    } else {
      res.redirect("/ingredients");
    }
  });
});

/* Edit ingredient route */
router.get("/:id/edit",  function (req, res) {
  db.Ingredient.findById(req.params.id, function (error, foundIngredient) {
    if(error) {
      console.log(error);
      res.send({message: "Internal Server Error"});
    } else {
      const context = {ingredient: foundIngredient};
      res.render("ingredients/edit", context);
    }
  });
});

/* Update ingredient */
router.put("/:id",  function (req, res) {
  db.Ingredient.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (error, updatedIngredient) {
    if(error) {
      console.log(error);
      res.send({message: "Internal Server Error"});
    } else {
      res.redirect("/ingredients");
    }
  });
});

/* Delete ingredient --> ARE YOUR SURE? */
router.get("/:id/delete",  function (req, res) {
  db.Ingredient.findById(req.params.id, function (error, foundIngredient) {
    if(error) {
      console.log(error);
      res.send({message: "Internal Server Error"});
    } else {
      const context = {ingredient: foundIngredient};
      res.render("ingredients/delete", context);
    }
  });
});

/* Delete ingredient */
router.delete("/:id",  function (req, res) {
  db.Ingredient.findByIdAndDelete(req.params.id, function (error, deletedIngredient) {
    if(error) {
      console.log(error);
      res.send({message: "Internal Server Error"});
    } else {
      res.redirect("/ingredients");
    }
  });
});

module.exports = router;