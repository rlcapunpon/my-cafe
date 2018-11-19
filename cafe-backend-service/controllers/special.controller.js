var config = require('config.json');
var express = require('express');
var router = express.Router();
var specialService = require('services/special.service');

// routes
router.post('/add', add);
router.get('/', getAll);
router.delete('/:_id', _delete);

module.exports = router;

function add(req, res) {
    console.log(JSON.stringify(req.body))
  specialService.create(req.body)
      .then(function (specialItem) {
          res.status(200).send(specialItem);
      })
      .catch(function (err) {
          var data = {
              "message":err.toString()
          };
          res.status(400).send(data);
      });
}

function getAll(req, res) {
    console.log("Getting all")
  specialService.getAll()
      .then(function (specialItems) {
          res.send(specialItems);
      })
      .catch(function (err) {
          res.status(400).send(err);
      });
}

function _delete(req, res) {
  specialService.delete(req.params._id)
      .then(function () {
          res.sendStatus(200);
      })
      .catch(function (err) {
          res.status(400).send(err);
      });
}
