const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Task = require('./Task');
const Schedule = require('./Schedule');
const TimeOffReq = require('./TimeOffReq');

const dateFns = require('date-fns');

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			require: true,
		},
		lastName: {
			type: String,
			require: true,
		},
		employeeId: {
			type: String,
			require: true,
		},
		department: {
			type: String,
			require: true,
		},
		level: {
			type: Number,
			require: true,
		},
		password: {
			type: String,
			require: true,
			minlength: 5,
		},
		active: {
			type: Boolean,
			default: true,
			require: true,
		},
		tasksRenewedOn: {
			type: Date,
			default: new Date("2023-01-01"),
		},
		purgeSubmitted: {
			type: Number,
			require: false,
		},
	},
	// set this to use virtual below
	{
		toJSON: {
			virtuals: true,
		},
	}
);

userSchema.pre('save', async function (next) {
	if (this.isNew || this.isModified('password')) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});

userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

userSchema.virtual('taskStats').get(async function () {
	let allTask = await Task.find({ user: this._id });
	let submittedTask = allTask.filter((task) => task.status === 'submitted');
	let pendingTask = allTask.filter((task) => task.status === 'pending');
	let overDueTask = allTask.filter((task) => task.status === 'overdue');
	return {
		submitted: submittedTask.length,
		pending: pendingTask.length,
		overdue: overDueTask.length,
	};
});

userSchema.virtual('isPresentTomo').get(async function () {
	let userSchedule = await Schedule.find({ employee: this._id });
	let tomorrow = dateFns.addDays(new Date(), 1);
	let dayOfWeek = [
		'sunday',
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday',
	];
	if (userSchedule) {
		return userSchedule[0].schedule.filter(
			(shed) => shed.dayOfWeek === dayOfWeek[tomorrow.getDay()]
		)[0].isPresent;
	} else {
		return null;
	}
});

userSchema.virtual('ttlDayOff').get(async function () {
	let allUserTimeOffReq = await TimeOffReq.find({ employee: this._id });
	if (allUserTimeOffReq) {
		let approvedTimeOffReqs = allUserTimeOffReq.filter(
			(req) => req.status === 'approved'
		);

		let ttlDay = 0;

		for (let i = 0; i < approvedTimeOffReqs.length; i++) {
			ttlDay += dateFns.differenceInCalendarDays(
				approvedTimeOffReqs[i].endDate,
				approvedTimeOffReqs[i].startingDate
			);
		}
		return ttlDay;
	}
});

const User = model('User', userSchema);

module.exports = User;

// ,
//  {
//     "firstName":"",
//     "lastName":"",
//     "employeeId":"",
//     "department":"",
//     "level":"",
//     "password":""
// }
