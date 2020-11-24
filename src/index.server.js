const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");

// Environment config
env.config();
const app = express();
const PORT = process.env.PORT || 5000;

// routes
const authRoutes = require("./routes/auth.router");
const adminRoutes = require("./routes/admin/auth.router");
const categoryRoutes = require("./routes/category.route");

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.a8qhh.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Database connected!!!");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
