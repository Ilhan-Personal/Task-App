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
  
    // db.collection('users').findOne({name:'vikram',age:1},(error,user)=>{

    //     if(error){
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user)
    // })
    // .find() returns a cursor back
    // db.collection('users').find({age:19}).toArray((error,musers)=>{
    //     console.log(musers)
    // })
    // const updatePromise = db.collection('users').updateOne({
    //                             _id : new ObjectId("6312175aece4c43fe82bfc1e")
    //                         },{
    //                             $set:{
    //                                 name:'Mike'
    //                             }
    //                         })
    // updatePromise.then((result)=>{
    //     console.log(result)
    // }).catch((err)=>{
    //     console.log(err)
    // })

    const updatePromise = db.collection('users').updateMany({
        age:19
    },{
        $set:{
            age:24
        }
    })

    updatePromise.then((result)=>{
        console.log(result)
    }).catch((err)=>{
        console.log(err)
    })

    const deletePromise = db.collection('users').deleteMany({
        age:24
    })
    deletePromise.then((result)=>{
        console.log(result)
    }).catch((err)=>{
        console.log(err)
    })
})


