const { Subject } = require('rxjs')
const getSatiety = require('./satiety')

it('goes down', () => {
  const subject = new Subject()
  const next = jest.fn()

  getSatiety(subject).subscribe(next)

  subject.next({})
  const [[originalValue]] = next.mock.calls
  expect(typeof originalValue).toBe('number')

  subject.next({ type: 'interval' })
  const [, [newValue]] = next.mock.calls
  expect(newValue).toBeLessThan(originalValue)

  subject.next({ type: 'interval' })
  subject.next({})
  expect(next).toHaveBeenCalledTimes(4)
})
