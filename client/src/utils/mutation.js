import { gql } from '@apollo/client';

export const USER_LOGIN = gql`
mutation login($employeeId:String!, $password:String!){
  login(
    employeeId:$employeeId
    password:$password
  ){
    token
    user{
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

`

export const CREATE_TASK = gql`
mutation createTask(
  $description: String!,
  $user: ID!,
  $dueDate: String!,
  $recurring: Boolean!,
  $renewIn: Int,
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
}`

export const CHANGE_QUOTE = gql`
mutation changeQuote(
  $_id:ID, 
  $quotes:String)
  {
  updateQuotes(
    _id:$_id, 
    quotes:$quotes){
    quotes
  }
}`

export const UPDATE_USER=gql`
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
}`

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
}`

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
}`

export const UPDATE_TASK= gql`
mutation updateTask(
  $status: String
	$description: String
  $_id: ID
  $dueDate: String
  $recurring: Boolean
  $renewIn: Int
){
  updateTask(
    status: $status
    description: $description
    _id: $_id
    dueDate: $dueDate
    recurring: $recurring
    renewIn: $renewIn
  ){
    _id
    status
    description
    renewIn
  }
}`