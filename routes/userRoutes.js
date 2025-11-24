"use strict";
const userController = require('../controllers/userController');
const express = require("express");
// handle profile photos
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        // For registration, use temp name; will be renamed after user creation
        const userId = req.params.id || 'temp';
        cb(null, `user_profile${userId}.${ext}`);
    }
});
const upload = multer({ storage: storage });

const router = express.Router();


// urls base from "/users"

// login/authentication
router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);

// profile creation
router.get("/register", userController.createForm);
router.post("/", upload.single('profileImage'),userController.createUser);
// updating, deleting
router.post("/:id", upload.single('profileImage'), userController.updateUser);
router.get("/:id/update", userController.updateForm);
router.delete("/:id", userController.deleteUser);

router.get("/", userController.fetchAllUsers);
router.get("/:id", userController.fetchUserByID);


module.exports = router;