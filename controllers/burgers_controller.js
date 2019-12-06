var express = require("express");

var router = express.Router();

// Import the model to use its database functions
var burger = require("../models/burger.js");

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Create routes and logic
router.get("/burgers", function(req, res) {
  burger.selectAll(function(data) {
    res.json({ burgers: data });
  });
});

router.post("/burgers", function(req, res) {
  burger.insertOne([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, req.body.devoured
  ], function(result) {
    res.json({ id: result.insertId });
  });
});

router.put("/burgers/:id", function(req, res) {
  var hasEaten = "id = " + req.params.id;

  console.log("hasEaten", hasEaten);

  burger.updateOne({
    devoured: req.body.devoured
  }, hasEaten, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.json({ id: req.params.id});
    }
  });
});

router.delete("/burgers/:id", function(req, res) {
  var hasEaten = "id = " + req.params.id;

  burger.deleteOne(hasEaten, function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
