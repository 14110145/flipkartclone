const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const path = require("path");
const cors = require("cors");

// Environment config
env.config();
const app = express();
const PORT = process.env.PORT || 5000;

// routes
const authRoutes = require("./routes/auth.route");
const adminRoutes = require("./routes/admin/auth.route");
const categoryRoutes = require("./routes/category.route");
const productRoutes = require("./routes/product.route");
const cartRoutes = require("./routes/cart.route");
const initialDataRoutes = require("./routes/admin/initialData");
const pageRoutes = require("./routes/admin/page.route");
const addressRoutes = require("./routes/address.route");
const orderRoutes = require("./routes/order.route");
const adminOrder = require("./routes/admin/order.route");

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.a8qhh.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Database connected!!!");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", initialDataRoutes);
app.use("/api", pageRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", adminOrder);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
