import express from "express"
const router = express.Router()
import auth from "../middleware/auth.js"

// controller de user
import { signup, login, getAllUsers } from "../controllers/user.js"

// routes pour le functions
router.post("/auth/signup", signup)
router.post("/auth/login", login)
// protect endpoint
router.get("/auth/allUsers", auth, getAllUsers)

/*

api/auth/signup 


*/

export default router
