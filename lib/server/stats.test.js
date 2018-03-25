jest.useFakeTimers()
jest.mock('.')

const request = require('.')()

it('has stats', async () => {
  const data = await request(`
  {
    stats {
      happiness
    }
  }
  `)
  expect(data).toMatchObject({
    stats: expect.objectContaining({ happiness: expect.any(Number) })
  })
})

it('is live', async () => {
  const originalData = await request('{ stats { happiness } }')
  const originalHappiness = originalData.stats.happiness

  jest.advanceTimersByTime(5000)

  const data = await request('{ stats { happiness } }')
  const happiness = data.stats.happiness

  expect(happiness).toBeLessThan(originalHappiness)
})
