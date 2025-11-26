require("dotenv").config()
require("./Database/Connection")
const express = require("express")
const server = express()


const cors = require("cors")
server.use(cors())

server.use(express.json());
server.use("/athletics", require("./Routes/userRoute.js"));
server.use("/eventdata", require("./Routes/eventRouts.js"));
server.use("/adminverify", require("./Routes/adminRoute.js"));

const PORT = process.env.PORT || 9900;
server.listen(PORT,()=>{
    console.log("server run at:http://localhost:9900")
})