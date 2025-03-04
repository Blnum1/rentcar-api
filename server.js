const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const app = express();
const { connectDB } = require("./config/dbconfig");


app.use(bodyParser.json());
app.use(cors());

connectDB();


app.use("/api/user",userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
