// /seeders/userSeeder.js
import courses from "./seedData/coursesSeedData.json" assert { type: "json" }
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

export const seedCourses = () => {
	db.serialize(() => {
		db.run(`CREATE TABLE IF NOT EXISTS courses (
		    id INTEGER PRIMARY KEY AUTOINCREMENT,
		    title TEXT NOT NULL,
		    description TEXT NOT NULL,
			credits INTEGER NOT NULL,
			created_at TEXT NOT NULL,
			updated_at TEXT NOT NULL

		)`)
		const insert = db.prepare(
			`INSERT INTO
				courses (title, description, credits, created_at, updated_at) 
				VALUES (?, ?, ?, ?, ?)`
		)
		courses.forEach((course) => {
			insert.run(
				course.title,
				course.title,
				course.credits,
				course.created_at,
				course.updated_at
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

// *** drop a table ***
// const sql = "DROP TABLE courses"
// db.run(sql, (err) => {
// 	if (err) return console.log(err.message)
// 	console.log("table deleted ...")
// })

seedCourses()
