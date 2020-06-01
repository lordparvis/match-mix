const express = require("express");
const router = express.Router();

const db = require("../models");

/* Root route /bars */
router.get("/", async function (req, res) {
  try {
    const allBars = await db.Bar.find({});
    res.send(allBars);
  } catch (error) {
    console.log(error);
    res.send({message: "Internal Server Error"});
  }
});

/* New Bar route */
router.get("/new", function (req, res) {
  res.render("bars/new");
});

/* Create new bar */
router.post("/", function (req, res) {
  db.Bar.create(req.body, function (error, createdBar) {
    if(error) {
      console.log(error);
      res.send({message: "Internal Server Error"});
    } else {
      res.redirect("/bars");
    }
  });
});

module.exports = router;