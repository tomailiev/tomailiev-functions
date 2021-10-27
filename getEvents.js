const groups = require('./groups/index');
module.exports = function getEvents(req, res) {
    groups[req.query.group]()
        .then(e => res.status(200).json(e))
        .catch(console.error);
}