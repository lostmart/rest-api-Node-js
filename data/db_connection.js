//DB connection
const sqlite3 = require("sqlite3").verbose()
let db = new sqlite3.Database("./dbFile.db", sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		return console.error(err.message)
	}
	console.log("Connected to the SQlite database.")
})

// DB CLOSE
db.close((err) => {
	if (err) {
		return console.error(err.message)
	}
	console.log("Database connection ended...")
})

module.exports = db
