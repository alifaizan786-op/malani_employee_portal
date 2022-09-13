const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID
		firstName: String
		lastName: String
		employeeId: String
		department: String
		level: Int
		password: String
		active: String
		taskStats: TaskStats
	}

	type TaskStats {
		submitted: Int
		pending: Int
		overdue: Int
	}

	type Task {
		_id: ID
		status: String
		subStatus: String
		description: String
		user: User
		dueDate: String
		createDate: String
		recurring: Boolean
		renewIn: Int
	}

	type Quotes {
		_id: ID
		quotes: String
		color: String
	}

	type Review {
		_id: ID
		manager: User
		employee: User
		month: String
		review: String
		createDate: String
	}

	type Bulletin {
		_id: ID
		user: User
		title: String
		body: String
		date: String
		acknowledge: [User]
	}

	type daysOn {
		_id: ID
		dayOfWeek: String
		isPresent: Boolean
		timeIn: String
		timeOff: String
	}

	type Schedule {
		_id: ID
		employee: User
		schedule: [daysOn]
	}

	type Auth {
		token: ID
		user: User
	}

	type TimeOffReq {
		_id : ID
		employee: User
		startingDate: String
		endDate: String
		reason: String
		approver: User
		status: String
	}

	input daysOnInput {
		dayOfWeek: String
		isPresent: Boolean
		timeIn: String
		timeOff: String
	}

	type Query {
		users: [User]
		tasks: [Task]
		quotes: [Quotes]
		reviews: [Review]
		userId(userId: ID): User
		taskUId(taskUId: ID): Task
		reviewUId(employeeUId: ID): [Review]
		userActive: [User]
		taskByEmp(emp: ID): [Task]
		bulletins: [Bulletin]
		schedule: [Schedule]
		scheduleByUid(employeeUId: ID): Schedule
		timeOffReq: [TimeOffReq]
		timeOffReqByUid(employeeUId: ID): TimeOffReq
	}

	type Mutation {
		addTask(
			description: String!
			user: ID!
			dueDate: String!
			recurring: Boolean!
			renewIn: Int
		): Task

		updateTask(
			status: String
			subStatus: String
			description: String
			_id: ID
			dueDate: String
			recurring: Boolean
			renewIn: Int
		): Task

		deleteTask(_id: ID): Task

		addUser(
			firstName: String
			lastName: String
			employeeId: String
			department: String
			level: Int
			password: String
		): User

		updateUser(
			_id: ID
			firstName: String
			lastName: String
			employeeId: String
			department: String
			level: Int
			active: String
		): User

		deleteUser(_id: ID): User

		updateQuotes(_id: ID, quotes: String, color: String): Quotes

		addReview(manager: ID, employee: ID, month: String, review: String): Review

		deleteReview(_id: ID): Review

		login(employeeId: String!, password: String!): Auth

		updatePassword(_id: ID, oldPassword: String, newPassword: String): User

		upadateStatus(_id: ID, status: String, subStatus: String): Task

		addBulletin(user: ID, title: String, body: String): Bulletin

		acknowledgeBulletin(_id: ID, acknowledge: ID): Bulletin

		updateBulletin(_id: ID, title: String, body: String): Bulletin

		deleteBulletin(_id: ID): Bulletin

		createSchedule(employee: ID): Schedule

		addSchedule(employee: ID, daysOn: daysOnInput): Schedule

		editSchedule(employee: ID, newDaysOn: daysOnInput): Schedule

		addTimeOffReq(
			employee: ID
			startingDate: String
			endDate: String
			reason: String
			approver: ID
			status: String
		): TimeOffReq

		updateTimeOffReq(
			_id : ID
			employee: ID
			startingDate: String
			endDate: String
			reason: String
			approver: ID
			status: String
		): TimeOffReq
	}
`;

module.exports = typeDefs;
