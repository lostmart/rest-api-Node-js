import path from "path"
import express from "express"
import { dirname } from "path"
import { fileURLToPath } from "url"

import userRouter from "./routes/user.js"

import cors from "cors"
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
		msg: "Welcome to my resp-API, offlineMode On 📴 sqlite3 DB",
	})
	next()
})

// utiliser le router
app.use("/api/", userRouter)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use("/images", express.static(path.join(__dirname, "images")))

export default app
