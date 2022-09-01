const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Task = require('./Task')

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
  let submittedTask = allTask.filter((task) => task.status === "submitted")
  let pendingTask = allTask.filter((task) => task.status === "pending")
  let overDueTask = allTask.filter((task) => task.status === "overdue")
  return {
    submitted : submittedTask.length,
    pending : pendingTask.length,
    overdue : overDueTask.length
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
