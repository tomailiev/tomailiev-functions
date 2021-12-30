function errorHandler(err, req, res, next) {

    if (err.type === 'invalid-json') {
        res.status(400).json({ message: 'Provider api returned unexpected format', reason: 'bad json' });
        return;
    }
    res.status(500).json({ ...err, message: 'unknown error' });
}

module.exports = errorHandler;