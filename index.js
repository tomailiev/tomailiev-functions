const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const emailService = require('./emailService');
const getOdesliLinks = require('./getOdesliLinks');
const addMap = require('./addMap');
const admin = require('firebase-admin');
admin.initializeApp();
const app = express();
app.use(cors());
app.get('/odesli', getOdesliLinks);
app.post('/email', emailService);

function preProcessText(input = '') {
    return input.split(' ').join('+').trim();
}

exports.sendEmail = functions.https.onRequest(emailService);

exports.addMap = functions.firestore.document('/events/{documentId}')
    .onCreate(addMap);

exports.api = functions.https.onRequest(app);

