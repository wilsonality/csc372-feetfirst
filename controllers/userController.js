"use strict";
const model = require('../models/userModel');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

async function loginUser(req, res){
    const {username, password} = req.body;

    if (!username || !password) {
        res.status(400).send("Username and password are required");
        return;
    }

    try{
        // fetch user from our db, validate log in details, then add user to session
        const user = await model.getUserByUsername(username);

        if (!user){
            res.status(401).send("Could not find user with username.");
            return;
        }
        // check the password
        const validPass = await model.verifyPassword(password, user.password);

        if (!validPass){
            res.status(401).send("Password incorrect");
            return;
        }

        req.session.user = {
            id: user.id,
            username: user.username,
            role: user.role
        }
        res.status(200).render("home", {
            user: user,
            title: `Races for ${user.username}`
        });

    }
    catch(err){
        console.error(err);
        res.render("error-page", {msg : err, title: "500: Server Error."})
    }
}

async function logoutUser(req, res){
    req.session.destroy();
    res.redirect("/home");
}

async function createUser(req, res){
    const {username, password} = req.body;

    try{
        // hashing password x8 before we send to db
        const saltRounds = 8;
        const hashedPass = await bcrypt.hash(password, saltRounds);
        
        // Create user first
        const newUser = await model.addUser(username, hashedPass);
        
        // If image uploaded, rename and update user with image path
        if (req.file) {
            const ext = req.file.originalname.split('.').pop();
            const oldPath = req.file.path;
            const newFilename = `user_profile${newUser.id}.${ext}`;
            const newPath = path.join('public/uploads', newFilename);
            
            // Rename file from temp to actual user ID
            fs.renameSync(oldPath, newPath);
            
            const profileImage = `/uploads/${newFilename}`;
            await model.updateProfileImage(newUser.id, profileImage);
            newUser.profileImage = profileImage;
        }
        
        res.status(201).render("user/user-details", {
            user: newUser,
            title: `${newUser.username}'s profile`
        });
    }
    catch(err){
        if (err.code === '23505') {
            res.status(400).render("error-page", {msg: "Username already exists", title: "Registration Failed"});
        } else {
            res.render("error-page", {msg: err, title: "500: Server Error."});
        }
    }
}

async function createForm(req, res){
    res.render("user/user-register", {title: "Register for Feet First"});
}

async function fetchUserByID(req, res){
    const id = req.params.id;
    if (id) {
        try {
            const user = await model.getUserById(id);
            if (!user) {
                return res.render("error-page", {title: "404: User Could Not Be Found.", msg: `This user with ID ${id} could not be found.`});
            }
            res.render("user/user-details", { user: user, title: `View ${user.username}'s Profile` });
            // res.json(product);
        } catch (err) {
            console.error(err);
            res.render("error-page", {title: "500: Server Error.", msg: err});
        }
    } else {
        res.status(400).send("Missing required id param!");
        res.render("error-page", {msg : err, title: "400: Error displaying user."})
    }
}

async function fetchAllUsers(req, res){
    try{
        const users = await model.getAllUsers();
        res.render("user/users-list", {users: users, title: "All Users"});
    }
    catch(err){
        console.error(err);
        res.render("error-page", {msg : err, title: "500: Server Error."})
    }
}

async function updateUser(req, res){
    const userId = req.params.id;
    const {bio, favDist, shoes } = req.body;
    const profileImage = req.file ? `/uploads/user_profile${userId}.${req.file.originalname.split('.').pop()}` : null;

    try{
        const user = await model.updateUser(userId, bio, favDist, shoes, profileImage);
        res.status(200).render("user/user-details", { user: user, title: `${user.username}'s profile`});
    } catch (err){
        console.error(err);
        res.render("error-page", {msg : err, title: "500: Server Error."})
    }
}

async function updateForm(req, res){
    const userId = req.params.id;
    try {
        const user = await model.getUserById(userId);
        if (!user) {
            return res.render("error-page", {title: "404: User Not Found", msg: "User not found"});
        }
        res.render("user/user-update", {user: user, title: "Update Profile"});
    } catch (err) {
        console.error(err);
        res.render("error-page", {msg: err, title: "500: Server Error."});
    }
}

async function deleteUser(req, res){

}


module.exports = {
    loginUser,
    logoutUser,
    createUser,
    createForm,
    fetchUserByID,
    updateUser,
    fetchAllUsers,
    updateForm,
    deleteUser
}