module.exports = class Stats {
  constructor(petpet) {
    this._petpet = petpet
  }

  _stats() {
    return this._petpet.stats()
  }

  async happiness() {
    const { happiness } = await this._stats()
    return happiness
  }
}
