const path = require("path")
const express = require("express")
require("dotenv").config()

const userRouter = require("./routes/user.js")
const sauceRouter = require("./routes/sauce.js")

const cors = require("cors")
const connectDB = require("./config/db.js")
const app = express()

// middleware
app.use(express.json())
// app.use(cors())

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	)
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	)
	next()
})

connectDB()

// welcome message
app.get("/", (req, res, next) => {
	res.status(200).json({
		msg: "Welcome to my resp-API",
	})
	next()
})

// user routes
app.use("/api/", userRouter)

// sauce le router
app.use("/api/", sauceRouter)

app.use("/images", express.static(path.join(__dirname, "images")))

module.exports = app
