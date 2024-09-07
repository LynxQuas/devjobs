const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");

router.post("/", jobController.createJob); // create
router.delete("/:id", jobController.deleteJob); // delete
router.get("/", jobController.getAllJobs); // read
router.get("/:id", jobController.getJobDetails); // read/
router.put("/:id", jobController.updateJob); // read/

module.exports = router;
