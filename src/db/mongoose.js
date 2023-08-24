const mongoose = require("mongoose");

mongoose
  .connect(
    'mongodb+srv://ilhansyed:devrev123@cluster0.daiu1xh.mongodb.net/task-manager-api?retryWrites=true&w=majority', 
    {
    useNewUrlParser: true,
    useUnifiedTopology:true
  })
  .then(console.log("mongo connected"));
