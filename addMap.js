const { eventservice } = require('./config');

function preProcessText(input = '') {
    return input.split(' ').join('+').trim();
}

module.exports = function addMap(snap, _context) {
    const gApi = eventservice.g_api;
    const { location, venue } = snap.data();
    const mapCoordinates = `https://www.google.com/maps/embed/v1/place?key=${gApi}&q=${preProcessText(venue)},${preProcessText(location)}`;
    return snap.ref.set({ mapCoordinates }, { merge: true });
}