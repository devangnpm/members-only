const express = require("express");
const {
  getAllUsers,
  addUserToDB,
  addUserMessages,
} = require("../controllers/userController");
const userValidateInput = require("../userValidateInput");
const passport = require("passport");

// This is our userRouter that routes requests for our users
const userRouter = express.Router();

// This route will render our signup page
userRouter.get("/signup", (req, res) => res.render("signup-form"));

userRouter.get("/index", (req, res) => {
  if (req.isAuthenticated() && req.user.admin === true) {
    const user = req.user;
    console.log("This is the index route: " + user);

    // Render the index view, passing `admin` status and user data
    return res.render("index", { admin: true, user });
  }

  // Render the index view without `admin` status if not authenticated or not an admin
  res.render("index", { admin: false });
});



// This route will post details to our DB and do it via our userController logic but before the express-validator will check if inputs are valid and sanitized
userRouter.post("/signup", userValidateInput(), addUserToDB);

// This is the login routes

// sending login page on get req
userRouter.get("/login", (req, res) => res.render("login"));

// route for login post req
userRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile", // Redirect to the homepage on success
    failureRedirect: "/login", // Redirect back to login page on failure
  })
);

userRouter.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    // Check if the user is logged in
    // Pass the user data to the view
    res.status(200).render("profile", { user: req.user });
  } else {
    // If the user is not authenticated, redirect to login
    res.redirect("/login");
  }
});

// route for our secretclub only people who enter correct code will activate membership
userRouter.get("/login/secretclub", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secretclub");
  }
});

// create new message route
userRouter.post("/messages", (req, res) => {
  if (req.user) {
    // if user is loggedin passport will create a user object in request for every request
    const { title , text } = req.body;
    const user_id = req.user.user_id;
    console.log(`logging message request: ${user_id} ${title} ${text}`);
    addUserMessages(user_id,title,text);
  }
});

module.exports = userRouter;
