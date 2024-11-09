const db = require("../db/queries");
const bcryptjs = require("bcryptjs");

// controller to get users from the db and send it to our routes

async function getAllUsers() {
  const users = await db.getAllUsersQuery();
  console.log("getAllusers" + users);
  return users;
}

async function addUserMessages(user_id, title,text) {
  await db.insertMessage(user_id, title, text);
}

async function checkUserExists(username) {
  const user = await db.getUser(username);
  return user;
}

async function getUserId(user_id) {
  const user = await db.getUserById(user_id); // Call the db query function
  return user;
}

async function addUserToDB(req, res) {
  // extract user details received from the signup form via req.body using destructuring
  const { first_name, last_name, username, password, isAdmin } = req.body;
  console.log(`this is the checkbox value : ${isAdmin}`);
  // wrapping in a try catch block to catch errors if adding the user to DB fails for some reason
  try {
    const admin = isAdmin === 'true';
    const hashed_password = await bcryptjs.hash(password, 10); //hashing out normal password using 10 salt rounds
    // now we add our user with details: first,last and email along with hashedpassword to our DB
    await db.addUserQuery(first_name, last_name, username, hashed_password, admin); // adding user to DB via the db query func definded in our queries
    res.status(201).send("User created successfully"); // send 201 success if no errors while creating user
  } catch (error) {
    console.log("Error adding user to database", error);
    res.status(500).send("Error creationg user");
  }
}


module.exports = { getAllUsers, addUserToDB,checkUserExists, getUserId, addUserMessages };
