jest.useFakeTimers()

const { GraphQLClient } = require('graphql-request')
const portfinder = require('portfinder')
const launchServer = require('.')
let closeServer
let request

beforeAll(() => {
  return portfinder.getPortPromise().then(port => {
    const server = launchServer({ port, silent: true })
    closeServer = server.close.bind(server)

    const client = new GraphQLClient(`http://localhost:${port}/`)
    request = client.request.bind(client)

    return new Promise(resolve => server.on('listening', resolve))
  })
})

afterAll(() => {
  closeServer()
})

it('launches server properly', async () => {
  const data = await request('{ petpet }')
  expect(data).toMatchObject({ petpet: expect.any(String) })
})

test('correct version', async () => {
  const { petpet } = await request('{ petpet }')
  expect(petpet).toBe(require('../../package.json').version)
})
