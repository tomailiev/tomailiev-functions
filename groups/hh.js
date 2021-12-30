const fetch = require('node-fetch');
const apiUri = 'https://cart.handelandhaydn.org/api/products/productionseasons';
const tixUri = 'https://cart.handelandhaydn.org/';
const performanceUri = 'https://cart.handelandhaydn.org/api/syos/GetPerformanceDetails?performanceId='

const today = Date.now();
const future = today + 31556952000;


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
    // return fetch(apiUri, options)
    //     .then(x => x.json())
    //     .then((payload) => {
    //         return payload.reduce((prev, curr) => {
    //             return prev.concat(curr.performances.map(perf => {
    //                 return {
    //                     id: perf.id,
    //                     dateTime: perf.iso8601DateString,
    //                     eventName: perf.performanceTitle,
    //                     eventUrl: perf.actionUrl,
    //                     location: '',
    //                     venue: perfInfo.facility_desc
    //                 };
    //             }))
    //         }, []);
    //     })
    //     .catch(console.error);
    return fetch(apiUri, {
        // "credentials": "include",
        // "headers": {
        //     // "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0",
        //     "Accept": "application/json",
        //     "Accept-Language": "en-US,en;q=0.5",
        //     "Content-Type": "application/json",
        //     "X-Requested-With": "XMLHttpRequest",
        //     "Sec-Fetch-Dest": "empty",
        //     "Sec-Fetch-Mode": "cors",
        //     "Sec-Fetch-Site": "same-origin"
        // },
        // "referrer": "https://cart.handelandhaydn.org/events",
        "body": "{\"productionSeasonIdFilter\":[],\"keywordIds\":null,\"startDate\":\"2021-12-30T00:00:00-05:00\",\"endDate\":\"2023-06-30T23:59:59-04:00\",\"keywords\":[]}",
        "method": "POST",
        // "mode": "cors"
    }).then(x => x.json())
}

module.exports = getHhEvents;