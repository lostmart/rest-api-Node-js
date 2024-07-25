//DB connection
const sqlite3 = require("sqlite3").verbose()
let db = new sqlite3.Database(
	"./data/dbFile.db",
	sqlite3.OPEN_READWRITE,
	(err) => {
		if (err) {
			return console.error(err.message)
		}
		console.log("Connected to the dbFile.db SQlite database.")
	}
)

// DB CLOSE
db.close((err) => {
	if (err) {
		return console.error(err.message)
	}
	console.log("Close the database connection.")
})


module.exports = db
