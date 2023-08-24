const express = require("express");
const path = require('path')
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.static(path.join(__dirname,'../public')))
app.use(cookieParser());
app.set('views', path.join(__dirname, '../views'));

const port = "8000";
//app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter);
app.use(taskRouter);
app.set("view engine", "ejs");
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
