const mysql = require("mysql2");

// creating connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node_complete",
  password: "",
});

module.exports = pool.promise();
