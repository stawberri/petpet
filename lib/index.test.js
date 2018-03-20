jest.useFakeTimers()

const Petpet = require('./index')

it('eventually errors without input', async () => {
  const pet = new Petpet()
  jest.runAllTimers()
  await expect(pet).rejects.toThrow()
})
