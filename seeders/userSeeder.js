import users from "./seedData/usersSeedData.json" assert { type: "json" }
import sqlite3 from "sqlite3"
sqlite3.verbose()
const db = new sqlite3.Database(
	"../data/db_file.db",
	sqlite3.OPEN_READWRITE,
	(err) => {
		if (err) return console.log(err.message)
		console.log("you're in ")
	}
)

export const seedUsers = () => {
	db.serialize(() => {
		db.run(`CREATE TABLE IF NOT EXISTS users (
		    id INTEGER PRIMARY KEY AUTOINCREMENT,
		    userName TEXT NOT NULL,
			userImg TEXT NOT NULL,		
		    email TEXT UNIQUE NOT NULL,
			birthYear INTEGER NOT NULL,
			created_at TEXT NOT NULL,
			updated_at TEXT NOT NULL,
			contacts TEXT,
			enrolled TEXT
		)`)
		const insert = db.prepare(
			`INSERT INTO
				users (userName, userImg, email, birthYear, created_at, updated_at, contacts, enrolled) 
				VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
		)

		users.forEach((user) => {
			const externalImg = `https://api.dicebear.com/9.x/adventurer/svg?seed=${user.userName}`
			insert.run(
				user.userName,
				externalImg,
				user.email,
				user.birthYear,
				user.created_at,
				user.updated_at,
				"",
				""
			)
		})

		insert.finalize()
	})
	db.close((err) => {
		if (err) {
			console.error(err.message)
		}
		console.log("Seeded users and closed the database connection.")
	})
}

// *** ❗ drop a table ❗ ***
const sql = "DROP TABLE users"
// db.run(sql, (err) => {
// 	if (err) return console.log(err.message)
// 	console.log("users table deleted ...")
// })

seedUsers()
