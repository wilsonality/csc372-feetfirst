"use strict";
const { title } = require('process');
const raceModel = require('../models/raceModel');
const userModel = require('../models/userModel');

async function home(req, res) {
    const races = await raceModel.getAllRaces();

    res.render("home", {title: "Home", races: races});
}

async function loginPage(req, res){
    res.render("user/user-login", {title: "Login to Feet First"});
}

module.exports = {
    home,
    loginPage
}