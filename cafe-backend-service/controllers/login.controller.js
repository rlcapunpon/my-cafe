var config = require('config.json');
var express = require('express');
var router = express.Router();
var loginService = require('services/login.service');

// routes
router.post('/register', register);
router.post('/authenticate', authenticate);
router.get('/', getAll);
router.delete('/:_id', _delete);

module.exports = router;

function register(req, res) {
    console.log("Trying to register.")
    console.log("Adding: " + req.body.email);
    console.log("Adding: " + req.body.password);
  loginService.create(req.body)
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

function authenticate(req, res) {
  console.log("Verify user: " + req.body);
loginService.authenticate(req.body.email, req.body.password)
    .then(function (user) {
        res.status(200).send(user);
    })
    .catch(function (err) {
        var data = {
            "message":err.toString()
        };
        res.status(400).send(data);
    });
}

function getAll(req, res) {
  loginService.getAll()
      .then(function (orders) {
          res.send(orders);
      })
      .catch(function (err) {
          res.status(400).send(err);
      });
}

function _delete(req, res) {
  loginService.delete(req.params._id)
      .then(function () {
          res.sendStatus(200);
      })
      .catch(function (err) {
          res.status(400).send(err);
      });
}
