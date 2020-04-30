const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=ef3ad3026d6c8959226ee192150f7b2e&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)
    request({url, json: true}, (error, {body} = {}) =>{
        if(error){
            callback('Unable to connect to the internet :(', undefined)
        }
        else if(body.error){
            callback('No such location!')
        }
        else{
            const temp = body.current.temperature
            const app_temp = body.current.feelslike
            const condition = body.current.weather_descriptions[0]
            const data = `Its currently ${temp} degrees out and it feels like ${app_temp} degrees and its ${condition}`
            callback(undefined, data)
        }
    })
}

module.exports = forecast