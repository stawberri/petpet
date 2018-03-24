const packageData = require('../../package.json')
const Petpet = require('..')

module.exports = class {
  constructor(config) {
    this._petpet = new Petpet(config)
  }

  petpet() {
    return packageData.version
  }
}
