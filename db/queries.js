const pool = require("./pool");

// Function to get all users from the database
async function getAllUsersQuery() {
    const { rows } = await pool.query("SELECT * FROM users"); // Assuming the table name is 'users'
    return rows;
}

// Function to insert a new user into the database
async function addUserQuery(first_name, last_name, username, hashedpassword) {
    await pool.query(
        'INSERT INTO users (first_name, last_name, username, hashedpassword) VALUES ($1, $2, $3, $4)',
        [first_name, last_name, username, hashedpassword]
    );
}

module.exports = {
    getAllUsersQuery,
    addUserQuery
};
