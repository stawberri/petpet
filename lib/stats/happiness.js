const { Observable } = require('rxjs')
const { UnhappinessError } = require('./../errors')

module.exports = function(events = Observable.empty()) {
  return events
    .scan((acc, { type }) => {
      switch (type) {
        case 'interval':
          return (acc -= 0.1)

        default:
          return acc
      }
    }, 1)
    .map(value => {
      if (value <= 0) throw new UnhappinessError()
      else return value
    })
}
