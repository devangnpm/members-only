const express = require("express");
const userRouter = require("./routes/userRouter");
const path = require('path');
const {checkUserExists,getUserId }  = require("./controllers/userController");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const passport = require("passport");
const bcryptjs = require("bcryptjs");



const app = express();

//parsing incoming form data 
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


// Set up sessions (needed for persistent login sessions)
app.use(session({
  secret: 'catsaregood',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", userRouter);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });


// using the Passport local strategy here

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {

      const user = await checkUserExists(username);

      console.log(user);
      
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcryptjs.compare(password, user.hashed_password);

      if (!match) {
        console.log("incorrect password")
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

/* Passport needs to save something to identify the user across HTTP requests (since HTTP is stateless) so we save the user id 
in the session object to minimize data storage and identify the user */

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (user_id, done) => {
  try {
    const user = await getUserId(user_id);
    done(null, user);
  } catch(err) {
    done(err);
  }
});