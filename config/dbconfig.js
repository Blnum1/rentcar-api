const sql = require('mssql');

const config = {
    user: "sa",
    password: "pp123pp456",
    server: "localhost",
    database: "RentCarDB",
    options: {
      encrypt: false, // ปิด SSL ถ้าไม่ใช้ Azure
      trustServerCertificate: true,
    },
};

const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log("✅ Connected to MSSQL");
    } catch (error) {
        console.error("❌ Database connection error:", error);
    }
};

module.exports = { sql, connectDB };
