const mongoose = require("mongoose");
const valid = require("validator");
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
});
const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => valid.isEmail(v),
      message: (props) => `${props.value} is not an email`,
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 6,

    validate: {
      validator: (v) => !v.includes("password"),
      message: (props) => `${props.value} is not valid`,
    },
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
const t1 = new User({
  name: "ilhan",
  email: "ilhan@gmail.com",
  password: "shabana",
});
// mongoose wouldnt let us create an instance if we didnt pass the appropriate datatype
// save method returns a promise
t1.save()
  .then(() => {
    console.log(t1);
  })
  .catch((error) => {
    console.log(error);
  });
