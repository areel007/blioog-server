const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const upload = require('./utils/multer')

const app = express();

app.use(cors());

// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// routes
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/blog", upload.single('imageUrl'), postsRoute);

module.exports = app;
