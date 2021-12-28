const Server = require("../index");
const chaiHttp = require("chai-http");
const chai = require("chai");
const { Experience } = require("../models/experience");
const expect = chai.expect;

chai.use(chaiHttp);
chai.should();

/**
 * Test cases : All the Experience APIs
 */

describe("Unit Testing for All Experience APIs :", () => {
  /**
   * Get all Experience
   */
  describe("Get all experience from the database.", () => {
    it("It Should prove that the Experience Collection is Empty.", (done) => {
      chai
        .request(Server)
        .get("/Api/Experiences")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Operation Succeded");
          res.should.be.a("object");
          expect(res.body)
            .to.have.property("ExperienceList")
            .that.has.lengthOf(0);
          done();
        });
    });
  });
  /**
   * Testing Post Experience & Verifing the Data's existance
   */
  describe("Adding & Verifying a New Diplome to the Database.", () => {
    /**
     * Ading a new experience
     */
    it("It Should Store a New experience in the DataBase .", (done) => {
      // Fake Valid ObjectId
      const fake_id = "61cb6d4d151726f618f7729c";
      let experience = new Experience({
        poste: "Unit Testing Poste",
        societe: "Unit Testing Societe",
        date_deb: Date.now(),
        date_fin: Date.now(),
        user: fake_id,
      });

      chai
        .request(Server)
        .post("/Api/NewExperience")
        .send(experience)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.a("object");
          res.body.should.have.property("message").eql("Operation Succeded");
          expect(res.body).to.have.property("newexperience");
          expect(res.body)
            .to.have.deep.nested.property("newexperience.poste")
            .to.be.equal(experience.poste);
          expect(res.body)
            .to.have.deep.nested.property("newexperience.societe")
            .to.be.equal(experience.societe);
          expect(res.body).to.have.deep.nested.property(
            "newexperience.date_deb"
          );
          expect(res.body).to.have.deep.nested.property(
            "newexperience.date_fin"
          );
          expect(res.body)
            .to.have.deep.nested.property("newexperience.user")
            .to.be.eql(experience.user.toString());
          done();
        });
    });

    /**
     * Verifying the existance of the new Experience.
     */

    it("It Should Verify that the database have one Experience.", (done) => {
      chai
        .request(Server)
        .get("/Api/Experiences")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Operation Succeded");
          res.should.be.a("object");
          expect(res.body)
            .to.have.property("ExperienceList")
            .that.has.lengthOf(1);
          done();
        });
    });
  });
});