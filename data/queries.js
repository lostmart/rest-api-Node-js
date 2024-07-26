let sql

//DB connection

import sqlite3 from "sqlite3"
sqlite3.verbose()

const db = new sqlite3.Database(
	"./db_file.db",
	sqlite3.OPEN_READWRITE,
	(err) => {
		if (err) {
			return console.error(err.message)
		}
		console.log("Connected to the database.")
	}
)

// new user using User class model
// try {
// 	newUser = new User("bob", "baby@baby.net", "123@", 2004)
// 	if (!newUser) new Error("error creating user with the class", error)
// 	console.log(newUser)
// } catch (error) {
// 	console.log("no no. no User created ...", error)
// }

// Joi validation
// const minDate = new Date().getFullYear() - 18
// const userSchema = Joi.object({
// 	userName: Joi.string().min(3).required(),
// 	email: Joi.string().email().required(),
// 	password: Joi.string()
// 		.pattern(new RegExp("^[a-zA-Z0-9@#$%&]{3,30}$"))
// 		.required(),
// 	birthYear: Joi.number().integer().min(1924).max(minDate).required(),
// })

// const validateUser = (user) => {
// 	const { error } = userSchema.validate(user)
// 	if (error) {
// 		throw new Error(`Validation error: ${error.details[0].message}`)
// 	}
// }

// try {
// 	validateUser(newUser)
// 	// Insert into SQLite database
// 	console.log("now you can run the stuff")
// } catch (err) {
// 	console.error(err.message)
// }

// *** create table  ***
// sql = `CREATE TABLE IF NOT EXISTS Users (
//     id INTEGER PRIMARY KEY,
//     userName TEXT NOT NULL,
//     userImg TEXT NOT NULL,
//     email TEXT UNIQUE NOT NULL,
//     password TEXT NOT NULL,
//     birthYear INTEGER NOT NULL
// )`
// db.run(sql, (err) => handleError(err, "table created ..."))

// *** drop a table ***
// sql = "DROP TABLE users"
// db.run(sql, (err) => handleError(err, "table dropped"))

// *** insert data into the table ***
// sql = "INSERT INTO users(name, email, age) VALUES(?,?,?)"

// db.run(sql, ["tinna", "chelock@net.net", 23], (err) =>
// 	handleError(err, "user created")
// )

// *** update data  ***
// sql = "UPDATE users set first_name = ? WHERE id = ?"
// db.run(sql, ["Jack", 1], (err, rows) => {
//     if (err) return console.log(err.message)

// })

// *** delete data  ***
// check it exists first
sql = "SELECT * FROM users WHERE id = ?"
let userId = 1

db.all(sql, [userId], (err, rows) => {
	if (err) return console.log(err.message)
	if (!rows.length) return console.log("no user with that id found ...")

	sql = "DELETE from users WHERE id = ?"
	db.run(sql, [userId], (err) => {
		if (err) return console.log(err.message)
		console.log("user deleted !!! :o ")
	})
})

// *** query the db  ***
// sql = "SELECT * FROM users"
// db.all(sql, [], (err, rows) => {
// 	if (err) return console.log(err.message)
// 	rows.forEach((row) => {
// 		console.log(row)
// 	})
// })

// *** close the database connection  ***
// db.close()

function handleError(err, successMsg) {
	if (err) return console.log(err.message)
	else console.log(successMsg)
}
