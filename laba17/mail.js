const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'shawn.king86@ethereal.email',
        pass: 'zYQTv8nYPuXUHYSVs4'
    }
},
{from: "Mailer user shawn.king86@ethereal.email",}
);

const sendmailer = message => {
transport.sendMail(message, function (err,response) {
    if (err) console.log(err);
    else console.log("Message sent: " +response.message);
    })
};

module.exports = sendmailer