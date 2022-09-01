const { Schema, model } = require('mongoose');

/* Creating a new schema for the quotes collection. */
const quotesSchema = new Schema({
	quotes: {
		type: String,
		require: true,
	},
	color: {
		type: String,
		require: true,
	},
});

const Quotes = model('quotes', quotesSchema);

module.exports = Quotes;
