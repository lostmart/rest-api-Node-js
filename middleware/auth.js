import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const auth = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1]
		const decodedToken = jwt.verify(token, process.env.RANDOM_SECRET_WORD)
		// console.log(decodedToken)

		const userId = decodedToken.userId
		req.auth = {
			userId: userId,
		}
		next()
	} catch (error) {
		res.status(401).json({ error: "authentication error" })
	}
}

export default auth
