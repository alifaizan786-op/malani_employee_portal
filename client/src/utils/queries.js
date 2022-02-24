
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