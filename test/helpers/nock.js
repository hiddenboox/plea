import nock from 'nock'

export const mockAuthorize = () =>
  nock('http://localhost')
    .post('/pl/standard/user/oauth/authorize')
    .reply(
      200,
      JSON.stringify({
        access_token: '8f79c971-195e-43f5-bd83-ad2104414acc',
        token_type: 'bearer',
        expires_in: 43199,
        grant_type: 'client_credentials',
      }),
    )

export const mockOrder = () =>
  nock('http://localhost')
    .post('/api/v2_1/orders')
    .reply(
      200,
      JSON.stringify({
        status: {
          statusCode: 'SUCCESS',
        },
        redirectUri: '{redirect_url_after_successfully_payment}',
        orderId: 'WZHF5FFDRJ140731GUEST000P01',
        extOrderId: '{internal_order_id}',
      }),
    )

export const mockHttpStatus = status =>
  nock('http://localhost')
    .get(`/${status}`)
    .reply(status, `Response ${status}`)
