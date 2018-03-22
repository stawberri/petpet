const { Observable } = require('rxjs')
const { UnhappinessError } = require('./../errors')

module.exports = function(events = Observable.empty()) {
  return events
    .scan((acc, { type }) => {
      switch (type) {
        case 'interval':
          return (acc -= 0.00002)

        default:
          return acc
      }
    }, 0.5)
    .map(value => {
      if (value <= 0) throw new UnhappinessError()
      else if (value >= 1) return 1
      else return value
    })
}
