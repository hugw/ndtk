/**
 * Node Toolkit - Utility Functions
 *
 * @copyright Copyright (c) 2018, hugw.io
 * @author Hugo W - contact@hugw.io
 * @license MIT
 */

import path from 'path'
import fs from 'fs'
import merge from 'lodash/merge'
import snakeCase from 'lodash/snakeCase'
import toUpper from 'lodash/toUpper'
import statuses from 'statuses'

/**
 * Environment
 * utility functions
 */
const DEV = 'development'
const STAG = 'staging'
const TEST = 'test'
const PROD = 'production'
const QA = 'qa'

export const ENV = process.env.NODE_ENV || DEV

export const IS_DEV = ENV === DEV
export const IS_TEST = ENV === TEST
export const IS_STAG = ENV === STAG
export const IS_PROD = ENV === PROD
export const IS_QA = ENV === QA

/**
 * Executes simple assertions and
 * throw errors in negative cases
 */
export const assert = (condition, content) => {
  if (condition) return
  let error

  if (content instanceof Error) {
    error = content
  } else if (typeof content === 'string') {
    error = new Error(content)
  } else {
    error = new Error('Something went wrong.')
  }

  // Omits all frames above "assert" from the generated stack trace
  Error.captureStackTrace(error, assert)
  throw error
}

/**
 * Current caller directory
 * @link https://github.com/stefanpenner/get-caller-file/blob/master/index.js
 */
export const ccd = () => {
  const oldPrepareStackTrace = Error.prepareStackTrace
  Error.prepareStackTrace = (err, stack) => stack

  const { stack } = new Error()
  Error.prepareStackTrace = oldPrepareStackTrace

  // stack[0] holds this file
  // stack[1] holds where this function was called
  // stack[2] holds the file we're interested in
  const line = stack[2]
  return !!line && path.dirname(line.getFileName())
}

/**
 * Require optional modules without
 * throwing unwanted exceptions
 */
export const req = (name, defaultOnly = true) => {
  try {
    const dir = path.resolve(ccd(), name)
    const module = require(dir) // eslint-disable-line global-require, import/no-dynamic-require
    return defaultOnly ? module.default : module
  } catch (err) {
    return null
  }
}

/**
 * Verifies if current path
 * is a valid directory without
 * throwing unwanted exceptions
 */
export const isDir = (dir) => {
  try {
    const stats = fs.statSync(dir)
    return stats.isDirectory()
  } catch (e) { return false }
}

/**
 * Generates configuration objects based
 * on the current environment
 */
export const config = (object, defaults) => merge(
  {},
  defaults && defaults.default,
  object && object.default,
  defaults && defaults[ENV],
  object && object[ENV],
)

/**
 * HTTP-friendly error objects
 */
export const httpError = (code, meta = {}) => {
  const { message: customMessage, type: customType, ...rest } = meta

  const status = statuses[code] ? code : 500
  const message = customMessage || statuses[status]
  const type = customType || toUpper(snakeCase(statuses[status]))

  const error = new Error(message)

  error.isHttp = true
  error.output = {
    status,
    message,
    type,
    ...rest,
  }

  // Omits all frames above "httpError" from the generated stack trace
  Error.captureStackTrace(error, httpError)

  return error
}

export default {
  assert,
  ccd,
  req,
  isDir,
  config,
  merge,
  httpError,
}
