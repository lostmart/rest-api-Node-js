const path = require("path")
const express = require("express")

const userRouter = require("./routes/user.js")
const sauceRouter = require("./routes/sauce.js")

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

// NOT USED
//const mongoConnection = process.env.CONEXTION_MONGO
// const mongoConnection = process.env.mongoConnection
// //connexion à la BDD
// mongoose.set("strictQuery", true)
// mongoose
// 	.connect(mongoConnection)
// 	.then(() => console.log("MongoDB  ok "))
// 	.catch(() => console.log("Connexion à MongoDB échouée !"))
//middleware qui permet d'accéder aux requêtes qui contiennent du json

// welcome message
app.get("/", (req, res, next) => {
	res.status(200).json({
		msg: "Welcome to my resp-API, offlineMode On 📴 NO DB CONNECTIONs",
	})
	next()
})

// utiliser le router
app.use("/api/", userRouter)

// sauce le router
app.use("/api/", sauceRouter)

app.use("/images", express.static(path.join(__dirname, "images")))

module.exports = app
