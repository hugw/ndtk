import { req } from '@'

describe('NDTK / req (Optional require)', () => {
  it('should return the default property from the module if found', () => {
    const module = req('./fixtures/req')
    expect(module).toEqual('You have found me')
  })

  it('should return the module if found', () => {
    const module = req('./fixtures/req', false)
    expect(module).toEqual({ default: 'You have found me' })
  })

  it('should return the module with abs path if found', () => {
    const module = req(`${__dirname}/fixtures/req`, false)
    expect(module).toEqual({ default: 'You have found me' })
  })

  it('should return null if module does not exist', () => {
    const module = req('./fixtures/ops')
    expect(module).toBeNull()
  })
})
