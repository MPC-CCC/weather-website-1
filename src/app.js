const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Cris'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Cristian'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Cristian'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-Page', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Cris'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide a valid address'
        })
    } 
        geocode(address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({ error })
            }

                forecast(latitude, longitude, (error, forecastData) => {
                    if (error) {
                        return res.send({ error })
                    }

                    res.send({
                        forecast: forecastData,
                        location,
                        address
                    })
                })
        })
})

app.get('/products', (req, res) => {
    
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404-Page', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Cris'
    })
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
