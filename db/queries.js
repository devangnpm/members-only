const pool = require("./pool");

// Function to get all users from the database
async function getAllUsersQuery() {
    const { rows } = await pool.query("SELECT * FROM users"); 
    return rows;
}

// getUser function to retrieve a user by username
async function getUser(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return rows[0]; // Return the first row if a user is found, otherwise undefined
}

// getUserId func to get user id
async function getUserById(user_id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
    return rows[0];
  }
  

// Function to insert a new user into the database
async function addUserQuery(first_name, last_name, username, hashed_password, admin) {
    await pool.query(
        'INSERT INTO users (first_name, last_name, username, hashed_password, admin) VALUES ($1, $2, $3, $4, $5)',
        [first_name, last_name, username, hashed_password, admin]
    );
}

module.exports = {
    getAllUsersQuery,
    addUserQuery,
    getUser,
    getUserById
};
