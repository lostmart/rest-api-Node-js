//DB connection
import sqlite3 from "sqlite3"
sqlite3.verbose()

const db = new sqlite3.Database(
	"./data/db_file.db",
	sqlite3.OPEN_READWRITE,
	(err) => {
		if (err) {
			return console.error(err.message)
		}
		console.log("Connected to the database.")
	}
)

// DB CLOSE
// db.close((err) => {
// 	if (err) {
// 		return console.error(err.message)
// 	}
// 	console.log("Database connection ended...")
// })

export default db
