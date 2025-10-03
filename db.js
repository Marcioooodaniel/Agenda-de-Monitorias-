const mysql = require("mysql2/promise");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "senha",
  database: "sua_base"
});
module.exports = db;