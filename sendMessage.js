const nodemailer = require("nodemailer");
const { emailservice } = require('./config');

module.exports = function sendEmail(snap, _context) {
    const { name, email, subject, message } = snap.data();
    if (!name || !email || !subject || !message) {
        throw new Error('Insufficient information');
    }

    const { host, port, user, pass } = emailservice;
    let transporter = nodemailer.createTransport({
        host,
        port,
        auth: {
            user, //replace with the email address
            pass //replace with the password
        }
    });


    transporter.verify(function (err, success) {
        if (err) {
            console.log(err);
            return;
        }
    });

    return transporter.sendMail({
        from: 'toma@tomailiev.com',
        replyTo: email, // sender address
        to: "iliev.toma@gmail.com", // list of receivers
        subject: `${subject} from ${name}`, // Subject line
        text: message, // plain text message
    })
        .then(data => {
            if (data.rejected.length > 0) {
                throw new Error('Message rejected');
            }
            return snap.ref.set({ messageId: data.messageId }, { merge: true });
        })
        .catch(err => {
            throw new Error(err);
        });
}