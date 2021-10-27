const fetch = require('node-fetch');
const apiUri = 'https://www.cityboxoffice.com/include/widgets/events/performancelist.asp?fromDate=&toDate=&venue=0&city=&swEvent=0&category=33&searchString=&searchType=0&showHidden=0&showPackages=1&action=perf&listPageSize=35&listMaxSize=999&page=1&cp=0';
const tixUri = 'https://www.cityboxoffice.com/ordertickets.asp?p=';
function getPhilEvents() {
    return fetch(apiUri)
        .then(x => x.json())
        .then(({ performance }) => {
            return performance.reduce((prev, curr) => {
                return prev.concat({
                    dateTime: curr.PerformanceDateTime,
                    eventName: curr.PerformanceName,
                    eventUrl: `${tixUri}${curr.PerformanceID}`,
                    groupName: curr.Event,
                    location: `${curr.VenueCity} ${curr.VenueState}`,
                    venue: curr.Venue,
                });
            }, []);
        })
        .catch(console.error);
}

module.exports = getPhilEvents;