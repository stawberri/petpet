const { Observable, Subject } = require('rxjs')
const happiness = require('./happiness')

module.exports = function(events = Observable.empty()) {
  const recursiveEvents = new Subject()
  const allEvents = Observable.merge(events, recursiveEvents)

  const observables = [happiness].map(observe =>
    allEvents.let(observe).distinctUntilChanged()
  )

  for (const observable of observables) {
    observable
      .catch(() => Observable.empty())
      .map(data => {
        if (!Array.isArray(data)) return
        else if (data.length < 2) return
        else return data.slice(1)
      })
      .filter(data => !!data)
      .subscribe(data => {
        for (const event of data) recursiveEvents.next(event)
      })
  }

  return Observable.combineLatest(...observables, happiness => ({ happiness }))
}
