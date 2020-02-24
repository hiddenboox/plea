import { URL } from 'url'
import querystring from 'querystring'

export function prepareRequestOpt({ url: _url, json, params, body, ...rest }) {
  let pathname, search, port, hostname, protocol
  try {
    const url = new URL(
      `${_url}${params ? '?' + querystring.stringify(params) : ''}`,
    )
    pathname = url.pathname
    search = url.search
    port = url.port
    hostname = url.hostname
  } catch (err) {
    hostname = _url
    port = 80
  }

  protocol = 'http:'

  const path = [pathname, search].filter(Boolean).join('')

  let headers = {}

  if (json) {
    headers['Content-Type'] = 'application/json'
  }

  return {
    hostname,
    path,
    port: port ? parseInt(port, 10) : 80,
    protocol,
    headers,
    ...rest,
  }
}
