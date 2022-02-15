// build and export your unconnected client here
const { Client } = require('pg')
const CONNECTIONSTRING = process.env.DATABASE_URL || 'postgres://localhost:5433/fitness-dev'
const client = new Client(CONNECTIONSTRING)

module.exports = client
