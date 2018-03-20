const { Observable } = require('rxjs')
const defaultConfig = require('./config')

class Petpet {
  constructor(userConfig = {}) {
    const { interval } = { ...defaultConfig, ...userConfig }

    const data = $(this)

    data.intervals = Observable.interval(interval).share()

    const satietyEvents = data.intervals.map(() => -0.1)
    const satiety = satietyEvents.scan((acc, value) => acc + value, 1)

    const errors = Observable.concat(
      Observable.merge(
        satiety.filter(value => {
          if (value <= 0) throw new Petpet.StarvationError()
        })
      ),
      Observable.throw(new Error())
    )

    data.promise = errors.toPromise()
    errors.subscribe({ error: error => (data.error = error) })
  }

  then(...args) {
    return $(this).promise.then(...args)
  }

  catch(...args) {
    return $(this).promise.catch(...args)
  }

  finally(...args) {
    return $(this).promise.finally(...args)
  }
}

function $(petpet) {
  if (!$.map) $.map = new WeakMap()
  if (!$.map.has(petpet)) $.map.set(petpet, {})
  return $.map.get(petpet)
}

Petpet.StarvationError = class extends Error {}

module.exports = Petpet
