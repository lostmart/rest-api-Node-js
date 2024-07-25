const sqlite3 = require("sqlite3").verbose()
let sql

// connect to DB
let db = new sqlite3.Database(
	"./mydatabase.db",
	sqlite3.OPEN_READWRITE,
	(err) => handleError(err, "all good and connected")
)

// *** create table  ***
// sql = `CREATE TABLE Users (
//     id INTEGER PRIMARY KEY,
//     name TEXT NOT NULL,
//     email TEXT UNIQUE NOT NULL,
//     age INTEGER CHECK(age >= 18)
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
sql = sql = "SELECT * FROM users WHERE id = ?"
db.all(sql, [5], (err, rows) => {
	if (err) return console.log(err.message)
	if (!rows.length) return console.log("no user with that id found ...")

	sql = "DELETE from users WHERE id = ?"
	db.run(sql, [5], (err) => {
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
db.close()

function handleError(err, successMsg) {
	if (err) return console.log(err.message)
	else console.log(successMsg)
}
