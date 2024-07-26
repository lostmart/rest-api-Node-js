import util from "util"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import ClassUser from "../classes/User.js"
import { validateUser } from "../models/user.js"

/* avatar imports */
import { createAvatar } from "@dicebear/core"
import { lorelei } from "@dicebear/collection"

// db connection
import db from "../data/db_connection.js"
// Inisialization of sql
let sql = null

import dotenv from "dotenv"
dotenv.config()

export const signup = async (req, res) => {
	const { userName, email, password, birthYear } = req.body
	// new User with class User
	const newUser = new ClassUser(userName, email, password, birthYear)

	/*  avatar test */
	const avatar = createAvatar(lorelei, {
		seed: "John Doe",
		// ... other options
	})

	const svg = avatar.toString()

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
		// hash password
		newUser.password = await bcrypt.hash(req.body.password, 10)
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
			// get created user from DB
			sql = "SELECT * FROM users WHERE email = ? "
			let createdUser = {}
			db.all(sql, [email], (err, rows) => {
				if (err) return console.log(err.message)

				if (rows.length) {
					rows.forEach((row) => {
						createdUser.userName = row.userName
						createdUser.email = row.email
						createdUser.birthYear = row.birthYear
						createdUser.userId = row.id
						createdUser.avatarUri = svg
					})
				} else {
					return res.status(500).json({
						msg: "Something went wrong... please try again",
					})
				}
				return res.status(201).json({
					msg: "User created",
					user: createdUser,
				})
			})
		})
	} catch (error) {
		return res.status(500).json({ error })
	}
}

export const login = async (req, res) => {
	const { email, password } = req.body

	let foundUser = {}
	const sql = "SELECT * FROM users WHERE email = ? "

	try {
		// Promisify db.all -> creates a promise from the callback fn of SQLite3
		const dbAll = util.promisify(db.all).bind(db)

		const rows = await dbAll(sql, [email])

		// no user found ...
		if (!rows.length) {
			return res.status(400).json({ msg: "Wrong credentials ..." })
		} else {
			rows.forEach((row) => {
				foundUser.password = row.password
				foundUser.email = row.email
			})
			// console.log(email, password, foundUser.password)
		}

		const valid = await bcrypt.compare(password, foundUser.password)

		if (valid) {
			const token = jwt.sign(
				{
					email,
				},
				process.env.RANDOM_SECRET_WORD,
				{ expiresIn: "24h" }
			)
			return res.status(200).json({ token })
		} else {
			return res.status(400).json({ msg: "Wrong credentials ..." })
		}
	} catch (error) {
		console.log(error)
		res.status(500).json({ msg: "An error occurred." })
	}
}

export const getAllUsers = async (req, res) => {
	let sql = `SELECT * FROM users`
	let users = []

	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err
		}
		// at least one user found
		if (rows.length) {
			rows.forEach((row) => {
				const user = {
					userName: row.userName,
					id: row.id,
					email: row.email,
				}
				users.push(user)
			})
			return res.status(200).json({ users })
		} else {
			return res.status(200).json({ users, msg: "no users found!" })
		}
	})
}
