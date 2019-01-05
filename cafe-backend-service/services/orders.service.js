var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongodb = require('mongodb');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('orders');
db.bind('logins');

var service = {};

service.getAll = getAll;
service.getAllByUser = getAllByUser;
service.changeStatus = changeStatus;
service.create = create;
service.delete = _delete;

module.exports = service;

function getAll() {
  var deferred = Q.defer();

  db.orders.find().toArray(function (err, orders) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve(orders);
  });

  return deferred.promise;
}

function getAllByUser(email) {
  var deferred = Q.defer();
  console.log(email);
  db.orders.find({customeremail:email}).toArray(function (err, orders) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve(orders);
  });

  return deferred.promise;
}

function create(unitParam) {
  var deferred = Q.defer();
  unitParam.status = 0;
    createUnit();
  function createUnit() {
      var customer;
      console.log("Creating Order for: " + unitParam.email);
      db.logins.findOne({"email":unitParam.email}, function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            if(user) {
                customer = user;
                unitParam.customer = {};
                unitParam.customer.email = unitParam.email;
                unitParam.customer.name = customer.name;
                unitParam.customer.address = customer.address;
                unitParam.customer.contact = customer.contact;
                unitParam.customeremail = unitParam.email;
                console.log("UNIT: " + unitParam);
        
              db.orders.insert(
                unitParam,
                  function (err, doc) {
                      if (err) deferred.reject(err.name + ': ' + err.message);
                      console.log("order successfully added.")
                      deferred.resolve(unitParam);
                  });
        
            }
        });     
  }

  return deferred.promise;
}

function _delete(_id) {
  var deferred = Q.defer();

  db.orders.remove(
      { _id: mongo.helper.toObjectID(_id) },
      function (err) {
          if (err) deferred.reject(err.name + ': ' + err.message);
          deferred.resolve();
      });

  return deferred.promise;
}

function changeStatus(_id) {
  var deferred = Q.defer();
  var currentStatus;
  var newStatus;
  var unitResolution;
  // validation
  db.orders.findById(mongo.helper.toObjectID(_id), function (err, unit) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      currentStatus = unit.status;
      console.log("currentStatus: " + currentStatus);
      newStatus = parseInt(currentStatus) + 1;
      unitResolution = unit;
      unitResolution.status = newStatus;
      updateUnit();
  });

  function updateUnit() {
      // fields to update
      var set = {
          status: newStatus
      };

      console.log("will update: " + mongo.helper.toObjectID(_id))

      db.orders.update(
          { _id: mongo.helper.toObjectID(_id) },
          { $set: set },
          function (err, doc) {
              if (err) deferred.reject(err.name + ': ' + err.message);

              console.log("resolving change status")
              deferred.resolve(unitResolution);
          });
  }

  return deferred.promise;
}