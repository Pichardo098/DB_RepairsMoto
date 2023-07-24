const express = require("express");
const router = express.Router();

const repairController = require("../controllers/repair.controller");

router
  .route("/")
  .get(repairController.findAllRepairs)
  .post(repairController.createRepair);

router
  .route("/:id")
  .get(repairController.findOneRepair)
  .patch(repairController.updateRepair)
  .delete(repairController.deleteRepair);

module.exports = router;
