"use strict";
const { title } = require('process');
const model = require('../models/raceModel');
const userModel = require('../models/userModel');

async function createRace(req, res) {
    if (!req.session || !req.session.user) {
        return res.status(401).redirect("/login");
    }
    
    const { title, distance, description, date } = req.body;
    const authorID = req.session.user.id;
    if (title && distance && description) {
        try {
            const newRace = await model.addRace(title, distance, description, authorID, date);
            // handle race image if uploaded
            if (req.file) {
                const fs = require('fs');
                const path = require('path');
                const ext = req.file.originalname.split('.').pop();
                const oldPath = req.file.path;
                const newFilename = `race_image${newRace.id}.${ext}`;
                const newPath = path.join('public/uploads', newFilename);
                
                // Rename file from temp to actual race ID
                fs.renameSync(oldPath, newPath);
                
                const raceimage = `/uploads/${newFilename}`;
                await model.updateRaceImage(newRace.id, raceimage);
            }
            
            res.redirect(`/races/id/${newRace.id}`);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required race fields!");
    }
}

async function createForm(req, res) {
    if (req.session.user){
        res.render("race/race-create", { user: req.session.user , title: "Post a Race"});
    }
    else {
        res.redirect("/login");
    }
}

// todo createForm

// TODO updateRace, updateForm

async function updateRace(req, res) {
    const id = req.params.id;
    const { title, distance, description } = req.body;
    if (id && title && distance && description) {
        try {
            const updatedProduct = await model.updateRace(id, title, distance, description);
            // no need to render here since we are redirecting in the frontend
            res.status(200).json(updatedProduct);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required race fields!");
    }
}

async function updateForm(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const race = await model.getRaceById(id);
            if (!race) {
                return res.status(404).send("Race not found. :/");
            }
            res.render("race-update", {title: "Update Race Details", race: race });
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param.");
    }
}

async function deleteRace(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const deleted = await model.deleteRace(id);
            if (deleted) {
                res.redirect("/races");
            } else {
                res.status(404).send("Race could not be deleted.");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }
}

async function fetchAllRaces(req, res) {
    try {
        const races = await model.getAllRaces();
        res.render("race/races-list", { races: races, title: "All Races" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchRaceById(req, res) {
    console.log("fetchRaceById called with id:", req.params.id);
    const id = req.params.id;
    if (id) {
        try {
            const race = await model.getRaceById(id);
            console.log("Race image path:", race.raceimage);
            const author = await userModel.getUserById(race.authorid);
            if (!race) {
                return res.render("error-page", {title: "404: Race Could Not Be Found.", msg: "This race could not be found."});
            }
            res.render("race/race-details", { race: race, title: `Race #${race.title}`, author: author });
        } catch (err) {
            console.error("Error in fetchRaceById:", err);
            res.render("error-page", {title: "500: Server Error.", msg: err});
        }
    } else {
        res.status(400).send("Missing required id param!");
    }
}

async function showSearch(req, res){
    res.render("search-races", {title: "Search Feet First"});
}

/** ask api for rows of races, does not return a new page
 */
async function searchRaces(req, res){
    try{
        const {title, distance, username} = req.body;
        const races = await model.searchRaces(title, distance, username);
        res.render("search-races", {races: races, title: "Search Feet First"});
    }
    catch(err){
        res.render("error-page", {title: "500: Server Error.", msg: err});
    }
}


module.exports = {
    fetchAllRaces,
    fetchRaceById,
    createRace,
    createForm,
    updateRace,
    updateForm,
    deleteRace,
    showSearch,
    searchRaces
};
