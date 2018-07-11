import { assert } from '@'

describe('NDTK / assert', () => {
  it('given truthy conditions, it should not throw any errors', () => {
    expect(assert(true)).toBeUndefined()
  })

  it('given falsy conditions and a string arg, it should throw a formatted error', () => {
    try {
      assert(false, 'Error message')
    } catch (err) {
      expect(err).toBeInstanceOf(Error)
      expect(err.message).toEqual('Error message')
    }
  })

  it('given falsy conditions and no arg, it should throw a formatted error with a default message set', () => {
    try {
      assert(false)
    } catch (err) {
      expect(err).toBeInstanceOf(Error)
      expect(err.message).toEqual('Something went wrong.')
    }
  })

  it('given falsy conditions and an error object arg, it should throw the same error', () => {
    const error = new Error()

    try {
      assert(false, error)
    } catch (err) {
      expect(error).toEqual(err)
    }
  })
})
