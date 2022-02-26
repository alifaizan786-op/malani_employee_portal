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
  $title: String,
  $description: String,
  $employeeObjId: ID,
  $dueDate: String,
  $reccuring: Boolean,
  $renewIn: Int,
) {
  addTask(
    title: $title
    description: $description
    employeeObjId: $employeeObjId
    dueDate: $dueDate
    reccuring: $reccuring
    renewIn: $renewIn
  ) {
    title
  }
}`