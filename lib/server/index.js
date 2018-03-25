/* eslint-disable no-console */
const express = require('express')
const graphqlHTTP = require('express-graphql')
const defaults = require('../config')
const schema = require('./schema')
const Data = require('./data')

module.exports = (userConfig = {}) => {
  const config = { ...defaults, ...userConfig }
  const { port, silent, graphiql } = config

  const app = express()

  app.use(graphqlHTTP({ schema, rootValue: new Data(config), graphiql }))

  return app.listen(port, () => {
    if (!silent) {
      console.log(`Launched petpet server at http://localhost:${port}/`)
    }
  })
}
