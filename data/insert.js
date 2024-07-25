const sqlite3 = require("sqlite3").verbose()
let sql

// connect to DB
let db = new sqlite3.Database(
	"./mydatabase.db",
	sqlite3.OPEN_READWRITE,
	(err) => handleError(err, "all good and connected")
)

// *** create table  ***
// sql =
// 	"CREATE TABLE users(id INTEGER PRIMARY KEY, first_name, last_name, username, email )"
// db.run(sql, (err) => handleError(err, "table created ..."))

// *** drop a table ***
// sql = "DROP TABLE users"
// db.run(sql, (err) => handleError(err, "table dropped"))

// *** insert data into the table ***
// sql =
// 	"INSERT INTO users(first_name, last_name, username, email) VALUES(?,?,?,?)"

// db.run(sql, ["bob", "bonollon", "booolobohb", "bob@net.net"], (err) =>
// 	handleError(err, "user created")
// )

// *** update data  ***
// sql = "UPDATE users set first_name = ? WHERE id = ?"
// db.run(sql, ["Jack", 1], (err, rows) => {
//     if (err) return console.log(err.message)

// })

// *** delete data  ***
sql = "DELETE from users WHERE id = ?"
db.run(sql, [1], (err, rows) => {
	if (err) return console.log(err.message)
	console.log("user deleted !!! 😮")
})

// *** query the db  ***
sql = "SELECT * FROM users"
db.all(sql, [], (err, rows) => {
	if (err) return console.log(err.message)
	rows.forEach((row) => {
		console.log(row)
	})
})

// *** close the database connection  ***
db.close()

function handleError(err, successMsg) {
	if (err) return console.log(err.message)
	else console.log(successMsg)
}
