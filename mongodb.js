// CRUD operations
const {MongoClient,objectId, ObjectId} = require('mongodb')
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
// MongoClient is used to connect to our mongodatabase
// installed mongodb native library
// Connected to mongodb database using mongoclient

// const id =  ObjectId()
// console.log(id)
// console.log(id.getTimestamp())


function insert(error,result){
    if(error){
        return console.log('Unable to insert user')
    }
    console.log(result.ops)
}
MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log('Unable to connect to database')
    }

    console.log('Connected correctly')
    //returns a database reference
    const db = client.db(databaseName)
    db.collection('users').insertOne({
        _id:id,
        name:'vikram',
        age : 39
    },(error,result)=>{
        if(error){
            return console.log('Unable to insert user')
        }
        console.log(result.acknowledged)
    })
    db.collection('users').insertMany([
        {
            name:'renny',
            age:20
        },
        {
            name:'aarchit',
            age:19
        }
    ],(error,result)=>{
        if(error){
            return console.log('Unable to insert documents')
        }
        console.log(result.acknowledged)
    })
   
})

