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

  if (content instanceof Error) {
    throw content
  } else if (typeof content === 'string') {
    throw new Error(content)
  }

  throw new Error('Something went wrong.')
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
 * Verifies if the current Node running
 * is supported
 */
export const supported = (version) => {
  // Numbers or strings are accepted
  const isNumber = Number.parseFloat(version)
  if (!isNumber) return false

  const [supMajor, supMinor] = version.toString().split('.').map(parseFloat)
  const [major, minor] = process.versions.node.split('.').map(parseFloat)

  if (major < supMajor) return false
  return supMinor ? minor >= supMinor : true
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
  defaults && defaults.base,
  defaults && defaults[ENV],
  object && object.base,
  object && object[ENV],
)
