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

#### `assert(condition, [content])`

- `content`: String or Error object to be thrown when a condition is not met.

```js
const a = 1
const b = 2

assert(a === b, 'a and b are not equal.') // Throws an Error with message 'a and b are not equal.'
assert(a === b) // Throws an Error with a default message 'Something went wrong.'
assert(a === b, new Error('Oops')) // Throws the same Error with message 'Oops'
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
