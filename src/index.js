/**
 * Node Toolkit - Utility Functions
 *
 * @copyright Copyright (c) 2018, hugw.io
 * @author Hugo W - contact@hugw.io
 * @license MIT
 */

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
 * Execute simple assertions and
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
