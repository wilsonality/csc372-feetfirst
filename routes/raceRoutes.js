"use strict";
const express = require("express");
const router = express.Router();
const raceController = require('../controllers/raceController');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        const raceId = req.params.id || 'temp';
        cb(null, `race_image${raceId}.${ext}`);
    }
});
const upload = multer({ storage: storage });

// fetch all races, no filter
router.get("/", raceController.fetchAllRaces);

// create a new race
router.post("/", upload.single('raceimage'), raceController.createRace);

// show create form
router.get("/create", raceController.createForm)

// get race by id
router.get("/id/:id", raceController.fetchRaceById);

// show update form
router.get("/id/:id/update", raceController.updateForm);

// update a race
router.post("/id/:id", raceController.updateRace);

// delete a race
router.get("/:id/delete", raceController.deleteRace);

module.exports = router;
