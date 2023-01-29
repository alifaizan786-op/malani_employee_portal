const cron = require('cron');
const {Task} = require('../models/');
const {Schedule} = require('../models/');
const {TimeOffReq} = require('../models/');

console.log('renew.js loaded');

const renewTasks = new cron.CronJob(
	'*	*	*	*	*',
	async () => {
		console.log('renewing tasks');
		// Find all recurring tasks
		const tasks = await Task.find({ recurring: true }).populate('user');

		const activeTasks = tasks.filter((task) => task.user.active === 'active');

		// Iterate through tasks
		for (let task of activeTasks) {
			// Find the user associated with the task
			const user = task.user;

			// Find the user's schedule for the current day
			const schedule = await Schedule.findOne({
				employee: user,
				schedule: {
					$elemMatch: {
						dayOfWeek: new Date().toLocaleString('en-us', { weekday: 'long' }),
					},
				},
			});

			// Find if the user has a time off request for the current day
			const timeOffReq = await TimeOffReq.findOne({
				employee: user,
				startingDate: { $lte: new Date() },
				endDate: { $gte: new Date() },
			});

			// Check if the user is scheduled for the current day and not on a time off request
			if (schedule && !timeOffReq) {
				const today = new Date();
				today.setHours(10, 0, 0);
				const todayunix = Date.parse(today);
				const dueInDays = 86400000 * task.renewIn;
				const calcDueDate = dueInDays + todayunix;
				// Create a new task with the same properties as the original task, but with the due date set to the next occurrence
				const newTask = new Task({
					...task.toObject(),
					dueDate: new Date(calcDueDate), // code to calculate the next occurrence of the task
				});

				// Save the new task
				await newTask.save();

				task.recurring = false;

				await task.save();
			}
		}
	},
	null,
	true,
	'America/Los_Angeles'
);

// renewTasks.start();

const overdue = new cron.CronJob(
	'*	*	*	*	*',
	async () => {
		console.log('checking for overdue tasks');
		// Find all pending tasks that have a due date in the past
		const overdueTasks = await Task.find({
			status: 'pending',
			dueDate: { $lt: new Date() },
		});

		// Update the status of each overdue task to 'overdue'
		for (let task of overdueTasks) {
			task.status = 'overdue';
			await task.save();
		}
	},
	null,
	true,
	'America/Los_Angeles'
);

// overdue.start();

module .exports = { renewTasks, overdue };