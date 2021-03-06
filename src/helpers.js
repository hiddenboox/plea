import { URL } from 'url'
import querystring from 'querystring'

export function prepareRequestOpt({ url: _url, json, params, body, headers, ...rest }) {
  let pathname, search, port, hostname, protocol
  try {
    const url = new URL(
      `${_url}${params ? '?' + querystring.stringify(params) : ''}`,
    )
    pathname = url.pathname
    search = url.search
    port = url.port
    hostname = url.hostname
    protocol = url.protocol
  } catch (err) {
    hostname = _url
    protocol = 'http:'
    port = 80
  }

  const path = [pathname, search].filter(Boolean).join('')
  const isHttpsProtocol = protocol.startsWith('https')

  const defaultHeaders = {
    ...headers
  }

  if (json && !defaultHeaders['Content-Type']) {
    defaultHeaders['Content-Type'] = 'application/json'
  }

  return {
    hostname,
    path,
    port: port ? parseInt(port, 10) : isHttpsProtocol ? 443 : 80,
    protocol,
    httpProtocol: protocol.slice(0, protocol.length - 1),
    headers: defaultHeaders,
    ...rest,
  }
}
