const request = require("supertest")
const express = require("express")

// Import your Express app
const app = express()

// The route you are testing
app.get("/", (req, res) => {
	res.status(200).json({ msg: "Welcome to my resp-API" })
})

// Test case for the route
describe("GET /", () => {
	it("should return a welcome message", async () => {
		const res = await request(app).get("/")

		// Check if the status code is 200
		expect(res.statusCode).toEqual(200)

		// Check if the response body contains the expected message
		expect(res.body).toHaveProperty("msg", "Welcome to my resp-API")
	})
})
