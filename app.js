const express = require("express");
const userRouter = require("./routes/userRouter");


const app = express();

//parsing incoming form data 
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", userRouter);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });