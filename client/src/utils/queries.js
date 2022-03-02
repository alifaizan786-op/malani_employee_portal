
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
    _id
    quotes
  }
}`

export const QUERY_ALLTASKS = gql`
query alltask {
  tasks {
    _id
    status
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

export const QUERY_ALLEMPS = gql`
query{
  users{
    _id
    firstName
    lastName
    employeeId
    department
    level
  }
}`

export const QUERY_TASKBYEMP = gql`
query taskbyuser($emp:ID){
  taskByEmp(emp:$emp){
    _id
    status
    description
    dueDate
    createDate
    recurring
    renewIn
  }
}`
