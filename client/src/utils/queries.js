
import {gql} from '@apollo/client';

export const QUERY_MAIN = gql`
query main{
  userId{
        _id
        firstName
        lastName
        employeeId 
        department 
        level
        password  
        active
  }
}`

export const QUERY_QUOTE = gql`
query quote{
  quotes{
    quotes
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
