var config = require('config.json');
var express = require('express');
var router = express.Router();
var colddrinkService = require('services/colddrinks.service');

// routes
router.post('/add', add);
router.get('/', getAll);
router.delete('/:_id', _delete);

module.exports = router;

function add(req, res) {
  colddrinkService.create(req.body)
      .then(function (drink) {
          res.status(200).send(drink);
      })
      .catch(function (err) {
          var data = {
              "message":err.toString()
          };
          res.status(400).send(data);
      });
}

function getAll(req, res) {
  colddrinkService.getAll()
      .then(function (drinks) {
          res.send(drinks);
      })
      .catch(function (err) {
          res.status(400).send(err);
      });
}

function _delete(req, res) {
  colddrinkService.delete(req.params._id)
      .then(function () {
          res.sendStatus(200);
      })
      .catch(function (err) {
          res.status(400).send(err);
      });
}
