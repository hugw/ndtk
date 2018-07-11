import { supported } from '@'

describe('NDTK / supported', () => {
  it('should return FALSE for invalid version', () => {
    expect(supported()).toBeFalsy()
    expect(supported(null)).toBeFalsy()
    expect(supported(false)).toBeFalsy()
    expect(supported(true)).toBeFalsy()
    expect(supported(undefined)).toBeFalsy()
    expect(supported(NaN)).toBeFalsy()
    expect(supported({})).toBeFalsy()
    expect(supported([])).toBeFalsy()
    expect(supported('0')).toBeFalsy()
    expect(supported(0)).toBeFalsy()
  })

  it('should return TRUE when Node version > minimum required', () => {
    expect(supported('8.10')).toBeTruthy()
    expect(supported(8.10)).toBeTruthy()
    expect(supported('0.1')).toBeTruthy()
    expect(supported(0.1)).toBeTruthy()
    expect(supported('8')).toBeTruthy()
    expect(supported(8)).toBeTruthy()
    expect(supported('7.0')).toBeTruthy()
    expect(supported(7.0)).toBeTruthy()
    expect(supported('5.0.11')).toBeTruthy()
  })

  it('should return TRUE when Node version >= minimum required', () => {
    expect(supported('8.11')).toBeTruthy()
    expect(supported(8.11)).toBeTruthy()
  })

  it('should return FALSE when Node version < minimum required', () => {
    expect(supported('8.12')).toBeFalsy()
    expect(supported(8.12)).toBeFalsy()
  })
})
