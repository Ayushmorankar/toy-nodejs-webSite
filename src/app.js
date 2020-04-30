const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Defined paths for Express config
const publicDirectoryPath = path.join(__dirname, '../Public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


//Setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        created: 'Created By: Ayush Morankar'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Us',
        created: 'Created By: Ayush Morankar'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        created: 'Created By: Ayush Morankar'
    })
})
app.get('/weather', (req, res) =>{
    const place = req.query.address
    if(!place){
        res.send({
            error: 'Please provide a location'
        })
        return
    }
    geoCode(place, (error, {location, longitude, latitude} = {}) =>{
        if(error){
            res.send({
                error,
            })
            return
        }
        forecast(latitude, longitude, (error, data) =>{
            if(error){
                res.send({
                    error,
                })
                return
            }
            res.send({
                data,
                location,
            })
        })
    })
})


app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: 'Help article not found',
        created: 'Created By: Ayush Morankar'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: 'Page not found',
        created: 'Created By: Ayush Morankar'
    })
})

app.listen(port, () =>{
    console.log('Server is up and running on port '+port)
})
