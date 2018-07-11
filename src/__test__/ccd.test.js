import lib from './fixtures/lib'

describe('#ccd (Current Caller Directory)', () => {
  it('should return the current directory of the caller function', () => {
    const dir = lib()
    expect(dir).toEqual(__dirname)
  })
})
