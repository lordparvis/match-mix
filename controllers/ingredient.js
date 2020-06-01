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
      const context = {Ingredients: allIngredients};
      res.render = ("ingredients/index", context);
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

/* Ingredient show route */
router.get("/:id",  function (req, res) {
  db.Ingredient.findById(req.params.id, function (error, foundIngredient) {
    if(error) {
      console.log(error);
      res.send({message: "Internal Server Error"});
    } else {
      const context = {ingredients: foundIngredient};
      res.render("ingredients/show", context);
    }
  });
});

/* Edit bar route */
// router.get("/:id/edit",  function (req, res) {
//   db.Bar.findById(req.params.id, function (error, foundBar) {
//     if(error) {
//       console.log(error);
//       res.send({message: "Internal Server Error"});
//     } else {
//       const context = {bars: foundBar};
//       res.render("bars/edit", context);
//     }
//   });
// });

/* Update bar */
// router.put("/:id",  function (req, res) {
//   db.Bar.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (error, updatedBar) {
//     if(error) {
//       console.log(error);
//       res.send({message: "Internal Server Error"});
//     } else {
//       res.redirect(`bars/${updatedBar._id}`);
//     }
//   });
// });

/* Delete bar */
// router.delete("/:id",  function (req, res) {
//   db.Bar.findByIdAndDelete(req.params.id, function (error, deletedBar) {
//     if(error) {
//       console.log(error);
//       res.send({message: "Internal Server Error"});
//     } else {
//       res.redirect("/bars");
//     }
//   });
// });

module.exports = router;