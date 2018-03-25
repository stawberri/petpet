const { Observable } = require('rxjs')

module.exports = function(events = Observable.empty()) {
  return events
    .scan((acc, { type }) => {
      switch (type) {
        case 'interval':
          return acc - 0.00002

        case 'headpats':
          return acc + 0.01

        default:
          return acc
      }
    }, 0.5)
    .map(value => {
      if (value <= 0) throw new Error('Low happiness')
      else if (value >= 1) return 1
      else return value
    })
}
