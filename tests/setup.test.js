const { Diplome } = require("../models/diplome");
const { Experience } = require("../models/experience");
/**
 * Clean up the database before test
 */

before((done) => {
  Diplome.deleteMany({}, function (err) {});
  Experience.deleteMany({}, function (err) {});
  done();
});

/**
 * Clean up the database after test
 */

after((done) => {
  Diplome.deleteMany({}, function (err) {});
  Experience.deleteMany({}, function (err) {});
  done();
});
