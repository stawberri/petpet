const { Subject } = require('rxjs')
const getHappiness = require('./happiness')

it('goes down', () => {
  const subject = new Subject()
  const next = jest.fn()

  getHappiness(subject).subscribe(next)

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
