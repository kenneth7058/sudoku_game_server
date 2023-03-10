const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/highscore").get(function (req, res) {
  let db_connect = dbo.getDb("Scores");
  db_connect
    .collection("HighScores")
    .find({})
    .sort({ Time: 1 })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/highscore/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("HighScores")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});


recordRoutes.route("/highscore/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    Name: req.body.Name,
    Time: req.body.Time,
    Sudoku: req.body.Sudoku,
  };
  db_connect.collection("HighScores").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});



module.exports = recordRoutes;