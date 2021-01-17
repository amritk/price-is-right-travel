/**
 * A very basic API server for serving mock API data from https://www.mockaroo.com/ 
 * Using a json file for the sake of this example app, would normally use MySQL or MariaDB
 * Schema is also over simplified for the example, would normally be multiple tables
 * It is also lacking proper error handling
 */

const express = require('express')
const cors = require('cors')
const trips = require('./database/trips.json')
const app = express()
const port = 3001

// Make sure to allow CORS
app.use(cors())

/**
 * Return a list of all of the city names
 */
app.get('/cities', (req, res) => {

  try {
    // Simple map to grab city names
    const cityNames = trips.map(entry => entry.destination)
    // Make sure they are unique
    const unique = [...new Set(cityNames)]
    res.json(unique)
  }
  catch (e) {
    console.log(e)
    res.send('There was an unexpected error')
  }
})

/**
 * Return a list of "popular" trips
 */
app.get('/popular', (req, res) => {

  try {
    // Shuffle the trips then take first 10
    const popular = trips.sort(() => Math.random() - 0.5).slice(0, 8)
    res.json(popular)
  }
  catch (e) {
    console.log(e)
    res.send('There was an unexpected error')
  }
})

/**
 * "Query" the "database" fro trips using the following query parameters
 * @param { string } destination the destination city
 * @param { date } startDate the date that the trip begins
 * @param { date } endDate the date that the trip ends
 * @param { number } minPrice the lower end of the budget
 * @param { number } maxPrice the higher end of the budget
 */
app.get('/trips', (req, res) => {
  
  try {
    const destination = req.query.destination 
    const minPrice = parseFloat(req.query.minPrice)
    const maxPrice = parseFloat(req.query.maxPrice)
    const startDate = new Date(req.query.startDate)
    const endDate = new Date(req.query.endDate)
    
    let completeMatches = []
    let partialMatches = []
    
    // Using a simple loop for "querying"
    trips.forEach(trip => {
      const destinationPasses = destination.toLowerCase() === trip.destination.toLowerCase()
      const datePasses = new Date(trip.start_date).getTime() === startDate.getTime() 
      && new Date(trip.end_date).getTime() === endDate.getTime()
      const pricePasses = trip.price >= minPrice && trip.price <= maxPrice
      
      // We have a perfect match
      if (destinationPasses && pricePasses && datePasses) {
        completeMatches.push(trip)
      }
      // We have a partial match
      else if (destinationPasses || pricePasses || datePasses) {
        partialMatches.push(trip)
      }
    })

    // Sort by price
    completeMatches = completeMatches.sort(trip => trip.price)
    partialMatches = partialMatches.sort(trip => trip.price)
    
    res.json({
      completeMatches,
      partialMatches
    })
  }
  catch(e) {
    console.log(e)
    res.send('There was an unexpected error')
  }
})

app.listen(port, () => console.log(`API is now listening on port ${port}!`))
