jest.useFakeTimers()
jest.mock('.')

const request = require('.')()

test('correct version', async () => {
  const { petpet } = await request('{ petpet }')
  expect(petpet).toBe(require('../../package.json').version)
})

it('accepts headpats', async () => {
  const originalData = await request('{ stats { happiness } }')
  const originalHappiness = originalData.stats.happiness

  await request('mutation { headpats headpats headpats }')

  const { stats: { happiness } } = await request('{ stats { happiness } }')
  expect(happiness).toBeGreaterThan(originalHappiness)
})
