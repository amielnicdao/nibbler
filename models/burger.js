// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
  selectAll: function(cb) {
    orm.all("burgers", function(res) {
      cb(res);
    });
  },
  insertOne: function(cols, vals, cb) {
    orm.insert("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
  updateOne: function(objColVals, hasEaten, cb) {
    orm.update("burgers", objColVals, hasEaten, function(res) {
      cb(res);
    });
  },
  deleteOne: function(hasEaten, cb) {
    orm.delete("burgers", hasEaten, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller.
module.exports = burger;
