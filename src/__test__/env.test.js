import {
  ENV,
  IS_DEV,
  IS_STAG,
  IS_TEST,
  IS_PROD,
  IS_QA,
} from '@'

describe('Environment utility functions', () => {
  it('#ENV should return "test"', () => {
    expect(ENV).toBe('test')
  })

  it('#IS_DEV should return false', () => {
    expect(IS_DEV).toBe(false)
  })

  it('#IS_STAG should return false', () => {
    expect(IS_STAG).toBe(false)
  })

  it('#IS_TEST should return false', () => {
    expect(IS_TEST).toBe(true)
  })

  it('#IS_PROD should return false', () => {
    expect(IS_PROD).toBe(false)
  })

  it('#IS_QA should return false', () => {
    expect(IS_QA).toBe(false)
  })
})
