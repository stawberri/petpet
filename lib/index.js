const { Observable, Subject } = require('rxjs')
const defaults = require('./config')
const stats = require('./stats')

module.exports = class Petpet {
  constructor(config = {}) {
    const { interval } = { ...defaults, ...config }

    this._events = new Subject()
    const allEvents = Observable.merge(
      this._events,
      Observable.interval(interval).map(() => ({ type: 'interval' }))
    )

    const error = Observable.concat(
      allEvents,
      Observable.throw(new Error('Events stream completed unexpectedly'))
    )
    this.promise = error.toPromise()

    this._stats = allEvents.let(stats).shareReplay(1)
    this._stats.subscribe({ error: err => this._events.error(err) })
    this._events.next({})
  }

  then(...args) {
    return this.promise.then(...args)
  }

  catch(...args) {
    return this.promise.catch(...args)
  }

  finally(...args) {
    return this.promise.finally(...args)
  }

  kill() {
    this._events.error(new Error('Kill method called'))
  }

  stats() {
    return this._stats.first().toPromise()
  }
}
