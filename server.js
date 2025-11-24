//server.js
"use strict";
const express = require("express");
const session = require("express-session");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({
    secret: 'todo-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// my middleware, not using google oauth
const auth = require('./middleware/auth');
app.use(auth.setUserLocals);

const appRoutes = require('./routes/appRoutes');
const raceRoutes = require('./routes/raceRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/', appRoutes);
app.use('/races', raceRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT + "!");
});
