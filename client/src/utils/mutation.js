import { gql } from '@apollo/client';

export const USER_LOGIN = gql`
mutation login($employeeId: String,  $password: String) {
  login(
    employeeId: $employeeId 
    password: $password
  )
  {
  token
  user{
		_id
    firstName
    lastName
    employeeId
    department
    level
    password
  }}}

`