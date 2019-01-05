var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongodb = require('mongodb');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('logins');

var service = {};

service.getAll = getAll;
service.create = create;
service.delete = _delete;
service.authenticate = authenticate;

module.exports = service;

function getAll() {
  var deferred = Q.defer();

  db.logins.find().toArray(function (err, logins) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve(logins);
  });

  return deferred.promise;
}

function authenticate(email, password) {
  var deferred = Q.defer();

  db.logins.findOne({ email: email }, function (err, user) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      if (user && bcrypt.compareSync(password, user.hash)) {
          // authentication successful
          deferred.resolve({
              _id: user._id,
              email: user.email,
              token: jwt.sign({ sub: user._id }, config.secret)
          });
      } else {
          // authentication failed
          deferred.resolve();
      }
  });

  return deferred.promise;
}

function create(unitParam) {
  var deferred = Q.defer();
  console.log("Creating user: " + unitParam.email);
  // validation
  db.logins.findOne(
    { username: unitParam.email },
    function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // username already exists
            deferred.reject('Username "' + userParam.email + '" is already taken');
        } else {
            createUnit();
        }
    });
  function createUnit() {
    // set user object to userParam without the cleartext password
    var user = _.omit(unitParam, 'password');
    // add hashed password to user object
    user.hash = bcrypt.hashSync(unitParam.password, 10);
      db.logins.insert(
        user,
          function (err, doc) {
              if (err) deferred.reject(err.name + ': ' + err.message);
              console.log("login successfully added.")
              deferred.resolve(unitParam);
          });
  }

  return deferred.promise;
}

function _delete(_id) {
  var deferred = Q.defer();

  db.logins.remove(
      { _id: mongo.helper.toObjectID(_id) },
      function (err) {
          if (err) deferred.reject(err.name + ': ' + err.message);
          deferred.resolve();
      });

  return deferred.promise;
}