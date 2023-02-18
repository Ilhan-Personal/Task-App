const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const { prototype } = require("nodemailer/lib/dkim");

const app = express();
const port = "8000";
//app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter);
app.use(taskRouter);
app.set("view engine", "ejs");
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
