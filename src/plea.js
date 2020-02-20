import https from 'https'
import assert from 'assert'

import { HttpVerb } from './consts'
import { prepareRequestOpt } from './helpers'

export const request = (
  { url, json, params, body, ...rest } = { method: HttpVerb.GET, json: true },
) => {
  assert.ok(url, 'url should not be empty')

  return new Promise((resolve, reject) => {
    const opt = prepareRequestOpt({ url, json, params, body, ...rest })
    const req = https.request(opt, res => {
      let data = ''
      res.setEncoding('utf8')
      res.on('data', chunk => {
        data += chunk
      })
      res.on('end', () => {
        resolve(json ? JSON.parse(data) : data)
      })
    })

    req.on('error', err => {
      reject(new Error(err.message))
    })

    if (body) {
      req.write(typeof body === 'object' ? JSON.stringify(body) : body)
    }

    req.end()
  })
}

export const get = (url, options = {}) =>
  request({ ...options, url, method: HttpVerb.GET })
export const post = (url, options = {}) =>
  request({ ...options, url, method: HttpVerb.POST })
export const put = (url, options = {}) =>
  request({ ...options, url, method: HttpVerb.PUT })
export const patch = (url, options = {}) =>
  request({ ...options, url, method: HttpVerb.PATCH })
export const _delete = (url, options = {}) =>
  request({ ...options, url, method: HttpVerb.DELETE })
