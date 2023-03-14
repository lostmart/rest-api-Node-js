const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		post: { type: String },
		likes: { type: String },
		imageUrl: { type: String },
		etc: { type: Boolean },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('postSchema', postSchema)
