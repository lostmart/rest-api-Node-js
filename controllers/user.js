const bcrypt = require("bcrypt")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.signup = (req, res, next) => {
	const { email, password } = req.body
	// check empty
	if (!email || !password) {
		return res.sendStatus(400)
	}

	res.json({ msg: "all good !!" })

	// bcrypt
	// 	.hash(req.body.password, 10)
	// 	.then((hash) => {
	// 		const user = new User({
	// 			email: req.body.email,
	// 			password: hash,
	// 		})
	// 		user
	// 			.save()
	// 			.then(() => res.status(201).json({ message: "Utilisateur créé !" }))
	// 			.catch((error) => res.status(400).json({ error }))
	// 	})
	// 	.catch((error) => res.status(500).json({ error }))
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
