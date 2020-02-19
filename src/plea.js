import querystring from 'querystring'
import https from 'https'
import { URL } from 'url'
import assert from 'assert'

import { HttpVerb } from './consts'

export const request = (
  { url, json, params, body, ...rest } = { method: HttpVerb.GET, json: true },
) => {
  assert.ok(url, 'url should not be empty')

  const { pathname, search, host, port } = new URL(
    `${url}${params ? '?' + querystring.stringify(params) : ''}`,
  )
  return new Promise((resolve, reject) => {
    const path = `${pathname}${search}`
    const req = https.request({ host, path, port, ...rest }, res => {
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
