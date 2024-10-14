module.exports = {
	transform: {
		"^.+\\.js$": "babel-jest",
	},
	moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
	transformIgnorePatterns: ["/node_modules/(?!(your-esm-dependency)/)"],
	testEnvironment: "node",
}
