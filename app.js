const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const logger = require("./src/middleware/logger");
const linkRoutes = require("./src/routes/linkRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(logger); 
app.use(morgan("dev")); 


app.use("/api/links", linkRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});


mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/chotalink", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("DB connection error:", err));
