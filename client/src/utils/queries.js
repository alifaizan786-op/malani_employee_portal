import { gql } from "@apollo/client";

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
    }
  }
`;

export const QUERY_TASKBYEMP = gql`
  query taskbyuser($emp: ID) {
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
