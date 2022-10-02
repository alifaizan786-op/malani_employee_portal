import { gql } from '@apollo/client';

export const USER_LOGIN = gql`
	mutation login($employeeId: String!, $password: String!) {
		login(employeeId: $employeeId, password: $password) {
			token
			user {
				_id
				firstName
				lastName
				employeeId
				department
				level
				password
			}
		}
	}
`;

export const CREATE_TASK = gql`
	mutation createTask(
		$description: String!
		$user: ID!
		$dueDate: String!
		$recurring: Boolean!
		$renewIn: Int
	) {
		addTask(
			description: $description
			user: $user
			dueDate: $dueDate
			recurring: $recurring
			renewIn: $renewIn
		) {
			description
		}
	}
`;

export const CHANGE_QUOTE = gql`
	mutation changeQuote($_id: ID, $quotes: String, $color: String) {
		updateQuotes(_id: $_id, quotes: $quotes, color: $color) {
			quotes
		}
	}
`;

export const UPDATE_USER = gql`
	mutation updateUser(
		$_id: ID
		$firstName: String
		$lastName: String
		$employeeId: String
		$department: String
		$level: Int
		$active: String
	) {
		updateUser(
			_id: $_id
			firstName: $firstName
			lastName: $lastName
			employeeId: $employeeId
			department: $department
			level: $level
			active: $active
		) {
			_id
			firstName
			lastName
			employeeId
			department
			level
			active
		}
	}
`;

export const CREATE_USER = gql`
	mutation createUser(
		$firstName: String
		$lastName: String
		$employeeId: String
		$department: String
		$level: Int
		$password: String
	) {
		addUser(
			firstName: $firstName
			lastName: $lastName
			employeeId: $employeeId
			department: $department
			level: $level
			password: $password
		) {
			firstName
			lastName
			employeeId
			department
			level
			password
			active
		}
	}
`;

export const ADD_REVIEW = gql`
	mutation addReview(
		$manager: ID
		$employee: ID
		$month: String
		$review: String
	) {
		addReview(
			manager: $manager
			employee: $employee
			month: $month
			review: $review
		) {
			manager {
				employeeId
			}
			employee {
				employeeId
			}
			month
			review
		}
	}
`;

export const UPDATE_TASK = gql`
	mutation updateTask(
		$_id: ID
		$status: String
		$subStatus: String
		$description: String
		$dueDate: String
		$recurring: Boolean
		$renewIn: Int
	) {
		updateTask(
			status: $status
			subStatus: $subStatus
			description: $description
			_id: $_id
			dueDate: $dueDate
			recurring: $recurring
			renewIn: $renewIn
		) {
			status
			description
			dueDate
			recurring
			renewIn
		}
	}
`;

export const UPDATE_PASSWORD = gql`
	mutation updatePassword(
		$_id: ID
		$newPassword: String
		$oldPassword: String
	) {
		updatePassword(
			_id: $_id
			newPassword: $newPassword
			oldPassword: $oldPassword
		) {
			password
			firstName
		}
	}
`;

export const UPDATE_STATUS = gql`
	mutation upadateStatus($_id: ID, $status: String, $subStatus: String) {
		upadateStatus(_id: $_id, status: $status, subStatus: $subStatus) {
			_id
			status
		}
	}
`;

export const DELETE_TASK = gql`
	mutation delTask($_id: ID) {
		deleteTask(_id: $_id) {
			_id
		}
	}
`;

export const ADD_BULLETIN = gql`
	mutation createBulletin($user: ID, $title: String, $body: String) {
		addBulletin(user: $user, title: $title, body: $body) {
			title
			body
		}
	}
`;

export const AKNOWLEDGE_BULLETIN = gql`
	mutation acknowledge($_id: ID, $acknowledge: ID) {
		acknowledgeBulletin(_id: $_id, acknowledge: $acknowledge) {
			_id
			user {
				employeeId
			}
			title
			body
			date
			acknowledge {
				employeeId
			}
		}
	}
`;

export const DELETE_BULLETIN = gql`
	mutation delBulletin($_id: ID) {
		deleteBulletin(_id: $_id) {
			body
		}
	}
`;

export const UPDATE_SCHEDULE = gql`
	mutation Mutation($employee: ID, $newDaysOn: daysOnInput) {
		editSchedule(employee: $employee, newDaysOn: $newDaysOn) {
			_id
			employee {
				_id
				firstName
				lastName
				employeeId
			}
		}
	}
`;

export const NEW_TIME_OFF_REQUEST = gql`
	mutation Mutation(
		$employee: ID
		$startingDate: String
		$endDate: String
		$approver: ID
		$reason: String
		$status: String
	) {
		addTimeOffReq(
			employee: $employee
			startingDate: $startingDate
			endDate: $endDate
			approver: $approver
			reason: $reason
			status: $status
		) {
			employee {
				_id
				employeeId
			}
			startingDate
			endDate
			reason
			approver {
				_id
				employeeId
			}
			status
		}
	}
`;

// "newDaysOn": {
//   "dayOfWeek": null,
//   "isPresent": null,
//   "timeIn": null,
//   "timeOff": null
// }
