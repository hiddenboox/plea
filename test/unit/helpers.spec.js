import { prepareRequestOpt } from '../../src/helpers'

describe('prepareRequestOpt', () => {
  it('should return correct opt object for url with https protocol', () => {
    const url = 'https://localhost:4000/stores/store/1'
    const opt = prepareRequestOpt({ url })
    opt.should.have.property('protocol').to.equals('http:')
    opt.should.have.property('port').to.equals(4000)
    opt.should.have.property('path').to.equals('/stores/store/1')
    opt.should.have.property('hostname').to.equals('localhost')
  })

  it('should return correct opt object for url with http protocol', () => {
    const url = 'http://localhost:4000/stores/store/1'
    const opt = prepareRequestOpt({ url })

    opt.should.have.property('protocol').to.equals('http:')
    opt.should.have.property('port').to.equals(4000)
    opt.should.have.property('path').to.equals('/stores/store/1')
    opt.should.have.property('hostname').to.equals('localhost')
  })

  it('should return correct opt object for url without path', () => {
    const url = 'http://localhost:4000'
    const opt = prepareRequestOpt({ url })

    opt.should.have.property('protocol').to.equals('http:')
    opt.should.have.property('port').to.equals(4000)
    opt.should.have.property('path').to.equals('/')
    opt.should.have.property('hostname').to.equals('localhost')
  })

  it('should return correct opt object for url without port', () => {
    const url = 'http://localhost'
    const opt = prepareRequestOpt({ url })

    opt.should.have.property('protocol').to.equals('http:')
    opt.should.have.property('port').to.equals(80)
    opt.should.have.property('path').to.equals('/')
    opt.should.have.property('hostname').to.equals('localhost')
  })

  it('should return correct opt object for url with https and without port', () => {
    const url = 'https://localhost'
    const opt = prepareRequestOpt({ url })

    opt.should.have.property('protocol').to.equals('http:')
    opt.should.have.property('port').to.equals(80)
    opt.should.have.property('path').to.equals('/')
    opt.should.have.property('hostname').to.equals('localhost')
  })

  it('should return correct opt object for url without protocol and port', () => {
    const url = 'localhost'
    const opt = prepareRequestOpt({ url })

    opt.should.have.property('protocol').to.equals('http:')
    opt.should.have.property('port').to.equals(80)
    opt.should.have.property('path').to.equals('')
    opt.should.have.property('hostname').to.equals('localhost')
  })
})
