const axios = require('axios');
const chrono = require('chrono-node');

const BASE_URL = 'https://v6.db.transport.rest';

function parseTime(time) {
    const parsedDate = chrono.parseDate(time);
    return parsedDate.toISOString();
}

async function getLocationId(locationName) {
    const response = await axios.get(`${BASE_URL}/locations`, { params: { query: locationName } });
    return response.data[0].id;
}

async function getJourneys(locationA, locationB, departure) {
    const locationAId = await getLocationId(locationA);
    const locationBId = await getLocationId(locationB);
    const params = { from: locationAId, to: locationBId };
    if (departure) {
        params.departure = parseTime(departure);
    }
    const response = await axios.get(`${BASE_URL}/journeys`, { params: params });
    return response.data.journeys;
}

// async function main(locationA, locationB, departure) {
//     const journeys = await getJourneys(locationA, locationB, departure);
//     console.log(journeys);
// }

// main('Hamburg', 'Berlin', 'in 2 hours');  // With departure time
// main('Hamburg', 'Berlin');  // Without departure time


module.exports = {
    getJournyes: getJourneys
}