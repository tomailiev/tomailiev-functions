const functions = require('firebase-functions');
const emailService = require('./emailService');
const getOdesliLinks = require('./getOdesliLinks');
const admin = require('firebase-admin');
admin.initializeApp();

function preProcessText(input = '') {
    return input.split(' ').join('+').trim();
}

exports.sendEmail = functions.https.onRequest(emailService);

exports.addMap = functions.firestore.document('/events/{documentId}')
    .onCreate((snap, _context) => {
        const gApi = functions.config().eventservice.g_api;
        const { location, venue } = snap.data();
        const mapCoordinates = `https://www.google.com/maps/embed/v1/place?key=${gApi}&q=${preProcessText(venue)},${preProcessText(location)}`;
        return snap.ref.set({ mapCoordinates }, { merge: true });
    });

exports.getOdesliLinks = functions.https.onRequest(getOdesliLinks);

