const sql = require("mssql");

const createUser = async (username, password) => {
  return sql.query`INSERT INTO Users (username, password) VALUES (${username}, ${password})`;
};

const getUser = async (username) => {
  const result = await sql.query`SELECT * FROM Users WHERE username = ${username}`;
  return result.recordset[0] || null;
};

// ✅ แก้ไขให้ export ออกมา
module.exports = { createUser, getUser };
