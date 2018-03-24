const packageData = require('../../package.json')
const Petpet = require('..')

const Stats = require('./stats')

let singleton

module.exports = class Data {
  constructor(config) {
    if (singleton) throw new Error('Attempted to spawn two singleton instances')

    this._petpet = new Petpet(config)
    this._petpet.catch(error =>
      process.nextTick(() => {
        throw error
      })
    )
  }

  petpet() {
    return packageData.version
  }

  stats() {
    return new Stats(this._petpet)
  }
}
