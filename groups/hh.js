const fetch = require('node-fetch');
const apiUri = 'https://cart.handelandhaydn.org/api/products/productionseasons';
const tixUri = 'https://cart.handelandhaydn.org/';
const performanceUri = 'https://cart.handelandhaydn.org/api/syos/GetPerformanceDetails?performanceId='

const today = Date.now();
const future = today + 31556952000;

// await fetch("https://cart.handelandhaydn.org/api/syos/GetPerformanceDetails?performanceId=1128", {
//     "credentials": "include",
//     "headers": {
//         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0",
//         "Accept": "application/json, text/javascript, */*; q=0.01",
//         "Accept-Language": "en-US,en;q=0.5",
//         "Content-Type": "application/json",
//         "X-Requested-With": "XMLHttpRequest",
//         "Sec-Fetch-Dest": "empty",
//         "Sec-Fetch-Mode": "cors",
//         "Sec-Fetch-Site": "same-origin",
//         "Cache-Control": "max-age=0"
//     },
//     "referrer": "https://cart.handelandhaydn.org/1150/1128",
//     "method": "GET",
//     "mode": "cors"
// });

function convertDate(ms) {
    const date = new Date(ms).toISOString()
    return date
        .substring(0, date.indexOf('.'))
        .concat('-05:00');
}
const options = {
    method: 'POST',
    body: JSON.stringify({
        "productionSeasonIdFilter": [],
        "keywordIds": null,
        "startDate": convertDate(today),
        "endDate": convertDate(future),
        "keywords": []
    }),
    headers: {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Content-type": "application/json"
    }
}

function getHhEvents() {
    return fetch(apiUri, options)
        .then(x => x.json())
        .then((payload) => {
            return payload.reduce((prev, curr) => {
                return prev.concat(curr.performances.map(perf => {
                    return {
                        id: perf.id,
                        dateTime: perf.iso8601DateString,
                        eventName: perf.performanceTitle,
                        eventUrl: perf.actionUrl,
                        location: '',
                        venue: perfInfo.facility_desc
                    };
                }))
            }, []);
        })
        .catch(console.error);
}

module.exports = getHhEvents;