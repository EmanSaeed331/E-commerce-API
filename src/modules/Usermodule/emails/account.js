const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SEND_API_KEY)
/* const msg = {
    to: 'emansaeed5330@gmail.com', // Change to your recipient
    from: 'es9557403@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    }) */
const sendWelcomeEmail = async (email,name)=>{
   await sgMail.send({
        to:email,
        from:'es9557403@gmail.com',
        subject:`Welcom to Katy Cat ${name}, Let me know how you get along the app`
    })
}

module.exports = {sendWelcomeEmail}
    