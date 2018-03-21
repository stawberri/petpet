const { Observable } = require('rxjs')
const happiness = require('happiness')

module.exports = function(events = Observable.empty()) {
  return Observable.merge(happiness(events).ignoreElements)
}
