const packageData = require('../../package.json')
const Petpet = require('..')

let singleton

module.exports = class {
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
}
