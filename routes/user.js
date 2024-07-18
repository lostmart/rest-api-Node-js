const express = require("express")
const router = express.Router()

// controller de user
const userController = require("../controllers/user.js")

// routes pour le functions
router.post("/auth/signup", userController.signup)
router.post("/auth/login", userController.login)

router.get("/users/test", (req, res) => {
	res.json({
		msg: "you've reached the users zone ... ",
	})
})

/*

api/auth/signup 


*/

module.exports = router
