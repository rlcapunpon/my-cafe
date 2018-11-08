var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongodb = require('mongodb');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('colddrinks');

var service = {};

service.getAll = getAll;
service.create = create;
service.delete = _delete;

module.exports = service;

function getAll() {
  var deferred = Q.defer();

  db.colddrinks.find().toArray(function (err, colddrinks) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve(colddrinks);
  });

  return deferred.promise;
}

function create(unitParam) {
  var deferred = Q.defer();
    createUnit();
  function createUnit() {
      db.colddrinks.insert(
        unitParam,
          function (err, doc) {
              if (err) deferred.reject(err.name + ': ' + err.message);
              console.log("colddrinks successfully added.")
              deferred.resolve(unitParam);
          });
  }

  return deferred.promise;
}

function _delete(_id) {
  var deferred = Q.defer();

  db.colddrinks.remove(
      { _id: mongo.helper.toObjectID(_id) },
      function (err) {
          if (err) deferred.reject(err.name + ': ' + err.message);
          deferred.resolve();
      });

  return deferred.promise;
}