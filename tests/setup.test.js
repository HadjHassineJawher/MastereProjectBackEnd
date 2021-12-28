const { Diplome } = require("../models/diplome");

/**
 * Clean up the database before test
 */

before((done) => {
  Diplome.deleteMany({}, function (err) {});
  done();
});

/**
 * Clean up the database after test
 */

after((done) => {
  Diplome.deleteMany({}, function (err) {});
  done();
});
