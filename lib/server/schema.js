const { buildSchema } = require('graphql')

module.exports = buildSchema(`
type Stats {
  happiness: Float
}

type Query {
  petpet: String
  stats: Stats
}
`)
