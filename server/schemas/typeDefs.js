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
        description : String
        user : User
        dueDate : String  
        createDate : String
        recurring : Boolean
        renewIn : Int
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
        createDate : String
    }

    type Bulletin {
        _id : ID
        user : User
        title : String
        body : String
        date : String
        acknowledge : [User]
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
        reviewUId(employeeUId : ID) : [Review]
        userActive : [User]
        taskByEmp(emp:ID) : [Task]
        bulletins : [Bulletin]
    }

    type Mutation{
        addTask(
            description :String!, 
            user :ID!, 
            dueDate :String!, 
            recurring : Boolean!,
            renewIn : Int  ) : Task

        updateTask( 
            status :String,  
            description :String, 
            _id :ID, 
            dueDate :String, 
            recurring :Boolean,
            renewIn: Int ) : Task

        deleteTask(
            _id : ID ) : Task

        addUser (
            firstName:String,
            lastName:String,
            employeeId:String,
            department:String,
            level :  Int,
            password:String) : User 

        updateUser (
            _id:ID, 
            firstName:String ,
            lastName:String ,
            employeeId:String ,
            department:String ,
            level :Int,
            active : String ) : User

        deleteUser (
            _id:ID) : User

        updateQuotes (
            _id:ID,
            quotes:String): Quotes

        addReview(
            manager: ID,
            employee: ID, 
            month: String,
            review: String ) : Review

        deleteReview (
            _id:ID) : Review

        login( employeeId : String!, password: String!): Auth

        updatePassword(
             _id:ID,
             oldPassword:String
             newPassword:String) : User
        
        upadateStatus(
            _id:ID,
            status:String
        )  : Task

        addBulletin(
            user : ID
            title : String
            body : String
        ) : Bulletin

        acknowledgeBulletin(
            _id : ID
            acknowledge:ID
        ) : Bulletin

        updateBulletin(
            _id : ID
            title : String
            body : String
        ) : Bulletin

        deleteBulletin(
            _id : ID
        ) : Bulletin
        


    }`

module.exports = typeDefs;