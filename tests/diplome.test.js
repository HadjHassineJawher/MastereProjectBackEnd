let Server = require("../index");
let chai = require("chai");
let chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);

/**
 * Test cases : to test all the Diplome APIs
 * Covered Routes:
 * (1) Get all Diplomes
 * (2) Store Diplome
 * (3) Get single Diplome
 * (4) Fail to Get a single Diplome
 * (5) Update Diplome
 * (6) Fail to Delete a Diplome
 * (7) Delete Diplome
 * (8) Fail to Update a Diplome
 */

describe("Testing Diplome APIs", () => {
  /**
   * Testing Get all API.
   */

  describe("Get all", () => {
    it("It Should Get all the Diplomes ", () => {
      chai
        .request(Server)
        .get("/Api/Diplomes")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Operation Succeded");
        });
    });
  });

  /**
   * Testing Get Single Diplome.
   */

  describe("Get Single ", () => {
    it("It Should Get a Single Diplome ", () => {
      const _id = "61a7e87b8b24a41d88780aa7";
      chai
        .request(Server)
        .get("/Api/SingleDiplome/" + _id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Operation Succeded");
        });
    });
  });

  /**
   * Testing Fail to get a  Single Diplome.
   */

  describe("Fail to Get a Single Diplome ", () => {
    it("It Should not Get a Single Diplome ", () => {
      const _id = "61a7e87b8b24a4551d88780aa7";
      chai
        .request(Server)
        .get("/Api/SingleDiplome/" + _id)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have
            .property("message")
            .eql("No Data Found with this Id.");
        });
    });
  });

  /**
   * Testing Delete Diplome.
   */

  describe("Delete Diplome ", () => {
    it("It Should Delete a Diplome ", () => {
      const _id = "61acb5551d485dd4fc834eb8";
      chai
        .request(Server)
        .delete("/Api/DeleteDiplome/" + _id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Operation Succeded");
        });
    });
  });

  /**
   * Testing Fail to Delete Diplome.
   */

  describe("Fail to Delete a Diplome ", () => {
    it("It Should not Delete a Diplome ", () => {
      const _id = "61acb55ddds51d485dd4fc834eb8";
      chai
        .request(Server)
        .delete("/Api/DeleteDiplome/" + _id)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have.property("message").eql("No Data to Delete.");
        });
    });
  });

  /**
   * Testing Post Diplome.
   */

  describe("Post Diplome ", () => {
    it("It Should Store a Diplome ", () => {
      const newDiplome = {
        name: "Unit testing for POST Request",
        date: "2020-12-05",
        specialite: "Unit testing for POST Request",
      };
      chai
        .request(Server)
        .post("/Api/NewDiplome")
        .send(newDiplome)
        .end((err, res) => {
          res.should.have.status(201);
          //   res.body.should.have.property("name").eq("Unit testing for Deplome");
          //   res.body.should.have.property("date").eq("2021-12-05");
          //   res.body.should.have
          //     .property("specialite")
          //     .eq("Unit testing for Deplome");
          res.body.should.have.property("message").eql("Operation Succeded");
        });
    });
  });

  /**
   * Testing Update Diplome.
   */

  describe("Update Diplome ", () => {
    it("It Should Update an Existing Diplome ", () => {
      const _id = "61acfe0208ff255808c68162";

      const UpdateDiplome = {
        name: "Unit testing ",
        date: "2020-12-05",
        specialite: "Unit testing ",
      };
      chai
        .request(Server)
        .patch("/Api/UpdateDiplome/" + _id)
        .send(UpdateDiplome)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Operation Succeded");
        });
    });
  });
  /**
   * Testing Fail to Update a Diplome.
   */
  describe("Fait to Update a Diplome ", () => {
    it("It Should not Update an Existing Diplome ", () => {
      const _id = "61acfse02df047568162";

      const UpdateDiplome = {
        name: "Unit testing ",
        date: "2021-05-12",
        specialite: "Unit testing ",
      };

      chai
        .request(Server)
        .patch("/Api/UpdateDiplome/" + _id)
        .send(UpdateDiplome)
        .end((err, res) => {
          res.should.have.status(304);
        });
    });
  });
});
