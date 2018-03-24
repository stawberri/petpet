jest.useFakeTimers()

const { GraphQLClient } = require('graphql-request')
const portfinder = require('portfinder')
const launchServer = require('.')
let closeServer
let request

beforeAll(async () => {
  const port = await portfinder.getPortPromise()

  const server = launchServer({ port, silent: true })
  closeServer = server.close.bind(server)

  const client = new GraphQLClient(`http://localhost:${port}/`)
  request = client.request.bind(client)

  await new Promise(resolve => server.on('listening', resolve))
})

afterAll(() => {
  closeServer()
})

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
