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
    res.json(cityNames)
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
 * @param { number } startPrice the lower end of the budget
 * @param { number } endPrice the higher end of the budget
 */
app.get('/trips', (req, res) => {
  
  try {
    const destination = req.query.destination 
    const startPrice = parseFloat(req.query.startPrice)
    const endPrice = parseFloat(req.query.endPrice)
    const startDate = new Date(req.query.startDate)
    const endDate = new Date(req.query.endDate)
    
    const completeMatches = []
    const partialMatches = []
    
    // Using a simple loop for "querying"
    trips.forEach(trip => {
      const destinationPasses = destination.toLowerCase() === trip.destination.toLowerCase()
      const datePasses = new Date(trip.start_date).getTime() === startDate.getTime() 
      && new Date(trip.end_date).getTime() === endDate.getTime()
      const pricePasses = trip.price >= startPrice && trip.price <= endPrice
      
      // We have a perfect match
      if (destinationPasses && pricePasses && datePasses) {
        completeMatches.push(trip)
      }
      // We have a partial match
      else if (destinationPasses || pricePasses || datePasses) {
        partialMatches.push(trip)
      }
    })
    
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
