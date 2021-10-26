const fetch = require('node-fetch');
const odesliUri = 'https://api.song.link/v1-alpha.1/links?userCountry=US&url='

module.exports = function (req, res) {
    console.log(req.query);
    const url = req.query.uri;
    fetch(`${odesliUri}${url}`)
        .then(x => x.json())
        .then(links => {
            res.status(200).json(links);
        })
        .catch(e => {
            res.status(500).json({ message: e })
        });
}
