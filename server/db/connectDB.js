const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Database connected! 🧨");
  });

  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/Ilm`);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

module.exports = connectDB;
