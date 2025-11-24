"use strict";
const model = require('../models/raceModel');

async function createRace(req, res) {
    const { title, distance, description } = req.body;
    const authorID = req.session.user.id;
    if (title && distance && description) {
        try {
            const newProduct = await model.addRace(title, distance, description, authorID);
            // no need to render here since we are redirecting in the frontend
            res.status(201).json(newProduct);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required race fields!");
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
            const product = await model.getProductById(id);
            if (!product) {
                return res.status(404).send("Race not found.");
            }
            res.render("race-update", { /** TODO add race details to response */ });
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }
}

async function deleteRace(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const deletedCount = await model.deleteProduct(id);
            if (deletedCount > 0) {
                //no need to render here since we are redirecting in the frontend
                res.send(`Product with id ${id} deleted successfully.`);
            } else {
                res.status(404).send("Product not found.");
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
        // Render the products list view instead of sending JSONks
        res.render();
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchRaceById(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const race = await model.getRaceById(id);
            if (!race) {
                return res.render("error-page", {title: "404: Race Could Not Be Found.", msg: "This race could not be found."});
            }
            res.render("race-details", { race: race, title: `Race #${race.title}` });
            // res.json(product);
        } catch (err) {
            console.error(err);
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
    updateRace,
    updateForm,
    deleteRace,
    showSearch,
    searchRaces
};
