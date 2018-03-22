const { Subject } = require('rxjs')
const stats = require('./index')

it('has happiness stat', () => {
  const subject = new Subject()
  const next = jest.fn()

  subject.let(stats).subscribe(next)

  subject.next({})
  expect(next).toHaveBeenCalledWith(
    expect.objectContaining({ happiness: expect.any(Number) })
  )
})
