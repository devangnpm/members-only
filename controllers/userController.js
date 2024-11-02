const db = require("../db/queries");
const bcryptjs = require("bcryptjs");

// controller to get users from the db and send it to our routes

async function getAllUsers() {
  const users = await db.getAllUsersQuery();
  console.log("getAllusers" + users);
  return users;
}

async function addUserToDB(req, res) {
  // extract user details received from the signup form via req.body
  const { first_name, last_name, username, password } = req.body;
  // wrapping in a try catch block to catch errors if adding the user to DB fails for some reason
  try {
    const hashedpassword = await bcryptjs.hash(password, 10); //hashing out normal password using 10 salt rounds
    // now we add our user with details: first,last and email along with hashedpassword to our DB
    await db.addUserToDB(first_name,last_name,username,hashedpassword); // adding user to DB via the db query func definded in our queries
    res.status(201).send("Error creating user");
  } catch (error) {
    console.log("Error adding user to database", error);
    res.status(500).send("Error creationg user");
  }
}

module.exports = { getAllUsers, addUserToDB };