const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

/* This is creating a schema for the review model. */
const reviewSchema = new Schema({
	/* This is creating a relationship between the manager and the review. */
	manager: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		require: true,
	},
	/* This is creating a relationship between the employee and the review. */
	employee: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		require: true,
	},
	/* This is creating a month for the review. */
	month: {
		type: String,
		require: true,
	},
	/* This is creating a review for the review. */
	review: {
		type: String,
		require: true,
	},
	/* This is creating a date for the review. */
	createDate: {
		type: Date,
		default: Date.now,
		get: (timestamp) => dateFormat(timestamp),
	},
});
const Review = model('Review', reviewSchema);

module.exports = Review;
