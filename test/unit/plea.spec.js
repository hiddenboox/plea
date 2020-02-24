import assert from 'assert'
import nock from 'nock'
import sinon from 'sinon'
import https from 'https'

import { post, get } from '../../src'
import { mockAuthorize, mockHttpStatus, mockOrder } from '../helpers/nock'

describe('request', () => {
  const sandbox = sinon.createSandbox()

  beforeEach(() => {
    sandbox.spy(https, 'request')
  })

  afterEach(() => {
    nock.cleanAll()
    sandbox.restore()
  })

  it('throw error on nullish arguments', async () => {
    try {
      await post()
    } catch (err) {
      should.throw(
        () => {
          throw err
        },
        assert.AssertionError,
        'url should not be empty',
      )
    }
  })

  it('should response parsed JSON with opt { json: true }', async () => {
    mockAuthorize()

    const { data } = await post(
      `https://localhost/pl/standard/user/oauth/authorize`,
      {
        json: true,
      },
    )

    data.should.have.property('access_token')
    data.should.have.property('token_type')
    data.should.have.property('expires_in')
    data.should.have.property('grant_type')
  })

  it('should response with plain text without { json: true }', async () => {
    mockAuthorize()

    const { data } = await post(
      `https://localhost/pl/standard/user/oauth/authorize`,
    )

    data.should.be.a('string')
  })

  it('should throw error when server respond with not ok status', async () => {
    mockHttpStatus(500)

    try {
      await get('https://localhost/500')
    } catch (err) {
      should.throw(
        () => {
          throw err
        },
        Error,
        'adddad',
      )
    }
  })

  it('should respons status of request', async () => {
    mockHttpStatus(200)

    const { status } = await get('https://localhost/200')
    status.should.be.a('number').and.equal(200)
  })

  it('should not parse body and response with { json: false }', async () => {
    mockAuthorize()

    const { data } = await post(
      `https://localhost/pl/standard/user/oauth/authorize`,
    )

    data.should.equals(
      '{"access_token":"8f79c971-195e-43f5-bd83-ad2104414acc","token_type":"bearer","expires_in":43199,"grant_type":"client_credentials"}',
    )
  })

  it("should add header content-type: 'application/json' with { json: true }", async () => {
    mockOrder()

    const { status, data } = await post('https://localhost/api/v2_1/orders', {
      body: {
        parse: 'me',
      },
      json: true,
    })
    const { headers } = https.request.args[0][0]

    headers.should.have.property('Content-Type').and.equals('application/json')
    status.should.be.a('number').and.equals(200)
    data.should.have.property('redirectUri')
    data.should.have.property('orderId')
    data.should.have.property('extOrderId')
  })
})
