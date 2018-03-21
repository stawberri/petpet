const { Observable, Subject } = require('rxjs')
const defaultConfig = require('./config')
const getSatiety = require('./stats/satiety')
const { StarvationError } = require('./errors')

class Petpet {
  constructor(userConfig = {}) {
    const { interval } = { ...defaultConfig, ...userConfig }

    const data = $(this)

    data.events = new Subject()
    const allEvents = Observable.merge(
      data.events,
      Observable.interval(interval).map(() => ({ type: 'interval' }))
    )

    const satiety = getSatiety(allEvents)

    Observable.merge(satiety)
      .ignoreElements()
      .subscribe({ error: err => data.events.error(err) })

    const error = Observable.concat(
      allEvents,
      Observable.throw(new Error('Events stream completed unexpectedly'))
    )
    data.promise = error.toPromise()
    data.promise.catch(() => {})
    error.subscribe({ error: error => (data.error = error) })
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

Petpet.StarvationError = StarvationError

module.exports = Petpet
