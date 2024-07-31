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
	db.serialize(() => {})
	db.close((err) => {
		if (err) {
			console.error(err.message)
		}
		console.log("Seeded users and closed the database connection.")
	})
}

// *** drop a table ***
// sql = "DROP TABLE users"
// db.run(sql, (err) => handleError(err, "table dropped"))

seedCourses()
