# Node Toolkit - Utility Functions

[![CircleCI](https://circleci.com/gh/hugw/ndtk/tree/master.svg?style=svg&circle-token=a8823c9c34374fe0321d0e958f000db70f4f6119)](https://circleci.com/gh/hugw/ndtk/tree/master)

## Install

```
$ npm install ndtk
```

## API

##### `ENV`

Returns the value assigned to `process.env.NODE_ENV` when defined, otherwise "development".

#### `IS_DEV`

Returns `true` if current environment is set to "development".

#### `IS_STAG`

Returns `true` if current environment is set to "staging".

#### `IS_TEST`

Returns `true` if current environment is set to "test".

#### `IS_PROD`

Returns `true` if current environment is set to "production".

#### `IS_QA`

Returns `true` if current environment is set to "qa".

### `assert(condition, [content])`

Executes simple assertions and throw errors in negative cases.

- `condition`: The condition to be tested.
- `content`: String or Error object to be thrown when a condition is not met.

```js
const a = 1
const b = 2

assert(a === b, 'a and b are not equal.') // Throws an Error with message 'a and b are not equal.'
assert(a === b) // Throws an Error with a default message 'Something went wrong.'
assert(a === b, new Error('Oops')) // Throws the same Error with message 'Oops'
```

### `ccd()`

Returns the current caller directory.

```js
// src/lib/lib.js
export const lib = (path) => {
  const callerDir = path || ccd()
  return callerDir
}

// src/app.js
import lib from '../lib/lib'

lib() // Returns /abs/path/to/src"
lib(__dirname) // Returns /abs/path/to/src"
```

### `req(name, [defaultOnly])`

Require optional modules without throwing unwanted errors. Intended to work only for local files.

- `name`: String representing the path to the module you are trying to require.
- `defaultOnly`: Boolean. Defaults to `true`. Defines if you wish to return only the `default` property or the whole module including named properties.

```js
// src/lib.js
export const a = 'Foo'
export default 'Bar'

// src/app.js

req('./lib') // Returns 'Bar'
req('./lib', false) // Returns the object { default: 'Bar', a: 'Foo' }
req('./libb') // Returns null
```

### `httpError(code, [meta])`

Returns HTTP-friendly Error objects.

- `code`: String or number representing the status code. Invalid or not found error codes will fallback to `500`.
- `meta`: Object with extra information regarding the error. Possible options are `message`, `type` and `attributes`.

```js
httpError()

// Returns:
// Error Object {
//   stack...,
//   isHttp: true,
//   message: 'Internal Server Error'
//   output: {
//     message: 'Internal Server Error',
//     type: 'INTERNAL_SERVER_ERROR',
//     status: 500,
//   }
// }

httpError(400)

// Returns:
// Error Object {
//   stack...,
//   isHttp: true,
//   message: 'Bad Request'
//   output: {
//     message: 'Bad Request',
//     type: 'BAD_REQUEST',
//     status: 400,
//   }
// }

httpError(422, {
  message: 'Something is wrong with this validation',
  type: 'VALIDATION',
  attributes: {
    email: 'Email is invalid',
    name: 'Name is required'
  },
})

// Returns:
// Error Object {
//   stack...,
//   isHttp: true,
//   message: 'Something is wrong with this validation'
//   output: {
//     message: 'Something is wrong with this validation',
//     type: 'VALIDATION',
//     attributes: {
//       email: 'Email is invalid',
//       name: 'Name is required'
//     },
//     status: 422,
//   }
// }
```

### `isDir(dir)`

Verifies if current path is a valid directory without throwing unwanted exceptions. Returns a `boolean`.

- `dir`: String representing the path of the tested directory.

```js
isDir(__dirname) // Return true
isDir('../') // Return true
isDir('bad-path') // Return false
```

### `config(object, [defaults])`

Generates configuration objects based on the current environment.

- `object`: Raw object to be merged.
- `defaults`: Optional fallback object.

```js
const object = {
  default: {
    foo: true,
    bar: { enabled: true },
  },
  development: {
    bar: { enabled: false, name: 'dev' },
  },
  test: {
    foo: false,
    testOnly: true,
    bar: { name: 'test' },
  },
}

const defaults {
  default: {
    required: [],
  },
  test: {
    bar: { description: 'test description' },
  }
}

// On "development" environment
config(object)

// Returns:
// {
//   foo: true,
//   bar: { enabled: false, name: 'dev' }
// }

// On "test" environment
config(object)

// Returns:
// {
//   foo: false,
//   testOnly: true,
//   bar: { enabled: true, name: 'test' }
// }

config(object, defaults)

// Returns:
// {
//   foo: false,
//   required: [],
//   testOnly: true,
//   bar: { enabled: true, name: 'test', description: 'test description' }
// }
```

***

The MIT License (MIT)

Copyright (c) 2018 Hugo W. - contact@hugw.io

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
