const mongoose = require("mongoose");

const db = process.env.MONGO_URL

mongoose.connect(db, {
})
.then(() => console.log('MongoDB connection Start'))
.catch((error) => {
  console.log('Connection error:', error.message);
});