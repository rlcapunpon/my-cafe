var config = require('config.json');
var express = require('express');
var router = express.Router();
var hotbeverageService = require('services/hotbeverage.service');

// routes
router.post('/add', add);
router.get('/', getAll);
router.delete('/:_id', _delete);

module.exports = router;

function add(req, res) {
  hotbeverageService.create(req.body)
      .then(function (hotbeverage) {
          res.status(200).send(hotbeverage);
      })
      .catch(function (err) {
          var data = {
              "message":err.toString()
          };
          res.status(400).send(data);
      });
}

function getAll(req, res) {
  hotbeverageService.getAll()
      .then(function (hotbeverages) {
          res.send(hotbeverages);
      })
      .catch(function (err) {
          res.status(400).send(err);
      });
}

function _delete(req, res) {
  hotbeverageService.delete(req.params._id)
      .then(function () {
          res.sendStatus(200);
      })
      .catch(function (err) {
          res.status(400).send(err);
      });
}
