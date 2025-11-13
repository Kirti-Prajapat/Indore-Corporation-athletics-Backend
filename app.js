require("./Database/Connection")
const express = require("express")
const server = express()

const cors = require("cors")
server.use(cors())

server.use(express.json());
server.use("/athletics", require("./Routes/userRoute.js"));

server.listen(9900,()=>{
    console.log("server run at:http://localhost:9900")
})