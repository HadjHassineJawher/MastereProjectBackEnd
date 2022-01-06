const Server = require("../index");
const chaiHttp = require("chai-http");
const chai = require("chai");
const expect = chai.expect;

chai.use(chaiHttp);
chai.should();

/**
 * Test cases : All the Event APIs
 */

describe("Unit Testing for All Event APIs :", () => {
  /**
   * Get all Events
   */

  describe("Get all events from the database.", () => {
    it("It Should prove that the Events Collection is Empty.", (done) => {
      chai
        .request(Server)
        .get("/Api/Events")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Operation Succeded");
          res.should.be.a("object");
          expect(res.body).to.have.property("AllEvents").that.has.lengthOf(0);
        });
      done();
    });
  });
});
