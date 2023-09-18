const mongoose = require("mongoose");
// const connectionString =
  // ;

// console.log("here");

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};


module.exports = connectDB