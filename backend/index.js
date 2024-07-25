require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const postRouter = require("./routes/postRouter")
const uploadRouter = require("./routes/uploadRouter")
const userRouter = require("./routes/userRouter")
const cors = require("cors")

const app = express();

app.use(cors())
app.use(express.json());

app.use("/api/feed", postRouter)
app.use("/api/upload", uploadRouter)
app.use("/api/user", userRouter)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`DB connected & Server started at ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
