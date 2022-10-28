const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const task = require('./task')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
})
// mongoose supports middleware which helps you modify the mongoose model

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required:true
    },
    email:{
        type:String,
        unique : true,
        required : true,
        validate:{
            validator: v => validator.isEmail(v),
            message : props => `${props.value} is not an email`
        }
    },
    password : {
        type : String,
        required : true,
        minLength : 6,

        validate : {
            validator : v => !(v.includes('password')),
            message : props => `${props.value} is not valid`
        }
    },
    date : {
        type : Date,
        default : Date.now()
    },
    age : {
        type : Number,
        required : true
    },
    tokens:[{
        token: {
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
},
    {
        timestamps : true
})

userSchema.virtual('tasks',{
    ref:'task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.generateAuthToken = async function(){
    const user = this 
    const token = jwt.sign({_id:user._id.toString()},'alwayslookonthebrightside')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async function(email,password){

    const foundUser = await user.findOne({email})
    if(!foundUser){
            console.log('unable to login')
    }
    const isMatch = await bcrypt.compare(password,foundUser.password)
    if(!isMatch){
            throw new Error('unable to login')
    }
    return foundUser
}
userSchema.methods.toJSON = function(){
    const user = this 
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}
// pre involves doing something before an event 
userSchema.pre('save', async function(next){
    const user = this 
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})
userSchema.pre('remove',async function(next){
    const user = this
    await task.deleteMany({owner:user._id})
    next()
})
const user = mongoose.model('user',userSchema)

module.exports = user