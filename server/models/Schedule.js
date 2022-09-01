const { Schema, model } = require('mongoose');
const Review = require('./Review');

/* This is creating a new schema for the day of the week. */
const daySchema = new Schema({
	/* This is creating a new schema for the day of the week. */
    dayOfWeek: {
		type: String,
		require: true,
	},
	/* This is a boolean that is required. */
    isPresent: {
		type: Boolean,
		require: true,
	},
	/* This is creating a new schema for the time in. */
    timeIn: {
		type: String,
		require: true,
	},
	/* This is creating a new schema for the time off. */
    timeOff: {
		type: String,
		require: true,
	},
});

const scheduleSchema = new Schema({
	/* This is creating a new schema for the employee. */
    employee: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		require: true,
	},
	/* This is creating a new schema for the schedule. */
    schedule: [daySchema],
});

const Schedule = model('Schedule', scheduleSchema);

module.exports = Schedule;
