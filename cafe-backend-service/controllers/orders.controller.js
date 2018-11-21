var config = require('config.json');
var express = require('express');
var router = express.Router();
var ordersService = require('services/orders.service');

// routes
router.post('/add', add);
router.get('/', getAll);
router.delete('/:_id', _delete);

module.exports = router;

function add(req, res) {
    console.log("Adding: " + req.body);
  ordersService.create(req.body)
      .then(function (order) {
          res.status(200).send(order);
      })
      .catch(function (err) {
          var data = {
              "message":err.toString()
          };
          res.status(400).send(data);
      });
}

function getAll(req, res) {
  ordersService.getAll()
      .then(function (orders) {
          res.send(orders);
      })
      .catch(function (err) {
          res.status(400).send(err);
      });
}

function _delete(req, res) {
  ordersService.delete(req.params._id)
      .then(function () {
          res.sendStatus(200);
      })
      .catch(function (err) {
          res.status(400).send(err);
      });
}
