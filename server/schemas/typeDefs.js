const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id : ID
        firstName : String
        lastName : String
        employeeId : String
        department : String
        level : Int
        password: String
    }
    
    type Task {
        _id : ID
        status : String
        title : String
        description : String
        user : User
        dueDate : String  
    } 

    type Quotes {
        _id : ID
        quotes : String
    }

    type Review {
        _id : ID
        managerIdR : User
        employeeIdR : User
        month : String
        review : String
    }
    
    type Query{
      users : [User]
      tasks : [Task]
      quotes : [Quotes]
      reviews : [Review]
      user(serachid: String) : User


    }`

module.exports = typeDefs;