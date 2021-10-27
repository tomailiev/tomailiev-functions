const fetch = require('node-fetch');
const apiUri = 'https://api1.tix.com/api/onlinesales/events/organization/2641';
const tixUri = `${apiUri}/event/`;

function getAbsEvents() {
    fetch(apiUri)
        .then(x => x.json())
        .then(({ payload: groupedEvents }) => {
            return groupedEvents.reduce((prev, curr) => {
                return prev.concat(curr.map(event => {
                    return {
                        dateTime: event.EventDate,
                        eventName: event.ProductionName,
                        eventUrl: `${tixUri}${event.EventID}`,
                        groupName: 'American Bach Soloists',
                        location: `${event.VenueCity} ${event.VenueState}`,
                        venue: event.VenueName,
                    };
                }));
            }, []);
        })
        .catch(console.error);
}

module.exports = getAbsEvents;
