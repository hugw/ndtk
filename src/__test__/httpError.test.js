import { httpError } from '@'

describe('#httpError', () => {
  it('given valid argments, it show return a formatted error object', () => {
    const error = httpError(422, {
      message: 'Something is wrong',
      type: 'validation',
      attributes: {
        email: 'Invalid',
      },
    })

    expect(error).toBeInstanceOf(Error)
    expect(error.isHttp).toBeTruthy()
    expect(error.message).toEqual('Something is wrong')
    expect(error.output).toEqual({
      message: 'Something is wrong',
      type: 'validation',
      attributes: {
        email: 'Invalid',
      },
      status: 422,
    })
  })

  it('given empty arguments, it should return a default formatted error object', () => {
    const error = httpError()

    expect(error).toBeInstanceOf(Error)
    expect(error.isHttp).toBeTruthy()
    expect(error.message).toEqual('Internal Server Error')
    expect(error.output).toEqual({
      message: 'Internal Server Error',
      type: 'INTERNAL_SERVER_ERROR',
      status: 500,
    })
  })

  it('given only status code, it should return an error object with default messages', () => {
    const error = httpError(400)

    expect(error).toBeInstanceOf(Error)
    expect(error.isHttp).toBeTruthy()
    expect(error.message).toEqual('Bad Request')
    expect(error.output).toEqual({
      message: 'Bad Request',
      type: 'BAD_REQUEST',
      status: 400,
    })
  })
})
