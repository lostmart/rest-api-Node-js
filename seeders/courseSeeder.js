// /seeders/userSeeder.js
import sqlite3 from require("sqlite3")
    sqlite3.verbose()
const db = new sqlite3.Database("./example.db")

const seedUsers = () => {
	db.serialize(() => {
		db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE
        )`)

		const insert = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)")
		insert.run("John Doe", "john.doe@example.com")
		insert.run("Jane Smith", "jane.smith@example.com")
		insert.run("Alice Johnson", "alice.johnson@example.com")
		insert.finalize()
	})

	db.close((err) => {
		if (err) {
			console.error(err.message)
		}
		console.log("Seeded users and closed the database connection.")
	})
}

module.exports = seedUsers
