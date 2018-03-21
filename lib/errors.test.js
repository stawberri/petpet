const errors = require('./errors')

test('everything is an error', () => {
  for (const key in errors) {
    expect(new errors[key]()).toBeInstanceOf(Error)
  }
})
