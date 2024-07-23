const bcrypt = require("bcrypt")
// const User = require("../models/user")  -> from mongoose
const ClassUser = require("../classes/User")
const jwt = require("jsonwebtoken")

require("dotenv").config()

user = null

exports.signup = async (req, res, next) => {
	try {
		const hash = await bcrypt.hash(req.body.password, 10)
		user = new ClassUser(req.body.email, hash)
		/// check if user exists
		user
			? res.status(201).json({ message: "Utilisateur créé !", user })
			: new Error("No user crfeated")
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

exports.login = async (req, res) => {
	const { email, password } = req.body

	console.log(email, password);

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
				userId: userData.email,
			},
				// process.env.RANDOM_SECRET_WORD,
			"random_word",
			{ expiresIn: "24h" }
		)
		return res.status(200).json({ token })
	}
		
}
