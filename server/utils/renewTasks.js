const {
	User,
	Task,
	Review,
	Quotes,
	Bulletin,
	Schedule,
	TimeOffReq,
} = require('../models');

const connection = require('../config/connection');

async function renewTasks() {
	let taskSetToOverdue = 0;
	let tasksCreated = 0;

	connection.on('error', (err) => err);

	connection.once('open', async () => {
		console.log('connected');
		try {
			// Find all tasks that are recurring
			const allTasks = await Task.find({
				$or: [{ status: 'pending' }, { status: 'overdue' }],
			});

			// Loop through each task
			// Check if the task is past due
			// if task is past due, set the status to overdue
			// if task is not past due, do nothing
			for (let i = 0; i < allTasks.length; i++) {
				const task = allTasks[i];
				const today = new Date();
				const todayunix = Date.parse(today);
				const dueDate = Date.parse(task.dueDate);
				if (dueDate < todayunix) {
					task.status = 'overdue';
					await task.save();
					taskSetToOverdue++;
				}
			}

			// Find all tasks that are recurring
			const recurringTasks = await Task.find({
				recurring: true,
			}).populate('user');

			// filter out tasks that have inactive users
			const activeTasks = recurringTasks.filter((task) => {
				return task.user.active === true;
			});

			// Loop through each task
			// Check if the task is past due
			// if task is past due, create a new task
			// new task should have the same description, user, and recurring
			// new task dueDate should be the current date + renewIn
			// set old task recurring to false
			for (let i = 0; i < activeTasks.length; i++) {
				const task = activeTasks[i];
				const today = new Date();
				const todayunix = Date.parse(today);
				const dueDate = Date.parse(task.dueDate);
				if (dueDate < todayunix) {
					const newTask = {
						description: task.description,
						user: task.user,
						recurring: task.recurring,
						renewIn: task.renewIn,
					};
					const dueInDays = 86400000 * task.renewIn;
					const calcDueDate = dueInDays + todayunix;
					newTask.dueDate = new Date(calcDueDate);
					await Task.create(newTask);
					task.recurring = false;
					await task.save();
					tasksCreated++;
				}
			}

			console.log(
				`Renewed ${tasksCreated} tasks and set ${taskSetToOverdue} tasks to overdue.`
			);

			tasksCreated = 0;
			taskSetToOverdue = 0;
		} catch (err) {
			console.error(err);
			process.exit(1);
		}

		process.exit(0);
	});
}
module.exports = renewTasks;
