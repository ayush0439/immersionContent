const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const vehicleRoutes = require("./routes/vehicleRoutes");

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
const path = require("path");

// Serve frontend from 'public' folder
app.use(express.static(path.join(__dirname, "public")));


// Routes
app.use("/api/vehicles", vehicleRoutes);

// Connect DB & Start Server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
})
.catch(err => console.error(err));
