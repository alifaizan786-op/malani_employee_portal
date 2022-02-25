
import {gql} from '@apollo/client';

export const QUERY_WELCOME = gql`
query welcome{
  userId{
    firstName
    lastName
    department
  }
}`

export const QUERY_QUOTE = gql`
query quote{
  quotes{
    quotes
  }userId{
    level
  }
}`

export const QUERY_ALLTASKS = gql`
query alltask {
  tasks {
    _id
    status
    title
    description
    user {
      _id
      firstName
      lastName
      employeeId      
    }
    dueDate
  }
  userActive{
    _id
    employeeId
    
  }
}`
