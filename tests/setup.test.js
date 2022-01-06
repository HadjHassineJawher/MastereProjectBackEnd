const { Diplome } = require("../models/diplome");
const { Experience } = require("../models/experience");
const { Event } = require("../models/event");
/**
 * Clean up the database before test
 */

before((done) => {
  Diplome.deleteMany({}, function (err) {});
  Experience.deleteMany({}, function (err) {});
  Event.deleteMany({}, function (err) {});
  done();
});

/**
 * Clean up the database after test
 */

after((done) => {
  Diplome.deleteMany({}, function (err) {});
  Experience.deleteMany({}, function (err) {});
  Event.deleteMany({}, function (err) {});
  done();
});
