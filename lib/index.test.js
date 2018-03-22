jest.useFakeTimers()

const Petpet = require('./index')

it('eventually errors without input', async () => {
  const pet = new Petpet()
  jest.runAllTimers()
  await expect(pet).rejects.toThrow()
})

it('can be killed via method', async () => {
  const pet = new Petpet()
  pet.kill()
  await expect(pet).rejects.toThrow()
})

test('getting stats', async () => {
  const pet = new Petpet()
  await expect(pet.stats()).resolves.toMatchObject({
    happiness: expect.any(Number)
  })
  jest.runAllTimers()
  await expect(pet).rejects.toThrow()
  await expect(pet.stats()).rejects.toThrow()
})
