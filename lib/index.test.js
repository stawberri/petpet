jest.useFakeTimers()

const Petpet = require('.')

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

test('headpats', async () => {
  const pet = new Petpet()
  const { happiness: originalHappiness } = await pet.stats()

  await pet.headpats()

  const { happiness } = await pet.stats()
  expect(happiness).toBeGreaterThan(originalHappiness)

  pet.kill()
})
