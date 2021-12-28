const Server = require("../index");
const chaiHttp = require("chai-http");
const chai = require("chai");
const expect = chai.expect;
const { Diplome } = require("../models/diplome");

chai.use(chaiHttp);
chai.should();
/**
 * Test cases : All the Diplome APIs
 */
describe("Unit Testing for All Diplome APIs :", () => {
  /**
   * Get all diplomes
   */
  describe("Get all diplomes from the database.", () => {
    it("It Should prove that the database is Empty.", (done) => {
      chai
        .request(Server)
        .get("/Api/Diplomes")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Operation Succeded");
          res.should.be.a("object");
          expect(res.body)
            .to.have.deep.property("AllDiplomes")
            .that.has.lengthOf(0);
          done();
        });
    });
  });

  /**
   * Testing Post Diplome & Verifing the Data.
   */

  describe("Adding & Verifying a New Diplome to the Database.", () => {
    /**
     * Ading a new Diplome
     */

    it("It Should Store a New Diplome in the DataBase .", (done) => {
      let Diplome = {
        name: "Unit Testing Name",
        date: Date.now(),
        specialite: "Unit Testing Specialité",
      };

      chai
        .request(Server)
        .post("/Api/NewDiplome")
        .send(Diplome)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.a("object");
          expect(res.body).to.have.property("newdiplome");
          expect(res.body)
            .to.have.deep.nested.property("newdiplome.name")
            .to.be.equal(Diplome.name);
          expect(res.body).to.have.deep.nested.property("newdiplome.date");
          expect(res.body)
            .to.have.deep.nested.property("newdiplome.specialite")
            .to.be.equal(Diplome.specialite);
          done();
        });
    });

    /**
     * Verifying the existance of the new Diplome.
     */

    it("It Should Verify that the database have one Diplome.", (done) => {
      chai
        .request(Server)
        .get("/Api/Diplomes")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Operation Succeded");
          res.should.be.a("object");
          expect(res.body)
            .to.have.deep.property("AllDiplomes")
            .that.has.lengthOf(1);
          done();
        });
    });
  });

  /**
   * Testing Get Single Diplome.
   */

  describe("Returning a Specific Diplome by ID.", () => {
    it("It Should return a diplome by a given ID", (done) => {
      let diplome = new Diplome({
        name: "Unit Testing Name ",
        date: Date.now(),
        specialite: "Unit Testing Specialité",
      });

      diplome.save((err, diplome) => {
        chai
          .request(Server)
          .get("/Api/SingleDiplome/" + diplome._id)
          .send(diplome)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("Operation Succeded");
            res.body.should.have.deep.nested.property("diplome.name");
            res.body.should.have.deep.nested.property("diplome.date");
            res.body.should.have.deep.nested.property("diplome.specialite");
            res.body.should.have.deep.nested
              .property("diplome._id")
              .eql(diplome._id.toString());
            done();
          });
      });
    });
  });

  /**
   * Testing Update Diplome.
   */

  describe("Updating a Diplome by a given ID", () => {
    it("It should update a diplome by a given ID.", (done) => {
      let diplome = new Diplome({
        name: "Unit Testing Name ",
        date: Date.now(),
        specialite: "Unit Testing Specialité",
      });

      diplome.save((err, diplome) => {
        chai
          .request(Server)
          .patch("/Api/UpdateDiplome/" + diplome._id)
          .send({
            name: "Unit Testing Name Update",
            date: Date.now(),
            specialite: "Unit Testing Specialité Update",
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("Operation Succeded");
            res.body.should.have.deep.nested
              .property("updatediplome.name")
              .eql("Unit Testing Name Update");
            done();
          });
      });
    });
  });

  /**
   * Testing Delete Diplome.
   */

  describe("Delete a Specific Diplome by a given ID.", () => {
    it("It should delete a diplome by a given ID", (done) => {
      let diplome = new Diplome({
        name: "Unit Testing Name ",
        date: Date.now(),
        specialite: "Unit Testing Specialité",
      });

      diplome.save((err, diplome) => {
        chai
          .request(Server)
          .delete("/Api/DeleteDiplome/" + diplome._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("Operation Succeded");
            done();
          });
      });
    });
  });
});
