const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const throng = require('throng');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const { Task, User, Review, Quotes, Schedule } = require('./models');
const { log } = require('console');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.static(path.join(__dirname, './images')));

// // For Heroku
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/'));
});

// // For Local
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../Client/build/index.html"));
// });
function updateTasks() {
	db.on('error', (err) => err);
	console.log('not connected');

	db.once('open', async () => {
		try {
			console.log('connected');

			const allUsers = await User.find({});

			for (let i = 0, len = allUsers.length; i < len; i++) {
				console.log(allUsers[i].employeeId);
			}
		} catch (err) {
			console.error(err);
		}
	});
}

setInterval(async () => {
	updateTasks();
}, 1000 * 60 * 1);

// setup load balancing and concurrency using throng
throng({
	workers: process.env.WEB_CONCURRENCY || 1,
	lifetime: Infinity,
	start: start,
});

function start() {
	// Create a new instance of an Apollo server with the GraphQL schema
	const startApolloServer = async (typeDefs, resolvers) => {
		await server.start();
		server.applyMiddleware({ app });

		db.once('open', () => {
			setInterval(async () => {
				try {
					console.log('connected');

					const allUsers = await User.find({});
					const stats = [];

					for (let i = 0, len = allUsers.length; i < len; i++) {
						let tempObj = {
							taskToOverDue: 0,
							tasksCreated: 0,
						};
						const empid = allUsers[i].employeeId;
						const emp = allUsers[i]._id;
						const allTasks = await Task.find({
							$and: [
								{ user: emp },
								{ $or: [{ status: 'pending' }, { status: 'overdue' }] },
							],
						}).populate('user');

						const thisUser = allUsers[i];

						const lastRenewedOn = new Date(thisUser.tasksRenewedOn).getDate();
						const todayDate = new Date().getDate();

						if (lastRenewedOn !== todayDate) {
							for (let i = 0; i < allTasks.length; i++) {
								const task = allTasks[i];
								const today = new Date();
								const todayunix = Date.parse(today);
								const dueDate = Date.parse(task.dueDate);
								if (dueDate < todayunix) {
									task.status = 'overdue';
									await task.save();
									tempObj.taskToOverDue++;
								}
							}
						}

						const recurringTasks = allTasks.filter(
							(task) => task.recurring === true
						);
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
									await Task.create(newTask);
									task.recurring = false;
									await task.save();
									tempObj.tasksCreated++;
								}
							}
						}

						thisUser.tasksRenewedOn = new Date();
						await thisUser.save();

						stats.push({
							empid,
							...tempObj,
						});
					}

					console.log;
					console.log(JSON.stringify(stats, null, 2).length);
					const half = Math.ceil(stats.length / 2);

					const firstHalf = stats.slice(0, half);
					const secondHalf = stats.slice(half);

					const accountSid = 'AC533f2e0c9ccab17300f6a570eb5fb767';
					const authToken = 'cf1a6fdb7ff0052aa4dbe35ad685af12';
					const client = require('twilio')(accountSid, authToken);
					client.messages
						.create({
							body: JSON.stringify(firstHalf, null, 2),
							from: '+14045744854',
							to: '+14049185805',
						})
						.then((message) => console.log(message));
					client.messages
						.create({
							body: JSON.stringify(secondHalf, null, 2),
							from: '+14045744854',
							to: '+14049185805',
						})
						.then((message) => console.log(message));
				} catch (err) {
					console.error(err);
				}
			}, 1000 * 60 * 360);

			app.listen(PORT, () => {
				console.log(`API server running on port ${PORT}!`);
				console.log(
					`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
				);
			});
		});
	};

	// Call the async function to start the server
	startApolloServer(typeDefs, resolvers);
}
