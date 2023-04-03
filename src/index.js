const express = require("express");
const mongoose = require("mongoose");
const route = require("./route/routes");
const app = express();

const cors= require("cors")

mongoose.set("strictQuery", true);


const cookieParser= require("cookie-parser");
app.use(express.json())
app.use(cookieParser());
app.use(cors());



mongoose.connect(
    "mongodb+srv://Pal25:Pallavi2552@cluster0.hihf8kq.mongodb.net/Social_Media_DB",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("DataBase Connected ");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/", route);

app.listen(3008, () => {
  console.log(`Server is running on port ${3008}`);
});