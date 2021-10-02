const odesliUri = 'https://api.song.link/v1-alpha.1/links?userCountry=US&url='

module.exports = function (req, res) {
    fetch(`${odesliUri}${encodeURIComponent(req.body.url)}`)
        .then(x => {
            res.status(200).json(x)
        })
        .catch(e => {
            res.status(500).json({ message: e })
        });
}
