var config = require('config.json');
var express = require('express');
var router = express.Router();
var ordersService = require('services/orders.service');

// routes
router.post('/add', add);
router.get('/', getAll);
router.get('/user/:_email', getAllByUser);
router.put('/status/:_id', changeStatus);
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

function changeStatus(req, res) {
    console.log("changing status of: " + req.params._id);
    ordersService.changeStatus(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
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

function getAllByUser(req, res) {
    console.log("Getting user " + req.params._email);
    ordersService.getAllByUser(req.params._email)
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
