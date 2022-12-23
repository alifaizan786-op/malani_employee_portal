const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

/* Creating a schema for the bulletin model. */
const bulletinSchema = new Schema({
	/* This is a reference to the user model. */
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		require: true,
	},
	/* Creating a title field that is a string and is required. */
	title: {
		type: String,
		require: true,
	},
	/* Creating a body field that is a string and is required. */
	body: {
		type: String,
		require: true,
	},
	/* Creating a date field that is a date type and is required. It is also using the dateFormat function
    to format the date. */
	date: {
		type: Date,
		default: Date.now,
		get: (timestamp) => dateFormat(timestamp),
	},
	/* This is creating a reference to the user model. */
	acknowledge: [
		/* This is creating a reference to the user model. */
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
});

const Bulletin = model('bulletin', bulletinSchema);

module.exports = Bulletin;
