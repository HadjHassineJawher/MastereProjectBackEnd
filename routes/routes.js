const express = require("express");
const router = express.Router();
const Upload = require("../middlewares/imgUpload");

/**
 * User APIs Routes
 */

const Usercontroller = require("../controllers/userController");
router.get("/Users", Usercontroller.getAllUsers);
router.get("/SingleUser/:id", Usercontroller.getSingleUser);
router.post("/NewUser", Usercontroller.NewUser);
router.delete("/DeleteUser/:id", Usercontroller.DeleteUser);
router.patch("/UpdateUser/:id", Usercontroller.UpdateUser);
router.post("/UserLogIn", Usercontroller.UserLogIn);

/**
 * Event APIs Routes
 */

const EventController = require("../controllers/eventsContoller");
router.get("/Events", EventController.getAllEvents);
router.get("/SingleEvent/:id", EventController.getSingleEvent);
router.post("/NewEvent", EventController.NewEvent);
router.delete("/DeleteEvent/:id", EventController.DeleteEvent);
router.patch("/UpdateEvent/:id", EventController.UpdateEvent);
router.patch("/CancelEvent/:id", EventController.cancelEvent);
router.patch("/UncancelEvent/:id", EventController.UncancelEvent);
router.get("/CanceledEvents", EventController.canceledEvents);

/**
 * Sessions APIs Routes
 */

const SessionController = require("../controllers/sessionController");
router.get("/Sessions", SessionController.getAllSessions);
router.get("/SingleSession/:id", SessionController.getSingleSession);
router.post("/NewSession", SessionController.NewSession);
router.delete("/DeleteSession/:id", SessionController.DeleteSession);
router.patch("/UpdateSession/:id", SessionController.UpdateSession);

/**
 * Dipolome APIs Routes
 */

const DiplomeController = require("../controllers/diplomeController");
router.get("/Diplomes", DiplomeController.getAllDiplome);
router.get("/SingleDiplome/:id", DiplomeController.getSingleDiplome);
router.post("/NewDiplome", DiplomeController.NewDiplome);
router.delete("/DeleteDiplome/:id", DiplomeController.DeleteDiplome);
router.patch("/UpdateDiplome/:id", DiplomeController.UpdateDipolome);

/**
 * Experience APIs Routes
 */

const ExperienceController = require("../controllers/experienceController");
router.get("/Experiences", ExperienceController.getAllExperience);
router.get("/SingleExperience/:id", ExperienceController.getSingleExperience);
router.post("/NewExperience", ExperienceController.NewExperience);
router.delete("/DeleteExperience/:id", ExperienceController.DeleteExperience);
router.patch("/UpdateExperience/:id", ExperienceController.UpdateExperience);

/**
 * Portfolio APIs Routes
 */

const PortfolioController = require("../controllers/portfolioController");
router.get("/Portfolios", PortfolioController.getAllPortfolio);
router.get("/SinglePortfolio/:id", PortfolioController.getSinglePortfolio);
router.post(
  "/NewPortfolio",
  Upload.single("url_img"),
  PortfolioController.addNewProtfolio
);
router.delete("/DeletePortfolio/:id", PortfolioController.DeletePorfolio);
router.patch("/UpdatePortfolio/:id", PortfolioController.UpdatePortfolio);

module.exports = router;
