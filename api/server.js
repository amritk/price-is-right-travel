/**
 * A very basic API server for serving mock API data from https://www.mockaroo.com/ 
 * Using a json file for the sake of this example app, would normally use MySQL or MariaDB
 * Schema is also over simplified for the example, would normally be multiple tables
 */

const express = require('express')
const app = express()
const port = 3001

app.listen(port, () => console.log(`API is now listening on port ${port}!`))
