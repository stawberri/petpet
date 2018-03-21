const { Observable } = require('rxjs')
const { StarvationError } = require('./../errors')

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
      if (value <= 0) throw new StarvationError()
      else return value
    })
}
