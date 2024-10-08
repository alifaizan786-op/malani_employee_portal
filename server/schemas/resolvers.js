const {
	User,
	Task,
	Review,
	Quotes,
	Bulletin,
	Schedule,
	TimeOffReq,
} = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcrypt');

// const renewTasks = require('../utils/renewTasks');

const resolvers = {
	Query: {
		/* Returning all the users in the database. */
		users: async () => {
			return await User.find({}).sort({ employeeId: 1 }); //find all user
		},
		/* The below code is a resolver function that returns a user by id. */
		userId: async (parent, args, context) => {
			return await User.findOne({ _id: context.user._id }); //user by id
		},
		/* Returning all the users that have active set to true. */
		userActive: async () => {
			return await User.find({ active: true });
		},
		/* The above code is a function that is called every day at midnight. It checks if the user is
        active and if the task is recurring. If the task is recurring, it will create a new task
        with the same description and user, but with a new due date. The new due date is calculated
        by adding the number of days the task is set to renew in to the current date. */
		tasks: async () => {
			const today = new Date();
			const todayunix = Date.parse(today);
			const allTasks = await Task.find({
				$or: [{ status: 'pending' }, { status: 'overdue' }],
			})
				.populate('user')
				.sort({ status: 1 });
			// const recuurringTask = allTasks.filter((task) => task.recurring === true)

			/* Filtering out all the tasks that have an active user. */
			const rmInactive = allTasks.filter((task) => task.user.active === true);

			/* The above code is filtering the array of objects called rmInactive and returning only the objects
			that have a recurring property of true. */
			// const recuurringTask = rmInactive.filter(async (task) => {
			// 	let presentTomo = await task.user.isPresentTomo;
			// 	if (task.recurring === true && presentTomo === true) {
			// 		return task;
			// 	}
			// });
			// const checkStatus = allTasks.filter((task) => task.status === 'pending');

			// if (today.getDay() !== 1) {
			// 	for (let i = 0; i < checkStatus.length; i++) {
			// 		if (checkStatus[i].dueDate < todayunix) {
			// 			const overdue = await Task.findByIdAndUpdate(
			// 				{ _id: checkStatus[i]._id },
			// 				{ status: 'overdue' }
			// 			);
			// 		}
			// 	}

			// 	for (let i = 0; i < recuurringTask.length; i++) {
			// 		if (await recuurringTask[0].user.isPresentTomo) {
			// 			const fDueDate = new Date(recuurringTask[i].dueDate);
			// 			const fDueDateUnix = Date.parse(fDueDate);
			// 			if (fDueDateUnix < todayunix) {
			// 				const dueInDays = 86400000 * recuurringTask[i].renewIn;
			// 				const calcDueDate = dueInDays + todayunix;

			// 				const task = {
			// 					description: recuurringTask[i].description,
			// 					user: recuurringTask[i].user,
			// 					dueDate: new Date(calcDueDate),
			// 					recurring: recuurringTask[i].recurring,
			// 					renewIn: recuurringTask[i].renewIn,
			// 				};

			// 				const createTask = await Task.create(task);

			// 				const setRecurringFalse = await Task.findOneAndUpdate(
			// 					{ _id: recuurringTask[i]._id },
			// 					{ recurring: false }
			// 				);
			// 			}
			// 		}
			// 	}
			// }

			// const allPendAndOver = rmInactive.filter(
			// 	(task) => task.status === 'pending' || task.status === 'overdue'
			// );

			//NOT WORKING FOR SOMEREASON

			// let dups = [];

			// for (let i = 0; i < allPendAndOver.length; i++) {
			//   let tempObj = allPendAndOver[i];
			//   for (let j = 0; j < allPendAndOver.length; j++) {
			//     if (i !== j) {
			//       if (
			//         new Date(tempObj.dueDate).getDate() ===
			//           new Date(allPendAndOver[j].dueDate).getDate() &&
			//         tempObj.description === allPendAndOver[j].description &&
			//         tempObj.user._id === allPendAndOver[j].user._id
			//       ) {
			//         dups.push(tempObj);
			//       }
			//     }
			//   }
			// }

			// for (let i = 0; i < dups.length; i++) {
			//   let curId = dups[i]._id
			//   await Task.deleteOne({_id : curId})
			// }

			return rmInactive;
		},

		// rewrite the "tasks" resolver, but make sure that a task is not renewed if the user is not scheduled or if the user has a active time of request

		/* A resolver function that is used to query the database for a specific task. */
		taskUId: async (parent, { taskUId }) => {
			return await Task.find({ user: taskUId }).populate('user');
		},
		/* Returning all the quotes from the database. */
		quotes: async () => {
			return await Quotes.find({}); // all quotes
		},
		/* Returning all the reviews in the database. */
		reviews: async () => {
			return await Review.find({}).populate('manager').populate('employee'); // all review
		},
		/* The below code is a resolver function that is used to fetch all the reviews of a particular
        employee. */
		reviewUId: async (parent, { employeeUId }) => {
			return await Review.find({ employee: employeeUId })
				.populate('manager')
				.populate('employee')
				.sort({ _id: -1 });
		},
		/* The below code is a resolver function that is used to query the database. */
		taskByEmp: async (parent, { emp }) => {
			console.log(emp);
			const allTasks = await Task.find({
				$and: [
					{ user: emp },
					{ $or: [{ status: 'pending' }, { status: 'overdue' }] },
				],
			}).populate('user');

			const thisUser = await User.findById(emp);

			const lastRenewedOn = new Date(thisUser.tasksRenewedOn).getDate();
			const todayDate = new Date().getDate();
			// const todayDate = 31;

			console.log(lastRenewedOn, todayDate);

			if (lastRenewedOn !== todayDate) {
				console.log('task renewed for user', thisUser.employeeId);

				console.log('task over due');
				for (let i = 0; i < allTasks.length; i++) {
					const task = allTasks[i];
					const today = new Date();
					const todayunix = Date.parse(today);
					const dueDate = Date.parse(task.dueDate);
					if (dueDate < todayunix) {
						task.status = 'overdue';
						await task.save();
						//   taskSetToOverdue++;
					}
				}

				// console.log(allTasks[0]);

				const recurringTasks = allTasks.filter(
					(task) => task.recurring === true
				);
				// console.log(recurringTasks);
				console.log('task renewed');
				for (let i = 0; i < recurringTasks.length; i++) {
					const task = recurringTasks[i];
					const today = new Date();
					const todayunix = Date.parse(today);
					const dueDate = Date.parse(task.dueDate);
					if (await task.user.isPresentTomo) {
						if (dueDate < todayunix) {
							const newTask = {
								description: task.description,
								user: task.user,
								recurring: task.recurring,
								renewIn: task.renewIn,
							};
							const dueInDays = 86400000 * task.renewIn;
							const calcDueDate = dueInDays + todayunix;
							
							newTask.dueDate = new Date(calcDueDate).setHours(10, 0, 0);
							// console.log(newTask);
							await Task.create(newTask);
							task.recurring = false;
							await task.save();
							// tasksCreated++;
						}
					}
				}

				thisUser.tasksRenewedOn = new Date();
				await thisUser.save();
			}

			// renewTasks();

			return allTasks;
		},
		/* A function that returns a list of all the bulletins in the database. */
		bulletins: async () => {
			return await Bulletin.find({})
				.populate('user')
				.populate('acknowledge')
				.sort({ date: -1 });
		},
		/* A function that is returning a promise. */
		schedule: async () => {
			let allSchedule = await Schedule.find({}).populate('employee');

			let allActiveSched = allSchedule.filter(
				(sched) => sched.employee.active === true
			);

			return allActiveSched;
		},
		/* A query that is used to find a schedule by the employee's unique id. */
		scheduleByUid: async (parent, { employeeUId }) => {
			return await Schedule.findOne({ employee: employeeUId });
		},
		timeOffReq: async () => {
			return await TimeOffReq.find({})
				.populate('employee')
				.populate('approver');
		},
		timeOffReqByUid: async (parent, { employeeUId }) => {
			return await TimeOffReq.find({ employee: employeeUId })
				.populate('employee')
				.populate('approver');
		},
	},
	Mutation: {
		/* The below code is creating a new task and returning it. */
		addTask: async (
			parent,
			{ description, user, dueDate, recurring, renewIn }
		) => {
			const newTask = await Task.create({
				description: description,
				user: user,
				dueDate: dueDate,
				recurring: recurring,
				renewIn: renewIn,
			});

			return newTask;
		},
		/* The below code is updating the task in the database. */
		updateTask: async (
			parent,
			{ status, subStatus, description, _id, dueDate, recurring, renewIn }
		) => {
			const editTask = await Task.findOneAndUpdate(
				{ _id },
				{ status, subStatus, description, dueDate, recurring, renewIn }
			);
			return editTask;
		},
		/* The below code is deleting a task from the database. */
		deleteTask: async (parent, { _id }) => {
			await Task.findOneAndDelete({ _id });
		},

		addUser: async (
			parent,
			{ firstName, lastName, employeeId, department, level, password }
		) => {
			const newUser = await User.create({
				firstName,
				lastName,
				employeeId,
				department,
				level,
				password,
			});

			const getUser = await User.find({ employeeId: employeeId });

			let daysOfWeek = [
				'tuesday',
				'wednesday',
				'thursday',
				'friday',
				'saturday',
				'sunday',
			];

			let curUserId = getUser[0]._id;

			const createSchedule = await Schedule.create({ employee: curUserId });

			for (let j = 0; j < daysOfWeek.length; j++) {
				let exampleSchedule = {
					dayOfWeek: daysOfWeek[j],
					isPresent: true,
					timeIn: '10:00 AM',
					timeOff: '07:30 PM',
				};

				try {
					const addedSchedule = await Schedule.findOneAndUpdate(
						{ employee: curUserId },
						{ $push: { schedule: exampleSchedule } }
					);
				} catch (e) {
					console.error(e);
				}
			}

			return newUser;
		},
		updateUser: async (
			parent,
			{ _id, firstName, lastName, employeeId, department, level, active }
		) => {
			const editUser = await User.findOneAndUpdate(
				{ _id },
				{ firstName, lastName, employeeId, department, level, active }
			);

			return editUser;
		},
		/* This is a mutation that is used to delete a user. It takes in the id of the user and deletes
        the user. */
		deleteUser: async (parent, { _id }) => {
			await User.findOneAndDelete({ _id });
		},
		/* This is a mutation that is used to update the quotes. It takes in the id of the quotes and
        the new quotes. It then finds the quotes and updates the quotes. */
		updateQuotes: async (parent, { _id, quotes, color, random }) => {
			const editQuotes = await Quotes.findOneAndUpdate(
				{ _id },
				{ quotes, color, random }
			);
			return editQuotes;
		},
		/* This is a mutation that is used to create a review. It takes in the employee, manager,
        month, and review and creates a new review with that information. */
		addReview: async (parent, { employee, manager, month, review }) => {
			const newReview = await Review.create({
				manager,
				employee,
				month,
				review,
			});
			return newReview;
		},
		/* This is a mutation that is used to delete a review. It takes in the id of the review and
                deletes the review. */
		deleteReview: async (parent, { _id }) => {
			await Review.findOneAndDelete({ _id });
		},
		/* This is a mutation that is used to login a user. It takes in the employeeId and password of
        the user. It then finds the user and checks if the password is correct. If it is correct, it
        then creates a token and returns the user and token. */
		login: async (parent, { employeeId, password }) => {
			const user = await User.findOne({ employeeId });

			if (!user) {
				throw new AuthenticationError('Employee Id is incorrect');
			}

			const correctPassword = await user.isCorrectPassword(password);

			if (!correctPassword) {
				throw new AuthenticationError('Password is Incorrect');
			}

			const token = signToken(user);

			return { user, token };
		},
		/* This is a mutation that is used to update the password of a user. It takes in the id of the
        user, the old password, and the new password. It then finds the user and checks if the old
        password is correct. If it is correct, it then encrypts the new password and updates the
        user with the new password. */
		updatePassword: async (parent, { _id, oldPassword, newPassword }) => {
			// const user = await User.findOne({_id})
			// const correctPassword = await user.isCorrectPassword(oldPassword)

			// if(!correctPassword){
			//     throw new AuthenticationError('Password is Incorrect')
			// }else{
			const saltRound = 10;
			const encryptPassword = await bcrypt.hash(newPassword, saltRound);
			const changePass = await User.findOneAndUpdate(
				{ _id },
				{ password: encryptPassword }
			);
			// }
		},
		/* This is a mutation that is used to update the status of a task. It takes in the id of the
        task, the status, and the subStatus. It then finds the task and updates the status and
        subStatus. */
		upadateStatus: async (parent, { _id, status, subStatus }) => {
			const upadateStatus = await Task.findByIdAndUpdate(
				{ _id },
				{ status, subStatus }
			);
			return upadateStatus;
		},
		/* This is a mutation that is used to create a bulletin. It takes in the user, title, and body
                of the bulletin and creates a new bulletin with that information. */
		addBulletin: async (parent, { user, title, body }) => {
			const addBulletin = await Bulletin.create({ user, title, body });
			return addBulletin;
		},
		/* This is a mutation that is used to acknowledge a bulletin. It takes in the id of the
        bulletin and the user that is acknowledging the bulletin. It then finds the bulletin and
        gets the acknowledge array. It then adds the user to the acknowledge array and updates the
        bulletin with the new acknowledge array. */
		acknowledgeBulletin: async (parent, { _id, acknowledge }) => {
			({ acknowledge: this._acknowledge } = await Bulletin.findOne({
				_id: _id,
			}));
			const acknowledgeArr = this._acknowledge;
			const acknowledgeBulletin = Bulletin.findByIdAndUpdate(
				{ _id },
				{ acknowledge: [...acknowledgeArr, acknowledge] }
			);
			return acknowledgeBulletin;
		},
		/* This is a mutation that is used to update a bulletin. It takes in the id of the bulletin,
        the title, and the body. It then updates the bulletin with the new title and body. It also
        resets the acknowledge array to an empty array. */
		updateBulletin: async (parent, { _id, title, body }) => {
			const updateBulletin = await Bulletin.findByIdAndUpdate(
				{ _id },
				{
					title,
					body,
					acknowledge: [],
				}
			);
			return updateBulletin;
		},
		/* This is a mutation that is used to delete a bulletin. */
		deleteBulletin: async (parent, { _id }) => {
			const delBulletin = await Bulletin.findOneAndDelete({ _id: _id });
			return delBulletin;
		},
		/* This is a mutation that is used to create a schedule for an employee. */
		createSchedule: async (parent, { employee }) => {
			const createSchedule = await Schedule.create({ employee: employee });

			return createSchedule;
		},
		/* This is a mutation that is used to add a dayOn to the schedule of an employee. */
		addSchedule: async (parent, { employee, daysOn }) => {
			const addedSchedule = await Schedule.findOneAndUpdate(
				{ employee: employee },
				{ $push: { schedule: daysOn } },
				{ new: true }
			);

			return addedSchedule;
		},
		/* This is a mutation that is used to edit the schedule of an employee. It first removes the
        old dayOn and then adds the new dayOn. */
		editSchedule: async (parent, { employee, newDaysOn }) => {
			const rmOldDayOn = await Schedule.findOneAndUpdate(
				{ employee: employee },
				{ $pull: { schedule: { dayOfWeek: newDaysOn.dayOfWeek } } },
				{ new: true }
			);

			const addNewDayOn = await Schedule.findOneAndUpdate(
				{ employee: employee },
				{ $push: { schedule: newDaysOn } },
				{ new: true }
			);

			return addNewDayOn;
		},
		addTimeOffReq: async (
			parent,
			{ employee, startingDate, endDate, reason, approver, status }
		) => {
			const addTimeOffReq = TimeOffReq.create({
				employee,
				startingDate,
				endDate,
				reason,
				approver,
				status,
			});

			return addTimeOffReq;
		},
		updateTimeOffReq: async (
			parent,
			{ _id, employee, startingDate, endDate, reason, approver, status }
		) => {
			const updateTimeOffReq = TimeOffReq.findByIdAndUpdate(
				{ _id: _id },
				{ employee, startingDate, endDate, reason, approver, status },
				{ new: true }
			);

			return updateTimeOffReq;
		},
		deleteTimeOffRequest: async (parent, { _id }) => {
			const updateTimeOffReq = TimeOffReq.findByIdAndDelete({ _id: _id });

			return updateTimeOffReq;
		},
	},
};

module.exports = resolvers;
