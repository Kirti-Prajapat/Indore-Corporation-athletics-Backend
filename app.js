require("dotenv").config()
console.log("JWT SECRET from .env:", process.env.JWT_SECRET);

const express = require("express")
require("./Database/Connection")
const server = express()


const cors = require("cors")
const path = require("path");

server.use(cors())

server.use(express.json());


server.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
server.use("/athletics", require("./Routes/userRoute.js"));
server.use("/eventdata", require("./Routes/eventRouts.js"));
server.use("/adminverify", require("./Routes/adminRoute.js"));
server.use("/mediafile", require("./Routes/mediaRoute.js"));
server.use("/livevideo", require("./Routes/liveRoute.js"));


const PORT = process.env.PORT || 9900;
server.listen(PORT,()=>{
    console.log("server run at:http://localhost:9900")
})