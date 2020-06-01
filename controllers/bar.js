const express = require("express");
const router = express.Router();

const db = require("../models");

router.get("/", async function (req, res) {
  try {
    const allBars = await db.Bar.find({});
    res.send(allBars);
  } catch (error) {
    console.log(error);
    res.send({message: "Internal Server Error"});
  }
});

module.exports = router;