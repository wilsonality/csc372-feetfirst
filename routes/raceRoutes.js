"use strict";
const express = require("express");
const router = express.Router();
const raceController = require('../controllers/raceController');

// fetch all races, no filter
router.get("/", raceController.fetchAllRaces);

// create a new race
router.post("/", raceController.createRace);

// get race by id
router.get("/:id", raceController.fetchRaceById);

// show update form for a race
router.post("/:id", raceController.updateForm);

// update a race
router.post("/:id", raceController.updateRace);

// delete a race
router.get("/:id/delete", raceController.deleteRace);

module.exports = router;
