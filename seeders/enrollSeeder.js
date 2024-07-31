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

export const seedEnrolls = () => {
	db.serialize(() => {})
	db.run(`CREATE TABLE IF NOT EXISTS enrolles (
		    id INTEGER PRIMARY KEY AUTOINCREMENT,
		    student_id INTEGER NOT NULL,
		    course_id INTEGER NOT NULL,
			enrollment_date TEXT NOT NULL,
            status TEXT NOT NULL,
			created_at TEXT NOT NULL,
			updated_at TEXT NOT NULL

		)`)
	const insert = db.prepare(
		`INSERT INTO
				enrolles (student_id, course_id, enrollment_date, status, created_at, updated_at) 
				VALUES (?, ?, ?, ?, ?, ?)`
	)
}
