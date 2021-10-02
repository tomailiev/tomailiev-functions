const nodemailer = require("nodemailer");

module.exports =  function (req, res) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Allow-Headers': 'content-type',
        'Access-Control-Max-Age': 2592000,
    }
    res.set(headers);
    if (req.method.toUpperCase() === 'OPTIONS') {
        // res.writeHead(204, headers);
        res.status(204).end();
        return;
    }
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        res.status(400).json({ message: 'Invalid input. Try again.' });
        return;
    }
    let transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com", //replace with your email provider
        port: 587,
        auth: {
            user: "toma@tomailiev.com", //replace with the email address
            pass: "R9>iPmST" //replace with the password
        }
    });


    transporter.verify(function (err, success) {
        if (err) {
            console.log(err);
            return;
        }
    });

    transporter.sendMail({
        from: 'toma@tomailiev.com',
        replyTo: email, // sender address
        to: "iliev.toma@gmail.com", // list of receivers
        subject: `${subject} from ${name}`, // Subject line
        text: message, // plain text message
    }).then(function (data) {
        if (data.rejected.length > 0) {
            throw new Error('Message rejected');
        }
        res.status(200).json({ messageId: data.messageId });
    }).catch(function (err) {
        res.status(400).json({ message: err });
    });
}
