const groups = require('./groups/index');
module.exports = function getEvents(req, res, next) {
    groups[req.query.group]()
        .then(e => res.status(200).json(e))
        .catch(err => {
            return next(err)
        });
}