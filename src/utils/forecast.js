const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/8977b93f1b2f9ba9cf528d50c6341365/${encodeURIComponent(lat)},${encodeURIComponent(long)}?units=si`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forecast services', undefined)
        } else if (body.error) {
            callback('Coordinates are incorrect', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees outside. There is a ${body.currently.precipProbability}% chance of rain`)
        }
    })
}

module.exports = forecast