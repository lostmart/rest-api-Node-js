const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const ClassUser = require("../classes/User")
const validateUser = require("../models/user")

// db connection
const db = require("../data/db_connection")
// Inisialization of sql
let sql = null

require("dotenv").config()

exports.signup = (req, res) => {
	const { userName, email, password, birthYear } = req.body
	// new User with class User
	const newUser = new ClassUser(userName, email, password, birthYear)

	// user Schema validation
	try {
		validateUser(newUser)
		// Insert into SQLite database
	} catch (err) {
		console.error(err.message)
		return res.status(400).json({ msg: err.message })
	}

	// save data into DB
	try {
		// prepare ayyay from user Object
		const valuesArray = Object.values(newUser)
		// run query to insert data into DB
		sql =
			"INSERT INTO users(userName, email, password, birthYear) VALUES(?,?,?,?)"

		db.run(sql, valuesArray, (err) => {
			if (err) {
				new Error("Error saving new user ...")
				return res.status(400).json({ msg: err.message })
			}

			return res.status(201).json({
				msg: "User created",
				user: newUser,
			})
		})
	} catch (error) {
		return res.status(500).json({ error })
	}
}

// exports.signup = async (req, res, next) => {
// 	try {
// 		const hash = await bcrypt.hash(req.body.password, 10)
// 		user = new ClassUser(req.body.email, hash)
// 		/// check if user exists
// 		user
// 			? res.status(201).json({ message: "Utilisateur créé !", user })
// 			: new Error("No user crfeated")
// 	} catch (error) {
// 		res.status(500).json({ error: error.message })
// 	}
// }

exports.login = async (req, res) => {
	const { email, password } = req.body

	console.log(email, password)

	const userData = user
	// check
	if (!userData) {
		return res.status(401).json({ msg: "no user found" })
	}
	// check user's email
	if (userData.email !== email) {
		return res.status(401).json({ msg: "identifiant/mot de passe incorrecte" })
	}
	// valide password
	const valid = await bcrypt.compare(password, userData.password)
	if (!valid) {
		return res.status(401).json({ msg: "identifiant/mot de passe incorrecte" })
	} else {
		const token = jwt.sign(
			{
				email: userData.email,
			},
			// process.env.RANDOM_SECRET_WORD,
			"random_word",
			{ expiresIn: "24h" }
		)
		return res.status(200).json({ token })
	}
}
