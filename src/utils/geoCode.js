const request = require('request')

const geoCode = (address, callback) =>{
    const location = encodeURIComponent(address)
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token=pk.eyJ1IjoiYXl1c2htb3JhbmthciIsImEiOiJjazlpMzByNTEwNG40M21vNWdoYWVmaDJiIn0.BsDPZ5x0glG-AS13OeJU0A&limit=1'

    request({url, json: true}, (error, {body} = {}) =>{
        if(error){
            callback('Unable to connect to the internet :(', undefined)
        }
        else if(body.features.length===0){
            callback('No such location', undefined)
        }
        else{
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geoCode