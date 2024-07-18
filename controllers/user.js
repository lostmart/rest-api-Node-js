const bcrypt = require("bcrypt")
// const User = require("../models/user")  -> from mongoose
const ClassUser = require("../classes/User")
const jwt = require("jsonwebtoken")

require("dotenv").config()

exports.signup = async (req, res, next) => {
	try {
		const hash = await bcrypt.hash(req.body.password, 10)
		const user = new ClassUser({
			email: req.body.email,
			password: hash,
		})
		user
			? res.status(201).json({ message: "Utilisateur créé !" })
			: new Error("No user created ...")
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

exports.login = async (req, res, next) => {
	const { email, password } = req.body

	const foundUser = await User.findOne({ email })
	// valide email
	if (!foundUser) {
		res.status(401).json({ msg: "identifiant/mot de passe incorrecte" })
	} else {
		// valide password
		const valid = await bcrypt.compare(password, foundUser.password)
		if (!valid) {
			res.status(401).json({ msg: "identifiant/mot de passe incorrecte" })
		} else {
			const token = jwt.sign(
				{
					userId: foundUser._id,
				},
				process.env.RANDOM_SECRET_WORD,
				{ expiresIn: "24h" }
			)
			res.status(200).json({ userId: foundUser._id, token })
		}
	}
}
