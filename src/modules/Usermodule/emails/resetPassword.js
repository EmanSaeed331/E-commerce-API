const sgMail = require('@sendgrid/mail')
const User = require('../models/userModel')
sgMail.setApiKey(process.env.SEND_API_KEY)
const sendResetPasswordEmail = async (email,token)=>{

    await  sgMail.send({
        to: email,
        from: "es9557403@gmail.com",
        subject: "Password Recovery",
        html: `<body>
        <p>Click to set a new password : <a href="yoururl/password/reset/${token}">Reset password</a></p>

        </body>`
    })

}
module.exports = sendResetPasswordEmail