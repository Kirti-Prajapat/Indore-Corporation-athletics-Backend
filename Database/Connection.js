const mongoose = require("mongoose");

const db = "mongodb+srv://CorporationAthletics:123@cluster0.ogjgc53.mongodb.net/CorporationAthletics?appName=Cluster0"

mongoose.connect(db, {
})
.then(() => console.log('MongoDB connection Start'))
.catch((error) => {
  console.log('Connection error:', error.message);
});