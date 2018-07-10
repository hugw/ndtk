# Node Toolkit - Utility Functions

[![CircleCI](https://circleci.com/gh/hugw/ndtk/tree/master.svg?style=svg&circle-token=a8823c9c34374fe0321d0e958f000db70f4f6119)](https://circleci.com/gh/hugw/ndtk/tree/master)

## Install

```
$ npm install ndtk
```

## API

##### `ENV`

Return the value assigned to `process.env.NODE_ENV` when defined, otherwise returns "development".

#### `IS_DEV`

Return `true` if current environment is set to "development".

#### `IS_STAG`

Return `true` if current environment is set to "staging".

#### `IS_TEST`

Return `true` if current environment is set to "test".

#### `IS_PROD`

Return `true` if current environment is set to "production".

#### `IS_QA`

Return `true` if current environment is set to "qa".

### `assert(condition, [content])`

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

Return the current caller directory.

```js
// src/lib/lib.js
export const lib = (path) => {
  const callerDir = path || ccd()
  console.log(callerDir)
}

// src/app.js
import lib from '../lib/lib'

lib() // Log /abs/path/to/src"
lib(__dirname) // Log /abs/path/to/src"
```

### `req(name, [defaultOnly])`

Require optional modules without throwing unwanted errors. Intended to work only for local files.

- `name`: String representing the path to the module you wanna try to require.
- `defaultOnly`: Defaults to `true`. Boolean to define if you wish to return only the `default` property or the whole module including named properties.

```js
// src/lib.js
export const a = 'Foo'
export default 'Bar'

// src/app.js

req('./lib') // Return 'Bar'
req('./lib', false) // Return the object { default: 'Bar', a: 'Foo' }
req('./libb') // Returns null
```

### `supported(version)`

Verify if the current Node running is supported.

- `version`: String or Number accepted. E.g. "8" / 8 / "0.1" / 0.1 / "10.0.12"

```js
// Node version running => 8.11

supported(8.11) // Return true
supported("8.11") // Return true
supported(7) // Return true
supported("7.0") // Return true
supported(9.1) // Return false
supported("9.20") // Return false
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
