const express = require("express");
const engine = require("ejs-mate");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const { prototype } = require("nodemailer/lib/dkim");

const app = express();
const port = "8000";
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter);
app.use(taskRouter);
app.engine("ejs", engine);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
