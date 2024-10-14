import request from "supertest"
import app from "../app.js"

describe("POST /USERS", () => {
	describe("given a email and a password", () => {
		//should save username and password to db
		// should response with a json object containing the new user's id
		test("should respond with a 200 status code", async () => {
			const response = await request(app).post("/api/auth/signup").send({
				email: "test@test.net",
				password: "123ab",
			})
			expect(response.statusCode).toBe(200)
		})
		it("should specify json content in the header", async () => {
			const response = await request(app).post("/api/auth/signup").send({
				email: "test@test.net",
				password: "123ab",
			})
			expect(response.headers["content-type"]).toEqual(
				expect.stringContaining("json")
			)
		})
	})
	describe("missing email or password", () => {
		// should respond with a status code of 400
		it("should respond with a 400 status code", async () => {
			const response = await request(app).post("/api/auth/signup").send({
				email: "test@test.net",
			})
			expect(response.statusCode).toBe(400)
		})
	})
})
