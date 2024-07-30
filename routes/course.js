import express from "express"
const courseRouter = express.Router()
import { getAllCourses } from "../controllers/course.js"

courseRouter.get("/auth/allCourses", getAllCourses)

export default courseRouter
