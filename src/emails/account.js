const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'ilhan.syed@gmail.com',
        pass: process.env.APP_PASSWORD
    }
})

// const mailOptions = {
//     from : 'ilhan.syed@gmail.com',
//     to : 'sf5464@srmist.edu.in',
//     subject : 'Sending email using Node js',
//     text : 'amukku dumukku'
// }
// transporter.sendMail(mailOptions,(error,info)=>{
//     if(error){
//         console.log(error)
//     }
//     else{
//         console.log(info)
//     }
// })

const sendWelcomeEmail = (email,name) =>{
    const mailOptions = {
        from : 'ilhan.syed@gmail.com',
        to : email,
        subject : 'WELCOME !!!',
        text : `Welcome to the app ${name}. Let me know how you like the app !`
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(error)
        }
    })
}
const cancellationEmail = (email,name)=>{
    const mailOptions = {
        from : 'ilhan.syed@gmail.com',
        to : email,
        subject : 'Can\'t see you go !',
        text : `Hello ${name}. We're sorry you're cancelling our subscription. Please let us know how we can do better`
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(error)
        }
    })
}
module.exports = {
    sendWelcomeEmail,
    cancellationEmail
}