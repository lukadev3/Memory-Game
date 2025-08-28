const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose")
const config = require("./config")
const db = mongoose.connect(config.dbConnection)

var app = express()

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

const authRoutes = require("./routes/auth")
const gameRoutes = require("./routes/game") 

app.use(express.json())
app.use("/auth", authRoutes)
app.use("/game", gameRoutes) 

app.get('/', (req, res) => {
    res.send("Hello world");
})

app.listen(config.port, () => {
    console.log("Server is listening on port ", config.port)
})
