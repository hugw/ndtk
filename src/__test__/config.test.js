import { config } from '@'

describe('#config', () => {
  it('given an invalid env object, it should return an empty config object', () => {
    expect(config()).toEqual({})
    expect(config(null)).toEqual({})
    expect(config(undefined)).toEqual({})
    expect(config([])).toEqual({})
    expect(config({})).toEqual({})
    expect(config({ foo: true })).toEqual({})
  })

  it('given an invalid env object and with valid defaults, it should generate and return the formatted config object', () => {
    const defaults = {
      default: {
        foo: 'foo',
        bar: 'bar',
      },
      test: {
        foo: null,
        testOnly: true,
      },
    }

    const expected = {
      foo: null,
      bar: 'bar',
      testOnly: true,
    }

    expect(config(null, defaults)).toEqual(expected)
    expect(config(undefined, defaults)).toEqual(expected)
    expect(config([], defaults)).toEqual(expected)
    expect(config({}, defaults)).toEqual(expected)
    expect(config({ foo: true }, defaults)).toEqual(expected)
  })

  it('given a valid env object and with invalid defaults, it should generate and return the formatted config object', () => {
    const object = {
      default: {
        foo: 'foo',
        bar: 'bar',
      },
      test: {
        foo: null,
        testOnly: true,
      },
    }

    const expected = {
      foo: null,
      bar: 'bar',
      testOnly: true,
    }

    expect(config(object, null)).toEqual(expected)
    expect(config(object, undefined)).toEqual(expected)
    expect(config(object, [])).toEqual(expected)
    expect(config(object, {})).toEqual(expected)
    expect(config(object, { foo: true })).toEqual(expected)
  })

  it('given a valid env object, it should generate and return the formatted config object', () => {
    const object = {
      default: {
        foo: true,
        bar: true,
      },
      test: {
        foo: false,
        testOnly: true,
      },
    }

    expect(config(object)).toEqual({
      foo: false,
      bar: true,
      testOnly: true,
    })
  })

  it('given a valid env object and with valid defaults, it should generate and return the formatted config object', () => {
    const defaults = {
      default: {
        foo: true,
        bar: true,
      },
      test: {
        foo: false,
        testOnly: true,
      },
    }

    const object = {
      default: {
        foo: {},
        objectOnly: {
          enabled: true,
        },
      },
      test: {
        testOnly: 'test only',
        objectOnly: {
          name: 'Object',
        },
      },
    }

    expect(config(object, defaults)).toEqual({
      foo: false,
      bar: true,
      testOnly: 'test only',
      objectOnly: {
        enabled: true,
        name: 'Object',
      },
    })
  })
})
