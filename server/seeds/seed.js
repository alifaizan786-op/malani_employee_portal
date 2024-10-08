const connection = require('../config/connection');
const { Task, User, Review, Quotes, Schedule } = require('../models');
// const userSeeds = require('./userSeeds.json');
const taskSeeds = require('./task2Seeds.json');
// const reviewSeeds = require('./reviewSeeds.json')
// const quotesSeeds = require('./quotesSeeds.json');

connection.on('error', (err) => err);

connection.once('open', async () => {
	console.log('connected');
	console.time("yo")
	try {
		await Task.deleteMany({});
		console.log('=========Collections Emptied================');
		for (let i = 0, len = taskSeeds.length; i < len; i++) {
			let tempObj = taskSeeds[i];

			const today = new Date();

			today.setHours(10, 0, 0);

			const todayunix = Date.parse(today);

			const dueInDays = 86400000 * tempObj.renewIn;

			const calcDueDate = dueInDays + todayunix;

			tempObj.dueDate = new Date(calcDueDate);

			tempObj.recurring = true;

			const userData = await User.findOne({ employeeId: tempObj.employeeId });

			console.log(userData);

			tempObj.user = userData._id;

			tempObj.createDate = today;

			Task.create(tempObj);
		}
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
	console.timeEnd("yo")

	process.exit(0);
});
// yo: 713.777ms yo: 744
// // ----------------------Seeding Users----------------------
// await User.deleteMany({});

// console.log('=========Collections Emptied================');

// await User.create(userSeeds);

// console.table(userSeeds);

// console.info('================Users Seeded================');

// // ----------------------Seeding Tasks----------------------
// await Task.deleteMany({});

// console.log('=========Collections Emptied================');

// for (let i = 0; i < taskSeeds.length; i++) {
// 	({ _id: this._User } = await User.findOne({
// 		employeeId: taskSeeds[i].user,
// 	}));
// 	const UserId = this._User;

// 	const today = new Date();
// 	const todayunix = Date.parse(today);
// 	const dueInDays = 86400000 * taskSeeds[i].renewIn;
// 	const calcDueDate = dueInDays + todayunix;

// 	const task = {
// 		description: taskSeeds[i].description,
// 		user: UserId,
// 		dueDate: new Date(calcDueDate),
// 		recurring: taskSeeds[i].recurring,
// 		renewIn: taskSeeds[i].renewIn,
// 	};
// 	console.log(task);

// 	let taskCreation = await Task.create(task);
// }
// console.info('================Task Seeded================');

// // ----------------------Seeding Reviews----------------------
// // await Review.deleteMany({})

// // console.log('=========Collections Emptied================');

// // for(let i = 0;i <reviewSeeds.length; i++){
// //   ({_id : this._Review} = await User.findOne({employeeId:reviewSeeds[i].manager}));
// //   const manager = this._Review;

// //    ({_id : this._ReviewE} = await User.findOne({employeeId:reviewSeeds[i].employee}));
// //   const employee = this._ReviewE;

// //   const review ={
// //     manager : manager,
// //     employee : employee,
// //     month : reviewSeeds[i].month,
// //     review : reviewSeeds[i].review,

// //   };
// //   console.log(review);

// //   let reviewCreation = await Review.create(review);
// // }
// // console.info('================Review Seeded================');

// // ----------------------Seeding Quotes----------------------
// // await Quotes.deleteMany({});

// // console.log('=========Collections Emptied================');

// // await Quotes.create(quotesSeeds);

// // console.table(quotesSeeds);

// // console.info('================Quotes Seeded================');

// let allUser = await User.find({});

// await Schedule.deleteMany({});

// let allUserId = [];

// for (let i = 0; i < allUser.length; i++) {
// 	let curUserId = allUser[i]._id;
// 	const createSchedule = await Schedule.create({ employee: curUserId });
// }

// let daysOfWeek = [
// 	'monday',
// 	'tuesday',
// 	'wednesday',
// 	'thursday',
// 	'friday',
// 	'saturday',
// 	'sunday',
// ];

// for (let i = 0; i < allUser.length; i++) {
// 	let curUserId = allUser[i]._id;
// 	for (let j = 0; j < daysOfWeek.length; j++) {
// 		if (daysOfWeek[j] === 'monday') {
// 			let exampleSchedule = {
// 				dayOfWeek: daysOfWeek[j],
// 				isPresent: false,
// 				timeIn: 'Off',
// 				timeOff: 'Off',
// 			};

// 			const addedSchedule = await Schedule.findOneAndUpdate(
// 				{ employee: curUserId },
// 				{ $push: { schedule: exampleSchedule } }
// 			);
// 		} else {
// 			let exampleSchedule = {
// 				dayOfWeek: daysOfWeek[j],
// 				isPresent: true,
// 				timeIn: '10:00 AM',
// 				timeOff: '07:30 PM',
// 			};

// 			const addedSchedule = await Schedule.findOneAndUpdate(
// 				{ employee: curUserId },
// 				{ $push: { schedule: exampleSchedule } }
// 			);
// 		}
// 	}
// }

// console.time("time")

// let tasks = await  Task.find({
// 	$or: [{ status: 'pending' }, { status: 'overdue' }],
// }).populate('user').sort({ status: 1 });

// console.timeEnd("time")
// console.log(tasks[0]);

// const today = new Date();

// console.log(today.getDay());
// console.log(today.getDate());
