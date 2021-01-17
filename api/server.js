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
    console.error(e)
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
    console.error(e)
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
app.get('/trips', async (req, res) => {
  
  try {
    const destination = req.query.destination 
    const minPrice = parseFloat(req.query.minPrice)
    const maxPrice = parseFloat(req.query.maxPrice)
    const duration = req.query.duration

    // Force statDate to be same format 
    const startDateSplit = req.query.startDate.split('-')
    const startDate = new Date(`${startDateSplit[1]}/${startDateSplit[2]}/${startDateSplit[0]}`)
    
    let completeMatches = []
    let partialMatches = []
    
    // Using a simple loop for "querying"
    trips.forEach(trip => {

      // Check if trip passes query parameters
      const destinationPasses = destination.toLowerCase() === trip.destination.toLowerCase()
      const pricePasses = trip.price >= minPrice && trip.price <= maxPrice
      const startDatePasses = new Date(trip.start_date).getTime() === startDate.getTime() 
      
      // Duration is a bit more complex, values of 
      // 1 = 1 night
      // 2 = 2-3 nights
      // 3 = 3-5 nights
      // 5 = 5-8 nights
      let lower = 1
      let upper = 1
      switch(parseInt(duration)) {
        case 2:
          lower = 2
          upper = 3
          break;
        case 3:
          lower = 3
          upper = 5
          break;
        case 5:
          lower = 5
          upper = 8
          break;
      }
      // Set into lower and upper dates
      const durationPasses = lower <= trip.duration && trip.duration <= upper

      // We have a perfect match
      if (destinationPasses && pricePasses && startDatePasses && durationPasses) {
        completeMatches.push(trip)
      }
      // We have a partial match
      else if (destinationPasses || pricePasses || startDatePasses && durationPasses) {
        partialMatches.push(trip)
      }
    })

    // Sort by price
    completeMatches = completeMatches.sort((a, b) => a.price - b.price)
    partialMatches = partialMatches.sort((a, b) => a.price - b.price).slice(0, 8)

    // Add artificial delay to show loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    res.json({
      completeMatches,
      partialMatches
    })
  }
  catch(e) {
    console.error(e)
    res.send('There was an unexpected error')
  }
})

app.listen(port, () => console.log(`API is now listening on port ${port}!`))
