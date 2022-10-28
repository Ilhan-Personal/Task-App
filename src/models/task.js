const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const validator = require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
})
const taskSchema = new mongoose.Schema({
    name : {
        type: String,
        trim:true,
        required:true
    },
    completed : {
        type : Boolean, 
        default:false
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'user'
    }
}, {
    timestamps : true
})

const task = mongoose.model('task',taskSchema)

module.exports = task