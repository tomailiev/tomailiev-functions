function errorHandler(err, req, res) {
    console.log('error-handler kicks in now');
    if (err.type === 'invalid-json') {
        res.status(400).json({message: 'Provider api returned unexpected format', name: 'bad json'});
    }
}

module.exports = errorHandler;