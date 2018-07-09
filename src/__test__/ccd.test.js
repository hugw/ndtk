import lib from './fixtures/lib'

describe('NDTK / CCD (Current Caller Directory)', () => {
  it('should return the current directory of the caller function', () => {
    const dir = lib()
    expect(dir).toEqual(__dirname)
  })
})
