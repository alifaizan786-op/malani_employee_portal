const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id : ID
        firstName : String
        lastName : String
        employeeId : String
        department : String
        level : Int
        password : String 
        active : String
    }
    
    type Task {
        _id : ID
        status : String
        title : String
        description : String
        user : User
        dueDate : String  
        createDate : String
        recurring : String
    } 

    type Quotes {
        _id : ID
        quotes : String
    }

    type Review {
        _id : ID
        manager : User
        employee : User
        month : String
        review : String
    }
     type Auth{
        token : ID
        user : User
    }
    
    type Query{
        users : [User]
        tasks : [Task]
        quotes : [Quotes]
        reviews : [Review]
        userId(userId: ID) : User
        taskUId(taskUId: ID) : Task  
        reviewUId(managerUId : ID, employeeUId : ID) : Review
        userActive : [User]
    }

    type Mutation{
        addTask(
            title :String, 
            description :String, 
            employeeId :ID, 
            dueDate :String, 
            recuuring :String  ) : Task

        updateTask( 
            status :String, 
            title :String, 
            description :String, 
            _id :ID, 
            dueDate :String, 
            recuuring :String ) : Task

        deleteTask(
            _id : ID ) : Task

        addUser (
            firstName:String,
            lastName:String,
            employeeId:String,
            department:String,
            level :  Int,
            password:String,
            active : String ) : User 

        updateUser (
            _id:ID, 
            firstName:String ,
            lastName:String ,
            employeeId:String ,
            department:String ,
            level :Int,
            password:String,
            active : String ) : User

        deleteUser (
            _id:ID) : User

        updateQuotes (
            _id:ID,
            quotes:String): Quotes

        addReview(
            managner: ID,
            employee: ID, 
            month: String,
            review: String ) : Review

        deleteReview (
            _id:ID) : Review

        login( employeeId : String!, password: String!): Auth
        


    }`

module.exports = typeDefs;