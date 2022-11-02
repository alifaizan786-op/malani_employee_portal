import { gql } from '@apollo/client';

export const QUERY_MAIN = gql`
	query main {
		userId {
			_id
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

export const QUERY_QUOTE = gql`
	query quote {
		quotes {
			_id
			quotes
			color
			random
		}
	}
`;

export const QUERY_ALLTASKS = gql`
	query alltask {
		tasks {
			_id
			status
			subStatus
			description
			user {
				_id
				firstName
				lastName
				employeeId
			}
			dueDate
			recurring
			renewIn
		}
		userActive {
			_id
			employeeId
		}
	}
`;

export const QUERY_ALLEMPS = gql`
	query {
		users {
			_id
			firstName
			lastName
			employeeId
			department
			level
			active
			taskStats {
				submitted
				pending
				overdue
			}
			ttlDayOff
		}
	}
`;

export const QUERY_TASKBYEMP = gql`
	query taskbyuser($emp: ID) {
		scheduleByUid(employeeUId: $emp) {
			_id
			schedule {
				_id
				dayOfWeek
				isPresent
				timeIn
				timeOff
			}
		}
		taskByEmp(emp: $emp) {
			_id
			status
			description
			dueDate
			createDate
			recurring
			renewIn
		}
		bulletins {
			_id
			user {
				employeeId
				firstName
				lastName
			}
			title
			body
			date
			acknowledge {
				_id
				employeeId
			}
		}
	}
`;

export const QUERY_REVIEWBYUID = gql`
	query reviewbyUID($employeeUId: ID) {
		reviewUId(employeeUId: $employeeUId) {
			_id
			manager {
				employeeId
			}
			employee {
				employeeId
			}
			month
			review
			createDate
		}
	}
`;

export const QUERY_ALL_BULLETIN = gql`
	query allBulletins {
		bulletins {
			_id
			user {
				employeeId
				firstName
				lastName
			}
			title
			body
			date
			acknowledge {
				_id
				employeeId
			}
		}
	}
`;

export const QUERY_SCHED_BY_UID = gql`
	query scheduleByUid($emp: ID) {
		scheduleByUid(employeeUId: $emp) {
			_id
			schedule {
				_id
				dayOfWeek
				isPresent
				timeIn
				timeOff
			}
		}
	}
`;

export const QUERY_ALL_ACTIVE_SCHED = gql`
	query AllSchedule {
		schedule {
			_id
			employee {
				employeeId
			}
			schedule {
				_id
				dayOfWeek
				isPresent
				timeIn
				timeOff
			}
		}
	}
`;

export const QUERY_TIME_OFF_REQ_BY_UID = gql`
	query TimeOffReqByUid($employeeUId: ID) {
		timeOffReqByUid(employeeUId: $employeeUId) {
			_id
			employee {
				_id
				employeeId
				firstName
				lastName
			}
			startingDate
			endDate
			reason
			approver {
				_id
				employeeId
				firstName
				lastName
			}
			status
		}
	}
`;

export const QUERY_ALL_TIME_OFF_REQS = gql`
query Query {
  timeOffReq {
    _id
    employee {
      _id
      employeeId
	  firstName
	  lastName
    }
    startingDate
    endDate
    reason
    approver {
      employeeId
	  firstName
	  lastName
    }
    status
  }
}`
