import Joi from "joi"
const minDate = new Date().getFullYear() - 18

const userSchema = Joi.object({
	userName: Joi.string().min(3).required(),
	userImg: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string()
		.pattern(new RegExp("^[a-zA-Z0-9@#$%&]{3,30}$"))
		.required(),
	birthYear: Joi.number().integer().min(1924).max(minDate).required(),
})
export const validateUser = (user) => {
	const { error } = userSchema.validate(user)
	if (error) {
		throw new Error(`Validation error: ${error.details[0].message}`)
	}
}

// Usage example
// const newUser = { name: "Alice", email: "alice@example.com", age: 25 }

// const userSchema = new mongoose.Schema(
// 	{
// 		email: { type: String, required: true, unique: true },
// 		password: { type: String, required: true },
// 	},
// 	{ timestamps: true }
// )

// userSchema.plugin(uniqueValidator)

// module.exports = mongoose.model('userSchema', userSchema)
