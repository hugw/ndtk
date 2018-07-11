import { isDir } from '@'

describe('NDTK / isDir', () => {
  it('should return TRUE for a valid path', () => {
    expect(isDir('../')).toBeTruthy()
    expect(isDir(__dirname)).toBeTruthy()
  })

  it('should return FALSE for an invalid path', () => {
    expect(isDir('')).toBeFalsy()
    expect(isDir()).toBeFalsy()
    expect(isDir(null)).toBeFalsy()
    expect(isDir(false)).toBeFalsy()
    expect(isDir(undefined)).toBeFalsy()
    expect(isDir({})).toBeFalsy()
    expect(isDir([])).toBeFalsy()
  })
})
