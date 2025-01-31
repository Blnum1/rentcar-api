const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sql = require("mssql");
const userRoutes = require("./routes/userRoutes"); // ✅ นำเข้า routes

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// ตั้งค่าการเชื่อมต่อฐานข้อมูล MSSQL
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

// เชื่อมต่อฐานข้อมูล
sql.connect(config)
  .then(() => console.log("✅ Connected to MSSQL"))
  .catch((err) => console.error("❌ Database connection error:", err));

// ใช้ Routes ที่สร้างไว้
app.use("/api/users", userRoutes);

// รันเซิร์ฟเวอร์ที่ Port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
