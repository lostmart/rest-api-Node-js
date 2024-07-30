import db from "../data/db_connection.js"

export const getAllCourses = (req, res) => {
	db.serialize(() => {
		let courses = []
		const sql = "SELECT * FROM courses"
		db.all(sql, [], (err, rows) => {
			if (err) {
				res.status(400).json({
					msg: err.message,
				})
				return console.log(err.message)
			}
			rows.forEach((row) => {
				courses.push(row)
			})
			res.json({
				msg: "all good !!",
				courses,
			})
		})

		db.close((err) => {
			if (err) {
				console.error(err.message)
			}
			console.log("getAllCourses finished and closed the db connection.")
		})
	})
}
