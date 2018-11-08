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
  specialService.create(req.body)
      .then(function (bill) {
          res.status(200).send(bill);
      })
      .catch(function (err) {
          var data = {
              "message":err.toString()
          };
          res.status(400).send(data);
      });
}

function getAll(req, res) {
  specialService.getAll()
      .then(function (bills) {
          res.send(bills);
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
