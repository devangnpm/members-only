const express = require("express");
const {getAllUsers , addUserToDB} = require("../controllers/userController");

// This is our userRouter that routes requests for our users
const userRouter = express.Router();

// This route will get all the users in our DB
userRouter.get("/", (req,res) => res.send('<h1>This is the Index page bruh<h1/>'));

// This route will render our signup page 
userRouter.get("/signup", (req,res) => res.render("signup-form"));

// This route will post details to our DB and do it via our userController logic
userRouter.post("/signup", addUserToDB);



module.exports = userRouter;