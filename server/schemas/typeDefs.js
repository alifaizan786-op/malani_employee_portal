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
    
    type Query{
      users : [User]
      tasks : [Task]
      user(serachid: String) : User

    }`

module.exports = typeDefs;