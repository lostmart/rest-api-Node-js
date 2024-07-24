const path = require("path")
const express = require("express")

const userRouter = require("./routes/user.js")

const cors = require("cors")
const app = express()

// middleware
app.use(express.json())
app.use(cors())

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

// welcome message
app.get("/", (req, res, next) => {
	res.status(200).json({
		msg: "Welcome to my resp-API, offlineMode On 📴 NO DB CONNECTIONs",
	})
	next()
})

// utiliser le router
app.use("/api/", userRouter)

app.use("/images", express.static(path.join(__dirname, "images")))

module.exports = app
