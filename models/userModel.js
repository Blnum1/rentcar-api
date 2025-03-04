const { sql } = require("../config/dbconfig");

const createUser = async (username, password) => {
    try {
        await sql.query`INSERT INTO Users (username, password) VALUES (${username}, ${password})`;
    } catch (error) {
        console.error("❌ SQL Insert Error:", error);
        throw error;
    }
};

const getUser = async (username) => {
    try {
        const result = await sql.query`SELECT * FROM Users WHERE username = ${username}`;
        return result.recordset[0] || null;
    } catch (error) {
        console.error("❌ SQL Select Error:", error);
        throw error;
    }
};

module.exports = { createUser, getUser };
