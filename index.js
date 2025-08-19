const express = require("express");
const cors = require("cors");
const blogRoutes = require("./routes/blog.route");
const subscriberRoutes = require("./routes/subscriber.route");

require("dotenv").config();

const { connect } = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/", blogRoutes);
app.use("/", subscriberRoutes);

// Connect DB and start server
const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  try {
    await connect();
  } catch (error) {
    console.error("❌ DB connection failed:", error);
  }

  console.log(`🚀 Server running on port ${PORT}`);
});
