const { Subject } = require('rxjs')
const getHappiness = require('./happiness')

it('goes down', () => {
  const subject = new Subject()
  const next = jest.fn()

  subject.let(getHappiness).subscribe(next)

  subject.next({})
  const [[originalValue]] = next.mock.calls
  expect(originalValue).toEqual(expect.any(Number))

  subject.next({ type: 'interval' })
  const [, [newValue]] = next.mock.calls
  expect(newValue).toBeLessThan(originalValue)

  subject.next({ type: 'interval' })
  subject.next({})
  expect(next).toHaveBeenCalledTimes(4)
})

it('goes up from headpats', () => {
  const subject = new Subject()
  const next = jest.fn()

  subject.let(getHappiness).subscribe(next)

  subject.next({})
  const [[originalValue]] = next.mock.calls

  subject.next({ type: 'headpats' })
  const [, [newValue]] = next.mock.calls
  expect(newValue).toBeGreaterThan(originalValue)
})
