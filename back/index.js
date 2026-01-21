const express = require("express");
const cors = require("cors");
const connectDb = require("./db/db");
const route = require("./routes/routes");
const authRoute = require("./routes/authRoute");

const app = express();
app.use(express.json());
app.use(cors())
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", route);
app.use("/api", authRoute);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
});
