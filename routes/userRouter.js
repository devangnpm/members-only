const express = require("express");
const { getAllUsers, addUserToDB } = require("../controllers/userController");
const userValidateInput = require("../userValidateInput");
const passport = require("passport");


// This is our userRouter that routes requests for our users
const userRouter = express.Router();

// This route will get all the users in our DB
userRouter.get("/", (req, res) =>
  res.send("<h1>This is the Index page bruh<h1/>")
);

// This route will render our signup page
userRouter.get("/signup", (req, res) => res.render("signup-form"));


// This route will post details to our DB and do it via our userController logic but before the express-validator will check if inputs are valid and sanitized
userRouter.post("/signup", userValidateInput(), addUserToDB);

// This is the login routes

// sending login page on get req
userRouter.get("/login", (req, res) => res.render("login"));

// route for login post req
userRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/welcome", // Redirect to the homepage on success
    failureRedirect: "/login", // Redirect back to login page on failure
  })
);

userRouter.get("/welcome", (req, res) => {
  if (req.isAuthenticated()) { // Check if the user is logged in
    // Pass the user data to the view
    res.status(200).render("welcome", { user: req.user });
  } else {
    // If the user is not authenticated, redirect to login
    res.redirect("/login");
  }
});

userRouter.get("/login/secretclub", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secretclub");
  }
});


module.exports = userRouter;
