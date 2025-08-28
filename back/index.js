const express = require('express')
const mongoose = require("mongoose")
const config = require("./config")
const db = mongoose.connect(config.dbConnection)

var app = express()

const authRoutes = require("./routes/auth")

app.use(express.json())
app.use("/auth", authRoutes)

app.get('/', (req, res)=>{
    res.send("Hello world");
})

app.listen(config.port, ()=>{
    console.log("Server is listening on port ", config.port)
})


