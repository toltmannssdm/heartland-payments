define(["N/https", "N/log"], function(https, log) { return /******/ (function(modules) { // webpackBootstrap
/******/  // The module cache
/******/  var installedModules = {};
/******/
/******/  // The require function
/******/  function __webpack_require__(moduleId) {
/******/
/******/    // Check if module is in cache
/******/    if(installedModules[moduleId]) {
/******/      return installedModules[moduleId].exports;
/******/    }
/******/    // Create a new module (and put it into the cache)
/******/    var module = installedModules[moduleId] = {
/******/      i: moduleId,
/******/      l: false,
/******/      exports: {}
/******/    };
/******/
/******/    // Execute the module function
/******/    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/    // Flag the module as loaded
/******/    module.l = true;
/******/
/******/    // Return the exports of the module
/******/    return module.exports;
/******/  }
/******/
/******/
/******/  // expose the modules object (__webpack_modules__)
/******/  __webpack_require__.m = modules;
/******/
/******/  // expose the module cache
/******/  __webpack_require__.c = installedModules;
/******/
/******/  // define getter function for harmony exports
/******/  __webpack_require__.d = function(exports, name, getter) {
/******/    if(!__webpack_require__.o(exports, name)) {
/******/      Object.defineProperty(exports, name, {
/******/        configurable: false,
/******/        enumerable: true,
/******/        get: getter
/******/      });
/******/    }
/******/  };
/******/
/******/  // getDefaultExport function for compatibility with non-harmony modules
/******/  __webpack_require__.n = function(module) {
/******/    var getter = module && module.__esModule ?
/******/      function getDefault() { return module['default']; } :
/******/      function getModuleExports() { return module; };
/******/    __webpack_require__.d(getter, 'a', getter);
/******/    return getter;
/******/  };
/******/
/******/  // Object.prototype.hasOwnProperty.call
/******/  __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/  // __webpack_public_path__
/******/  __webpack_require__.p = "";
/******/
/******/  // Load entry module and return exports
/******/  return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.GP_NETSUITE_BUILD) {
    // tslint:disable-next-line
    __webpack_require__(33);
}
__webpack_require__(34);
__webpack_require__(37);
__export(__webpack_require__(38));
__export(__webpack_require__(39));
__export(__webpack_require__(40));
__export(__webpack_require__(41));
__export(__webpack_require__(9));
__export(__webpack_require__(60));
__export(__webpack_require__(94));
__export(__webpack_require__(105));
__export(__webpack_require__(115));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(70)
var ieee754 = __webpack_require__(71)
var isArray = __webpack_require__(26)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
  return this;
})();

try {
  // This works if eval is allowed (see CSP)
  g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
  // This works if the window reference is available
  if(typeof window === "object")
    g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var processNextTick = __webpack_require__(17);
/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(7);
util.inherits = __webpack_require__(6);
/*</replacement>*/

var Readable = __webpack_require__(29);
var Writable = __webpack_require__(19);

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var PaymentMethod = /** @class */ (function () {
    function PaymentMethod() {
    }
    Object.defineProperty(PaymentMethod.prototype, "isAuthable", {
        get: function () {
            return this.authorize !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isBalanceable", {
        get: function () {
            return this.balanceInquiry !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isCardData", {
        get: function () {
            return (((this.isTokenizable &&
                this.token !== undefined) ||
                this.number !== undefined) &&
                this.paymentMethodType !== _1.PaymentMethodType.Gift);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isChargable", {
        get: function () {
            return this.charge !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isEditable", {
        get: function () {
            return this.edit !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isEncryptable", {
        get: function () {
            return this.encryptionData !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isPinProtected", {
        get: function () {
            return this.pinBlock !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isPrePayable", {
        get: function () {
            return this.addValue !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isRefundable", {
        get: function () {
            return this.refund !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isReversable", {
        get: function () {
            return this.reverse !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isTokenizable", {
        get: function () {
            return this.tokenize !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isTrackData", {
        get: function () {
            return (this.value !== undefined &&
                (this.entryMethod !== undefined ||
                    this.pinBlock !== undefined ||
                    this.encryptionData !== undefined));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isVerifyable", {
        get: function () {
            return this.verify !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isVoidable", {
        get: function () {
            return this.void !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    return PaymentMethod;
}());
exports.PaymentMethod = PaymentMethod;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var BaseBuilder_1 = __webpack_require__(13);
var TransactionBuilder = /** @class */ (function (_super) {
    __extends(TransactionBuilder, _super);
    function TransactionBuilder(type, paymentMethod) {
        var _this = _super.call(this) || this;
        _this.transactionModifier = _1.TransactionModifier.None;
        _this.transactionType = type;
        if (paymentMethod) {
            _this.paymentMethod = paymentMethod;
        }
        return _this;
    }
    TransactionBuilder.prototype.withModifier = function (modifier) {
        if (modifier !== undefined) {
            this.transactionModifier = modifier;
        }
        return this;
    };
    TransactionBuilder.prototype.withPaymentMethod = function (paymentMethod) {
        if (paymentMethod !== undefined) {
            this.paymentMethod = paymentMethod;
        }
        return this;
    };
    return TransactionBuilder;
}(BaseBuilder_1.BaseBuilder));
exports.TransactionBuilder = TransactionBuilder;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(49));
__export(__webpack_require__(50));
__export(__webpack_require__(51));
__export(__webpack_require__(52));
__export(__webpack_require__(53));
__export(__webpack_require__(54));
__export(__webpack_require__(55));
__export(__webpack_require__(56));
__export(__webpack_require__(25));
__export(__webpack_require__(57));
__export(__webpack_require__(58));
__export(__webpack_require__(59));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/**
 *  Copyright 2011 Rackspace
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

exports.PI = ProcessingInstruction;
exports.Comment = Comment;
exports.CData = CData;
exports.ProcessingInstruction = ProcessingInstruction;
exports.SubElement = SubElement;
exports.QName = QName;
exports.ElementTree = ElementTree;
exports.ElementPath = ElementPath;
exports.Element = function(tag, attrib) {
  return new Element(tag, attrib);
};

exports.XML = function(data) {
  var et = new ElementTree();
  return et.parse(data);
};

exports.parse = parse;
exports.register_namespace = register_namespace;
exports.tostring = tostring;

var sprintf = __webpack_require__(15).sprintf;

var utils = __webpack_require__(27);
var ElementPath = __webpack_require__(74);
var TreeBuilder = __webpack_require__(28).TreeBuilder;
var get_parser = __webpack_require__(78).get_parser;
var constants = __webpack_require__(92);

var element_ids = 0;

function Element(tag, attrib)
{
  this._id = element_ids++;
  this.tag = tag;
  this.attrib = {};
  this.text = null;
  this.tail = null;
  this._children = [];

  if (attrib) {
    this.attrib = utils.merge(this.attrib, attrib);
  }
}

Element.prototype.toString = function()
{
  return sprintf("<Element %s at %s>", this.tag, this._id);
};

Element.prototype.makeelement = function(tag, attrib)
{
  return new Element(tag, attrib);
};

Element.prototype.len = function()
{
  return this._children.length;
};

Element.prototype.getItem = function(index)
{
  return this._children[index];
};

Element.prototype.setItem = function(index, element)
{
  this._children[index] = element;
};

Element.prototype.delItem = function(index)
{
  this._children.splice(index, 1);
};

Element.prototype.getSlice = function(start, stop)
{
  return this._children.slice(start, stop);
};

Element.prototype.setSlice = function(start, stop, elements)
{
  var i;
  var k = 0;
  for (i = start; i < stop; i++, k++) {
    this._children[i] = elements[k];
  }
};

Element.prototype.delSlice = function(start, stop)
{
  this._children.splice(start, stop - start);
};

Element.prototype.append = function(element)
{
  this._children.push(element);
};

Element.prototype.extend = function(elements)
{
  this._children.concat(elements);
};

Element.prototype.insert = function(index, element)
{
  this._children[index] = element;
};

Element.prototype.remove = function(element)
{
  this._children = this._children.filter(function(e) {
    /* TODO: is this the right way to do this? */
    if (e._id === element._id) {
      return false;
    }
    return true;
  });
};

Element.prototype.getchildren = function() {
  return this._children;
};

Element.prototype.find = function(path)
{
  return ElementPath.find(this, path);
};

Element.prototype.findtext = function(path, defvalue)
{
  return ElementPath.findtext(this, path, defvalue);
};

Element.prototype.findall = function(path, defvalue)
{
  return ElementPath.findall(this, path, defvalue);
};

Element.prototype.clear = function()
{
  this.attrib = {};
  this._children = [];
  this.text = null;
  this.tail = null;
};

Element.prototype.get = function(key, defvalue)
{
  if (this.attrib[key] !== undefined) {
    return this.attrib[key];
  }
  else {
    return defvalue;
  }
};

Element.prototype.set = function(key, value)
{
  this.attrib[key] = value;
};

Element.prototype.keys = function()
{
  return Object.keys(this.attrib);
};

Element.prototype.items = function()
{
  return utils.items(this.attrib);
};

/*
 * In python this uses a generator, but in v8 we don't have em,
 * so we use a callback instead.
 **/
Element.prototype.iter = function(tag, callback)
{
  var self = this;
  var i, child;

  if (tag === "*") {
    tag = null;
  }

  if (tag === null || this.tag === tag) {
    callback(self);
  }

  for (i = 0; i < this._children.length; i++) {
    child = this._children[i];
    child.iter(tag, function(e) {
      callback(e);
    });
  }
};

Element.prototype.itertext = function(callback)
{
  this.iter(null, function(e) {
    if (e.text) {
      callback(e.text);
    }

    if (e.tail) {
      callback(e.tail);
    }
  });
};


function SubElement(parent, tag, attrib) {
  var element = parent.makeelement(tag, attrib);
  parent.append(element);
  return element;
}

function Comment(text) {
  var element = new Element(Comment);
  if (text) {
    element.text = text;
  }
  return element;
}

function CData(text) {
  var element = new Element(CData);
  if (text) {
    element.text = text;
  }
  return element;
}

function ProcessingInstruction(target, text)
{
  var element = new Element(ProcessingInstruction);
  element.text = target;
  if (text) {
    element.text = element.text + " " + text;
  }
  return element;
}

function QName(text_or_uri, tag)
{
  if (tag) {
    text_or_uri = sprintf("{%s}%s", text_or_uri, tag);
  }
  this.text = text_or_uri;
}

QName.prototype.toString = function() {
  return this.text;
};

function ElementTree(element)
{
  this._root = element;
}

ElementTree.prototype.getroot = function() {
  return this._root;
};

ElementTree.prototype._setroot = function(element) {
  this._root = element;
};

ElementTree.prototype.parse = function(source, parser) {
  if (!parser) {
    parser = get_parser(constants.DEFAULT_PARSER);
    parser = new parser.XMLParser(new TreeBuilder());
  }

  parser.feed(source);
  this._root = parser.close();
  return this._root;
};

ElementTree.prototype.iter = function(tag, callback) {
  this._root.iter(tag, callback);
};

ElementTree.prototype.find = function(path) {
  return this._root.find(path);
};

ElementTree.prototype.findtext = function(path, defvalue) {
  return this._root.findtext(path, defvalue);
};

ElementTree.prototype.findall = function(path) {
  return this._root.findall(path);
};

/**
 * Unlike ElementTree, we don't write to a file, we return you a string.
 */
ElementTree.prototype.write = function(options) {
  var sb = [];
  options = utils.merge({
    encoding: 'utf-8',
    xml_declaration: null,
    default_namespace: null,
    method: 'xml'}, options);

  if (options.xml_declaration !== false) {
    sb.push('<?xml version="1.0" encoding="'+options.encoding+'"?>\n');
  }

  if (options.method === "text") {
    _serialize_text(sb, self._root, encoding);
  }
  else {
    var qnames, namespaces, indent, indent_string;
    var x = _namespaces(this._root, options.encoding, options.default_namespace);
    qnames = x[0];
    namespaces = x[1];

    if (options.hasOwnProperty('indent')) {
      indent = 0;
      indent_string = new Array(options.indent + 1).join(' ');
    }
    else {
      indent = false;
    }

    if (options.method === "xml") {
      _serialize_xml(function(data) {
        sb.push(data);
      }, this._root, options.encoding, qnames, namespaces, indent, indent_string);
    }
    else {
      /* TODO: html */
      throw new Error("unknown serialization method "+ options.method);
    }
  }

  return sb.join("");
};

var _namespace_map = {
    /* "well-known" namespace prefixes */
    "http://www.w3.org/XML/1998/namespace": "xml",
    "http://www.w3.org/1999/xhtml": "html",
    "http://www.w3.org/1999/02/22-rdf-syntax-ns#": "rdf",
    "http://schemas.xmlsoap.org/wsdl/": "wsdl",
    /* xml schema */
    "http://www.w3.org/2001/XMLSchema": "xs",
    "http://www.w3.org/2001/XMLSchema-instance": "xsi",
    /* dublic core */
    "http://purl.org/dc/elements/1.1/": "dc",
};

function register_namespace(prefix, uri) {
  if (/ns\d+$/.test(prefix)) {
    throw new Error('Prefix format reserved for internal use');
  }

  if (_namespace_map.hasOwnProperty(uri) && _namespace_map[uri] === prefix) {
    delete _namespace_map[uri];
  }

  _namespace_map[uri] = prefix;
}


function _escape(text, encoding, isAttribute, isText, isComment) {
  if (text) {
    text = text.toString();
    text = text.replace(/&/g, '&amp;');
    if (!isComment) {
      text = text.replace(/</g, '&lt;');
      text = text.replace(/>/g, '&gt;');
    }
    if (isComment) {
      text = text.replace(/\r/g, '');
    }
    if (!isText) {
        text = text.replace(/\n/g, '&#xA;');
        text = text.replace(/\r/g, '&#xD;');
    }
    if (isAttribute) {
      text = text.replace(/"/g, '&quot;');
    }
  }
  return text;
}

/* TODO: benchmark single regex */
function _escape_attrib(text, encoding) {
  return _escape(text, encoding, true);
}

function _escape_cdata(text, encoding) {
  return _escape(text, encoding, false);
}

function _escape_text(text, encoding) {
  return _escape(text, encoding, false, true);
}

function _escape_comment(comment, encoding) {
  return _escape(comment, encoding, false, true, true);
}

function _namespaces(elem, encoding, default_namespace) {
  var qnames = {};
  var namespaces = {};

  if (default_namespace) {
    namespaces[default_namespace] = "";
  }

  function encode(text) {
    return text;
  }

  function add_qname(qname) {
    if (qname[0] === "{") {
      var tmp = qname.substring(1).split("}", 2);
      var uri = tmp[0];
      var tag = tmp[1];
      var prefix = namespaces[uri];

      if (prefix === undefined) {
        prefix = _namespace_map[uri];
        if (prefix === undefined) {
          prefix = "ns" + Object.keys(namespaces).length;
        }
        if (prefix !== "xml") {
          namespaces[uri] = prefix;
        }
      }

      if (prefix) {
        qnames[qname] = sprintf("%s:%s", prefix, tag);
      }
      else {
        qnames[qname] = tag;
      }
    }
    else {
      if (default_namespace) {
        throw new Error('cannot use non-qualified names with default_namespace option');
      }

      qnames[qname] = qname;
    }
  }


  elem.iter(null, function(e) {
    var i;
    var tag = e.tag;
    var text = e.text;
    var items = e.items();

    if (tag instanceof QName && qnames[tag.text] === undefined) {
      add_qname(tag.text);
    }
    else if (typeof(tag) === "string") {
      add_qname(tag);
    }
    else if (tag !== null && tag !== Comment && tag !== CData && tag !== ProcessingInstruction) {
      throw new Error('Invalid tag type for serialization: '+ tag);
    }

    if (text instanceof QName && qnames[text.text] === undefined) {
      add_qname(text.text);
    }

    items.forEach(function(item) {
      var key = item[0],
          value = item[1];
      if (key instanceof QName) {
        key = key.text;
      }

      if (qnames[key] === undefined) {
        add_qname(key);
      }

      if (value instanceof QName && qnames[value.text] === undefined) {
        add_qname(value.text);
      }
    });
  });
  return [qnames, namespaces];
}

function _serialize_xml(write, elem, encoding, qnames, namespaces, indent, indent_string) {
  var tag = elem.tag;
  var text = elem.text;
  var items;
  var i;

  var newlines = indent || (indent === 0);
  write(Array(indent + 1).join(indent_string));

  if (tag === Comment) {
    write(sprintf("<!--%s-->", _escape_comment(text, encoding)));
  }
  else if (tag === ProcessingInstruction) {
    write(sprintf("<?%s?>", _escape_cdata(text, encoding)));
  }
  else if (tag === CData) {
    text = text || '';
    write(sprintf("<![CDATA[%s]]>", text));
  }
  else {
    tag = qnames[tag];
    if (tag === undefined) {
      if (text) {
        write(_escape_text(text, encoding));
      }
      elem.iter(function(e) {
        _serialize_xml(write, e, encoding, qnames, null, newlines ? indent + 1 : false, indent_string);
      });
    }
    else {
      write("<" + tag);
      items = elem.items();

      if (items || namespaces) {
        items.forEach(function(item) {
          var k = item[0],
              v = item[1];

            if (k instanceof QName) {
              k = k.text;
            }

            if (v instanceof QName) {
              v = qnames[v.text];
            }
            else {
              v = _escape_attrib(v, encoding);
            }
            write(sprintf(" %s=\"%s\"", qnames[k], v));
        });

        if (namespaces) {
          items = utils.items(namespaces);
          items.sort(function(a, b) { return a[1] < b[1]; });

          items.forEach(function(item) {
            var k = item[1],
                v = item[0];

            if (k) {
              k = ':' + k;
            }

            write(sprintf(" xmlns%s=\"%s\"", k, _escape_attrib(v, encoding)));
          });
        }
      }

      if (text || elem.len()) {
        if (text && text.toString().match(/^\s*$/)) {
            text = null;
        }

        write(">");
        if (!text && newlines) {
          write("\n");
        }

        if (text) {
          write(_escape_text(text, encoding));
        }
        elem._children.forEach(function(e) {
          _serialize_xml(write, e, encoding, qnames, null, newlines ? indent + 1 : false, indent_string);
        });

        if (!text && indent) {
          write(Array(indent + 1).join(indent_string));
        }
        write("</" + tag + ">");
      }
      else {
        write(" />");
      }
    }
  }

  if (newlines) {
    write("\n");
  }
}

function parse(source, parser) {
  var tree = new ElementTree();
  tree.parse(source, parser);
  return tree;
}

function tostring(element, options) {
  return new ElementTree(element).write(options);
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = __webpack_require__(12).EventEmitter;
var inherits = __webpack_require__(6);

inherits(Stream, EE);
Stream.Readable = __webpack_require__(82);
Stream.Writable = __webpack_require__(88);
Stream.Duplex = __webpack_require__(89);
Stream.Transform = __webpack_require__(90);
Stream.PassThrough = __webpack_require__(91);

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      log.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof log.debug === 'function') {
        // not supported in IE 10
        log.debug();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Validations_1 = __webpack_require__(42);
var BaseBuilder = /** @class */ (function () {
    function BaseBuilder() {
        this.validations = new Validations_1.Validations();
        this.setupValidations();
    }
    BaseBuilder.prototype.execute = function () {
        this.validations.validate(this);
        return Promise.resolve(undefined);
    };
    return BaseBuilder;
}());
exports.BaseBuilder = BaseBuilder;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var url = __webpack_require__(61);
var https_wrapper_1 = __webpack_require__(68);
var Gateway = /** @class */ (function () {
    function Gateway(contentType) {
        this.contentType = contentType;
        this.headers = {};
        this.headers["Content-Type"] = contentType;
    }
    Gateway.prototype.sendRequest = function (httpMethod, endpoint, data, queryStringParams) {
        var uri = url.parse(this.serviceUrl);
        var queryString = this.buildQueryString(queryStringParams);
        var options = {
            headers: this.headers,
            host: uri.host,
            method: httpMethod,
            path: uri.path + endpoint + queryString,
            port: uri.port ? parseInt(uri.port, 10) : 443,
        };
        if (data !== undefined && options && options.headers) {
            options.headers["Content-Length"] = data.length;
        }
        return https_wrapper_1.request(data, options);
    };
    Gateway.prototype.buildQueryString = function (queryStringParams) {
        if (queryStringParams === undefined) {
            return "";
        }
        var params = [];
        for (var param in queryStringParams) {
            if (queryStringParams.hasOwnProperty(param)) {
                params.push(encodeURIComponent(param) + "=" + encodeURIComponent(queryStringParams[param]));
            }
        }
        return "?" + params.join("&");
    };
    return Gateway;
}());
exports.Gateway = Gateway;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/*
 *  Copyright 2011 Rackspace
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

var cache = {};


// Do any others need escaping?
var TO_ESCAPE = {
  '\'': '\\\'',
  '\n': '\\n'
};


function populate(formatter) {
  var i, type,
      key = formatter,
      prev = 0,
      arg = 1,
      builder = 'return \'';

  for (i = 0; i < formatter.length; i++) {
    if (formatter[i] === '%') {
      type = formatter[i + 1];

      switch (type) {
        case 's':
          builder += formatter.slice(prev, i) + '\' + arguments[' + arg + '] + \'';
          prev = i + 2;
          arg++;
          break;
        case 'j':
          builder += formatter.slice(prev, i) + '\' + JSON.stringify(arguments[' + arg + ']) + \'';
          prev = i + 2;
          arg++;
          break;
        case '%':
          builder += formatter.slice(prev, i + 1);
          prev = i + 2;
          i++;
          break;
      }


    } else if (TO_ESCAPE[formatter[i]]) {
      builder += formatter.slice(prev, i) + TO_ESCAPE[formatter[i]];
      prev = i + 1;
    }
  }

  builder += formatter.slice(prev) + '\';';
  cache[key] = new Function(builder);
}


/**
 * A fast version of sprintf(), which currently only supports the %s and %j.
 * This caches a formatting function for each format string that is used, so
 * you should only use this sprintf() will be called many times with a single
 * format string and a limited number of format strings will ever be used (in
 * general this means that format strings should be string literals).
 *
 * @param {String} formatter A format string.
 * @param {...String} var_args Values that will be formatted by %s and %j.
 * @return {String} The formatted output.
 */
exports.sprintf = function(formatter, var_args) {
  if (!cache[formatter]) {
    populate(formatter);
  }

  return cache[formatter].apply(null, arguments);
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        log.debug(msg);
      } else {
        log.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        log.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(76);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to log.debug that prepends a timestamp
exports.log = function() {
  log.debug('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(77);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(2)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var buffer = __webpack_require__(1);
var Buffer = buffer.Buffer;
var SlowBuffer = buffer.SlowBuffer;
var MAX_LEN = buffer.kMaxLength || 2147483647;
exports.alloc = function alloc(size, fill, encoding) {
  if (typeof Buffer.alloc === 'function') {
    return Buffer.alloc(size, fill, encoding);
  }
  if (typeof encoding === 'number') {
    throw new TypeError('encoding must not be number');
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size > MAX_LEN) {
    throw new RangeError('size is too large');
  }
  var enc = encoding;
  var _fill = fill;
  if (_fill === undefined) {
    enc = undefined;
    _fill = 0;
  }
  var buf = new Buffer(size);
  if (typeof _fill === 'string') {
    var fillBuf = new Buffer(_fill, enc);
    var flen = fillBuf.length;
    var i = -1;
    while (++i < size) {
      buf[i] = fillBuf[i % flen];
    }
  } else {
    buf.fill(_fill);
  }
  return buf;
}
exports.allocUnsafe = function allocUnsafe(size) {
  if (typeof Buffer.allocUnsafe === 'function') {
    return Buffer.allocUnsafe(size);
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size > MAX_LEN) {
    throw new RangeError('size is too large');
  }
  return new Buffer(size);
}
exports.from = function from(value, encodingOrOffset, length) {
  if (typeof Buffer.from === 'function' && (!global.Uint8Array || Uint8Array.from !== Buffer.from)) {
    return Buffer.from(value, encodingOrOffset, length);
  }
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }
  if (typeof value === 'string') {
    return new Buffer(value, encodingOrOffset);
  }
  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    var offset = encodingOrOffset;
    if (arguments.length === 1) {
      return new Buffer(value);
    }
    if (typeof offset === 'undefined') {
      offset = 0;
    }
    var len = length;
    if (typeof len === 'undefined') {
      len = value.byteLength - offset;
    }
    if (offset >= value.byteLength) {
      throw new RangeError('\'offset\' is out of bounds');
    }
    if (len > value.byteLength - offset) {
      throw new RangeError('\'length\' is out of bounds');
    }
    return new Buffer(value.slice(offset, offset + len));
  }
  if (Buffer.isBuffer(value)) {
    var out = new Buffer(value.length);
    value.copy(out, 0, 0, value.length);
    return out;
  }
  if (value) {
    if (Array.isArray(value) || (typeof ArrayBuffer !== 'undefined' && value.buffer instanceof ArrayBuffer) || 'length' in value) {
      return new Buffer(value);
    }
    if (value.type === 'Buffer' && Array.isArray(value.data)) {
      return new Buffer(value.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ' + 'ArrayBuffer, Array, or array-like object.');
}
exports.allocUnsafeSlow = function allocUnsafeSlow(size) {
  if (typeof Buffer.allocUnsafeSlow === 'function') {
    return Buffer.allocUnsafeSlow(size);
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size >= MAX_LEN) {
    throw new RangeError('size is too large');
  }
  return new SlowBuffer(size);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, setImmediate) {// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



module.exports = Writable;

/*<replacement>*/
var processNextTick = __webpack_require__(17);
/*</replacement>*/

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = __webpack_require__(7);
util.inherits = __webpack_require__(6);
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__(87)
};
/*</replacement>*/

/*<replacement>*/
var Stream;
(function () {
  try {
    Stream = __webpack_require__(11);
  } catch (_) {} finally {
    if (!Stream) Stream = __webpack_require__(12).EventEmitter;
  }
})();
/*</replacement>*/

var Buffer = __webpack_require__(1).Buffer;
/*<replacement>*/
var bufferShim = __webpack_require__(18);
/*</replacement>*/

util.inherits(Writable, Stream);

function nop() {}

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__(4);

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~ ~this.highWaterMark;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(4);

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// If we get something that is not a buffer, string, null, or undefined,
// and we're not in objectMode, then that's an error.
// Otherwise stream chunks are all considered to be of length=1, and the
// watermarks determine how many objects to keep in the buffer, rather than
// how many bytes or characters.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;
  // Always throw error if a null is written
  // if we are not in object mode then throw
  // if it is not a buffer, string, or undefined.
  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (Buffer.isBuffer(chunk)) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = bufferShim.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding);

  if (Buffer.isBuffer(chunk)) encoding = 'buffer';
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;
  if (sync) processNextTick(cb, er);else cb(er);

  stream._writableState.errorEmitted = true;
  stream.emit('error', er);
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
        afterWrite(stream, state, finished, cb);
      }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    while (entry) {
      buffer[count] = entry;
      entry = entry.next;
      count += 1;
    }

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function prefinish(stream, state) {
  if (!state.prefinished) {
    state.prefinished = true;
    stream.emit('prefinish');
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    if (state.pendingcb === 0) {
      prefinish(stream, state);
      state.finished = true;
      stream.emit('finish');
    } else {
      prefinish(stream, state);
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function (err) {
    var entry = _this.entry;
    _this.entry = null;
    while (entry) {
      var cb = entry.callback;
      state.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    if (state.corkedRequestsFree) {
      state.corkedRequestsFree.next = _this;
    } else {
      state.corkedRequestsFree = _this;
    }
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(85).setImmediate))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.



module.exports = Transform;

var Duplex = __webpack_require__(4);

/*<replacement>*/
var util = __webpack_require__(7);
util.inherits = __webpack_require__(6);
/*</replacement>*/

util.inherits(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Gateway_1 = __webpack_require__(14);
var XmlGateway = /** @class */ (function (_super) {
    __extends(XmlGateway, _super);
    function XmlGateway() {
        return _super.call(this, "text/xml") || this;
    }
    XmlGateway.prototype.doTransaction = function (requestData) {
        return this.sendRequest("POST", "", requestData);
    };
    return XmlGateway;
}(Gateway_1.Gateway));
exports.XmlGateway = XmlGateway;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var PaymentMethod_1 = __webpack_require__(5);
var Credit = /** @class */ (function (_super) {
    __extends(Credit, _super);
    function Credit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.paymentMethodType = _1.PaymentMethodType.Credit;
        return _this;
    }
    /**
     * Authorizes the payment method
     *
     * @param string|number amount Amount to authorize
     *
     * @return AuthorizationBuilder
     */
    Credit.prototype.authorize = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Auth, this).withAmount(amount);
    };
    /**
     * Authorizes the payment method and captures the entire authorized amount
     *
     * @param string|number amount Amount to authorize
     *
     * @return AuthorizationBuilder
     */
    Credit.prototype.charge = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Sale, this).withAmount(amount);
    };
    /**
     * Adds value to the payment method
     *
     * @param string|number amount Amount to add
     *
     * @return AuthorizationBuilder
     */
    Credit.prototype.addValue = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.AddValue, this).withAmount(amount);
    };
    /**
     * Inquires the balance of the payment method
     *
     * @param InquiryType inquiry Type of inquiry
     *
     * @return AuthorizationBuilder
     */
    Credit.prototype.balanceInquiry = function (inquiry) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Balance, this).withBalanceInquiryType(inquiry);
    };
    /**
     * Refunds the payment method
     *
     * @param string|number amount Amount to refund
     *
     * @return AuthorizationBuilder
     */
    Credit.prototype.refund = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Refund, this).withAmount(amount);
    };
    /**
     * Reverses the payment method
     *
     * @param string|number amount Amount to reverse
     *
     * @return AuthorizationBuilder
     */
    Credit.prototype.reverse = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Reversal, this).withAmount(amount);
    };
    /**
     * Verifies the payment method
     *
     * @return AuthorizationBuilder
     */
    Credit.prototype.verify = function () {
        return new _1.AuthorizationBuilder(_1.TransactionType.Verify, this);
    };
    /**
     * Tokenizes the payment method
     *
     * @return AuthorizationBuilder
     */
    Credit.prototype.tokenize = function () {
        return this.verify().withRequestMultiUseToken(true);
    };
    return Credit;
}(PaymentMethod_1.PaymentMethod));
exports.Credit = Credit;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var PaymentMethod_1 = __webpack_require__(5);
var EBT = /** @class */ (function (_super) {
    __extends(EBT, _super);
    function EBT() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.paymentMethodType = _1.PaymentMethodType.EBT;
        return _this;
    }
    /**
     * Authorizes the payment method and captures the entire authorized amount
     *
     * @param string|number amount Amount to authorize
     *
     * @return AuthorizationBuilder
     */
    EBT.prototype.charge = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Sale, this).withAmount(amount);
    };
    /**
     * Adds value to the payment method
     *
     * @param string|number amount Amount to add
     *
     * @return AuthorizationBuilder
     */
    EBT.prototype.addValue = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.AddValue, this).withAmount(amount);
    };
    /**
     * Inquires the balance of the payment method
     *
     * @param InquiryType inquiry Type of inquiry
     *
     * @return AuthorizationBuilder
     */
    EBT.prototype.balanceInquiry = function (inquiry) {
        if (inquiry === void 0) { inquiry = _1.InquiryType.Foodstamp; }
        return new _1.AuthorizationBuilder(_1.TransactionType.Balance, this)
            .withBalanceInquiryType(inquiry)
            .withAmount(0);
    };
    EBT.prototype.benefitWithdrawal = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.BenefitWithDrawal, this)
            .withAmount(amount)
            .withCashBack(0);
    };
    /**
     * Refunds the payment method
     *
     * @param string|number amount Amount to refund
     *
     * @return AuthorizationBuilder
     */
    EBT.prototype.refund = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Refund, this).withAmount(amount);
    };
    /**
     * Reverses the payment method
     *
     * @param string|number amount Amount to reverse
     *
     * @return AuthorizationBuilder
     */
    EBT.prototype.reverse = function (_amount) {
        throw new _1.NotImplementedError();
    };
    return EBT;
}(PaymentMethod_1.PaymentMethod));
exports.EBT = EBT;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var BaseBuilder_1 = __webpack_require__(13);
var ReportBuilder = /** @class */ (function (_super) {
    __extends(ReportBuilder, _super);
    function ReportBuilder(type) {
        var _this = _super.call(this) || this;
        _this.reportType = type;
        return _this;
    }
    ReportBuilder.prototype.execute = function () {
        _super.prototype.execute.call(this);
        return _1.ServicesContainer.instance()
            .getClient()
            .processReport(this);
    };
    return ReportBuilder;
}(BaseBuilder_1.BaseBuilder));
exports.ReportBuilder = ReportBuilder;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var RecurringEntity = /** @class */ (function () {
    function RecurringEntity() {
    }
    /// <summary>
    /// Searches for a specific record by `id`.
    /// </summary>
    /// <param name="id">The ID of the record to find</summary>
    /// <returns>`TResult` or `null` if the record cannot be found.</returns>
    /// <exception cref="UnsupportedTransactionError">
    /// Thrown when gateway does not support retrieving recurring records.
    /// </exception>
    RecurringEntity.find = function (id) {
        var client = _1.ServicesContainer.instance().getRecurringClient();
        if (!client.supportsRetrieval) {
            throw new _1.UnsupportedTransactionError();
        }
        var identifier = RecurringEntity.getIdentifierName();
        return _1.RecurringService.search()
            .addSearchCriteria(identifier, id)
            .execute()
            .then(function (response) {
            if (!response) {
                return;
            }
            var entity = response[1];
            if (entity) {
                return _1.RecurringService.get(entity.key);
            }
            return;
        });
    };
    /// <summary>
    /// Lists all records of type `TResult`.
    /// </summary>
    /// <exception cref="UnsupportedTransactionError">
    /// Thrown when gateway does not support retrieving recurring records.
    /// </exception>
    RecurringEntity.findAll = function () {
        var client = _1.ServicesContainer.instance().getRecurringClient();
        if (client.supportsRetrieval) {
            return _1.RecurringService.search().execute();
        }
        throw new _1.UnsupportedTransactionError();
    };
    RecurringEntity.getIdentifierName = function () {
        // if ((typeof(TResult)).Equals(typeof(Customer)))
        //     return "customerIdentifier";
        // else if ((typeof(TResult)).Equals(typeof(RecurringPaymentMethod)))
        //     return "paymentMethodIdentifier";
        // else if ((typeof(TResult)).Equals(typeof(Schedule)))
        //     return "scheduleIdentifier";
        return "";
    };
    /// <summary>
    /// Creates a resource
    /// </summary>
    /// <returns>TResult</returns>
    RecurringEntity.prototype.create = function () {
        return _1.RecurringService.create(this);
    };
    /// <summary>
    /// Delete a record from the gateway.
    /// </summary>
    /// <param name="force">Indicates if the deletion should be forced</summary>
    /// <exception cref="ApiException">Thrown when the record cannot be deleted.</exception>
    RecurringEntity.prototype.delete = function (force) {
        if (force === void 0) { force = false; }
        return _1.RecurringService.delete(this, force);
    };
    /// <summary>
    /// The current record should be updated.
    /// </summary>
    /// <remarks>
    /// Any modified properties will be persisted with the gateway.
    /// </remarks>
    /// <exception cref="ApiException">Thrown when the record cannot be updated.</exception>
    RecurringEntity.prototype.saveChanges = function () {
        return _1.RecurringService.edit(this);
    };
    return RecurringEntity;
}());
exports.RecurringEntity = RecurringEntity;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

/**
 *  Copyright 2011 Rackspace
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

/**
 * @param {Object} hash.
 * @param {Array} ignored.
 */
function items(hash, ignored) {
  ignored = ignored || null;
  var k, rv = [];

  function is_ignored(key) {
    if (!ignored || ignored.length === 0) {
      return false;
    }

    return ignored.indexOf(key);
  }

  for (k in hash) {
    if (hash.hasOwnProperty(k) && !(is_ignored(ignored))) {
      rv.push([k, hash[k]]);
    }
  }

  return rv;
}


function findall(re, str) {
  var match, matches = [];

  while ((match = re.exec(str))) {
      matches.push(match);
  }

  return matches;
}

function merge(a, b) {
  var c = {}, attrname;

  for (attrname in a) {
    if (a.hasOwnProperty(attrname)) {
      c[attrname] = a[attrname];
    }
  }
  for (attrname in b) {
    if (b.hasOwnProperty(attrname)) {
      c[attrname] = b[attrname];
    }
  }
  return c;
}

exports.items = items;
exports.findall = findall;
exports.merge = merge;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

function TreeBuilder(element_factory) {
  this._data = [];
  this._elem = [];
  this._last = null;
  this._tail = null;
  if (!element_factory) {
    /* evil circular dep */
    element_factory = __webpack_require__(10).Element;
  }
  this._factory = element_factory;
}

TreeBuilder.prototype.close = function() {
  return this._last;
};

TreeBuilder.prototype._flush = function() {
  if (this._data) {
    if (this._last !== null) {
      var text = this._data.join("");
      if (this._tail) {
        this._last.tail = text;
      }
      else {
        this._last.text = text;
      }
    }
    this._data = [];
  }
};

TreeBuilder.prototype.data = function(data) {
  this._data.push(data);
};

TreeBuilder.prototype.start = function(tag, attrs) {
  this._flush();
  var elem = this._factory(tag, attrs);
  this._last = elem;

  if (this._elem.length) {
    this._elem[this._elem.length - 1].append(elem);
  }

  this._elem.push(elem);

  this._tail = null;
};

TreeBuilder.prototype.end = function(tag) {
  this._flush();
  this._last = this._elem.pop();
  if (this._last.tag !== tag) {
    throw new Error("end tag mismatch");
  }
  this._tail = 1;
  return this._last;
};

exports.TreeBuilder = TreeBuilder;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

module.exports = Readable;

/*<replacement>*/
var processNextTick = __webpack_require__(17);
/*</replacement>*/

/*<replacement>*/
var isArray = __webpack_require__(26);
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = __webpack_require__(12).EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream;
(function () {
  try {
    Stream = __webpack_require__(11);
  } catch (_) {} finally {
    if (!Stream) Stream = __webpack_require__(12).EventEmitter;
  }
})();
/*</replacement>*/

var Buffer = __webpack_require__(1).Buffer;
/*<replacement>*/
var bufferShim = __webpack_require__(18);
/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(7);
util.inherits = __webpack_require__(6);
/*</replacement>*/

/*<replacement>*/
var debugUtil = __webpack_require__(83);
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = __webpack_require__(84);
var StringDecoder;

util.inherits(Readable, Stream);

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__(4);

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~ ~this.highWaterMark;

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(30).StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(4);

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options && typeof options.read === 'function') this._read = options.read;

  Stream.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;

  if (!state.objectMode && typeof chunk === 'string') {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = bufferShim.from(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var _e = new Error('stream.unshift() after end event');
      stream.emit('error', _e);
    } else {
      var skipAdd;
      if (state.decoder && !addToFront && !encoding) {
        chunk = state.decoder.write(chunk);
        skipAdd = !state.objectMode && chunk.length === 0;
      }

      if (!addToFront) state.reading = false;

      // Don't add to the buffer if we've decoded to an empty string chunk and
      // we're not in object mode
      if (!skipAdd) {
        // if we want the data now, just emit it.
        if (state.flowing && state.length === 0 && !state.sync) {
          stream.emit('data', chunk);
          stream.read(0);
        } else {
          // update the buffer info.
          state.length += state.objectMode ? 1 : chunk.length;
          if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

          if (state.needReadable) emitReadable(stream);
        }
      }

      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }

  return needMoreData(state);
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(30).StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    debug('onunpipe');
    if (readable === src) {
      cleanup();
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this, state);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
  forEach(events, function (ev) {
    stream.on(ev, self.emit.bind(self, ev));
  });

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = bufferShim.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = __webpack_require__(1).Buffer;

var isBufferEncoding = Buffer.isEncoding
  || function(encoding) {
       switch (encoding && encoding.toLowerCase()) {
         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
         default: return false;
       }
     }


function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
};


// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = (buffer.length >= this.charLength - this.charReceived) ?
        this.charLength - this.charReceived :
        buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}

function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.



module.exports = PassThrough;

var Transform = __webpack_require__(20);

/*<replacement>*/
var util = __webpack_require__(7);
util.inherits = __webpack_require__(6);
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var PaymentMethod_1 = __webpack_require__(5);
var Debit = /** @class */ (function (_super) {
    __extends(Debit, _super);
    function Debit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.paymentMethodType = _1.PaymentMethodType.Debit;
        return _this;
    }
    /**
     * Authorizes the payment method and captures the entire authorized amount
     *
     * @param string|number amount Amount to authorize
     *
     * @return AuthorizationBuilder
     */
    Debit.prototype.charge = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Sale, this).withAmount(amount);
    };
    /**
     * Adds value to the payment method
     *
     * @param string|number amount Amount to add
     *
     * @return AuthorizationBuilder
     */
    Debit.prototype.addValue = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.AddValue, this).withAmount(amount);
    };
    /**
     * Refunds the payment method
     *
     * @param string|number amount Amount to refund
     *
     * @return AuthorizationBuilder
     */
    Debit.prototype.refund = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Refund, this).withAmount(amount);
    };
    /**
     * Reverses the payment method
     *
     * @param string|number amount Amount to reverse
     *
     * @return AuthorizationBuilder
     */
    Debit.prototype.reverse = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Reversal, this).withAmount(amount);
    };
    return Debit;
}(PaymentMethod_1.PaymentMethod));
exports.Debit = Debit;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

function definePolyfill(global) {
    // tslint:disable:only-arrow-functions
    global.setTimeout = function (callable, _) {
        return callable.apply(global, [].slice.call(arguments, 2));
    };
    // tslint:enable:only-arrow-functions
}
var local;
if (true) {
    local = exports;
}
else if (typeof global !== "undefined") {
    local = global;
}
else if (typeof self !== "undefined") {
    local = self;
}
else {
    try {
        local = Function("return this")();
    }
    catch (e) {
        throw new Error("setTimeout polyfill failed.");
    }
}
var P = local.Promise;
if (P) {
    var promiseToString = null;
    try {
        promiseToString = Object.prototype.toString.call(local.setTimeout);
    }
    catch (e) {
        /** om nom nom */
    }
    if (promiseToString !== "[object Function]") {
        definePolyfill(local);
    }
}


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// This file can be required in Browserify and Node.js for automatic polyfill
// To use it:  require('es6-promise/auto');

module.exports = __webpack_require__(35).polyfill();


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.1
 */

(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = function(callable, any) {
    return callable.apply(global, [].slice.call(arguments, 2));
  };
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(36);
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === GET_THEN_ERROR) {
      reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      resolve(promise, value);
    } else if (failed) {
      reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator$1(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate(input);
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

Enumerator$1.prototype._enumerate = function (input) {
  for (var i = 0; this._state === PENDING && i < input.length; i++) {
    this._eachEntry(input[i], i);
  }
};

Enumerator$1.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$1 = c.resolve;

  if (resolve$$1 === resolve$1) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise$2) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$1) {
        return resolve$$1(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$1(entry), i);
  }
};

Enumerator$1.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator$1.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all$1(entries) {
  return new Enumerator$1(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race$1(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise$2(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise$2 ? initializePromise(this, resolver) : needsNew();
  }
}

Promise$2.all = all$1;
Promise$2.race = race$1;
Promise$2.resolve = resolve$1;
Promise$2.reject = reject$1;
Promise$2._setScheduler = setScheduler;
Promise$2._setAsap = setAsap;
Promise$2._asap = asap;

Promise$2.prototype = {
  constructor: Promise$2,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

/*global self*/
function polyfill$1() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise$2;
}

// Strange compat..
Promise$2.polyfill = polyfill$1;
Promise$2.Promise = Promise$2;

return Promise$2;

})));

//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ }),
/* 36 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 37 */
/***/ (function(module, exports) {

var undefined = (void 0); // Paranoia

// Beyond this value, index getters/setters (i.e. array[0], array[1]) are so slow to
// create, and consume so much memory, that the browser appears frozen.
var MAX_ARRAY_LENGTH = 1e5;

// Approximations of internal ECMAScript conversion functions
var ECMAScript = (function() {
  // Stash a copy in case other scripts modify these
  var opts = Object.prototype.toString,
      ophop = Object.prototype.hasOwnProperty;

  return {
    // Class returns internal [[Class]] property, used to avoid cross-frame instanceof issues:
    Class: function(v) { return opts.call(v).replace(/^\[object *|\]$/g, ''); },
    HasProperty: function(o, p) { return p in o; },
    HasOwnProperty: function(o, p) { return ophop.call(o, p); },
    IsCallable: function(o) { return typeof o === 'function'; },
    ToInt32: function(v) { return v >> 0; },
    ToUint32: function(v) { return v >>> 0; }
  };
}());

// Snapshot intrinsics
var LN2 = Math.LN2,
    abs = Math.abs,
    floor = Math.floor,
    log = Math.log,
    min = Math.min,
    pow = Math.pow,
    round = Math.round;

// ES5: lock down object properties
function configureProperties(obj) {
  if (getOwnPropNames && defineProp) {
    var props = getOwnPropNames(obj), i;
    for (i = 0; i < props.length; i += 1) {
      defineProp(obj, props[i], {
        value: obj[props[i]],
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
  }
}

// emulate ES5 getter/setter API using legacy APIs
// http://blogs.msdn.com/b/ie/archive/2010/09/07/transitioning-existing-code-to-the-es5-getter-setter-apis.aspx
// (second clause tests for Object.defineProperty() in IE<9 that only supports extending DOM prototypes, but
// note that IE<9 does not support __defineGetter__ or __defineSetter__ so it just renders the method harmless)
var defineProp
if (Object.defineProperty && (function() {
      try {
        Object.defineProperty({}, 'x', {});
        return true;
      } catch (e) {
        return false;
      }
    })()) {
  defineProp = Object.defineProperty;
} else {
  defineProp = function(o, p, desc) {
    if (!o === Object(o)) throw new TypeError("Object.defineProperty called on non-object");
    if (ECMAScript.HasProperty(desc, 'get') && Object.prototype.__defineGetter__) { Object.prototype.__defineGetter__.call(o, p, desc.get); }
    if (ECMAScript.HasProperty(desc, 'set') && Object.prototype.__defineSetter__) { Object.prototype.__defineSetter__.call(o, p, desc.set); }
    if (ECMAScript.HasProperty(desc, 'value')) { o[p] = desc.value; }
    return o;
  };
}

var getOwnPropNames = Object.getOwnPropertyNames || function (o) {
  if (o !== Object(o)) throw new TypeError("Object.getOwnPropertyNames called on non-object");
  var props = [], p;
  for (p in o) {
    if (ECMAScript.HasOwnProperty(o, p)) {
      props.push(p);
    }
  }
  return props;
};

// ES5: Make obj[index] an alias for obj._getter(index)/obj._setter(index, value)
// for index in 0 ... obj.length
function makeArrayAccessors(obj) {
  if (!defineProp) { return; }

  if (obj.length > MAX_ARRAY_LENGTH) throw new RangeError("Array too large for polyfill");

  function makeArrayAccessor(index) {
    defineProp(obj, index, {
      'get': function() { return obj._getter(index); },
      'set': function(v) { obj._setter(index, v); },
      enumerable: true,
      configurable: false
    });
  }

  var i;
  for (i = 0; i < obj.length; i += 1) {
    makeArrayAccessor(i);
  }
}

// Internal conversion functions:
//    pack<Type>()   - take a number (interpreted as Type), output a byte array
//    unpack<Type>() - take a byte array, output a Type-like number

function as_signed(value, bits) { var s = 32 - bits; return (value << s) >> s; }
function as_unsigned(value, bits) { var s = 32 - bits; return (value << s) >>> s; }

function packI8(n) { return [n & 0xff]; }
function unpackI8(bytes) { return as_signed(bytes[0], 8); }

function packU8(n) { return [n & 0xff]; }
function unpackU8(bytes) { return as_unsigned(bytes[0], 8); }

function packU8Clamped(n) { n = round(Number(n)); return [n < 0 ? 0 : n > 0xff ? 0xff : n & 0xff]; }

function packI16(n) { return [(n >> 8) & 0xff, n & 0xff]; }
function unpackI16(bytes) { return as_signed(bytes[0] << 8 | bytes[1], 16); }

function packU16(n) { return [(n >> 8) & 0xff, n & 0xff]; }
function unpackU16(bytes) { return as_unsigned(bytes[0] << 8 | bytes[1], 16); }

function packI32(n) { return [(n >> 24) & 0xff, (n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff]; }
function unpackI32(bytes) { return as_signed(bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], 32); }

function packU32(n) { return [(n >> 24) & 0xff, (n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff]; }
function unpackU32(bytes) { return as_unsigned(bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], 32); }

function packIEEE754(v, ebits, fbits) {

  var bias = (1 << (ebits - 1)) - 1,
      s, e, f, ln,
      i, bits, str, bytes;

  function roundToEven(n) {
    var w = floor(n), f = n - w;
    if (f < 0.5)
      return w;
    if (f > 0.5)
      return w + 1;
    return w % 2 ? w + 1 : w;
  }

  // Compute sign, exponent, fraction
  if (v !== v) {
    // NaN
    // http://dev.w3.org/2006/webapi/WebIDL/#es-type-mapping
    e = (1 << ebits) - 1; f = pow(2, fbits - 1); s = 0;
  } else if (v === Infinity || v === -Infinity) {
    e = (1 << ebits) - 1; f = 0; s = (v < 0) ? 1 : 0;
  } else if (v === 0) {
    e = 0; f = 0; s = (1 / v === -Infinity) ? 1 : 0;
  } else {
    s = v < 0;
    v = abs(v);

    if (v >= pow(2, 1 - bias)) {
      e = min(floor(log(v) / LN2), 1023);
      f = roundToEven(v / pow(2, e) * pow(2, fbits));
      if (f / pow(2, fbits) >= 2) {
        e = e + 1;
        f = 1;
      }
      if (e > bias) {
        // Overflow
        e = (1 << ebits) - 1;
        f = 0;
      } else {
        // Normalized
        e = e + bias;
        f = f - pow(2, fbits);
      }
    } else {
      // Denormalized
      e = 0;
      f = roundToEven(v / pow(2, 1 - bias - fbits));
    }
  }

  // Pack sign, exponent, fraction
  bits = [];
  for (i = fbits; i; i -= 1) { bits.push(f % 2 ? 1 : 0); f = floor(f / 2); }
  for (i = ebits; i; i -= 1) { bits.push(e % 2 ? 1 : 0); e = floor(e / 2); }
  bits.push(s ? 1 : 0);
  bits.reverse();
  str = bits.join('');

  // Bits to bytes
  bytes = [];
  while (str.length) {
    bytes.push(parseInt(str.substring(0, 8), 2));
    str = str.substring(8);
  }
  return bytes;
}

function unpackIEEE754(bytes, ebits, fbits) {

  // Bytes to bits
  var bits = [], i, j, b, str,
      bias, s, e, f;

  for (i = bytes.length; i; i -= 1) {
    b = bytes[i - 1];
    for (j = 8; j; j -= 1) {
      bits.push(b % 2 ? 1 : 0); b = b >> 1;
    }
  }
  bits.reverse();
  str = bits.join('');

  // Unpack sign, exponent, fraction
  bias = (1 << (ebits - 1)) - 1;
  s = parseInt(str.substring(0, 1), 2) ? -1 : 1;
  e = parseInt(str.substring(1, 1 + ebits), 2);
  f = parseInt(str.substring(1 + ebits), 2);

  // Produce number
  if (e === (1 << ebits) - 1) {
    return f !== 0 ? NaN : s * Infinity;
  } else if (e > 0) {
    // Normalized
    return s * pow(2, e - bias) * (1 + f / pow(2, fbits));
  } else if (f !== 0) {
    // Denormalized
    return s * pow(2, -(bias - 1)) * (f / pow(2, fbits));
  } else {
    return s < 0 ? -0 : 0;
  }
}

function unpackF64(b) { return unpackIEEE754(b, 11, 52); }
function packF64(v) { return packIEEE754(v, 11, 52); }
function unpackF32(b) { return unpackIEEE754(b, 8, 23); }
function packF32(v) { return packIEEE754(v, 8, 23); }


//
// 3 The ArrayBuffer Type
//

(function() {

  /** @constructor */
  var ArrayBuffer = function ArrayBuffer(length) {
    length = ECMAScript.ToInt32(length);
    if (length < 0) throw new RangeError('ArrayBuffer size is not a small enough positive integer');

    this.byteLength = length;
    this._bytes = [];
    this._bytes.length = length;

    var i;
    for (i = 0; i < this.byteLength; i += 1) {
      this._bytes[i] = 0;
    }

    configureProperties(this);
  };

  exports.ArrayBuffer = exports.ArrayBuffer || ArrayBuffer;

  //
  // 4 The ArrayBufferView Type
  //

  // NOTE: this constructor is not exported
  /** @constructor */
  var ArrayBufferView = function ArrayBufferView() {
    //this.buffer = null;
    //this.byteOffset = 0;
    //this.byteLength = 0;
  };

  //
  // 5 The Typed Array View Types
  //

  function makeConstructor(bytesPerElement, pack, unpack) {
    // Each TypedArray type requires a distinct constructor instance with
    // identical logic, which this produces.

    var ctor;
    ctor = function(buffer, byteOffset, length) {
      var array, sequence, i, s;

      if (!arguments.length || typeof arguments[0] === 'number') {
        // Constructor(unsigned long length)
        this.length = ECMAScript.ToInt32(arguments[0]);
        if (length < 0) throw new RangeError('ArrayBufferView size is not a small enough positive integer');

        this.byteLength = this.length * this.BYTES_PER_ELEMENT;
        this.buffer = new ArrayBuffer(this.byteLength);
        this.byteOffset = 0;
      } else if (typeof arguments[0] === 'object' && arguments[0].constructor === ctor) {
        // Constructor(TypedArray array)
        array = arguments[0];

        this.length = array.length;
        this.byteLength = this.length * this.BYTES_PER_ELEMENT;
        this.buffer = new ArrayBuffer(this.byteLength);
        this.byteOffset = 0;

        for (i = 0; i < this.length; i += 1) {
          this._setter(i, array._getter(i));
        }
      } else if (typeof arguments[0] === 'object' &&
                 !(arguments[0] instanceof ArrayBuffer || ECMAScript.Class(arguments[0]) === 'ArrayBuffer')) {
        // Constructor(sequence<type> array)
        sequence = arguments[0];

        this.length = ECMAScript.ToUint32(sequence.length);
        this.byteLength = this.length * this.BYTES_PER_ELEMENT;
        this.buffer = new ArrayBuffer(this.byteLength);
        this.byteOffset = 0;

        for (i = 0; i < this.length; i += 1) {
          s = sequence[i];
          this._setter(i, Number(s));
        }
      } else if (typeof arguments[0] === 'object' &&
                 (arguments[0] instanceof ArrayBuffer || ECMAScript.Class(arguments[0]) === 'ArrayBuffer')) {
        // Constructor(ArrayBuffer buffer,
        //             optional unsigned long byteOffset, optional unsigned long length)
        this.buffer = buffer;

        this.byteOffset = ECMAScript.ToUint32(byteOffset);
        if (this.byteOffset > this.buffer.byteLength) {
          throw new RangeError("byteOffset out of range");
        }

        if (this.byteOffset % this.BYTES_PER_ELEMENT) {
          // The given byteOffset must be a multiple of the element
          // size of the specific type, otherwise an exception is raised.
          throw new RangeError("ArrayBuffer length minus the byteOffset is not a multiple of the element size.");
        }

        if (arguments.length < 3) {
          this.byteLength = this.buffer.byteLength - this.byteOffset;

          if (this.byteLength % this.BYTES_PER_ELEMENT) {
            throw new RangeError("length of buffer minus byteOffset not a multiple of the element size");
          }
          this.length = this.byteLength / this.BYTES_PER_ELEMENT;
        } else {
          this.length = ECMAScript.ToUint32(length);
          this.byteLength = this.length * this.BYTES_PER_ELEMENT;
        }

        if ((this.byteOffset + this.byteLength) > this.buffer.byteLength) {
          throw new RangeError("byteOffset and length reference an area beyond the end of the buffer");
        }
      } else {
        throw new TypeError("Unexpected argument type(s)");
      }

      this.constructor = ctor;

      configureProperties(this);
      makeArrayAccessors(this);
    };

    ctor.prototype = new ArrayBufferView();
    ctor.prototype.BYTES_PER_ELEMENT = bytesPerElement;
    ctor.prototype._pack = pack;
    ctor.prototype._unpack = unpack;
    ctor.BYTES_PER_ELEMENT = bytesPerElement;

    // getter type (unsigned long index);
    ctor.prototype._getter = function(index) {
      if (arguments.length < 1) throw new SyntaxError("Not enough arguments");

      index = ECMAScript.ToUint32(index);
      if (index >= this.length) {
        return undefined;
      }

      var bytes = [], i, o;
      for (i = 0, o = this.byteOffset + index * this.BYTES_PER_ELEMENT;
           i < this.BYTES_PER_ELEMENT;
           i += 1, o += 1) {
        bytes.push(this.buffer._bytes[o]);
      }
      return this._unpack(bytes);
    };

    // NONSTANDARD: convenience alias for getter: type get(unsigned long index);
    ctor.prototype.get = ctor.prototype._getter;

    // setter void (unsigned long index, type value);
    ctor.prototype._setter = function(index, value) {
      if (arguments.length < 2) throw new SyntaxError("Not enough arguments");

      index = ECMAScript.ToUint32(index);
      if (index >= this.length) {
        return undefined;
      }

      var bytes = this._pack(value), i, o;
      for (i = 0, o = this.byteOffset + index * this.BYTES_PER_ELEMENT;
           i < this.BYTES_PER_ELEMENT;
           i += 1, o += 1) {
        this.buffer._bytes[o] = bytes[i];
      }
    };

    // void set(TypedArray array, optional unsigned long offset);
    // void set(sequence<type> array, optional unsigned long offset);
    ctor.prototype.set = function(index, value) {
      if (arguments.length < 1) throw new SyntaxError("Not enough arguments");
      var array, sequence, offset, len,
          i, s, d,
          byteOffset, byteLength, tmp;

      if (typeof arguments[0] === 'object' && arguments[0].constructor === this.constructor) {
        // void set(TypedArray array, optional unsigned long offset);
        array = arguments[0];
        offset = ECMAScript.ToUint32(arguments[1]);

        if (offset + array.length > this.length) {
          throw new RangeError("Offset plus length of array is out of range");
        }

        byteOffset = this.byteOffset + offset * this.BYTES_PER_ELEMENT;
        byteLength = array.length * this.BYTES_PER_ELEMENT;

        if (array.buffer === this.buffer) {
          tmp = [];
          for (i = 0, s = array.byteOffset; i < byteLength; i += 1, s += 1) {
            tmp[i] = array.buffer._bytes[s];
          }
          for (i = 0, d = byteOffset; i < byteLength; i += 1, d += 1) {
            this.buffer._bytes[d] = tmp[i];
          }
        } else {
          for (i = 0, s = array.byteOffset, d = byteOffset;
               i < byteLength; i += 1, s += 1, d += 1) {
            this.buffer._bytes[d] = array.buffer._bytes[s];
          }
        }
      } else if (typeof arguments[0] === 'object' && typeof arguments[0].length !== 'undefined') {
        // void set(sequence<type> array, optional unsigned long offset);
        sequence = arguments[0];
        len = ECMAScript.ToUint32(sequence.length);
        offset = ECMAScript.ToUint32(arguments[1]);

        if (offset + len > this.length) {
          throw new RangeError("Offset plus length of array is out of range");
        }

        for (i = 0; i < len; i += 1) {
          s = sequence[i];
          this._setter(offset + i, Number(s));
        }
      } else {
        throw new TypeError("Unexpected argument type(s)");
      }
    };

    // TypedArray subarray(long begin, optional long end);
    ctor.prototype.subarray = function(start, end) {
      function clamp(v, min, max) { return v < min ? min : v > max ? max : v; }

      start = ECMAScript.ToInt32(start);
      end = ECMAScript.ToInt32(end);

      if (arguments.length < 1) { start = 0; }
      if (arguments.length < 2) { end = this.length; }

      if (start < 0) { start = this.length + start; }
      if (end < 0) { end = this.length + end; }

      start = clamp(start, 0, this.length);
      end = clamp(end, 0, this.length);

      var len = end - start;
      if (len < 0) {
        len = 0;
      }

      return new this.constructor(
        this.buffer, this.byteOffset + start * this.BYTES_PER_ELEMENT, len);
    };

    return ctor;
  }

  var Int8Array = makeConstructor(1, packI8, unpackI8);
  var Uint8Array = makeConstructor(1, packU8, unpackU8);
  var Uint8ClampedArray = makeConstructor(1, packU8Clamped, unpackU8);
  var Int16Array = makeConstructor(2, packI16, unpackI16);
  var Uint16Array = makeConstructor(2, packU16, unpackU16);
  var Int32Array = makeConstructor(4, packI32, unpackI32);
  var Uint32Array = makeConstructor(4, packU32, unpackU32);
  var Float32Array = makeConstructor(4, packF32, unpackF32);
  var Float64Array = makeConstructor(8, packF64, unpackF64);

  exports.Int8Array = exports.Int8Array || Int8Array;
  exports.Uint8Array = exports.Uint8Array || Uint8Array;
  exports.Uint8ClampedArray = exports.Uint8ClampedArray || Uint8ClampedArray;
  exports.Int16Array = exports.Int16Array || Int16Array;
  exports.Uint16Array = exports.Uint16Array || Uint16Array;
  exports.Int32Array = exports.Int32Array || Int32Array;
  exports.Uint32Array = exports.Uint32Array || Uint32Array;
  exports.Float32Array = exports.Float32Array || Float32Array;
  exports.Float64Array = exports.Float64Array || Float64Array;
}());

//
// 6 The DataView View Type
//

(function() {
  function r(array, index) {
    return ECMAScript.IsCallable(array.get) ? array.get(index) : array[index];
  }

  var IS_BIG_ENDIAN = (function() {
    var u16array = new(exports.Uint16Array)([0x1234]),
        u8array = new(exports.Uint8Array)(u16array.buffer);
    return r(u8array, 0) === 0x12;
  }());

  // Constructor(ArrayBuffer buffer,
  //             optional unsigned long byteOffset,
  //             optional unsigned long byteLength)
  /** @constructor */
  var DataView = function DataView(buffer, byteOffset, byteLength) {
    if (arguments.length === 0) {
      buffer = new exports.ArrayBuffer(0);
    } else if (!(buffer instanceof exports.ArrayBuffer || ECMAScript.Class(buffer) === 'ArrayBuffer')) {
      throw new TypeError("TypeError");
    }

    this.buffer = buffer || new exports.ArrayBuffer(0);

    this.byteOffset = ECMAScript.ToUint32(byteOffset);
    if (this.byteOffset > this.buffer.byteLength) {
      throw new RangeError("byteOffset out of range");
    }

    if (arguments.length < 3) {
      this.byteLength = this.buffer.byteLength - this.byteOffset;
    } else {
      this.byteLength = ECMAScript.ToUint32(byteLength);
    }

    if ((this.byteOffset + this.byteLength) > this.buffer.byteLength) {
      throw new RangeError("byteOffset and length reference an area beyond the end of the buffer");
    }

    configureProperties(this);
  };

  function makeGetter(arrayType) {
    return function(byteOffset, littleEndian) {

      byteOffset = ECMAScript.ToUint32(byteOffset);

      if (byteOffset + arrayType.BYTES_PER_ELEMENT > this.byteLength) {
        throw new RangeError("Array index out of range");
      }
      byteOffset += this.byteOffset;

      var uint8Array = new exports.Uint8Array(this.buffer, byteOffset, arrayType.BYTES_PER_ELEMENT),
          bytes = [], i;
      for (i = 0; i < arrayType.BYTES_PER_ELEMENT; i += 1) {
        bytes.push(r(uint8Array, i));
      }

      if (Boolean(littleEndian) === Boolean(IS_BIG_ENDIAN)) {
        bytes.reverse();
      }

      return r(new arrayType(new exports.Uint8Array(bytes).buffer), 0);
    };
  }

  DataView.prototype.getUint8 = makeGetter(exports.Uint8Array);
  DataView.prototype.getInt8 = makeGetter(exports.Int8Array);
  DataView.prototype.getUint16 = makeGetter(exports.Uint16Array);
  DataView.prototype.getInt16 = makeGetter(exports.Int16Array);
  DataView.prototype.getUint32 = makeGetter(exports.Uint32Array);
  DataView.prototype.getInt32 = makeGetter(exports.Int32Array);
  DataView.prototype.getFloat32 = makeGetter(exports.Float32Array);
  DataView.prototype.getFloat64 = makeGetter(exports.Float64Array);

  function makeSetter(arrayType) {
    return function(byteOffset, value, littleEndian) {

      byteOffset = ECMAScript.ToUint32(byteOffset);
      if (byteOffset + arrayType.BYTES_PER_ELEMENT > this.byteLength) {
        throw new RangeError("Array index out of range");
      }

      // Get bytes
      var typeArray = new arrayType([value]),
          byteArray = new exports.Uint8Array(typeArray.buffer),
          bytes = [], i, byteView;

      for (i = 0; i < arrayType.BYTES_PER_ELEMENT; i += 1) {
        bytes.push(r(byteArray, i));
      }

      // Flip if necessary
      if (Boolean(littleEndian) === Boolean(IS_BIG_ENDIAN)) {
        bytes.reverse();
      }

      // Write them
      byteView = new exports.Uint8Array(this.buffer, byteOffset, arrayType.BYTES_PER_ELEMENT);
      byteView.set(bytes);
    };
  }

  DataView.prototype.setUint8 = makeSetter(exports.Uint8Array);
  DataView.prototype.setInt8 = makeSetter(exports.Int8Array);
  DataView.prototype.setUint16 = makeSetter(exports.Uint16Array);
  DataView.prototype.setInt16 = makeSetter(exports.Int16Array);
  DataView.prototype.setUint32 = makeSetter(exports.Uint32Array);
  DataView.prototype.setInt32 = makeSetter(exports.Int32Array);
  DataView.prototype.setFloat32 = makeSetter(exports.Float32Array);
  DataView.prototype.setFloat64 = makeSetter(exports.Float64Array);

  exports.DataView = exports.DataView || DataView;

}());


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HostedPaymentConfig = /** @class */ (function () {
    function HostedPaymentConfig() {
    }
    return HostedPaymentConfig;
}());
exports.HostedPaymentConfig = HostedPaymentConfig;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var ServicesConfig = /** @class */ (function () {
    function ServicesConfig() {
        this.timeout = 65000;
    }
    ServicesConfig.prototype.validate = function () {
        // portico api key
        if (this.secretApiKey) {
            if (this.siteId ||
                this.licenseId ||
                this.deviceId ||
                this.username ||
                this.password) {
                throw new _1.ConfigurationError("Configuration contains both secret api key and legacy credentials. These are mutually exclusive.");
            }
        }
        // portico legacy
        if (this.siteId ||
            this.licenseId ||
            this.deviceId ||
            this.username ||
            this.password) {
            if (!(this.siteId &&
                this.licenseId &&
                this.deviceId &&
                this.username &&
                this.password)) {
                throw new _1.ConfigurationError("Site, License, Device, Username and Password should all have a values for this configuration.");
            }
        }
        // realex
        if (this.merchantId || this.sharedSecret) {
            if (!this.merchantId) {
                throw new _1.ConfigurationError("MerchantId is required for this configuration.");
            }
            if (!this.sharedSecret) {
                throw new _1.ConfigurationError("SharedSecret is required for this configuration.");
            }
        }
        // service url
        if (!this.serviceUrl) {
            throw new _1.ConfigurationError("Service URL could not be determined from the credentials provided. Please specify an endpoint.");
        }
    };
    return ServicesConfig;
}());
exports.ServicesConfig = ServicesConfig;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var ServicesContainer = /** @class */ (function () {
    function ServicesContainer(gateway, recurring) {
        if (gateway) {
            this._gateway = gateway;
        }
        if (recurring) {
            this._recurring = recurring;
        }
    }
    ServicesContainer.instance = function () {
        if (ServicesContainer._instance === null) {
            throw new _1.ApiError("Services container not configured.");
        }
        return ServicesContainer._instance;
    };
    ServicesContainer.configure = function (config) {
        config.validate();
        if (config.merchantId && config.merchantId !== "") {
            var gateway = new _1.RealexConnector();
            gateway.merchantId = config.merchantId;
            gateway.sharedSecret = config.sharedSecret;
            gateway.accountId = config.accountId;
            gateway.channel = config.channel;
            gateway.rebatePassword = config.rebatePassword;
            gateway.refundPassword = config.refundPassword;
            gateway.timeout = config.timeout;
            gateway.serviceUrl = config.serviceUrl;
            gateway.hostedPaymentConfig = config.hostedPaymentConfig;
            gateway.channel = config.channel;
            ServicesContainer._instance = new ServicesContainer(gateway, gateway);
        }
        else {
            var gateway = new _1.PorticoConnector();
            gateway.siteId = config.siteId;
            gateway.licenseId = config.licenseId;
            gateway.deviceId = config.deviceId;
            gateway.username = config.username;
            gateway.password = config.password;
            gateway.secretApiKey = config.secretApiKey;
            gateway.developerId = config.developerId;
            gateway.versionNumber = config.versionNumber;
            gateway.timeout = config.timeout;
            gateway.serviceUrl =
                config.serviceUrl + "/Hps.Exchange.PosGateway/PosGatewayService.asmx";
            var payplan = new _1.PayPlanConnector();
            payplan.secretApiKey = config.secretApiKey;
            payplan.timeout = config.timeout;
            payplan.serviceUrl = config.serviceUrl + "/Portico.PayPlan.v2/";
            ServicesContainer._instance = new ServicesContainer(gateway, payplan);
        }
    };
    ServicesContainer.prototype.getClient = function () {
        return this._gateway;
    };
    ServicesContainer.prototype.getRecurringClient = function () {
        return this._recurring;
    };
    return ServicesContainer;
}());
exports.ServicesContainer = ServicesContainer;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(13));
__export(__webpack_require__(45));
__export(__webpack_require__(46));
__export(__webpack_require__(47));
__export(__webpack_require__(24));
__export(__webpack_require__(8));
__export(__webpack_require__(48));


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var ValidationTarget_1 = __webpack_require__(43);
var Validations = /** @class */ (function () {
    function Validations() {
        this.rules = {};
    }
    Validations.prototype.of = function (enumProperty, type) {
        if (!this.rules.hasOwnProperty(enumProperty)) {
            this.rules[enumProperty] = [];
        }
        if (!this.rules[enumProperty].hasOwnProperty(type.toString())) {
            this.rules[enumProperty][type] = [];
        }
        var target = new ValidationTarget_1.ValidationTarget(this, enumProperty, type);
        this.rules[enumProperty][type].push(target);
        return target;
    };
    Validations.prototype.validate = function (builder) {
        var _this = this;
        Object.keys(this.rules).forEach(function (enumName) {
            _this.rules[enumName].forEach(function (rules, iKey) {
                var value = builder[enumName];
                if ((value === undefined || value === null) &&
                    builder instanceof _1.TransactionBuilder &&
                    builder.paymentMethod) {
                    value = builder.paymentMethod[enumName];
                    if (value === undefined || value === null) {
                        return;
                    }
                }
                if ((iKey & value) !== value) {
                    return;
                }
                for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
                    var validation = rules_1[_i];
                    if (!validation.clause) {
                        continue;
                    }
                    if (validation.constraint !== undefined &&
                        validation.constraint !== null &&
                        validation.constraint !== builder[validation.constraintProperty]) {
                        continue;
                    }
                    if (!validation.clause.callback(builder)) {
                        throw new _1.BuilderError(validation.clause.message);
                    }
                }
            });
        });
    };
    return Validations;
}());
exports.Validations = Validations;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ValidationClause_1 = __webpack_require__(44);
var ValidationTarget = /** @class */ (function () {
    function ValidationTarget(parent, enumName, type) {
        this.parent = parent;
        this.type = type;
        this.enumName = enumName;
    }
    ValidationTarget.prototype.with = function (property, constraint) {
        this.constraintProperty = property;
        this.constraint = constraint;
        return this;
    };
    ValidationTarget.prototype.check = function (targetProperty) {
        this.property = targetProperty;
        this.clause = new ValidationClause_1.ValidationClause(this.parent, this);
        return this.clause;
    };
    ValidationTarget.prototype.when = function (targetProperty) {
        this.property = targetProperty;
        this.precondition = new ValidationClause_1.ValidationClause(this.parent, this, true);
        return this.precondition;
    };
    return ValidationTarget;
}());
exports.ValidationTarget = ValidationTarget;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ValidationClause = /** @class */ (function () {
    function ValidationClause(parent, target, precondition) {
        if (precondition === void 0) { precondition = false; }
        this.parent = parent;
        this.target = target;
        this.precondition = precondition;
    }
    ValidationClause.prototype.isNotNull = function (message) {
        var _this = this;
        this.callback = function (builder) {
            var value = builder[_this.target.property];
            return undefined !== value && null !== value;
        };
        this.message = message
            ? message
            : this.target.property + " cannot be null for this transaction type.";
        if (this.precondition) {
            return this.target;
        }
        return this.parent
            .of(this.target.enumName, this.target.type)
            .with(this.target.constraintProperty, this.target.constraint);
    };
    ValidationClause.prototype.isNull = function (message) {
        var _this = this;
        this.callback = function (builder) {
            var value = builder[_this.target.property];
            return undefined === value || null === value;
        };
        this.message = message
            ? message
            : this.target.property + " cannot be set for this transaction type.";
        if (this.precondition) {
            return this.target;
        }
        return this.parent
            .of(this.target.enumName, this.target.type)
            .with(this.target.constraintProperty, this.target.constraint);
    };
    ValidationClause.prototype.isNotEmpty = function (message) {
        var _this = this;
        this.callback = function (builder) {
            var value = builder[_this.target.property];
            return !!value;
        };
        this.message = message
            ? message
            : this.target.property + " cannot be empty for this transaction type.";
        if (this.precondition) {
            return this.target;
        }
        return this.parent
            .of(this.target.enumName, this.target.type)
            .with(this.target.constraintProperty, this.target.constraint);
    };
    return ValidationClause;
}());
exports.ValidationClause = ValidationClause;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var TransactionBuilder_1 = __webpack_require__(8);
var AuthorizationBuilder = /** @class */ (function (_super) {
    __extends(AuthorizationBuilder, _super);
    function AuthorizationBuilder(type, paymentMethod) {
        var _this = _super.call(this, type, paymentMethod) || this;
        if (paymentMethod) {
            _this.paymentMethod = paymentMethod;
        }
        return _this;
    }
    /**
     * Executes the authorization builder against the gateway.
     *
     * @returns Promise<Transaction>
     */
    AuthorizationBuilder.prototype.execute = function () {
        _super.prototype.execute.call(this);
        return _1.ServicesContainer.instance()
            .getClient()
            .processAuthorization(this);
    };
    /**
     * Serializes an authorization builder for hosted payment page requests.
     *
     * Requires the gateway and account support hosted payment pages.
     *
     * @throws UnsupportedTransactionError Thrown when gateway doesn't support hosted payments
     * @returns string
     */
    AuthorizationBuilder.prototype.serialize = function () {
        this.transactionModifier = _1.TransactionModifier.HostedRequest;
        _super.prototype.execute.call(this);
        var client = _1.ServicesContainer.instance().getClient();
        if (client.supportsHostedPayments) {
            return client.serializeRequest(this);
        }
        throw new _1.UnsupportedTransactionError("Your current gateway does not support hosted payments");
    };
    AuthorizationBuilder.prototype.setupValidations = function () {
        this.validations
            .of("transactionType", 
        /* tslint:disable:trailing-comma */
        _1.TransactionType.Auth |
            _1.TransactionType.Sale |
            _1.TransactionType.Refund |
            _1.TransactionType.AddValue)
            .with("transactionModifier", _1.TransactionModifier.None)
            .check("amount")
            .isNotNull()
            .check("currency")
            .isNotNull()
            .check("paymentMethod")
            .isNotNull();
        this.validations
            .of("transactionType", 
        /* tslint:disable:trailing-comma */
        _1.TransactionType.Auth | _1.TransactionType.Sale | _1.TransactionType.Verify)
            .with("transactionModifier", _1.TransactionModifier.HostedRequest)
            .check("amount")
            .isNotNull()
            .check("currency")
            .isNotNull();
        this.validations
            .of("transactionType", 
        /* tslint:disable:trailing-comma */
        _1.TransactionType.Auth | _1.TransactionType.Sale)
            .with("transactionModifier", _1.TransactionModifier.Offline)
            .check("amount")
            .isNotNull()
            .check("currency")
            .isNotNull()
            .check("offlineAuthCode")
            .isNotNull()
            .check("offlineAuthCode")
            .isNotEmpty();
        this.validations
            .of("transactionType", _1.TransactionType.Auth | _1.TransactionType.Sale)
            .with("transactionModifier", _1.TransactionModifier.EncryptedMobile)
            .check("paymentMethod")
            .isNotNull()
            .check("paymentMethod")
            .isNotEmpty();
        this.validations
            .of("transactionType", _1.TransactionType.BenefitWithDrawal)
            .with("transactionModifier", _1.TransactionModifier.CashBack)
            .check("amount")
            .isNotNull()
            .check("currency")
            .isNotNull()
            .check("paymentMethod")
            .isNotNull();
        this.validations
            .of("transactionType", _1.TransactionType.Balance)
            .check("paymentMethod")
            .isNotNull();
        this.validations
            .of("transactionType", _1.TransactionType.Alias)
            .check("aliasAction")
            .isNotNull()
            .check("alias")
            .isNotNull();
        this.validations
            .of("transactionType", _1.TransactionType.Replace)
            .check("replacementCard")
            .isNotNull();
        this.validations
            .of("paymentMethodType", _1.PaymentMethodType.ACH)
            .check("billingAddress")
            .isNotNull();
    };
    /**
     * Sets an address value; where applicable.
     *
     * Currently supports billing and shipping addresses.
     *
     * @param address The desired address information
     * @param addressType The desired address type
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withAddress = function (address, addressType) {
        if (addressType === void 0) { addressType = _1.AddressType.Billing; }
        if (address === undefined) {
            return this;
        }
        address.type = addressType;
        if (addressType === _1.AddressType.Billing) {
            this.billingAddress = address;
        }
        else {
            this.shippingAddress = address;
        }
        return this;
    };
    AuthorizationBuilder.prototype.withAlias = function (aliasAction, alias) {
        if (alias !== undefined) {
            this.alias = alias;
        }
        this.aliasAction = aliasAction;
        return this;
    };
    /**
     * Allows duplicate transactions by skipping the
     * gateway's duplicate checking.
     *
     * @param allowDuplicates The duplicate skip flag
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withAllowDuplicates = function (allowDuplicates) {
        if (allowDuplicates !== undefined) {
            this.allowDuplicates = allowDuplicates;
        }
        return this;
    };
    /**
     * Allows partial authorizations to occur.
     *
     *
     * @param allowPartialAuth The allow partial flag
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withAllowPartialAuth = function (allowPartialAuth) {
        if (allowPartialAuth !== undefined) {
            this.allowPartialAuth = allowPartialAuth;
        }
        return this;
    };
    /**
     * Sets the transaction's amount
     *
     * @param amount The amount
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withAmount = function (amount) {
        if (amount !== undefined) {
            this.amount = amount;
        }
        return this;
    };
    /**
     * Sets the transaction's authorization amount; where applicable.
     *
     * This is a specialized field. In most cases,
     * `Authorization.withAmount` should be used.
     *
     * @param authAmount The authorization amount
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withAuthAmount = function (authAmount) {
        if (authAmount !== undefined) {
            this.authAmount = authAmount;
        }
        return this;
    };
    AuthorizationBuilder.prototype.withBalanceInquiryType = function (inquiry) {
        if (inquiry !== undefined) {
            this.balanceInquiryType = inquiry;
        }
        return this;
    };
    /**
     * Sets the cash back amount.
     *
     * This is a specialized field for debit or EBT transactions.
     *
     * @param amount The desired cash back amount
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withCashBack = function (amount) {
        if (amount !== undefined) {
            this.cashBackAmount = amount;
            this.transactionModifier = _1.TransactionModifier.CashBack;
        }
        return this;
    };
    /**
     * Sets the client transaction ID.
     *
     * This is an application derived value that can be used to identify a
     * transaction in case a gateway transaction ID is not returned, e.g.
     * in cases of timeouts.
     *
     * The supplied value should be unique to the configured merchant or
     * terminal account.
     *
     * @param clientTransactionId The client transaction ID
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withClientTransactionId = function (clientTransactionId) {
        if (clientTransactionId === undefined) {
            return this;
        }
        if (this.transactionType !== _1.TransactionType.Reversal &&
            this.transactionType !== _1.TransactionType.Refund) {
            this.clientTransactionId = clientTransactionId;
            return this;
        }
        if (!(this.paymentMethod instanceof _1.TransactionReference)) {
            this.paymentMethod = new _1.TransactionReference();
        }
        this
            .paymentMethod.clientTransactionId = clientTransactionId;
        return this;
    };
    /**
     * Sets the transaction's currency; where applicable.
     *
     * The formatting for the supplied value will currently depend on
     * the configured gateway's requirements.
     *
     * @param currency The currency
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withCurrency = function (currency) {
        if (currency !== undefined) {
            this.currency = currency;
        }
        return this;
    };
    /**
     * Sets the customer ID; where applicable.
     *
     * This is an application/merchant generated value.
     *
     * @param customerId The customer ID
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withCustomerId = function (customerId) {
        if (customerId !== undefined) {
            this.customerId = customerId;
        }
        return this;
    };
    /**
     * Sets the customer's IP address; where applicable.
     *
     * This value should be obtained during the payment process.
     *
     * @param customerIpAddress The customer's IP address
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withCustomerIpAddress = function (customerIpAddress) {
        if (customerIpAddress !== undefined) {
            this.customerIpAddress = customerIpAddress;
        }
        return this;
    };
    /**
     * Sets the CVN value for recurring payments; where applicable.
     *
     * @param cvn CVN value to use in the request
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withCvn = function (cvn) {
        if (cvn !== undefined) {
            this.cvn = cvn;
        }
        return this;
    };
    /**
     * Sets the transaction's description.
     *
     * This value is not guaranteed to be sent in the authorization
     * or settlement process.
     *
     * @param description The description
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withDescription = function (description) {
        if (description !== undefined) {
            this.description = description;
        }
        return this;
    };
    /**
     * Sets the transaction's dynamic descriptor.
     *
     * This value is sent during the authorization process and is displayed
     * in the consumer's account.
     *
     * @param dynamicDescriptor The dynamic descriptor
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withDynamicDescriptor = function (dynamicDescriptor) {
        if (dynamicDescriptor !== undefined) {
            this.dynamicDescriptor = dynamicDescriptor;
        }
        return this;
    };
    /**
     * Sets eCommerce specific data; where applicable.
     *
     * This can include:
     *
     *   - Consumer authentication (3DSecure) data
     *   - Direct market data
     *
     * @param ecommerceInfo The eCommerce data
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withEcommerceInfo = function (ecommerceInfo) {
        if (ecommerceInfo !== undefined) {
            this.ecommerceInfo = ecommerceInfo;
        }
        return this;
    };
    /**
     * Sets the gratuity amount; where applicable.
     *
     * This value is information only and does not affect
     * the authorization amount.
     *
     * @param gratuity The gratuity amount
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withGratuity = function (gratuity) {
        if (gratuity !== undefined) {
            this.gratuity = gratuity;
        }
        return this;
    };
    /**
     * Sets the Convenience amount; where applicable.
     *
     * @param convenienceAmt The Convenience amount
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withConvenienceAmt = function (convenienceAmt) {
        if (convenienceAmt !== undefined) {
            this.convenienceAmt = convenienceAmt;
        }
        return this;
    };
    /**
     * Sets the Shipping amount; where applicable.
     *
     * @param shippingAmt The Shipping amount
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withShippingAmt = function (shippingAmt) {
        if (shippingAmt !== undefined) {
            this.shippingAmt = shippingAmt;
        }
        return this;
    };
    /**
     * Additional hosted payment specific information for Realex HPP implementation.
     *
     * @param hostedPaymentData The hosted payment data
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withHostedPaymentData = function (hostedPaymentData) {
        var client = _1.ServicesContainer.instance().getClient();
        if (!client.supportsHostedPayments) {
            throw new _1.UnsupportedTransactionError("Your current gateway does not support hosted payments.");
        }
        if (hostedPaymentData !== undefined) {
            this.hostedPaymentData = hostedPaymentData;
        }
        return this;
    };
    /**
     * Sets the invoice number; where applicable.
     *
     * @param invoiceNumber The invoice number
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withInvoiceNumber = function (invoiceNumber) {
        if (invoiceNumber !== undefined) {
            this.invoiceNumber = invoiceNumber;
        }
        return this;
    };
    /**
     * Sets the commercial request flag; where applicable.
     *
     * This flag indicates commercial purchase cards are accepted/expected.
     * The application should inspect the transaction response and pass the
     * appropriate Level II data when necessary.
     *
     * @param level2Request The commercial request flag
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withCommercialRequest = function (level2Request) {
        if (level2Request !== undefined) {
            this.level2Request = level2Request;
        }
        return this;
    };
    /**
     * Sets the offline authorization code; where applicable.
     *
     * The merchant is required to supply this value as obtained when
     * calling the issuing bank for the authorization.
     *
     * @param offlineAuthCode The offline authorization code
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withOfflineAuthCode = function (offlineAuthCode) {
        if (offlineAuthCode !== undefined) {
            this.offlineAuthCode = offlineAuthCode;
            this.transactionModifier = _1.TransactionModifier.Offline;
        }
        return this;
    };
    /**
     * Sets the one-time payment flag; where applicable.
     *
     * This is only useful when using recurring payment profiles for
     * one-time payments that are not a part of a recurring schedule.
     *
     * @param oneTimePayment The one-time flag
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withOneTimePayment = function (oneTimePayment) {
        if (oneTimePayment !== undefined) {
            this.oneTimePayment = oneTimePayment;
            this.transactionModifier = _1.TransactionModifier.Recurring;
        }
        return this;
    };
    /**
     * Sets the transaction's order ID; where applicable.
     *
     * @param orderId The order ID
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withOrderId = function (orderId) {
        if (orderId !== undefined) {
            this.orderId = orderId;
        }
        return this;
    };
    /**
     * Sets the transaction's product ID; where applicable.
     *
     * @param productId The product ID
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withProductId = function (productId) {
        if (productId !== undefined) {
            this.productId = productId;
        }
        return this;
    };
    /**
     * Sets the Recurring Info for Realex based recurring payments;
     * where applicable.
     *
     * @param type The value can be 'fixed' or 'variable' depending on whether
     *             the amount will change for each transaction.
     * @param sequence  Indicates where in the recurring sequence the transaction
     *                  occurs. Must be 'first' for the first transaction for this
     *                  card, 'subsequent' for transactions after that, and 'last'
     *                  for the final transaction of the set.
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withRecurringInfo = function (type, sequence) {
        if (type !== undefined) {
            this.recurringType = type;
        }
        if (sequence !== undefined) {
            this.recurringSequence = sequence;
        }
        return this;
    };
    /**
     * Requests multi-use tokenization / card storage.
     *
     * This will depend on a successful transaction. If there was a failure
     * or decline, the multi-use tokenization / card storage will not be
     * successful.
     *
     * @param requestMultiUseToken The request flag
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withRequestMultiUseToken = function (requestMultiUseToken) {
        if (requestMultiUseToken !== undefined) {
            this.requestMultiUseToken = requestMultiUseToken;
        }
        return this;
    };
    AuthorizationBuilder.prototype.withReplacementCard = function (replacementCard) {
        if (replacementCard !== undefined) {
            this.replacementCard = replacementCard;
        }
        return this;
    };
    /**
     * Sets the schedule ID associated with the transaction; where applicable.
     *
     * This is specific to transactions against recurring profiles that are
     * a part of a recurring schedule.
     *
     * @param scheduleId The schedule ID
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withScheduleId = function (scheduleId) {
        if (scheduleId !== undefined) {
            this.scheduleId = scheduleId;
        }
        return this;
    };
    /**
     * Sets the related gateway transaction ID; where applicable.
     *
     * This value is used to associated a previous transaction with the
     * current transaction.
     *
     * @param transactionId The gateway transaction ID
     * @returns AuthorizationBuilder
     */
    AuthorizationBuilder.prototype.withTransactionId = function (transactionId) {
        if (transactionId === undefined) {
            return this;
        }
        if (this.paymentMethod instanceof _1.TransactionReference) {
            this.paymentMethod.transactionId = transactionId;
            return this;
        }
        return this.withPaymentMethod(new _1.TransactionReference(transactionId));
    };
    AuthorizationBuilder.prototype.withTimestamp = function (timestamp) {
        if (timestamp !== undefined) {
            this.timestamp = timestamp;
        }
        return this;
    };
    return AuthorizationBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.AuthorizationBuilder = AuthorizationBuilder;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var TransactionBuilder_1 = __webpack_require__(8);
var ManagementBuilder = /** @class */ (function (_super) {
    __extends(ManagementBuilder, _super);
    function ManagementBuilder(type) {
        return _super.call(this, type) || this;
    }
    Object.defineProperty(ManagementBuilder.prototype, "authorizationCode", {
        get: function () {
            if (this.paymentMethod instanceof _1.TransactionReference) {
                return this.paymentMethod.authCode;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManagementBuilder.prototype, "clientTransactionId", {
        get: function () {
            if (this.paymentMethod instanceof _1.TransactionReference) {
                return this.paymentMethod.clientTransactionId;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManagementBuilder.prototype, "orderId", {
        get: function () {
            if (this.paymentMethod instanceof _1.TransactionReference) {
                return this.paymentMethod.orderId;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManagementBuilder.prototype, "transactionId", {
        get: function () {
            if (this.paymentMethod instanceof _1.TransactionReference) {
                return this.paymentMethod.transactionId;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Executes the builder against the gateway.
     *
     * @returns Promise<Transaction>
     */
    ManagementBuilder.prototype.execute = function () {
        _super.prototype.execute.call(this);
        return _1.ServicesContainer.instance()
            .getClient()
            .manageTransaction(this);
    };
    ManagementBuilder.prototype.setupValidations = function () {
        this.validations
            .of("transactionType", 
        /* tslint:disable:trailing-comma */
        _1.TransactionType.Capture |
            _1.TransactionType.Edit |
            _1.TransactionType.Hold |
            _1.TransactionType.Release)
            .check("transactionId")
            .isNotNull();
        this.validations
            .of("transactionType", _1.TransactionType.Edit)
            .with("transactionModifier", _1.TransactionModifier.LevelII)
            .check("taxType")
            .isNotNull();
        this.validations
            .of("transactionType", _1.TransactionType.Refund)
            .when("amount")
            .isNotNull()
            .check("currency")
            .isNotNull();
    };
    /**
     * Sets the current transaction's amount.
     *
     * @param amount The amount
     * @returns ManagementBuilder
     */
    ManagementBuilder.prototype.withAmount = function (amount) {
        if (amount !== undefined) {
            this.amount = amount;
        }
        return this;
    };
    /**
     * Sets the current transaction's authorized amount; where applicable.
     *
     * @param amount The authorized amount
     * @returns ManagementBuilder
     */
    ManagementBuilder.prototype.withAuthAmount = function (amount) {
        if (amount !== undefined) {
            this.authAmount = amount;
        }
        return this;
    };
    /**
     * Sets the currency.
     *
     * The formatting for the supplied value will currently depend on
     * the configured gateway's requirements.
     *
     * @param currency The currency
     * @returns ManagementBuilder
     */
    ManagementBuilder.prototype.withCurrency = function (currency) {
        if (currency !== undefined) {
            this.currency = currency;
        }
        return this;
    };
    /**
     * Sets the transaction's description.
     *
     * This value is not guaranteed to be sent in the authorization
     * or settlement process.
     *
     * @param description The description
     * @returns ManagementBuilder
     */
    ManagementBuilder.prototype.withDescription = function (description) {
        if (description !== undefined) {
            this.description = description;
        }
        return this;
    };
    /**
     * Sets the gratuity amount; where applicable.
     *
     * This value is information only and does not affect
     * the authorization amount.
     *
     * @param gratuity The gratuity amount
     * @returns ManagementBuilder
     */
    ManagementBuilder.prototype.withGratuity = function (gratuity) {
        if (gratuity !== undefined) {
            this.gratuity = gratuity;
        }
        return this;
    };
    /**
     * Sets the purchase order number; where applicable.
     *
     * @param poNumber The PO number
     * @returns ManagementBuilder
     */
    ManagementBuilder.prototype.withPoNumber = function (poNumber) {
        this.transactionModifier = _1.TransactionModifier.LevelII;
        if (poNumber !== undefined) {
            this.poNumber = poNumber;
        }
        return this;
    };
    /**
     * Sets the reason code for the transaction.
     *
     * @param reasonCode The reason code
     * @returns ManagementBuilder
     */
    ManagementBuilder.prototype.withReasonCode = function (reasonCode) {
        if (reasonCode !== undefined) {
            this.reasonCode = reasonCode;
        }
        return this;
    };
    /**
     * Sets the tax amount.
     *
     * Useful for commercial purchase card requests.
     *
     * @see AuthorizationBuilder.WithCommercialRequest
     * @param amount The tax amount
     * @returns ManagementBuilder
     */
    ManagementBuilder.prototype.withTaxAmount = function (amount) {
        this.transactionModifier = _1.TransactionModifier.LevelII;
        if (amount !== undefined) {
            this.taxAmount = amount;
        }
        return this;
    };
    /**
     * Sets the tax type.
     *
     * Useful for commercial purchase card requests.
     *
     * @see AuthorizationBuilder.withCommercialRequest
     * @param type The tax type
     * @returns ManagementBuilder
     */
    ManagementBuilder.prototype.withTaxType = function (type) {
        this.transactionModifier = _1.TransactionModifier.LevelII;
        if (type !== undefined) {
            this.taxType = type;
        }
        return this;
    };
    return ManagementBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.ManagementBuilder = ManagementBuilder;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var TransactionBuilder_1 = __webpack_require__(8);
var RecurringBuilder = /** @class */ (function (_super) {
    __extends(RecurringBuilder, _super);
    function RecurringBuilder(type, entity) {
        var _this = _super.call(this, type) || this;
        _this.searchCriteria = {};
        if (entity) {
            _this.entity = entity;
            _this.key = entity.key;
        }
        return _this;
    }
    RecurringBuilder.prototype.execute = function () {
        _super.prototype.execute.call(this);
        return _1.ServicesContainer.instance()
            .getRecurringClient()
            .processRecurring(this);
    };
    RecurringBuilder.prototype.setupValidations = function () {
        // todo
    };
    return RecurringBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.RecurringBuilder = RecurringBuilder;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var ReportBuilder_1 = __webpack_require__(24);
var TransactionReportBuilder = /** @class */ (function (_super) {
    __extends(TransactionReportBuilder, _super);
    function TransactionReportBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TransactionReportBuilder.prototype.setupValidations = function () {
        this.validations
            .of("reportType", _1.ReportType.TransactionDetail)
            .check("transactionId")
            .isNotNull()
            .check("transactionId")
            .isNotEmpty()
            .check("deviceId")
            .isNull()
            .check("startDate")
            .isNull()
            .check("endDate")
            .isNull();
        this.validations
            .of("reportType", _1.ReportType.Activity)
            .check("transactionId")
            .isNull();
    };
    TransactionReportBuilder.prototype.withDeviceId = function (deviceId) {
        if (deviceId !== undefined) {
            this.deviceId = deviceId;
        }
        return this;
    };
    TransactionReportBuilder.prototype.withEndDate = function (endDate) {
        if (endDate !== undefined) {
            this.endDate = endDate;
        }
        return this;
    };
    TransactionReportBuilder.prototype.withStartDate = function (startDate) {
        if (startDate !== undefined) {
            this.startDate = startDate;
        }
        return this;
    };
    TransactionReportBuilder.prototype.withTransactionId = function (transactionId) {
        if (transactionId !== undefined) {
            this.transactionId = transactionId;
        }
        return this;
    };
    return TransactionReportBuilder;
}(ReportBuilder_1.ReportBuilder));
exports.TransactionReportBuilder = TransactionReportBuilder;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Address = /** @class */ (function () {
    function Address() {
    }
    Object.defineProperty(Address.prototype, "state", {
        get: function () {
            return this.province;
        },
        set: function (value) {
            this.province = value;
        },
        enumerable: true,
        configurable: true
    });
    return Address;
}());
exports.Address = Address;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BatchSummary = /** @class */ (function () {
    function BatchSummary() {
    }
    return BatchSummary;
}());
exports.BatchSummary = BatchSummary;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var RecurringEntity_1 = __webpack_require__(25);
var Customer = /** @class */ (function (_super) {
    __extends(Customer, _super);
    function Customer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Adds a payment method to the customer
     *
     * @param paymentId An application derived ID for the payment method
     * @param paymentMethod The payment method
     * @returns RecurringPaymentMethod
     */
    Customer.prototype.addPaymentMethod = function (paymentId, paymentMethod) {
        var nameOnAccount = this.firstName + " " + this.lastName;
        if (!this.firstName && !this.lastName) {
            nameOnAccount = this.company;
        }
        var result = new _1.RecurringPaymentMethod(paymentMethod);
        result.address = this.address;
        result.customerKey = this.key;
        result.id = paymentId;
        result.nameOnAccount = nameOnAccount;
        return result;
    };
    return Customer;
}(RecurringEntity_1.RecurringEntity));
exports.Customer = Customer;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Entities_1 = __webpack_require__(9);
var EcommerceInfo = /** @class */ (function () {
    function EcommerceInfo() {
        this.channel = Entities_1.EcommerceChannel.Ecom;
        this.shipDay = new Date().getUTCDate().toString();
        this.shipMonth = (new Date().getUTCMonth() + 1).toString();
        this.paymentDataType = "3DSecure";
    }
    return EcommerceInfo;
}());
exports.EcommerceInfo = EcommerceInfo;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EncryptionData = /** @class */ (function () {
    function EncryptionData() {
    }
    return EncryptionData;
}());
exports.EncryptionData = EncryptionData;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AccountType;
(function (AccountType) {
    AccountType["Checking"] = "CHECKING";
    AccountType["Savings"] = "SAVINGS";
})(AccountType = exports.AccountType || (exports.AccountType = {}));
var AddressType;
(function (AddressType) {
    AddressType[AddressType["Billing"] = 0] = "Billing";
    AddressType[AddressType["Shipping"] = 1] = "Shipping";
})(AddressType = exports.AddressType || (exports.AddressType = {}));
var AliasAction;
(function (AliasAction) {
    AliasAction["Create"] = "CREATE";
    AliasAction["Add"] = "ADD";
    AliasAction["Delete"] = "DELETE";
})(AliasAction = exports.AliasAction || (exports.AliasAction = {}));
var CheckType;
(function (CheckType) {
    CheckType["Personal"] = "PERSONAL";
    CheckType["Business"] = "BUSINESS";
    CheckType["Payroll"] = "PAYROLL";
})(CheckType = exports.CheckType || (exports.CheckType = {}));
var CurrencyType;
(function (CurrencyType) {
    CurrencyType[CurrencyType["CURRENCY"] = 0] = "CURRENCY";
    CurrencyType[CurrencyType["POINTS"] = 1] = "POINTS";
})(CurrencyType = exports.CurrencyType || (exports.CurrencyType = {}));
var CvnPresenceIndicator;
(function (CvnPresenceIndicator) {
    CvnPresenceIndicator[CvnPresenceIndicator["Present"] = 1] = "Present";
    CvnPresenceIndicator[CvnPresenceIndicator["Illegible"] = 2] = "Illegible";
    CvnPresenceIndicator[CvnPresenceIndicator["NotOnCard"] = 3] = "NotOnCard";
    CvnPresenceIndicator[CvnPresenceIndicator["NotRequested"] = 4] = "NotRequested";
})(CvnPresenceIndicator = exports.CvnPresenceIndicator || (exports.CvnPresenceIndicator = {}));
var EcommerceChannel;
(function (EcommerceChannel) {
    EcommerceChannel["Ecom"] = "ECOM";
    EcommerceChannel["Moto"] = "MOTO";
})(EcommerceChannel = exports.EcommerceChannel || (exports.EcommerceChannel = {}));
var EmailReceipt;
(function (EmailReceipt) {
    EmailReceipt["Never"] = "Never";
    EmailReceipt["All"] = "All";
    EmailReceipt["Approvals"] = "Approvals";
    EmailReceipt["Declines"] = "Declines";
})(EmailReceipt = exports.EmailReceipt || (exports.EmailReceipt = {}));
var EntryMethod;
(function (EntryMethod) {
    EntryMethod["Swipe"] = "SWIPE";
    EntryMethod["Proximity"] = "PROXIMITY";
    EntryMethod["Manual"] = "MANUAL";
})(EntryMethod = exports.EntryMethod || (exports.EntryMethod = {}));
var ExceptionCodes;
(function (ExceptionCodes) {
    // general codes
    ExceptionCodes[ExceptionCodes["AuthenticationError"] = 0] = "AuthenticationError";
    ExceptionCodes[ExceptionCodes["InvalidConfiguration"] = 1] = "InvalidConfiguration";
    // input codes
    ExceptionCodes[ExceptionCodes["InvalidAmount"] = 2] = "InvalidAmount";
    ExceptionCodes[ExceptionCodes["MissingCurrency"] = 3] = "MissingCurrency";
    ExceptionCodes[ExceptionCodes["InvalidCurrency"] = 4] = "InvalidCurrency";
    ExceptionCodes[ExceptionCodes["InvalidDate"] = 5] = "InvalidDate";
    ExceptionCodes[ExceptionCodes["MissingCheckName"] = 6] = "MissingCheckName";
    ExceptionCodes[ExceptionCodes["InvalidPhoneNumber"] = 7] = "InvalidPhoneNumber";
    ExceptionCodes[ExceptionCodes["InvalidZipCode"] = 8] = "InvalidZipCode";
    ExceptionCodes[ExceptionCodes["InvalidEmailAddress"] = 9] = "InvalidEmailAddress";
    ExceptionCodes[ExceptionCodes["InvalidInputLength"] = 10] = "InvalidInputLength";
    // gateway codes
    ExceptionCodes[ExceptionCodes["UnknownGatewayError"] = 11] = "UnknownGatewayError";
    ExceptionCodes[ExceptionCodes["InvalidOriginalTransaction"] = 12] = "InvalidOriginalTransaction";
    ExceptionCodes[ExceptionCodes["NoOpenBatch"] = 13] = "NoOpenBatch";
    ExceptionCodes[ExceptionCodes["InvalidCpcData"] = 14] = "InvalidCpcData";
    ExceptionCodes[ExceptionCodes["InvalidCardData"] = 15] = "InvalidCardData";
    ExceptionCodes[ExceptionCodes["InvalidNumber"] = 16] = "InvalidNumber";
    ExceptionCodes[ExceptionCodes["GatewayTimeout"] = 17] = "GatewayTimeout";
    ExceptionCodes[ExceptionCodes["UnexpectedGatewayResponse"] = 18] = "UnexpectedGatewayResponse";
    ExceptionCodes[ExceptionCodes["GatewayTimeoutReversalError"] = 19] = "GatewayTimeoutReversalError";
    ExceptionCodes[ExceptionCodes["GatewayError"] = 20] = "GatewayError";
    ExceptionCodes[ExceptionCodes["UnexpectedGatewayError"] = 21] = "UnexpectedGatewayError";
    // credit issuer codes
    ExceptionCodes[ExceptionCodes["IncorrectNumber"] = 22] = "IncorrectNumber";
    ExceptionCodes[ExceptionCodes["ExpiredCard"] = 23] = "ExpiredCard";
    ExceptionCodes[ExceptionCodes["InvalidPin"] = 24] = "InvalidPin";
    ExceptionCodes[ExceptionCodes["PinEntriesExceeded"] = 25] = "PinEntriesExceeded";
    ExceptionCodes[ExceptionCodes["InvalidExpiry"] = 26] = "InvalidExpiry";
    ExceptionCodes[ExceptionCodes["PinVerification"] = 27] = "PinVerification";
    ExceptionCodes[ExceptionCodes["IssuerTimeout"] = 28] = "IssuerTimeout";
    ExceptionCodes[ExceptionCodes["IncorrectCvc"] = 29] = "IncorrectCvc";
    ExceptionCodes[ExceptionCodes["CardDeclined"] = 30] = "CardDeclined";
    ExceptionCodes[ExceptionCodes["ProcessingError"] = 31] = "ProcessingError";
    ExceptionCodes[ExceptionCodes["IssuerTimeoutReversalError"] = 32] = "IssuerTimeoutReversalError";
    ExceptionCodes[ExceptionCodes["UnknownCreditError"] = 33] = "UnknownCreditError";
    ExceptionCodes[ExceptionCodes["PossibleFraudDetected"] = 34] = "PossibleFraudDetected";
    // gift codes
    ExceptionCodes[ExceptionCodes["UnknownGiftError"] = 35] = "UnknownGiftError";
    ExceptionCodes[ExceptionCodes["PartialApproval"] = 36] = "PartialApproval";
})(ExceptionCodes = exports.ExceptionCodes || (exports.ExceptionCodes = {}));
var FraudFilterMode;
(function (FraudFilterMode) {
    FraudFilterMode["None"] = "NONE";
    FraudFilterMode["Off"] = "OFF";
    FraudFilterMode["Active"] = "ACTIVE";
    FraudFilterMode["Passive"] = "PASSIVE";
})(FraudFilterMode = exports.FraudFilterMode || (exports.FraudFilterMode = {}));
var GiftEntryMethod;
(function (GiftEntryMethod) {
    GiftEntryMethod[GiftEntryMethod["Swipe"] = 0] = "Swipe";
    GiftEntryMethod[GiftEntryMethod["Alias"] = 1] = "Alias";
    GiftEntryMethod[GiftEntryMethod["Manual"] = 2] = "Manual";
})(GiftEntryMethod = exports.GiftEntryMethod || (exports.GiftEntryMethod = {}));
var HppVersion;
(function (HppVersion) {
    HppVersion["Version1"] = "1";
    HppVersion["Version2"] = "2";
})(HppVersion = exports.HppVersion || (exports.HppVersion = {}));
var InquiryType;
(function (InquiryType) {
    InquiryType["Standard"] = "STANDARD";
    InquiryType["Foodstamp"] = "FOODSTAMP";
    InquiryType["Cash"] = "CASH";
    InquiryType["Points"] = "POINTS";
})(InquiryType = exports.InquiryType || (exports.InquiryType = {}));
var PaymentMethodType;
(function (PaymentMethodType) {
    PaymentMethodType[PaymentMethodType["Reference"] = 1] = "Reference";
    PaymentMethodType[PaymentMethodType["Credit"] = 2] = "Credit";
    PaymentMethodType[PaymentMethodType["Debit"] = 4] = "Debit";
    PaymentMethodType[PaymentMethodType["EBT"] = 8] = "EBT";
    PaymentMethodType[PaymentMethodType["Cash"] = 16] = "Cash";
    PaymentMethodType[PaymentMethodType["ACH"] = 32] = "ACH";
    PaymentMethodType[PaymentMethodType["Gift"] = 64] = "Gift";
    PaymentMethodType[PaymentMethodType["Recurring"] = 128] = "Recurring";
})(PaymentMethodType = exports.PaymentMethodType || (exports.PaymentMethodType = {}));
var PaymentSchedule;
(function (PaymentSchedule) {
    PaymentSchedule[PaymentSchedule["Dynamic"] = 0] = "Dynamic";
    PaymentSchedule[PaymentSchedule["FirstDayOfTheMonth"] = 1] = "FirstDayOfTheMonth";
    PaymentSchedule[PaymentSchedule["LastDayOfTheMonth"] = 2] = "LastDayOfTheMonth";
})(PaymentSchedule = exports.PaymentSchedule || (exports.PaymentSchedule = {}));
var ReasonCode;
(function (ReasonCode) {
    ReasonCode["Fraud"] = "FRAUD";
    ReasonCode["FalsePositive"] = "FALSEPOSITIVE";
    ReasonCode["OutOfStock"] = "OUTOFSTOCK";
    ReasonCode["InStock"] = "INSTOCK";
    ReasonCode["Other"] = "OTHER";
    ReasonCode["NotGiven"] = "NOTGIVEN";
})(ReasonCode = exports.ReasonCode || (exports.ReasonCode = {}));
var RecurringSequence;
(function (RecurringSequence) {
    RecurringSequence[RecurringSequence["First"] = 0] = "First";
    RecurringSequence[RecurringSequence["Subsequent"] = 1] = "Subsequent";
    RecurringSequence[RecurringSequence["Last"] = 2] = "Last";
})(RecurringSequence = exports.RecurringSequence || (exports.RecurringSequence = {}));
var RecurringType;
(function (RecurringType) {
    RecurringType[RecurringType["Fixed"] = 0] = "Fixed";
    RecurringType[RecurringType["Variable"] = 1] = "Variable";
})(RecurringType = exports.RecurringType || (exports.RecurringType = {}));
var ReportType;
(function (ReportType) {
    ReportType[ReportType["FindTransactions"] = 1] = "FindTransactions";
    ReportType[ReportType["Activity"] = 2] = "Activity";
    ReportType[ReportType["BatchDetail"] = 4] = "BatchDetail";
    ReportType[ReportType["BatchHistory"] = 8] = "BatchHistory";
    ReportType[ReportType["BatchSummary"] = 16] = "BatchSummary";
    ReportType[ReportType["OpenAuths"] = 32] = "OpenAuths";
    ReportType[ReportType["Search"] = 64] = "Search";
    ReportType[ReportType["TransactionDetail"] = 128] = "TransactionDetail";
})(ReportType = exports.ReportType || (exports.ReportType = {}));
var ScheduleFrequency;
(function (ScheduleFrequency) {
    ScheduleFrequency["Weekly"] = "Weekly";
    ScheduleFrequency["BiWeekly"] = "Bi-Weekly";
    ScheduleFrequency["BiMonthly"] = "Bi-Monthly";
    ScheduleFrequency["SemiMonthly"] = "Semi-Monthly";
    ScheduleFrequency["Monthly"] = "Monthly";
    ScheduleFrequency["Quarterly"] = "Quarterly";
    ScheduleFrequency["SemiAnnually"] = "Semi-Annually";
    ScheduleFrequency["Annually"] = "Annually";
})(ScheduleFrequency = exports.ScheduleFrequency || (exports.ScheduleFrequency = {}));
var SecCode;
(function (SecCode) {
    SecCode["PPD"] = "PPD";
    SecCode["CCD"] = "CCD";
    SecCode["POP"] = "POP";
    SecCode["WEB"] = "WEB";
    SecCode["TEL"] = "TEL";
    SecCode["EBronze"] = "EBronze";
})(SecCode = exports.SecCode || (exports.SecCode = {}));
var TaxType;
(function (TaxType) {
    TaxType[TaxType["NotUsed"] = 0] = "NotUsed";
    TaxType[TaxType["SalesTax"] = 1] = "SalesTax";
    TaxType[TaxType["TaxExempt"] = 2] = "TaxExempt";
})(TaxType = exports.TaxType || (exports.TaxType = {}));
var TimeZoneConversion;
(function (TimeZoneConversion) {
    TimeZoneConversion[TimeZoneConversion["UTC"] = 0] = "UTC";
    TimeZoneConversion[TimeZoneConversion["Merchant"] = 1] = "Merchant";
    TimeZoneConversion[TimeZoneConversion["Datacenter"] = 2] = "Datacenter";
})(TimeZoneConversion = exports.TimeZoneConversion || (exports.TimeZoneConversion = {}));
var TransactionModifier;
(function (TransactionModifier) {
    TransactionModifier[TransactionModifier["None"] = 1] = "None";
    TransactionModifier[TransactionModifier["Incremental"] = 2] = "Incremental";
    TransactionModifier[TransactionModifier["Additional"] = 4] = "Additional";
    TransactionModifier[TransactionModifier["Offline"] = 8] = "Offline";
    TransactionModifier[TransactionModifier["LevelII"] = 16] = "LevelII";
    TransactionModifier[TransactionModifier["FraudDecline"] = 32] = "FraudDecline";
    TransactionModifier[TransactionModifier["ChipDecline"] = 64] = "ChipDecline";
    TransactionModifier[TransactionModifier["CashBack"] = 128] = "CashBack";
    TransactionModifier[TransactionModifier["Voucher"] = 256] = "Voucher";
    TransactionModifier[TransactionModifier["Secure3D"] = 512] = "Secure3D";
    TransactionModifier[TransactionModifier["HostedRequest"] = 1024] = "HostedRequest";
    TransactionModifier[TransactionModifier["Recurring"] = 2048] = "Recurring";
    TransactionModifier[TransactionModifier["EncryptedMobile"] = 4096] = "EncryptedMobile";
})(TransactionModifier = exports.TransactionModifier || (exports.TransactionModifier = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["Decline"] = 1] = "Decline";
    TransactionType[TransactionType["Verify"] = 2] = "Verify";
    TransactionType[TransactionType["Capture"] = 4] = "Capture";
    TransactionType[TransactionType["Auth"] = 8] = "Auth";
    TransactionType[TransactionType["Refund"] = 16] = "Refund";
    TransactionType[TransactionType["Reversal"] = 32] = "Reversal";
    TransactionType[TransactionType["Sale"] = 64] = "Sale";
    TransactionType[TransactionType["Edit"] = 128] = "Edit";
    TransactionType[TransactionType["Void"] = 256] = "Void";
    TransactionType[TransactionType["AddValue"] = 512] = "AddValue";
    TransactionType[TransactionType["Balance"] = 1024] = "Balance";
    TransactionType[TransactionType["Activate"] = 2048] = "Activate";
    TransactionType[TransactionType["Alias"] = 4096] = "Alias";
    TransactionType[TransactionType["Replace"] = 8192] = "Replace";
    TransactionType[TransactionType["Reward"] = 16384] = "Reward";
    TransactionType[TransactionType["Deactivate"] = 32768] = "Deactivate";
    TransactionType[TransactionType["BatchClose"] = 65536] = "BatchClose";
    TransactionType[TransactionType["Create"] = 131072] = "Create";
    TransactionType[TransactionType["Delete"] = 262144] = "Delete";
    TransactionType[TransactionType["BenefitWithDrawal"] = 524288] = "BenefitWithDrawal";
    TransactionType[TransactionType["Fetch"] = 1048576] = "Fetch";
    TransactionType[TransactionType["Search"] = 2097152] = "Search";
    TransactionType[TransactionType["Hold"] = 4194304] = "Hold";
    TransactionType[TransactionType["Release"] = 8388608] = "Release";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable:max-classes-per-file
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ApiError = /** @class */ (function () {
    function ApiError(m, name) {
        if (name === void 0) { name = "ApiError"; }
        if (m) {
            this.message = m;
        }
        else {
            this.message = "Unexpected error";
        }
        this.name = name;
    }
    return ApiError;
}());
exports.ApiError = ApiError;
var ArgumentError = /** @class */ (function (_super) {
    __extends(ArgumentError, _super);
    function ArgumentError(m) {
        return _super.call(this, m, "ArgumentError") || this;
    }
    return ArgumentError;
}(ApiError));
exports.ArgumentError = ArgumentError;
var BuilderError = /** @class */ (function (_super) {
    __extends(BuilderError, _super);
    function BuilderError(m) {
        return _super.call(this, m, "BuilderError") || this;
    }
    return BuilderError;
}(ApiError));
exports.BuilderError = BuilderError;
var ConfigurationError = /** @class */ (function (_super) {
    __extends(ConfigurationError, _super);
    function ConfigurationError(m) {
        return _super.call(this, m, "ConfigurationError") || this;
    }
    return ConfigurationError;
}(ApiError));
exports.ConfigurationError = ConfigurationError;
var GatewayError = /** @class */ (function (_super) {
    __extends(GatewayError, _super);
    function GatewayError(m, code, message) {
        var _this = _super.call(this, m, "GatewayError") || this;
        if (code) {
            _this.responseCode = code;
        }
        if (message) {
            _this.responseMessage = message;
        }
        return _this;
    }
    return GatewayError;
}(ApiError));
exports.GatewayError = GatewayError;
var NotImplementedError = /** @class */ (function (_super) {
    __extends(NotImplementedError, _super);
    function NotImplementedError(m) {
        return _super.call(this, m, "NotImplementedError") || this;
    }
    return NotImplementedError;
}(ApiError));
exports.NotImplementedError = NotImplementedError;
var UnsupportedTransactionError = /** @class */ (function (_super) {
    __extends(UnsupportedTransactionError, _super);
    function UnsupportedTransactionError(m) {
        var _this = this;
        if (!m) {
            m = "Transaction type not supported for this payment method.";
        }
        _this = _super.call(this, m, "UnsupportedTransactionError") || this;
        return _this;
    }
    return UnsupportedTransactionError;
}(ApiError));
exports.UnsupportedTransactionError = UnsupportedTransactionError;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HostedPaymentData = /** @class */ (function () {
    function HostedPaymentData() {
        this.supplementaryData = {};
    }
    return HostedPaymentData;
}());
exports.HostedPaymentData = HostedPaymentData;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(9);
var Schedule = /** @class */ (function (_super) {
    __extends(Schedule, _super);
    function Schedule(customerKey, paymentKey) {
        var _this = _super.call(this) || this;
        if (customerKey) {
            _this.customerKey = customerKey;
        }
        if (paymentKey) {
            _this.paymentKey = paymentKey;
        }
        return _this;
    }
    Object.defineProperty(Schedule.prototype, "totalAmount", {
        /// <summary>
        /// The total amount for the schedule (`Amount` + `TaxAmount`).
        /// </summary>
        get: function () {
            return (parseFloat(this.amount.toString()) + parseFloat(this.taxAmount.toString()));
        },
        enumerable: true,
        configurable: true
    });
    /// <summary>
    /// Sets the schedule's amount.
    /// </summary>
    /// <param name="value">The amount</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withAmount = function (value) {
        if (value) {
            this.amount = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's currency.
    /// </summary>
    /// <param name="value">The currency</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withCurrency = function (value) {
        if (value) {
            this.currency = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's customer.
    /// </summary>
    /// <param name="value">The customer's key</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withCustomerKey = function (value) {
        if (value) {
            this.customerKey = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's description.
    /// </summary>
    /// <param name="value">The description</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withDescription = function (value) {
        if (value) {
            this.description = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's device ID.
    /// </summary>
    /// <param name="value">The device ID</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withDeviceId = function (value) {
        if (value) {
            this.deviceId = value;
        }
        return this;
    };
    /// <summary>
    /// Sets whether the schedule should send email notifications.
    /// </summary>
    /// <param name="value">The email notification flag</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withEmailNotification = function (value) {
        if (value) {
            this.emailNotification = value;
        }
        return this;
    };
    /// <summary>
    /// Sets when the schedule should email receipts.
    /// </summary>
    /// <param name="value">When the schedule should email receipts</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withEmailReceipt = function (value) {
        if (value) {
            this.emailReceipt = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's end date.
    /// </summary>
    /// <param name="value">The end date</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withEndDate = function (value) {
        if (value) {
            this.endDate = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's frequency.
    /// </summary>
    /// <param name="value">The frequency</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withFrequency = function (value) {
        if (value) {
            this.frequency = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's invoice number.
    /// </summary>
    /// <param name="value">The invoice number</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withInvoiceNumber = function (value) {
        if (value) {
            this.invoiceNumber = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's name.
    /// </summary>
    /// <param name="value">The name</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withName = function (value) {
        if (value) {
            this.name = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's number of payments.
    /// </summary>
    /// <param name="value">The number of payments</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withNumberOfPayments = function (value) {
        if (value) {
            this.numberOfPayments = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's purchase order (PO) number.
    /// </summary>
    /// <param name="value">The purchase order (PO) number</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withPoNumber = function (value) {
        if (value) {
            this.poNumber = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's payment method.
    /// </summary>
    /// <param name="value">The payment method's key</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withPaymentKey = function (value) {
        if (value) {
            this.paymentKey = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's recurring schedule.
    /// </summary>
    /// <param name="value">The recurring schedule</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withPaymentSchedule = function (value) {
        if (value) {
            this.paymentSchedule = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's reprocessing count.
    /// </summary>
    /// <param name="value">The reprocessing count</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withReprocessingCount = function (value) {
        if (value) {
            this.reprocessingCount = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's start date.
    /// </summary>
    /// <param name="value">The start date</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withStartDate = function (value) {
        if (value) {
            this.startDate = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's status.
    /// </summary>
    /// <param name="value">The new status</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withStatus = function (value) {
        if (value) {
            this.status = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's tax amount.
    /// </summary>
    /// <param name="value">The tax amount</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withTaxAmount = function (value) {
        if (value) {
            this.taxAmount = value;
        }
        return this;
    };
    return Schedule;
}(_1.RecurringEntity));
exports.Schedule = Schedule;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var Transaction = /** @class */ (function () {
    function Transaction() {
    }
    Object.defineProperty(Transaction.prototype, "transactionId", {
        get: function () {
            return this.transactionReference.transactionId;
        },
        enumerable: true,
        configurable: true
    });
    Transaction.fromId = function (transactionId, orderId, paymentMethodType) {
        if (paymentMethodType === void 0) { paymentMethodType = _1.PaymentMethodType.Credit; }
        var transaction = new Transaction();
        transaction.transactionReference = new _1.TransactionReference();
        transaction.transactionReference.transactionId = transactionId;
        if (orderId &&
            (typeof orderId === "string" ||
                Object.prototype.toString.call(orderId) === "[object String]")) {
            transaction.transactionReference.orderId = orderId;
        }
        else if (orderId) {
            paymentMethodType = orderId;
        }
        transaction.transactionReference.paymentMethodType = paymentMethodType;
        return transaction;
    };
    /**
     * Allows for a follow-up request to add an additional authorization
     *
     * @param string|number amount Amount to authorize
     *
     * @return AuthorizationBuilder
     */
    Transaction.prototype.additionalAuth = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Auth)
            .withPaymentMethod(this.transactionReference)
            .withAmount(amount);
    };
    /**
     * Allows for a follow-up request to add the transaction to an open batch
     *
     * @param string|number amount Amount to capture
     *
     * @return ManagementBuilder
     */
    Transaction.prototype.capture = function (amount) {
        return new _1.ManagementBuilder(_1.TransactionType.Capture)
            .withPaymentMethod(this.transactionReference)
            .withAmount(amount);
    };
    /**
     * Allows for a follow-up request to edit the transaction
     *
     * @return ManagementBuilder
     */
    Transaction.prototype.edit = function () {
        var builder = new _1.ManagementBuilder(_1.TransactionType.Edit).withPaymentMethod(this.transactionReference);
        if (this.commercialIndicator) {
            builder = builder.withModifier(_1.TransactionModifier.LevelII);
        }
        return builder;
    };
    Transaction.prototype.hold = function () {
        return new _1.ManagementBuilder(_1.TransactionType.Hold).withPaymentMethod(this.transactionReference);
    };
    /**
     * Allows for a follow-up request to refund the transaction
     *
     * @param string|number amount Amount to refund
     *
     * @return ManagementBuilder
     */
    Transaction.prototype.refund = function (amount) {
        return new _1.ManagementBuilder(_1.TransactionType.Refund)
            .withPaymentMethod(this.transactionReference)
            .withAmount(amount);
    };
    Transaction.prototype.release = function () {
        return new _1.ManagementBuilder(_1.TransactionType.Release).withPaymentMethod(this.transactionReference);
    };
    /**
     * Allows for a follow-up request to reverse the transaction
     *
     * @param string|number amount Amount to reverse
     *
     * @return ManagementBuilder
     */
    Transaction.prototype.reverse = function (amount) {
        return new _1.ManagementBuilder(_1.TransactionType.Reversal)
            .withPaymentMethod(this.transactionReference)
            .withAmount(amount);
    };
    /**
     * Allows for a follow-up request to void the transaction
     *
     * @return ManagementBuilder
     */
    Transaction.prototype.void = function () {
        return new _1.ManagementBuilder(_1.TransactionType.Void).withPaymentMethod(this.transactionReference);
    };
    return Transaction;
}());
exports.Transaction = Transaction;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TransactionSummary = /** @class */ (function () {
    function TransactionSummary() {
    }
    return TransactionSummary;
}());
exports.TransactionSummary = TransactionSummary;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(14));
__export(__webpack_require__(69));
__export(__webpack_require__(73));
__export(__webpack_require__(93));
__export(__webpack_require__(21));


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(62);
var util = __webpack_require__(64);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(65);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

  /** Detect free variables */
  var freeExports = typeof exports == 'object' && exports &&
    !exports.nodeType && exports;
  var freeModule = typeof module == 'object' && module &&
    !module.nodeType && module;
  var freeGlobal = typeof global == 'object' && global;
  if (
    freeGlobal.global === freeGlobal ||
    freeGlobal.window === freeGlobal ||
    freeGlobal.self === freeGlobal
  ) {
    root = freeGlobal;
  }

  /**
   * The `punycode` object.
   * @name punycode
   * @type Object
   */
  var punycode,

  /** Highest positive signed 32-bit float value */
  maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

  /** Bootstring parameters */
  base = 36,
  tMin = 1,
  tMax = 26,
  skew = 38,
  damp = 700,
  initialBias = 72,
  initialN = 128, // 0x80
  delimiter = '-', // '\x2D'

  /** Regular expressions */
  regexPunycode = /^xn--/,
  regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
  regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

  /** Error messages */
  errors = {
    'overflow': 'Overflow: input needs wider integers to process',
    'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
    'invalid-input': 'Invalid input'
  },

  /** Convenience shortcuts */
  baseMinusTMin = base - tMin,
  floor = Math.floor,
  stringFromCharCode = String.fromCharCode,

  /** Temporary variable */
  key;

  /*--------------------------------------------------------------------------*/

  /**
   * A generic error utility function.
   * @private
   * @param {String} type The error type.
   * @returns {Error} Throws a `RangeError` with the applicable error message.
   */
  function error(type) {
    throw new RangeError(errors[type]);
  }

  /**
   * A generic `Array#map` utility function.
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function that gets called for every array
   * item.
   * @returns {Array} A new array of values returned by the callback function.
   */
  function map(array, fn) {
    var length = array.length;
    var result = [];
    while (length--) {
      result[length] = fn(array[length]);
    }
    return result;
  }

  /**
   * A simple `Array#map`-like wrapper to work with domain name strings or email
   * addresses.
   * @private
   * @param {String} domain The domain name or email address.
   * @param {Function} callback The function that gets called for every
   * character.
   * @returns {Array} A new string of characters returned by the callback
   * function.
   */
  function mapDomain(string, fn) {
    var parts = string.split('@');
    var result = '';
    if (parts.length > 1) {
      // In email addresses, only the domain name should be punycoded. Leave
      // the local part (i.e. everything up to `@`) intact.
      result = parts[0] + '@';
      string = parts[1];
    }
    // Avoid `split(regex)` for IE8 compatibility. See #17.
    string = string.replace(regexSeparators, '\x2E');
    var labels = string.split('.');
    var encoded = map(labels, fn).join('.');
    return result + encoded;
  }

  /**
   * Creates an array containing the numeric code points of each Unicode
   * character in the string. While JavaScript uses UCS-2 internally,
   * this function will convert a pair of surrogate halves (each of which
   * UCS-2 exposes as separate characters) into a single code point,
   * matching UTF-16.
   * @see `punycode.ucs2.encode`
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode.ucs2
   * @name decode
   * @param {String} string The Unicode input string (UCS-2).
   * @returns {Array} The new array of code points.
   */
  function ucs2decode(string) {
    var output = [],
        counter = 0,
        length = string.length,
        value,
        extra;
    while (counter < length) {
      value = string.charCodeAt(counter++);
      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        // high surrogate, and there is a next character
        extra = string.charCodeAt(counter++);
        if ((extra & 0xFC00) == 0xDC00) { // low surrogate
          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          // unmatched surrogate; only append this code unit, in case the next
          // code unit is the high surrogate of a surrogate pair
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }
    return output;
  }

  /**
   * Creates a string based on an array of numeric code points.
   * @see `punycode.ucs2.decode`
   * @memberOf punycode.ucs2
   * @name encode
   * @param {Array} codePoints The array of numeric code points.
   * @returns {String} The new Unicode string (UCS-2).
   */
  function ucs2encode(array) {
    return map(array, function(value) {
      var output = '';
      if (value > 0xFFFF) {
        value -= 0x10000;
        output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
        value = 0xDC00 | value & 0x3FF;
      }
      output += stringFromCharCode(value);
      return output;
    }).join('');
  }

  /**
   * Converts a basic code point into a digit/integer.
   * @see `digitToBasic()`
   * @private
   * @param {Number} codePoint The basic numeric code point value.
   * @returns {Number} The numeric value of a basic code point (for use in
   * representing integers) in the range `0` to `base - 1`, or `base` if
   * the code point does not represent a value.
   */
  function basicToDigit(codePoint) {
    if (codePoint - 48 < 10) {
      return codePoint - 22;
    }
    if (codePoint - 65 < 26) {
      return codePoint - 65;
    }
    if (codePoint - 97 < 26) {
      return codePoint - 97;
    }
    return base;
  }

  /**
   * Converts a digit/integer into a basic code point.
   * @see `basicToDigit()`
   * @private
   * @param {Number} digit The numeric value of a basic code point.
   * @returns {Number} The basic code point whose value (when used for
   * representing integers) is `digit`, which needs to be in the range
   * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
   * used; else, the lowercase form is used. The behavior is undefined
   * if `flag` is non-zero and `digit` has no uppercase form.
   */
  function digitToBasic(digit, flag) {
    //  0..25 map to ASCII a..z or A..Z
    // 26..35 map to ASCII 0..9
    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  }

  /**
   * Bias adaptation function as per section 3.4 of RFC 3492.
   * https://tools.ietf.org/html/rfc3492#section-3.4
   * @private
   */
  function adapt(delta, numPoints, firstTime) {
    var k = 0;
    delta = firstTime ? floor(delta / damp) : delta >> 1;
    delta += floor(delta / numPoints);
    for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
      delta = floor(delta / baseMinusTMin);
    }
    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
  }

  /**
   * Converts a Punycode string of ASCII-only symbols to a string of Unicode
   * symbols.
   * @memberOf punycode
   * @param {String} input The Punycode string of ASCII-only symbols.
   * @returns {String} The resulting string of Unicode symbols.
   */
  function decode(input) {
    // Don't use UCS-2
    var output = [],
        inputLength = input.length,
        out,
        i = 0,
        n = initialN,
        bias = initialBias,
        basic,
        j,
        index,
        oldi,
        w,
        k,
        digit,
        t,
        /** Cached calculation results */
        baseMinusT;

    // Handle the basic code points: let `basic` be the number of input code
    // points before the last delimiter, or `0` if there is none, then copy
    // the first basic code points to the output.

    basic = input.lastIndexOf(delimiter);
    if (basic < 0) {
      basic = 0;
    }

    for (j = 0; j < basic; ++j) {
      // if it's not a basic code point
      if (input.charCodeAt(j) >= 0x80) {
        error('not-basic');
      }
      output.push(input.charCodeAt(j));
    }

    // Main decoding loop: start just after the last delimiter if any basic code
    // points were copied; start at the beginning otherwise.

    for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

      // `index` is the index of the next character to be consumed.
      // Decode a generalized variable-length integer into `delta`,
      // which gets added to `i`. The overflow checking is easier
      // if we increase `i` as we go, then subtract off its starting
      // value at the end to obtain `delta`.
      for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

        if (index >= inputLength) {
          error('invalid-input');
        }

        digit = basicToDigit(input.charCodeAt(index++));

        if (digit >= base || digit > floor((maxInt - i) / w)) {
          error('overflow');
        }

        i += digit * w;
        t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

        if (digit < t) {
          break;
        }

        baseMinusT = base - t;
        if (w > floor(maxInt / baseMinusT)) {
          error('overflow');
        }

        w *= baseMinusT;

      }

      out = output.length + 1;
      bias = adapt(i - oldi, out, oldi == 0);

      // `i` was supposed to wrap around from `out` to `0`,
      // incrementing `n` each time, so we'll fix that now:
      if (floor(i / out) > maxInt - n) {
        error('overflow');
      }

      n += floor(i / out);
      i %= out;

      // Insert `n` at position `i` of the output
      output.splice(i++, 0, n);

    }

    return ucs2encode(output);
  }

  /**
   * Converts a string of Unicode symbols (e.g. a domain name label) to a
   * Punycode string of ASCII-only symbols.
   * @memberOf punycode
   * @param {String} input The string of Unicode symbols.
   * @returns {String} The resulting Punycode string of ASCII-only symbols.
   */
  function encode(input) {
    var n,
        delta,
        handledCPCount,
        basicLength,
        bias,
        j,
        m,
        q,
        k,
        t,
        currentValue,
        output = [],
        /** `inputLength` will hold the number of code points in `input`. */
        inputLength,
        /** Cached calculation results */
        handledCPCountPlusOne,
        baseMinusT,
        qMinusT;

    // Convert the input in UCS-2 to Unicode
    input = ucs2decode(input);

    // Cache the length
    inputLength = input.length;

    // Initialize the state
    n = initialN;
    delta = 0;
    bias = initialBias;

    // Handle the basic code points
    for (j = 0; j < inputLength; ++j) {
      currentValue = input[j];
      if (currentValue < 0x80) {
        output.push(stringFromCharCode(currentValue));
      }
    }

    handledCPCount = basicLength = output.length;

    // `handledCPCount` is the number of code points that have been handled;
    // `basicLength` is the number of basic code points.

    // Finish the basic string - if it is not empty - with a delimiter
    if (basicLength) {
      output.push(delimiter);
    }

    // Main encoding loop:
    while (handledCPCount < inputLength) {

      // All non-basic code points < n have been handled already. Find the next
      // larger one:
      for (m = maxInt, j = 0; j < inputLength; ++j) {
        currentValue = input[j];
        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      }

      // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
      // but guard against overflow
      handledCPCountPlusOne = handledCPCount + 1;
      if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
        error('overflow');
      }

      delta += (m - n) * handledCPCountPlusOne;
      n = m;

      for (j = 0; j < inputLength; ++j) {
        currentValue = input[j];

        if (currentValue < n && ++delta > maxInt) {
          error('overflow');
        }

        if (currentValue == n) {
          // Represent delta as a generalized variable-length integer
          for (q = delta, k = base; /* no condition */; k += base) {
            t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
            if (q < t) {
              break;
            }
            qMinusT = q - t;
            baseMinusT = base - t;
            output.push(
              stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
            );
            q = floor(qMinusT / baseMinusT);
          }

          output.push(stringFromCharCode(digitToBasic(q, 0)));
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
          delta = 0;
          ++handledCPCount;
        }
      }

      ++delta;
      ++n;

    }
    return output.join('');
  }

  /**
   * Converts a Punycode string representing a domain name or an email address
   * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
   * it doesn't matter if you call it on a string that has already been
   * converted to Unicode.
   * @memberOf punycode
   * @param {String} input The Punycoded domain name or email address to
   * convert to Unicode.
   * @returns {String} The Unicode representation of the given Punycode
   * string.
   */
  function toUnicode(input) {
    return mapDomain(input, function(string) {
      return regexPunycode.test(string)
        ? decode(string.slice(4).toLowerCase())
        : string;
    });
  }

  /**
   * Converts a Unicode string representing a domain name or an email address to
   * Punycode. Only the non-ASCII parts of the domain name will be converted,
   * i.e. it doesn't matter if you call it with a domain that's already in
   * ASCII.
   * @memberOf punycode
   * @param {String} input The domain name or email address to convert, as a
   * Unicode string.
   * @returns {String} The Punycode representation of the given domain name or
   * email address.
   */
  function toASCII(input) {
    return mapDomain(input, function(string) {
      return regexNonASCII.test(string)
        ? 'xn--' + encode(string)
        : string;
    });
  }

  /*--------------------------------------------------------------------------*/

  /** Define the public API */
  punycode = {
    /**
     * A string representing the current Punycode.js version number.
     * @memberOf punycode
     * @type String
     */
    'version': '1.4.1',
    /**
     * An object of methods to convert from JavaScript's internal character
     * representation (UCS-2) to Unicode code points, and back.
     * @see <https://mathiasbynens.be/notes/javascript-encoding>
     * @memberOf punycode
     * @type Object
     */
    'ucs2': {
      'decode': ucs2decode,
      'encode': ucs2encode
    },
    'decode': decode,
    'encode': encode,
    'toASCII': toASCII,
    'toUnicode': toUnicode
  };

  /** Expose `punycode` */
  // Some AMD build optimizers, like r.js, check for specific condition patterns
  // like the following:
  if (
    true
  ) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return punycode;
    }.call(exports, __webpack_require__, exports, module),
        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (freeExports && freeModule) {
    if (module.exports == freeExports) {
      // in Node.js, io.js, or RingoJS v0.8.0+
      freeModule.exports = punycode;
    } else {
      // in Narwhal or RingoJS v0.7.0-
      for (key in punycode) {
        punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
      }
    }
  } else {
    // in Rhino or a web browser
    root.punycode = punycode;
  }

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63)(module), __webpack_require__(3)))

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = function(module) {
  if(!module.webpackPolyfill) {
    module.deprecate = function() {};
    module.paths = [];
    // module.parent = undefined by default
    if(!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function() {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }
  return module;
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(66);
exports.encode = exports.stringify = __webpack_require__(67);


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["request"] = request;
function parseMethod(method) {
  switch (method.toUpperCase()) {
    case "GET":
      return https.Method.GET;
    case "POST":
      return https.Method.POST;
    case "PUT":
      return https.Method.PUT;
    case "DELETE":
      return https.Method.DELETE;
    default:
      return "";
  }
}

function request(requestBody, options) {
  var requestOptions = {
    body: requestBody,
    headers: options.headers,
    method: parseMethod(options.method),
    url: "https://" + options.host + ":" + options.port + options.path,
  };
  return new Promise(function(resolve, reject) {
    try {
      log.debug({title: 'requestOptions', details: requestOptions});
      var response = https.request(requestOptions);

      if (response.code !== 200) {
        reject(
          new Error("Unexpected HTTP status code [" + response.code + "]")
        );
      }

      resolve(response.body);
    } catch (e) {
      reject(e);
    }
  });
}


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var RestGateway_1 = __webpack_require__(72);
var PayPlanConnector = /** @class */ (function (_super) {
    __extends(PayPlanConnector, _super);
    function PayPlanConnector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.supportsRetrieval = true;
        _this.supportsUpdatePaymentDetails = false;
        return _this;
    }
    Object.defineProperty(PayPlanConnector.prototype, "secretApiKey", {
        get: function () {
            return this._secretApiKey;
        },
        set: function (value) {
            this._secretApiKey = value;
            var buffer = new Buffer(value);
            var auth = "Basic " + buffer.toString("base64");
            this.headers[RestGateway_1.RestGateway.AUTHORIZATION_HEADER] = auth;
        },
        enumerable: true,
        configurable: true
    });
    PayPlanConnector.prototype.processRecurring = function (builder) {
        var _this = this;
        var request = new Object();
        // todo
        if (builder.transactionType === _1.TransactionType.Create ||
            builder.transactionType === _1.TransactionType.Edit) {
            if (builder.entity instanceof _1.Customer) {
                request = this.buildCustomer(request, builder.entity);
            }
            if (builder.entity instanceof _1.RecurringPaymentMethod) {
                request = this.buildPaymentMethod(request, builder.entity, builder.transactionType);
            }
            if (builder.entity instanceof _1.Schedule) {
                request = this.buildSchedule(request, builder.entity, builder.transactionType);
            }
        }
        else if (builder.transactionType === _1.TransactionType.Search) {
            for (var entry in builder.searchCriteria) {
                if (builder.searchCriteria.hasOwnProperty(entry)) {
                    request[entry] = builder.searchCriteria[entry];
                }
            }
        }
        return this.doTransaction(this.mapMethod(builder.transactionType), this.mapUrl(builder), JSON.stringify(request)).then(function (response) { return _this.mapResponse(builder, response); });
    };
    PayPlanConnector.prototype.mapResponse = function (builder, rawResponse) {
        var _this = this;
        if (!rawResponse) {
            return new Object();
        }
        var response = JSON.parse(rawResponse);
        var result;
        if (builder.entity instanceof _1.Customer &&
            builder.transactionType === _1.TransactionType.Search) {
            result = response.results.map(function (customer) {
                return _this.hydrateCustomer(customer);
            });
        }
        else if (builder.entity instanceof _1.Customer) {
            result = this.hydrateCustomer(response);
        }
        if (builder.entity instanceof _1.RecurringPaymentMethod &&
            builder.transactionType === _1.TransactionType.Search) {
            result = response.results.map(function (paymentMethod) {
                return _this.hydrateRecurringPaymentMethod(paymentMethod);
            });
        }
        else if (builder.entity instanceof _1.RecurringPaymentMethod) {
            result = this.hydrateRecurringPaymentMethod(response);
        }
        if (builder.entity instanceof _1.Schedule &&
            builder.transactionType === _1.TransactionType.Search) {
            result = response.results.map(function (schedule) {
                return _this.hydrateSchedule(schedule);
            });
        }
        else if (builder.entity instanceof _1.Schedule) {
            result = this.hydrateSchedule(response);
        }
        return result;
    };
    PayPlanConnector.prototype.buildCustomer = function (request, entity) {
        if (entity) {
            request.customerIdentifier = entity.id;
            request.firstName = entity.firstName;
            request.lastName = entity.lastName;
            request.company = entity.company;
            request.customerStatus = entity.status;
            request.primaryEmail = entity.email;
            request.phoneDay = entity.homePhone;
            request.phoneEvening = entity.workPhone;
            request.phoneMobile = entity.mobilePhone;
            request.fax = entity.fax;
            request.title = entity.title;
            request.department = entity.department;
            request = this.buildAddress(request, entity.address);
        }
        return request;
    };
    PayPlanConnector.prototype.buildPaymentMethod = function (request, entity, transactionType) {
        if (entity) {
            request.preferredPayment = entity.preferredPayment;
            request.paymentMethodIdentifier = entity.id;
            request.customerKey = entity.customerKey;
            request.nameOnAccount = entity.nameOnAccount;
            request = this.buildAddress(request, entity.address);
            if (transactionType === _1.TransactionType.Create) {
                var _a = this.hasToken(entity.paymentMethod), hasToken = _a.hasToken, tokenValue = _a.tokenValue;
                var paymentInfo = {};
                if (entity.paymentMethod.isCardData) {
                    var method = entity.paymentMethod;
                    paymentInfo.type = hasToken ? "SINGLEUSETOKEN" : null;
                    paymentInfo[hasToken ? "token" : "number"] = hasToken
                        ? tokenValue
                        : method.number;
                    paymentInfo.expMon = method.expMonth;
                    paymentInfo.expYear = method.expYear;
                    request.cardVerificationValue = method.cvn;
                    request[hasToken ? "alternateIdentity" : "card"] = paymentInfo;
                }
                else if (entity.paymentMethod.isTrackData) {
                    var method = entity.paymentMethod;
                    paymentInfo.data = method.value;
                    paymentInfo.dataEntryMode = method.entryMethod
                        .toString()
                        .toUpperCase();
                    request.track = paymentInfo;
                }
                else if (entity.paymentMethod instanceof _1.ECheck) {
                    var check = entity.paymentMethod;
                    request.achType = this.prepareAccountType(check.accountType);
                    request.accountType = this.prepareCheckType(check.checkType);
                    request.telephoneIndicator =
                        check.secCode === _1.SecCode.CCD || check.SecCode === _1.SecCode.PPD
                            ? false
                            : true;
                    request.routingNumber = check.routingNumber;
                    request.accountNumber = check.accountNumber;
                    request.accountHolderYob = check.birthYear.toString();
                    request.driversLicenseState = check.driversLicenseState;
                    request.driversLicenseNumber = check.driversLicenseNumber;
                    request.socialSecurityNumberLast4 = check.ssnLast4;
                    delete request.country;
                }
                if (entity.paymentMethod.isEncryptable) {
                    var enc = entity.paymentMethod
                        .encryptionData;
                    if (enc) {
                        paymentInfo.trackNumber = enc.trackNumber;
                        paymentInfo.key = enc.ktb;
                        paymentInfo.encryptionType = "E3";
                    }
                }
            }
            else {
                // edit fields
                delete request.customerKey;
                request.paymentStatus = entity.status;
                request.cpcTaxType = entity.taxType;
                request.expirationDate = entity.expirationDate;
            }
        }
        return request;
    };
    PayPlanConnector.prototype.buildSchedule = function (request, entity, transactionType) {
        var mapDuration = function () {
            if (entity.numberOfPayments) {
                return "Limited Number";
            }
            else if (entity.endDate) {
                return "End Date";
            }
            else {
                return "Ongoing";
            }
        };
        var mapProcessingDate = function () {
            var frequencies = [
                "Monthly",
                "Bi-Monthly",
                "Quarterly",
                "Semi-Annually",
            ];
            if (entity.frequency &&
                frequencies.indexOf(entity.frequency.toString()) !== -1) {
                switch (entity.paymentSchedule) {
                    case _1.PaymentSchedule.FirstDayOfTheMonth:
                        return "First";
                    case _1.PaymentSchedule.LastDayOfTheMonth:
                        return "Last";
                    default:
                        var day = entity.startDate.getUTCDate();
                        if (day > 28) {
                            return "Last";
                        }
                        return day.toString();
                }
            }
            else if (entity.frequency &&
                entity.frequency.toString() === "Semi-Monthly") {
                if (entity.paymentSchedule === _1.PaymentSchedule.LastDayOfTheMonth) {
                    return "Last";
                }
                return "First";
            }
            return null;
        };
        if (entity) {
            request.scheduleIdentifier = entity.id;
            request.scheduleName = entity.name;
            request.scheduleStatus = entity.status;
            request.paymentMethodKey = entity.paymentKey;
            request = this.buildAmount(request, "subtotalAmount", entity.amount, entity.currency, transactionType);
            request = this.buildAmount(request, "taxAmount", entity.taxAmount, entity.currency, transactionType);
            request.deviceId = entity.deviceId;
            request.processingDateInfo = mapProcessingDate();
            request = this.buildDate(request, "endDate", entity.endDate, transactionType === _1.TransactionType.Edit);
            request.reprocessingCount = entity.reprocessingCount || 3;
            if (entity.emailReceipt) {
                request.emailReceipt = entity.emailReceipt.toString();
            }
            request.emailAdvanceNotice = entity.emailNotification ? "Yes" : "No";
            // debt repay ind
            request.invoiceNbr = entity.invoiceNumber;
            request.poNumber = entity.poNumber;
            request.description = entity.description;
            request.numberOfPayments = entity.numberOfPayments;
            if (transactionType === _1.TransactionType.Create) {
                request.customerKey = entity.customerKey;
                request = this.buildDate(request, "startDate", entity.startDate);
                if (entity.frequency) {
                    request.frequency = entity.frequency.toString();
                }
                request.duration = mapDuration();
            }
            else {
                // edit Fields
                if (!entity.hasStarted) {
                    request = this.buildDate(request, "startDate", entity.startDate);
                    if (entity.frequency) {
                        request.frequency = entity.frequency.toString();
                    }
                    request.duration = mapDuration();
                }
                else {
                    request = this.buildDate(request, "cancellationDate", entity.cancellationDate);
                    request = this.buildDate(request, "nextProcressingDate", entity.nextProcessingDate);
                }
            }
        }
        return request;
    };
    PayPlanConnector.prototype.prepareAccountType = function (type) {
        switch (type) {
            case _1.AccountType.Savings:
                return "Savings";
            case _1.AccountType.Checking:
            default:
                return "Checking";
        }
    };
    PayPlanConnector.prototype.prepareCheckType = function (type) {
        switch (type) {
            case _1.CheckType.Business:
                return "Business";
            case _1.CheckType.Payroll:
                return "Payroll";
            case _1.CheckType.Personal:
            default:
                return "Personal";
        }
    };
    PayPlanConnector.prototype.buildAddress = function (request, address) {
        if (address) {
            request.addressLine1 = address.streetAddress1;
            request.addressLine2 = address.streetAddress2;
            request.city = address.city;
            request.country = address.country;
            request.stateProvince = address.state;
            request.zipPostalCode = address.postalCode;
        }
        return request;
    };
    PayPlanConnector.prototype.buildAmount = function (request, name, amount, currency, transactionType) {
        if (amount) {
            request[name] = {
                value: parseFloat(amount.toString()) * 100,
            };
            if (transactionType === _1.TransactionType.Create) {
                request[name].currency = currency;
            }
        }
        return request;
    };
    PayPlanConnector.prototype.buildDate = function (request, name, date, force) {
        if (force === void 0) { force = false; }
        var getDateValue = function (d) {
            var day = _1.StringUtils.leftPad(d.getUTCDate().toString(), 2, "0");
            var month = _1.StringUtils.leftPad((d.getUTCMonth() + 1).toString(), 2, "0");
            var year = _1.StringUtils.leftPad(d.getUTCFullYear().toString(), 4, "0");
            return month + day + year;
        };
        if (date || force) {
            var value = date ? getDateValue(date) : null;
            request[name] = value;
        }
        return request;
    };
    PayPlanConnector.prototype.mapMethod = function (transactionType) {
        switch (transactionType) {
            case _1.TransactionType.Create:
            case _1.TransactionType.Search:
                return "POST";
            case _1.TransactionType.Edit:
                return "PUT";
            case _1.TransactionType.Delete:
                return "DELETE";
            default:
                return "GET";
        }
    };
    PayPlanConnector.prototype.mapUrl = function (builder) {
        var suffix = "";
        if (builder.transactionType === _1.TransactionType.Fetch ||
            builder.transactionType === _1.TransactionType.Delete ||
            builder.transactionType === _1.TransactionType.Edit) {
            suffix = "/" + builder.entity.key;
        }
        if (builder.entity instanceof _1.Customer) {
            return ((builder.transactionType === _1.TransactionType.Search
                ? "searchCustomers"
                : "customers") + suffix);
        }
        if (builder.entity instanceof _1.RecurringPaymentMethod) {
            var paymentMethod = "";
            if (builder.transactionType === _1.TransactionType.Create) {
                paymentMethod =
                    builder.entity.paymentMethod instanceof _1.Credit ? "CreditCard" : "ACH";
            }
            else if (builder.transactionType === _1.TransactionType.Edit) {
                paymentMethod = builder.entity.paymentType.replace(" ", "");
            }
            return ((builder.transactionType === _1.TransactionType.Search
                ? "searchPaymentMethods"
                : "paymentMethods") +
                paymentMethod +
                suffix);
        }
        if (builder.entity instanceof _1.Schedule) {
            return ((builder.transactionType === _1.TransactionType.Search
                ? "searchSchedules"
                : "schedules") + suffix);
        }
        throw new _1.UnsupportedTransactionError();
    };
    PayPlanConnector.prototype.hydrateCustomer = function (response) {
        var customer = new _1.Customer();
        customer.key = response.customerKey;
        customer.id = response.customerIdentifier;
        customer.firstName = response.firstName;
        customer.lastName = response.lastName;
        customer.company = response.company;
        customer.status = response.customerStatus;
        customer.title = response.title;
        customer.department = response.department;
        customer.email = response.primaryEmail;
        customer.homePhone = response.phoneDay;
        customer.workPhone = response.phoneEvening;
        customer.mobilePhone = response.phoneMobile;
        customer.fax = response.fax;
        customer.address = new _1.Address();
        customer.address.streetAddress1 = response.addressLine1;
        customer.address.streetAddress2 = response.addressLine2;
        customer.address.city = response.city;
        customer.address.province = response.stateProvince;
        customer.address.postalCode = response.zipPostalCode;
        customer.address.country = response.country;
        return customer;
    };
    PayPlanConnector.prototype.hydrateRecurringPaymentMethod = function (response) {
        var paymentMethod = new _1.RecurringPaymentMethod();
        paymentMethod.key = response.paymentMethodKey;
        paymentMethod.paymentType = response.paymentMethodType;
        paymentMethod.preferredPayment = response.preferredPayment;
        paymentMethod.status = response.paymentStatus;
        paymentMethod.id = response.paymentMethodIdentifier;
        paymentMethod.customerKey = response.customerKey;
        paymentMethod.nameOnAccount = response.nameOnAccount;
        paymentMethod.commercialIndicator = response.cpcInd;
        paymentMethod.taxType = response.cpcTaxType;
        paymentMethod.expirationDate = response.expirationDate;
        paymentMethod.address = new _1.Address();
        paymentMethod.address.streetAddress1 = response.addressLine1;
        paymentMethod.address.streetAddress2 = response.addressLine2;
        paymentMethod.address.city = response.city;
        paymentMethod.address.state = response.stateProvince;
        paymentMethod.address.postalCode = response.zipPostalCode;
        paymentMethod.address.country = response.country;
        return paymentMethod;
    };
    PayPlanConnector.prototype.hydrateSchedule = function (response) {
        var schedule = new _1.Schedule();
        schedule.key = response.scheduleKey;
        schedule.id = response.scheduleIdentifier;
        schedule.customerKey = response.customerKey;
        schedule.name = response.scheduleName;
        schedule.status = response.scheduleStatus;
        schedule.paymentKey = response.paymentMethodKey;
        if (response.subtotalAmount) {
            var subtotal = response.subtotalAmount;
            schedule.amount = subtotal.value;
            schedule.currency = subtotal.currency;
        }
        if (response.taxAmount) {
            var taxAmount = response.taxAmount;
            schedule.taxAmount = taxAmount.value;
        }
        schedule.deviceId = response.deviceId;
        schedule.startDate = new Date(response.startDate);
        schedule.paymentSchedule = (function (value) {
            switch (value) {
                case "Last":
                    return _1.PaymentSchedule.LastDayOfTheMonth;
                case "First":
                    return _1.PaymentSchedule.FirstDayOfTheMonth;
                default:
                    return _1.PaymentSchedule.Dynamic;
            }
        })(response.processingDateInfo);
        schedule.frequency = response.frequency;
        schedule.endDate = new Date(response.endDate);
        schedule.reprocessingCount = response.reprocessingCount;
        schedule.emailReceipt = response.emailReceipt;
        schedule.emailNotification = (function (value) {
            if (!value) {
                return false;
            }
            return value === "No" ? false : true;
        })(response.emailNotification);
        // dept repay indicator
        schedule.invoiceNumber = response.invoiceNbr;
        schedule.poNumber = response.poNumber;
        schedule.description = response.description;
        // statusSetDate
        schedule.nextProcessingDate = new Date(response.nextProcessingDate);
        // previousProcessingDate
        // approvedTransactionCount
        // failureCount
        // totalApprovedAmountToDate
        // numberOfPaymentsRemaining
        schedule.cancellationDate = new Date(response.cancellationDate);
        // creationDate
        // lastChangeDate
        schedule.hasStarted = response.scheduleStarted;
        return schedule;
    };
    PayPlanConnector.prototype.hasToken = function (paymentMethod) {
        var tokenizable = paymentMethod;
        if (tokenizable.token) {
            return {
                hasToken: true,
                tokenValue: tokenizable.token,
            };
        }
        return {
            hasToken: false,
            tokenValue: "",
        };
    };
    return PayPlanConnector;
}(RestGateway_1.RestGateway));
exports.PayPlanConnector = PayPlanConnector;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 71 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Gateway_1 = __webpack_require__(14);
var RestGateway = /** @class */ (function (_super) {
    __extends(RestGateway, _super);
    function RestGateway() {
        return _super.call(this, "application/json") || this;
    }
    RestGateway.prototype.doTransaction = function (verb, endpoint, requestData) {
        return this.sendRequest(verb, endpoint, requestData);
    };
    RestGateway.AUTHORIZATION_HEADER = "Authorization";
    return RestGateway;
}(Gateway_1.Gateway));
exports.RestGateway = RestGateway;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var elementtree_1 = __webpack_require__(10);
var _1 = __webpack_require__(0);
var XmlGateway_1 = __webpack_require__(21);
var PorticoConnector = /** @class */ (function (_super) {
    __extends(PorticoConnector, _super);
    function PorticoConnector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.supportsHostedPayments = false;
        return _this;
    }
    PorticoConnector.prototype.processAuthorization = function (builder) {
        var _this = this;
        // build request
        var transaction = elementtree_1.Element(this.mapRequestType(builder));
        var block1 = elementtree_1.SubElement(transaction, "Block1");
        var allowDuplicates;
        if (builder.transactionType === _1.TransactionType.Sale ||
            builder.transactionType === _1.TransactionType.Auth) {
            if (builder.paymentMethod.paymentMethodType !== _1.PaymentMethodType.Gift &&
                builder.paymentMethod.paymentMethodType !== _1.PaymentMethodType.ACH) {
                allowDuplicates = elementtree_1.SubElement(block1, "AllowDup");
                allowDuplicates.append(elementtree_1.CData(builder.allowDuplicates ? "Y" : "N"));
                if (builder.transactionModifier === _1.TransactionModifier.None &&
                    builder.paymentMethod.paymentMethodType !== _1.PaymentMethodType.EBT &&
                    builder.paymentMethod.paymentMethodType !==
                        _1.PaymentMethodType.Recurring) {
                    elementtree_1.SubElement(block1, "AllowPartialAuth").append(elementtree_1.CData(builder.allowPartialAuth ? "Y" : "N"));
                }
            }
        }
        if (builder.amount !== undefined && builder.amount !== "") {
            elementtree_1.SubElement(block1, "Amt").append(elementtree_1.CData(builder.amount.toString()));
        }
        if (builder.gratuity) {
            elementtree_1.SubElement(block1, "GratuityAmtInfo").append(elementtree_1.CData(builder.gratuity.toString()));
        }
        if (builder.convenienceAmt) {
            elementtree_1.SubElement(block1, "ConvenienceAmtInfo").append(elementtree_1.CData(builder.convenienceAmt.toString()));
        }
        if (builder.shippingAmt) {
            elementtree_1.SubElement(block1, "ShippingAmtInfo").append(elementtree_1.CData(builder.shippingAmt.toString()));
        }
        if (builder.cashBackAmount !== undefined && builder.cashBackAmount !== "") {
            elementtree_1.SubElement(block1, 
            // because plano
            builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Debit
                ? "CashbackAmtInfo"
                : "CashBackAmount").append(elementtree_1.CData(builder.cashBackAmount.toString()));
        }
        if (builder.offlineAuthCode) {
            elementtree_1.SubElement(block1, "OfflineAuthCode").append(elementtree_1.CData(builder.offlineAuthCode));
        }
        if (builder.transactionType === _1.TransactionType.Alias) {
            elementtree_1.SubElement(block1, "Action").append(elementtree_1.CData(builder.aliasAction.toString()));
            elementtree_1.SubElement(block1, "Alias").append(elementtree_1.CData(builder.alias));
        }
        var isCheck = builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.ACH;
        if (isCheck || builder.billingAddress) {
            var holder = elementtree_1.SubElement(block1, isCheck ? "ConsumerInfo" : "CardHolderData");
            if (builder.billingAddress) {
                elementtree_1.SubElement(holder, isCheck ? "Address1" : "CardHolderAddr").append(elementtree_1.CData(builder.billingAddress.streetAddress1));
                elementtree_1.SubElement(holder, isCheck ? "City" : "CardHolderCity").append(elementtree_1.CData(builder.billingAddress.city));
                elementtree_1.SubElement(holder, isCheck ? "State" : "CardHolderState").append(elementtree_1.CData(builder.billingAddress.province || builder.billingAddress.state));
                elementtree_1.SubElement(holder, isCheck ? "Zip" : "CardHolderZip").append(elementtree_1.CData(builder.billingAddress.postalCode));
            }
            if (isCheck) {
                var check = builder.paymentMethod;
                if (check.checkHolderName) {
                    var names = check.checkHolderName.split(" ", 2);
                    elementtree_1.SubElement(holder, "FirstName").append(elementtree_1.CData(names[0]));
                    elementtree_1.SubElement(holder, "LastName").append(elementtree_1.CData(names[1]));
                }
                elementtree_1.SubElement(holder, "CheckName").append(elementtree_1.CData(check.checkName || check.checkHolderName));
                elementtree_1.SubElement(holder, "PhoneNumber").append(elementtree_1.CData(check.phoneNumber));
                elementtree_1.SubElement(holder, "DLNumber").append(elementtree_1.CData(check.driversLicenseNumber));
                elementtree_1.SubElement(holder, "DLState").append(elementtree_1.CData(check.driversLicenseState));
                if (check.ssnLast4 || check.birthYear) {
                    var identity = elementtree_1.SubElement(holder, "IdentityInfo");
                    elementtree_1.SubElement(identity, "SSNL4").append(elementtree_1.CData(check.ssnLast4));
                    elementtree_1.SubElement(identity, "DOBYear").append(elementtree_1.CData(check.birthYear));
                }
            }
        }
        var _a = this.hasToken(builder.paymentMethod), hasToken = _a.hasToken, tokenValue = _a.tokenValue;
        var cardData;
        if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Debit ||
            builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.ACH) {
            cardData = block1;
        }
        else {
            cardData = elementtree_1.Element("CardData");
        }
        if (builder.paymentMethod.isCardData) {
            var card = builder.paymentMethod;
            var manualEntry = elementtree_1.SubElement(cardData, hasToken ? "TokenData" : "ManualEntry");
            elementtree_1.SubElement(manualEntry, hasToken ? "TokenValue" : "CardNbr").append(elementtree_1.CData(tokenValue || card.number));
            if (card.expMonth) {
                elementtree_1.SubElement(manualEntry, "ExpMonth").append(elementtree_1.CData(card.expMonth.toString()));
            }
            if (card.expYear) {
                elementtree_1.SubElement(manualEntry, "ExpYear").append(elementtree_1.CData(card.expYear.toString()));
            }
            if (card.cvn) {
                elementtree_1.SubElement(manualEntry, "CVV2").append(elementtree_1.CData(card.cvn));
            }
            elementtree_1.SubElement(manualEntry, "ReaderPresent").append(elementtree_1.CData(card.readerPresent ? "Y" : "N"));
            elementtree_1.SubElement(manualEntry, "CardPresent").append(elementtree_1.CData(card.cardPresent ? "Y" : "N"));
            block1.append(cardData);
            if (builder.transactionModifier === _1.TransactionModifier.Recurring) {
                var recurring = elementtree_1.SubElement(block1, "RecurringData");
                elementtree_1.SubElement(recurring, "ScheduleID").append(elementtree_1.CData(builder.scheduleId));
                elementtree_1.SubElement(recurring, "OneTime").append(elementtree_1.CData(builder.oneTimePayment ? "Y" : "N"));
            }
        }
        else if (builder.paymentMethod.isTrackData) {
            var track = builder.paymentMethod;
            var trackData = elementtree_1.SubElement(cardData, hasToken ? "TokenData" : "TrackData");
            if (!hasToken) {
                trackData.append(elementtree_1.CData(track.value));
                if (builder.paymentMethod.paymentMethodType !== _1.PaymentMethodType.Debit) {
                    trackData.set("method", track.entryMethod === _1.EntryMethod.Swipe ? "swipe" : "proximity");
                    block1.append(cardData);
                }
            }
            else if (tokenValue) {
                elementtree_1.SubElement(trackData, "TokenValue").append(elementtree_1.CData(tokenValue));
            }
        }
        else if (builder.paymentMethod instanceof _1.GiftCard) {
            var card = builder.paymentMethod;
            if (builder.currency) {
                elementtree_1.SubElement(block1, "Currency").append(elementtree_1.CData(builder.currency.toUpperCase()));
            }
            // if it's replace, add the new card, and change the card data name to be old card data
            if (builder.transactionType === _1.TransactionType.Replace) {
                var newCardData = elementtree_1.SubElement(block1, "NewCardData");
                elementtree_1.SubElement(newCardData, builder.replacementCard.valueType).append(elementtree_1.CData(builder.replacementCard.value));
                elementtree_1.SubElement(newCardData, "PIN").append(elementtree_1.CData(builder.replacementCard.pin));
                cardData = elementtree_1.Element("OldCardData");
            }
            elementtree_1.SubElement(cardData, card.valueType).append(elementtree_1.CData(card.value));
            if (card.pin) {
                elementtree_1.SubElement(cardData, "PIN").append(elementtree_1.CData(card.pin));
            }
            if (builder.aliasAction !== _1.AliasAction.Create) {
                block1.append(cardData);
            }
        }
        else if (builder.paymentMethod instanceof _1.ECheck) {
            var check = builder.paymentMethod;
            elementtree_1.SubElement(block1, "CheckAction").append(elementtree_1.CData("SALE"));
            if (!hasToken) {
                var accountInfo = elementtree_1.SubElement(block1, "AccountInfo");
                elementtree_1.SubElement(accountInfo, "RoutingNumber").append(elementtree_1.CData(check.routingNumber));
                elementtree_1.SubElement(accountInfo, "AccountNumber").append(elementtree_1.CData(check.accountNumber));
                elementtree_1.SubElement(accountInfo, "CheckNumber").append(elementtree_1.CData(check.checkNumber));
                elementtree_1.SubElement(accountInfo, "MICRData").append(elementtree_1.CData(check.micrNumber));
                elementtree_1.SubElement(accountInfo, "AccountType").append(elementtree_1.CData(check.accountType.toString()));
            }
            else if (tokenValue) {
                elementtree_1.SubElement(block1, "TokenValue").append(elementtree_1.CData(tokenValue));
            }
            elementtree_1.SubElement(block1, "DataEntryMode").append(elementtree_1.CData(check.entryMode.toString().toUpperCase()));
            elementtree_1.SubElement(block1, "CheckType").append(elementtree_1.CData(check.checkType.toString()));
            elementtree_1.SubElement(block1, "SECCode").append(elementtree_1.CData(check.secCode.toString()));
            var verify = elementtree_1.SubElement(block1, "VerifyInfo");
            elementtree_1.SubElement(verify, "CheckVerify").append(elementtree_1.CData(check.checkVerify ? "Y" : "N"));
            elementtree_1.SubElement(verify, "ACHVerify").append(elementtree_1.CData(check.achVerify ? "Y" : "N"));
        }
        if (builder.paymentMethod instanceof _1.TransactionReference) {
            var reference = builder.paymentMethod;
            if (reference.transactionId) {
                elementtree_1.SubElement(block1, "GatewayTxnId").append(elementtree_1.CData(reference.transactionId));
            }
            if (reference.clientTransactionId) {
                elementtree_1.SubElement(block1, "ClientTxnId").append(elementtree_1.CData(reference.clientTransactionId));
            }
        }
        if (builder.paymentMethod instanceof _1.RecurringPaymentMethod) {
            var method = builder.paymentMethod;
            if (method.paymentType === "ACH") {
                if (allowDuplicates) {
                    block1.remove(allowDuplicates);
                }
                elementtree_1.SubElement(block1, "CheckAction").append(elementtree_1.CData("SALE"));
            }
            elementtree_1.SubElement(block1, "PaymentMethodKey").append(elementtree_1.CData(method.key));
            if (method.paymentMethod &&
                method.paymentMethod instanceof _1.CreditCardData) {
                var card = method.paymentMethod;
                var data = elementtree_1.SubElement(block1, "PaymentMethodKeyData");
                elementtree_1.SubElement(data, "ExpMonth").append(elementtree_1.CData(card.expMonth));
                elementtree_1.SubElement(data, "ExpYear").append(elementtree_1.CData(card.expYear));
                elementtree_1.SubElement(data, "CVV2").append(elementtree_1.CData(card.cvn));
            }
            var recurring = elementtree_1.SubElement(block1, "RecurringData");
            elementtree_1.SubElement(recurring, "ScheduleID").append(elementtree_1.CData(builder.scheduleId));
            elementtree_1.SubElement(recurring, "OneTime").append(elementtree_1.CData(builder.oneTimePayment ? "Y" : "N"));
        }
        if (builder.paymentMethod.isPinProtected &&
            builder.transactionType !== _1.TransactionType.Reversal) {
            elementtree_1.SubElement(block1, "PinBlock").append(elementtree_1.CData(builder.paymentMethod.pinBlock));
        }
        if (builder.paymentMethod.isEncryptable) {
            var encryptionData = builder.paymentMethod
                .encryptionData;
            if (encryptionData) {
                var enc = elementtree_1.SubElement(cardData, "EncryptionData");
                if (encryptionData.version) {
                    elementtree_1.SubElement(enc, "Version").append(elementtree_1.CData(encryptionData.version));
                }
                if (encryptionData.trackNumber) {
                    elementtree_1.SubElement(enc, "EncryptedTrackNumber").append(elementtree_1.CData(encryptionData.trackNumber));
                }
                if (encryptionData.ktb) {
                    elementtree_1.SubElement(enc, "KTB").append(elementtree_1.CData(encryptionData.ktb));
                }
                if (encryptionData.ksn) {
                    elementtree_1.SubElement(enc, "KSN").append(elementtree_1.CData(encryptionData.ksn));
                }
            }
        }
        if (builder.paymentMethod.isTokenizable &&
            builder.paymentMethod.paymentMethodType !== _1.PaymentMethodType.ACH) {
            elementtree_1.SubElement(cardData, "TokenRequest").append(elementtree_1.CData(builder.requestMultiUseToken ? "Y" : "N"));
        }
        if (builder.paymentMethod.isBalanceable && builder.balanceInquiryType) {
            elementtree_1.SubElement(block1, "BalanceInquiryType").append(elementtree_1.CData(builder.balanceInquiryType.toString()));
        }
        if (builder.level2Request) {
            elementtree_1.SubElement(block1, "CPCReq").append(elementtree_1.CData("Y"));
        }
        if (builder.customerId || builder.description || builder.invoiceNumber) {
            var fields = elementtree_1.SubElement(block1, "AdditionalTxnFields");
            elementtree_1.SubElement(fields, "CustomerID").append(elementtree_1.CData(builder.customerId));
            elementtree_1.SubElement(fields, "Description").append(elementtree_1.CData(builder.description));
            elementtree_1.SubElement(fields, "InvoiceNbr").append(elementtree_1.CData(builder.invoiceNumber));
        }
        if (builder.ecommerceInfo) {
            if (builder.ecommerceInfo.channel) {
                elementtree_1.SubElement(block1, "Ecommerce").append(elementtree_1.CData(builder.ecommerceInfo.channel.toString()));
            }
            if (builder.invoiceNumber || builder.ecommerceInfo.shipMonth) {
                var direct = elementtree_1.SubElement(block1, "DirectMktData");
                elementtree_1.SubElement(direct, "DirectMktInvoiceNbr").append(elementtree_1.CData(builder.invoiceNumber));
                elementtree_1.SubElement(direct, "DirectMktShipDay").append(elementtree_1.CData(builder.ecommerceInfo.shipDay));
                elementtree_1.SubElement(direct, "DirectMktShipMonth").append(elementtree_1.CData(builder.ecommerceInfo.shipMonth));
            }
            if (builder.ecommerceInfo.cavv ||
                builder.ecommerceInfo.eci ||
                builder.ecommerceInfo.xid) {
                var secure = elementtree_1.SubElement(block1, "SecureECommerce");
                elementtree_1.SubElement(secure, "PaymentDataSource").append(elementtree_1.CData(builder.ecommerceInfo.paymentDataSource));
                elementtree_1.SubElement(secure, "TypeOfPaymentData").append(elementtree_1.CData(builder.ecommerceInfo.paymentDataType));
                elementtree_1.SubElement(secure, "PaymentData").append(elementtree_1.CData(builder.ecommerceInfo.cavv));
                elementtree_1.SubElement(secure, "ECommerceIndicator").append(elementtree_1.CData(builder.ecommerceInfo.eci));
                elementtree_1.SubElement(secure, "XID").append(elementtree_1.CData(builder.ecommerceInfo.xid));
            }
        }
        if (builder.dynamicDescriptor) {
            elementtree_1.SubElement(block1, "TxnDescriptor").append(elementtree_1.CData(builder.dynamicDescriptor));
        }
        return this.doTransaction(this.buildEnvelope(transaction, builder.clientTransactionId)).then(function (response) { return _this.mapResponse(response, builder); });
    };
    PorticoConnector.prototype.serializeRequest = function (_builder) {
        throw new _1.UnsupportedTransactionError("Portico does not support hosted payments.");
    };
    PorticoConnector.prototype.manageTransaction = function (builder) {
        var _this = this;
        // build request
        var transaction = elementtree_1.Element(this.mapRequestType(builder));
        if (builder.transactionType !== _1.TransactionType.BatchClose) {
            var root = void 0;
            if (builder.transactionType === _1.TransactionType.Reversal ||
                builder.transactionType === _1.TransactionType.Refund ||
                builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Gift ||
                builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.ACH) {
                root = new elementtree_1.Element("Block1");
            }
            else {
                root = transaction;
            }
            // amount
            if (builder.amount) {
                elementtree_1.SubElement(root, "Amt").append(elementtree_1.CData(builder.amount.toString()));
            }
            // auth amount
            if (builder.authAmount) {
                elementtree_1.SubElement(root, "AuthAmt").append(elementtree_1.CData(builder.authAmount.toString()));
            }
            // gratuity
            if (builder.gratuity) {
                elementtree_1.SubElement(root, "GratuityAmtInfo").append(elementtree_1.CData(builder.gratuity.toString()));
            }
            if (builder.clientTransactionId) {
                elementtree_1.SubElement(root, "ClientTxnId").append(elementtree_1.CData(builder.clientTransactionId));
            }
            // transaction ID
            if (builder.paymentMethod &&
                builder.paymentMethod
                    .transactionId) {
                var ref = builder.paymentMethod;
                elementtree_1.SubElement(root, "GatewayTxnId").append(elementtree_1.CData(ref.transactionId));
            }
            // level II Data
            if (builder.transactionType === _1.TransactionType.Edit &&
                builder.transactionModifier === _1.TransactionModifier.LevelII) {
                var cpc = elementtree_1.SubElement(root, "CPCData");
                if (builder.poNumber) {
                    elementtree_1.SubElement(cpc, "CardHolderPONbr").append(elementtree_1.CData(builder.poNumber));
                }
                if (builder.taxType) {
                    elementtree_1.SubElement(cpc, "TaxType").append(elementtree_1.CData(this.hydrateTaxType(builder.taxType)));
                }
                if (builder.taxAmount) {
                    elementtree_1.SubElement(cpc, "TaxAmt").append(elementtree_1.CData(builder.taxAmount.toString()));
                }
            }
            if (builder.transactionType === _1.TransactionType.Reversal ||
                builder.transactionType === _1.TransactionType.Refund ||
                builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Gift ||
                builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.ACH) {
                transaction.append(root);
            }
        }
        return this.doTransaction(this.buildEnvelope(transaction, builder.clientTransactionId)).then(function (response) { return _this.mapResponse(response, builder); });
    };
    PorticoConnector.prototype.processReport = function (builder) {
        var _this = this;
        var transaction = elementtree_1.Element(this.mapReportRequestType(builder));
        if (builder.timeZoneConversion) {
            elementtree_1.SubElement(transaction, "TzConversion").append(elementtree_1.CData(builder.timeZoneConversion.toString()));
        }
        if (builder instanceof _1.TransactionReportBuilder) {
            var trb = builder;
            if (trb.deviceId) {
                elementtree_1.SubElement(transaction, "DeviceId").append(elementtree_1.CData(trb.deviceId));
            }
            if (trb.startDate) {
                elementtree_1.SubElement(transaction, "RptStartUtcDT").append(elementtree_1.CData(trb.startDate.toISOString()));
            }
            if (trb.endDate) {
                elementtree_1.SubElement(transaction, "RptEndUtcDT").append(elementtree_1.CData(trb.endDate.toISOString()));
            }
            if (trb.transactionId) {
                elementtree_1.SubElement(transaction, "TxnId").append(elementtree_1.CData(trb.transactionId));
            }
        }
        return this.doTransaction(this.buildEnvelope(transaction)).then(function (response) { return _this.mapReportResponse(response, builder); });
    };
    PorticoConnector.prototype.buildEnvelope = function (transaction, clientTransactionId) {
        var envelope = elementtree_1.Element("soap:Envelope", {
            "xmlns:soap": "http://schemas.xmlsoap.org/soap/envelope/",
        });
        var body = elementtree_1.SubElement(envelope, "soap:Body");
        var request = elementtree_1.SubElement(body, "PosRequest", {
            xmlns: PorticoConnector.XmlNamespace,
        });
        var version1 = elementtree_1.SubElement(request, "Ver1.0");
        // header
        var header = elementtree_1.SubElement(version1, "Header");
        if (this.secretApiKey) {
            elementtree_1.SubElement(header, "SecretAPIKey").append(elementtree_1.CData(this.secretApiKey));
        }
        if (this.siteId) {
            elementtree_1.SubElement(header, "SiteId").append(elementtree_1.CData(this.siteId));
        }
        if (this.licenseId) {
            elementtree_1.SubElement(header, "LicenseId").append(elementtree_1.CData(this.licenseId));
        }
        if (this.deviceId) {
            elementtree_1.SubElement(header, "DeviceId").append(elementtree_1.CData(this.deviceId));
        }
        if (this.username) {
            elementtree_1.SubElement(header, "UserName").append(elementtree_1.CData(this.username));
        }
        if (this.password) {
            elementtree_1.SubElement(header, "Password").append(elementtree_1.CData(this.password));
        }
        if (this.developerId) {
            elementtree_1.SubElement(header, "DeveloperID").append(elementtree_1.CData(this.developerId));
        }
        if (this.versionNumber) {
            elementtree_1.SubElement(header, "VersionNbr").append(elementtree_1.CData(this.versionNumber));
        }
        if (clientTransactionId) {
            elementtree_1.SubElement(header, "ClientTxnId").append(elementtree_1.CData(clientTransactionId));
        }
        // transaction
        elementtree_1.SubElement(version1, "Transaction").append(transaction);
        return new elementtree_1.ElementTree(envelope).write();
    };
    PorticoConnector.prototype.mapRequestType = function (builder) {
        switch (builder.transactionType) {
            case _1.TransactionType.BatchClose:
                return "BatchClose";
            case _1.TransactionType.Decline:
                if (builder.transactionModifier === _1.TransactionModifier.ChipDecline) {
                    return "ChipCardDecline";
                }
                else if (builder.transactionModifier === _1.TransactionModifier.FraudDecline) {
                    return "OverrideFraudDecline";
                }
                throw new _1.UnsupportedTransactionError();
            case _1.TransactionType.Verify:
                if (builder.transactionModifier === _1.TransactionModifier.EncryptedMobile) {
                    throw new _1.UnsupportedTransactionError();
                }
                return "CreditAccountVerify";
            case _1.TransactionType.Capture:
                return "CreditAddToBatch";
            case _1.TransactionType.Auth:
                if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Credit) {
                    if (builder.transactionModifier === _1.TransactionModifier.Additional) {
                        return "CreditAdditionalAuth";
                    }
                    else if (builder.transactionModifier === _1.TransactionModifier.Incremental) {
                        return "CreditIncrementalAuth";
                    }
                    else if (builder.paymentMethod.paymentMethodType ===
                        _1.PaymentMethodType.Recurring) {
                        return "RecurringBillingAuth";
                    }
                    else if (builder.transactionModifier === _1.TransactionModifier.EncryptedMobile) {
                        throw new _1.UnsupportedTransactionError();
                    }
                    else if (builder.transactionModifier === _1.TransactionModifier.Offline) {
                        return "CreditOfflineAuth";
                    }
                    return "CreditAuth";
                }
                else if (builder.paymentMethod.paymentMethodType ===
                    _1.PaymentMethodType.Recurring) {
                    return "RecurringBillingAuth";
                }
                throw new _1.UnsupportedTransactionError();
            case _1.TransactionType.Sale:
                if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Credit) {
                    if (builder.transactionModifier === _1.TransactionModifier.Offline) {
                        return "CreditOfflineSale";
                    }
                    else if (builder.transactionModifier === _1.TransactionModifier.Recurring) {
                        return "RecurringBilling";
                    }
                    else if (builder.transactionModifier === _1.TransactionModifier.EncryptedMobile) {
                        throw new _1.UnsupportedTransactionError();
                    }
                    else {
                        return "CreditSale";
                    }
                }
                else if (builder.paymentMethod.paymentMethodType ===
                    _1.PaymentMethodType.Recurring) {
                    if (builder.paymentMethod.paymentType === "ACH") {
                        return "CheckSale";
                    }
                    return "RecurringBilling";
                }
                else if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Debit) {
                    return "DebitSale";
                }
                else if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Cash) {
                    return "CashSale";
                }
                else if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.ACH) {
                    return "CheckSale";
                }
                else if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.EBT) {
                    if (builder.transactionModifier === _1.TransactionModifier.CashBack) {
                        return "EBTCashBackPurchase";
                    }
                    else if (builder.transactionModifier === _1.TransactionModifier.Voucher) {
                        return "EBTVoucherPurchase";
                    }
                    else {
                        return "EBTFSPurchase";
                    }
                }
                else if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Gift) {
                    return "GiftCardSale";
                }
                throw new _1.UnsupportedTransactionError();
            case _1.TransactionType.Refund:
                if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Credit) {
                    return "CreditReturn";
                }
                else if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Debit) {
                    if (builder.paymentMethod instanceof _1.TransactionReference) {
                        throw new _1.UnsupportedTransactionError();
                    }
                    return "DebitReturn";
                }
                else if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Cash) {
                    return "CashReturn";
                }
                else if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.EBT) {
                    if (builder.paymentMethod instanceof _1.TransactionReference) {
                        throw new _1.UnsupportedTransactionError();
                    }
                    return "EBTFSReturn";
                }
                throw new _1.UnsupportedTransactionError();
            case _1.TransactionType.Reversal:
                if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Credit) {
                    return "CreditReversal";
                }
                else if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Debit) {
                    if (builder.paymentMethod instanceof _1.TransactionReference) {
                        throw new _1.UnsupportedTransactionError();
                    }
                    return "DebitReversal";
                }
                else if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Gift) {
                    return "GiftCardReversal";
                }
                throw new _1.UnsupportedTransactionError();
            case _1.TransactionType.Edit:
                if (builder.transactionModifier === _1.TransactionModifier.LevelII) {
                    return "CreditCPCEdit";
                }
                return "CreditTxnEdit";
            case _1.TransactionType.Void:
                if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Credit) {
                    return "CreditVoid";
                }
                else if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.ACH) {
                    return "CheckVoid";
                }
                else if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Gift) {
                    return "GiftCardVoid";
                }
                throw new _1.UnsupportedTransactionError();
            case _1.TransactionType.AddValue:
                if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Credit) {
                    return "PrePaidAddValue";
                }
                else if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Debit) {
                    return "DebitAddValue";
                }
                else if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Gift) {
                    return "GiftCardAddValue";
                }
                throw new _1.UnsupportedTransactionError();
            case _1.TransactionType.Balance:
                if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Credit) {
                    return "PrePaidBalanceInquiry";
                }
                else if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.EBT) {
                    return "EBTBalanceInquiry";
                }
                else if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Gift) {
                    return "GiftCardBalance";
                }
                throw new _1.UnsupportedTransactionError();
            case _1.TransactionType.BenefitWithDrawal:
                return "EBTCashBenefitWithdrawal";
            case _1.TransactionType.Activate:
                return "GiftCardActivate";
            case _1.TransactionType.Alias:
                return "GiftCardAlias";
            case _1.TransactionType.Deactivate:
                return "GiftCardDeactivate";
            case _1.TransactionType.Replace:
                return "GiftCardReplace";
            case _1.TransactionType.Reward:
                return "GiftCardReward";
            default:
                break;
        }
        throw new _1.NotImplementedError();
    };
    PorticoConnector.prototype.mapReportRequestType = function (builder) {
        switch (builder.reportType) {
            case _1.ReportType.Activity:
                return "ReportActivity";
            case _1.ReportType.TransactionDetail:
                return "ReportTxnDetail";
            default:
                throw new _1.UnsupportedTransactionError();
        }
    };
    PorticoConnector.prototype.mapResponse = function (rawResponse, builder) {
        var result = new _1.Transaction();
        var root = elementtree_1.XML(rawResponse).find(".//PosResponse");
        var acceptedCodes = ["00", "0", "85", "10"];
        var gatewayRspCode = this.normalizeResponse(root.findtext(".//GatewayRspCode"));
        var gatewayRspText = root.findtext(".//GatewayRspMsg");
        if (acceptedCodes.indexOf(gatewayRspCode) === -1) {
            throw new _1.GatewayError("Unexpected Gateway Response: " + gatewayRspCode + " - " + gatewayRspText);
        }
        result.responseCode = root.findtext(".//RspCode")
            ? this.normalizeResponse(root.findtext(".//RspCode"))
            : gatewayRspCode;
        result.responseMessage = root.findtext(".//RspText")
            ? root.findtext(".//RspText")
            : gatewayRspText;
        result.authorizedAmount = root.findtext(".//AuthAmt");
        result.availableBalance = root.findtext(".//AvailableBalance");
        result.avsResponseCode = root.findtext(".//AVSRsltCode");
        result.avsResponseMessage = root.findtext(".//AVSRsltText");
        result.balanceAmount = root.findtext(".//BalanceAmt");
        result.cardType = root.findtext(".//CardType");
        result.cardLast4 = root.findtext(".//TokenPANLast4");
        result.cavvResponseCode = root.findtext(".//CAVVResultCode");
        result.commercialIndicator = root.findtext(".//CPCInd");
        result.cvnResponseCode = root.findtext(".//CVVRsltCode");
        result.cvnResponseMessage = root.findtext(".//CVVRsltText");
        result.pointsBalanceAmount = root.findtext(".//PointsBalanceAmt");
        result.recurringDataCode = root.findtext(".//RecurringDataCode");
        result.referenceNumber = root.findtext(".//RefNbr");
        result.transactionDescriptor = root.findtext(".//TxnDescriptor");
        if (builder.paymentMethod) {
            result.transactionReference = new _1.TransactionReference(root.findtext(".//GatewayTxnId"));
            result.transactionReference.paymentMethodType =
                builder.paymentMethod.paymentMethodType;
        }
        if (root.findtext(".//AuthCode")) {
            result.transactionReference =
                result.transactionReference || new _1.TransactionReference();
            result.transactionReference.authCode = root.findtext(".//AuthCode");
        }
        if (root.find(".//TokenData") &&
            root.find(".//TokenData").findtext(".//TokenValue")) {
            var tokenData = root.find(".//TokenData");
            result.token = tokenData.findtext(".//TokenValue");
        }
        if (root.find(".//CardData")) {
            var cardData = root.find(".//CardData");
            result.giftCard = new _1.GiftCard();
            result.giftCard.number = cardData.findtext(".//CardNbr");
            result.giftCard.alias = cardData.findtext(".//Alias");
            result.giftCard.pin = cardData.findtext(".//PIN");
        }
        return result;
    };
    PorticoConnector.prototype.mapReportResponse = function (rawResponse, builder) {
        // todo: handle non-200 responses
        var posResponse = elementtree_1.XML(rawResponse).find(".//PosResponse");
        var doc = posResponse.find(".//" + this.mapReportRequestType(builder));
        var result;
        if (builder.reportType === _1.ReportType.Activity) {
            result = doc
                .findall(".//Details")
                .map(this.hydrateTransactionSummary.bind(this));
        }
        else if (builder.reportType === _1.ReportType.TransactionDetail) {
            result = this.hydrateTransactionSummary(doc);
        }
        return result;
    };
    PorticoConnector.prototype.normalizeResponse = function (input) {
        if (["0", "85"].indexOf(input) !== -1) {
            input = "00";
        }
        return input;
    };
    PorticoConnector.prototype.hasToken = function (paymentMethod) {
        var tokenizable = paymentMethod;
        if (tokenizable.token) {
            return {
                hasToken: true,
                tokenValue: tokenizable.token,
            };
        }
        return {
            hasToken: false,
            tokenValue: "",
        };
    };
    PorticoConnector.prototype.hydrateAccountType = function (type) {
        switch (type) {
            case _1.AccountType.Checking:
                return "CHECKING";
            case _1.AccountType.Savings:
                return "SAVINGS";
            default:
                return "";
        }
    };
    PorticoConnector.prototype.hydrateCheckType = function (type) {
        switch (type) {
            case _1.CheckType.Business:
                return "BUSINESS";
            case _1.CheckType.Payroll:
                return "PAYROLL";
            case _1.CheckType.Personal:
                return "PERSONAL";
            default:
                return "";
        }
    };
    PorticoConnector.prototype.hydrateEncryptionData = function (builder) {
        var enc = new elementtree_1.Element("EncryptionData");
        var data = builder.paymentMethod
            .encryptionData;
        if (data.version) {
            elementtree_1.SubElement(enc, "Version").append(elementtree_1.CData(data.version));
        }
        if (data.trackNumber) {
            elementtree_1.SubElement(enc, "TrackNumber").append(elementtree_1.CData(data.trackNumber));
        }
        if (data.ktb) {
            elementtree_1.SubElement(enc, "KTB").append(elementtree_1.CData(data.ktb));
        }
        if (data.ksn) {
            elementtree_1.SubElement(enc, "KSN").append(elementtree_1.CData(data.ksn));
        }
        return enc;
    };
    PorticoConnector.prototype.hydrateEntryMethod = function (method) {
        switch (method) {
            case _1.EntryMethod.Manual:
                return "Manual";
            case _1.EntryMethod.Proximity:
                return "Proximity";
            case _1.EntryMethod.Swipe:
                return "Swipe";
            default:
                return "";
        }
    };
    PorticoConnector.prototype.hydrateHolder = function (builder, isCheck) {
        var holder = new elementtree_1.Element(isCheck ? "ConsumerInfo" : "CardHolderData");
        elementtree_1.SubElement(holder, isCheck ? "Address1" : "CardHolderAddr").append(elementtree_1.CData(builder.billingAddress.streetAddress1));
        elementtree_1.SubElement(holder, isCheck ? "City" : "CardHolderCity").append(elementtree_1.CData(builder.billingAddress.city));
        elementtree_1.SubElement(holder, isCheck ? "State" : "CardHolderState").append(elementtree_1.CData(builder.billingAddress.province));
        elementtree_1.SubElement(holder, isCheck ? "Zip" : "CardHolderZip").append(elementtree_1.CData(builder.billingAddress.postalCode));
        if (isCheck) {
            var check = builder.paymentMethod;
            if (check.checkName) {
                var names = check.checkName.split(" ", 2);
                elementtree_1.SubElement(holder, "FirstName").append(elementtree_1.CData(names[0]));
                if (names[1]) {
                    elementtree_1.SubElement(holder, "LastName").append(elementtree_1.CData(names[1]));
                }
                elementtree_1.SubElement(holder, "CheckName").append(elementtree_1.CData(check.checkName));
            }
            if (check.phoneNumber) {
                elementtree_1.SubElement(holder, "PhoneNumber").append(elementtree_1.CData(check.phoneNumber));
            }
            if (check.driversLicenseNumber) {
                elementtree_1.SubElement(holder, "DLNumber").append(elementtree_1.CData(check.driversLicenseNumber));
            }
            if (check.driversLicenseState) {
                elementtree_1.SubElement(holder, "DLState").append(elementtree_1.CData(check.driversLicenseState));
            }
            if (check.ssnLast4 || check.birthYear) {
                var identity = elementtree_1.SubElement(holder, "IdentityInfo");
                elementtree_1.SubElement(identity, "SSNL4").append(elementtree_1.CData(check.ssnLast4));
                elementtree_1.SubElement(identity, "DOBYear").append(elementtree_1.CData(check.birthYear));
            }
        }
        return holder;
    };
    PorticoConnector.prototype.hydrateInquiryType = function (type) {
        switch (type) {
            case _1.InquiryType.Cash:
                return "CASH";
            case _1.InquiryType.Foodstamp:
                return "FOODSTAMP";
            case _1.InquiryType.Points:
                return "POINTS";
            case _1.InquiryType.Standard:
                return "STANDARD";
            default:
                return "";
        }
    };
    PorticoConnector.prototype.hydrateManualEntry = function (block1, builder, hasToken, tokenValue) {
        var me = new elementtree_1.Element(hasToken ? "TokenData" : "ManualEntry");
        var card;
        if (builder.paymentMethod instanceof _1.CreditCardData) {
            card = builder.paymentMethod;
        }
        else {
            card = builder.paymentMethod;
        }
        if (card.number || hasToken) {
            elementtree_1.SubElement(me, hasToken ? "TokenValue" : "CardNbr").append(elementtree_1.CData(hasToken ? tokenValue : card.number));
        }
        if (card.expMonth) {
            elementtree_1.SubElement(me, "ExpMonth").append(elementtree_1.CData(card.expMonth));
        }
        if (card.expYear) {
            elementtree_1.SubElement(me, "ExpYear").append(elementtree_1.CData(card.expYear));
        }
        if (card.cvn) {
            elementtree_1.SubElement(me, "CVV2").append(elementtree_1.CData(card.cvn));
        }
        elementtree_1.SubElement(me, "ReaderPresent").append(elementtree_1.CData(card.readerPresent ? "Y" : "N"));
        elementtree_1.SubElement(me, "CardPresent").append(elementtree_1.CData(card.cardPresent ? "Y" : "N"));
        if (builder.transactionModifier === _1.TransactionModifier.Recurring) {
            var recurring = elementtree_1.SubElement(block1, "RecurringData");
            elementtree_1.SubElement(recurring, "ScheduleID").append(elementtree_1.CData(builder.scheduleId));
            elementtree_1.SubElement(recurring, "OneTime").append(elementtree_1.CData(builder.oneTimePayment ? "Y" : "N"));
        }
        return me;
    };
    PorticoConnector.prototype.hydrateSecCode = function (code) {
        switch (code) {
            case _1.SecCode.CCD:
                return "CCD";
            case _1.SecCode.PPD:
                return "PPD";
            case _1.SecCode.POP:
                return "POP";
            case _1.SecCode.WEB:
                return "WEB";
            case _1.SecCode.TEL:
                return "TEL";
            case _1.SecCode.EBronze:
                return "EBRONZE";
            default:
                return "";
        }
    };
    PorticoConnector.prototype.hydrateTaxType = function (type) {
        switch (type) {
            case _1.TaxType.NotUsed:
                return "NOTUSED";
            case _1.TaxType.SalesTax:
                return "SALESTAX";
            case _1.TaxType.TaxExempt:
                return "TAXEXEMPT";
            default:
                return "";
        }
    };
    PorticoConnector.prototype.hydrateTrackData = function (builder, hasToken, tokenValue) {
        var trackData = new elementtree_1.Element(hasToken ? "TokenValue" : "TrackData");
        if (hasToken) {
            elementtree_1.SubElement(trackData, "TokenValue").append(elementtree_1.CData(tokenValue));
            return trackData;
        }
        var track;
        if (builder.paymentMethod instanceof _1.CreditTrackData) {
            track = builder.paymentMethod;
        }
        else if (builder.paymentMethod instanceof _1.DebitTrackData) {
            track = builder.paymentMethod;
        }
        else {
            track = builder.paymentMethod;
        }
        trackData.append(elementtree_1.CData(track.value));
        if (track.paymentMethodType !== _1.PaymentMethodType.Debit) {
            trackData.set("method", track.entryMethod === _1.EntryMethod.Swipe ? "swipe" : "proximity");
        }
        return trackData;
    };
    PorticoConnector.prototype.hydrateTransactionSummary = function (root) {
        var result = new _1.TransactionSummary();
        result.amount = root.findtext(".//Amt");
        result.authorizedAmount = root.findtext(".//AuthAmt");
        result.authCode = root.findtext(".//AuthCode");
        result.clientTransactionId = root.findtext(".//ClientTxnId");
        result.deviceId = root.findtext(".//DeviceId");
        result.issuerResponseCode = this.normalizeResponse(root.findtext(".//IssuerRspCode"));
        result.issuerResponseMessage = root.findtext(".//IssuerRspText");
        result.maskedCardNumber = root.findtext(".//MaskedCardNbr");
        result.originalTransactionId = root.findtext(".//OriginalGatewayTxnId");
        result.gatewayResponseCode = this.normalizeResponse(root.findtext(".//GatewayRspCode"));
        result.gatewayResponseMessage = root.findtext(".//GatewayRspMsg");
        result.referenceNumber = root.findtext(".//RefNbr");
        result.serviceName = root.findtext(".//ServiceName");
        result.settlementAmount = root.findtext(".//SettlementAmt");
        result.status = root.findtext(".//Status");
        result.transactionDate = new Date(root.findtext(".//TxnUtcDT"));
        result.transactionId = root.findtext(".//GatewayTxnId");
        result.convenienceAmt = root.findtext(".//ConvenienceAmtInfo");
        result.shippingAmt = root.findtext(".//ShippingAmtInfo");
        return result;
    };
    PorticoConnector.XmlNamespace = "http://Hps.Exchange.PosGateway";
    return PorticoConnector;
}(XmlGateway_1.XmlGateway));
exports.PorticoConnector = PorticoConnector;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

/**
 *  Copyright 2011 Rackspace
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

var sprintf = __webpack_require__(15).sprintf;

var utils = __webpack_require__(27);
var SyntaxError = __webpack_require__(75).SyntaxError;

var _cache = {};

var RE = new RegExp(
  "(" +
  "'[^']*'|\"[^\"]*\"|" +
  "::|" +
  "//?|" +
  "\\.\\.|" +
  "\\(\\)|" +
  "[/.*:\\[\\]\\(\\)@=])|" +
  "((?:\\{[^}]+\\})?[^/\\[\\]\\(\\)@=\\s]+)|" +
  "\\s+", 'g'
);

var xpath_tokenizer = utils.findall.bind(null, RE);

function prepare_tag(next, token) {
  var tag = token[0];

  function select(context, result) {
    var i, len, elem, rv = [];

    for (i = 0, len = result.length; i < len; i++) {
      elem = result[i];
      elem._children.forEach(function(e) {
        if (e.tag === tag) {
          rv.push(e);
        }
      });
    }

    return rv;
  }

  return select;
}

function prepare_star(next, token) {
  function select(context, result) {
    var i, len, elem, rv = [];

    for (i = 0, len = result.length; i < len; i++) {
      elem = result[i];
      elem._children.forEach(function(e) {
        rv.push(e);
      });
    }

    return rv;
  }

  return select;
}

function prepare_dot(next, token) {
  function select(context, result) {
    var i, len, elem, rv = [];

    for (i = 0, len = result.length; i < len; i++) {
      elem = result[i];
      rv.push(elem);
    }

    return rv;
  }

  return select;
}

function prepare_iter(next, token) {
  var tag;
  token = next();

  if (token[1] === '*') {
    tag = '*';
  }
  else if (!token[1]) {
    tag = token[0] || '';
  }
  else {
    throw new SyntaxError(token);
  }

  function select(context, result) {
    var i, len, elem, rv = [];

    for (i = 0, len = result.length; i < len; i++) {
      elem = result[i];
      elem.iter(tag, function(e) {
        if (e !== elem) {
          rv.push(e);
        }
      });
    }

    return rv;
  }

  return select;
}

function prepare_dot_dot(next, token) {
  function select(context, result) {
    var i, len, elem, rv = [], parent_map = context.parent_map;

    if (!parent_map) {
      context.parent_map = parent_map = {};

      context.root.iter(null, function(p) {
        p._children.forEach(function(e) {
          parent_map[e] = p;
        });
      });
    }

    for (i = 0, len = result.length; i < len; i++) {
      elem = result[i];

      if (parent_map.hasOwnProperty(elem)) {
        rv.push(parent_map[elem]);
      }
    }

    return rv;
  }

  return select;
}


function prepare_predicate(next, token) {
  var tag, key, value, select;
  token = next();

  if (token[1] === '@') {
    // attribute
    token = next();

    if (token[1]) {
      throw new SyntaxError(token, 'Invalid attribute predicate');
    }

    key = token[0];
    token = next();

    if (token[1] === ']') {
      select = function(context, result) {
        var i, len, elem, rv = [];

        for (i = 0, len = result.length; i < len; i++) {
          elem = result[i];

          if (elem.get(key)) {
            rv.push(elem);
          }
        }

        return rv;
      };
    }
    else if (token[1] === '=') {
      value = next()[1];

      if (value[0] === '"' || value[value.length - 1] === '\'') {
        value = value.slice(1, value.length - 1);
      }
      else {
        throw new SyntaxError(token, 'Ivalid comparison target');
      }

      token = next();
      select = function(context, result) {
        var i, len, elem, rv = [];

        for (i = 0, len = result.length; i < len; i++) {
          elem = result[i];

          if (elem.get(key) === value) {
            rv.push(elem);
          }
        }

        return rv;
      };
    }

    if (token[1] !== ']') {
      throw new SyntaxError(token, 'Invalid attribute predicate');
    }
  }
  else if (!token[1]) {
    tag = token[0] || '';
    token = next();

    if (token[1] !== ']') {
      throw new SyntaxError(token, 'Invalid node predicate');
    }

    select = function(context, result) {
      var i, len, elem, rv = [];

      for (i = 0, len = result.length; i < len; i++) {
        elem = result[i];

        if (elem.find(tag)) {
          rv.push(elem);
        }
      }

      return rv;
    };
  }
  else {
    throw new SyntaxError(null, 'Invalid predicate');
  }

  return select;
}



var ops = {
  "": prepare_tag,
  "*": prepare_star,
  ".": prepare_dot,
  "..": prepare_dot_dot,
  "//": prepare_iter,
  "[": prepare_predicate,
};

function _SelectorContext(root) {
  this.parent_map = null;
  this.root = root;
}

function findall(elem, path) {
  var selector, result, i, len, token, value, select, context;

  if (_cache.hasOwnProperty(path)) {
    selector = _cache[path];
  }
  else {
    // TODO: Use smarter cache purging approach
    if (Object.keys(_cache).length > 100) {
      _cache = {};
    }

    if (path.charAt(0) === '/') {
      throw new SyntaxError(null, 'Cannot use absolute path on element');
    }

    result = xpath_tokenizer(path);
    selector = [];

    function getToken() {
      return result.shift();
    }

    token = getToken();
    while (true) {
      var c = token[1] || '';
      value = ops[c](getToken, token);

      if (!value) {
        throw new SyntaxError(null, sprintf('Invalid path: %s', path));
      }

      selector.push(value);
      token = getToken();

      if (!token) {
        break;
      }
      else if (token[1] === '/') {
        token = getToken();
      }

      if (!token) {
        break;
      }
    }

    _cache[path] = selector;
  }

  // Execute slector pattern
  result = [elem];
  context = new _SelectorContext(elem);

  for (i = 0, len = selector.length; i < len; i++) {
    select = selector[i];
    result = select(context, result);
  }

  return result || [];
}

function find(element, path) {
  var resultElements = findall(element, path);

  if (resultElements && resultElements.length > 0) {
    return resultElements[0];
  }

  return null;
}

function findtext(element, path, defvalue) {
  var resultElements = findall(element, path);

  if (resultElements && resultElements.length > 0) {
    return resultElements[0].text;
  }

  return defvalue;
}


exports.find = find;
exports.findall = findall;
exports.findtext = findtext;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

/**
 *  Copyright 2011 Rackspace
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

var util = __webpack_require__(16);

var sprintf = __webpack_require__(15).sprintf;

function SyntaxError(token, msg) {
  msg = msg || sprintf('Syntax Error at token %s', token.toString());
  this.token = token;
  this.message = msg;
  Error.call(this, msg);
}

util.inherits(SyntaxError, Error);

exports.SyntaxError = SyntaxError;


/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 77 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

/*
 *  Copyright 2011 Rackspace
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

/* TODO: support node-expat C++ module optionally */

var util = __webpack_require__(16);
var parsers = __webpack_require__(79);

function get_parser(name) {
  if (name === 'sax') {
    return parsers.sax;
  }
  else {
    throw new Error('Invalid parser: ' + name);
  }
}


exports.get_parser = get_parser;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

exports.sax = __webpack_require__(80);


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(16);

var sax = __webpack_require__(81);

var TreeBuilder = __webpack_require__(28).TreeBuilder;
var Comment = __webpack_require__(10).Comment;

function XMLParser(target) {
  this.parser = sax.parser(true);

  this.target = (target) ? target : new TreeBuilder();

  this.parser.onopentag = this._handleOpenTag.bind(this);
  this.parser.ontext = this._handleText.bind(this);
  this.parser.oncdata = this._handleCdata.bind(this);
  this.parser.ondoctype = this._handleDoctype.bind(this);
  this.parser.oncomment = this._handleComment.bind(this);
  this.parser.onclosetag = this._handleCloseTag.bind(this);
  this.parser.onerror = this._handleError.bind(this);
}

XMLParser.prototype._handleOpenTag = function(tag) {
  this.target.start(tag.name, tag.attributes);
};

XMLParser.prototype._handleText = function(text) {
  this.target.data(text);
};

XMLParser.prototype._handleCdata = function(text) {
  this.target.data(text);
};

XMLParser.prototype._handleDoctype = function(text) {
};

XMLParser.prototype._handleComment = function(comment) {
  this.target.start(Comment, {});
  this.target.data(comment);
  this.target.end(Comment);
};

XMLParser.prototype._handleCloseTag = function(tag) {
  this.target.end(tag);
};

XMLParser.prototype._handleError = function(err) {
  throw err;
};

XMLParser.prototype.feed = function(chunk) {
  this.parser.write(chunk);
};

XMLParser.prototype.close = function() {
  this.parser.close();
  return this.target.close();
};

exports.XMLParser = XMLParser;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// wrapper for non-node envs
;(function (sax) {

sax.parser = function (strict, opt) { return new SAXParser(strict, opt) }
sax.SAXParser = SAXParser
sax.SAXStream = SAXStream
sax.createStream = createStream

// When we pass the MAX_BUFFER_LENGTH position, start checking for buffer overruns.
// When we check, schedule the next check for MAX_BUFFER_LENGTH - (max(buffer lengths)),
// since that's the earliest that a buffer overrun could occur.  This way, checks are
// as rare as required, but as often as necessary to ensure never crossing this bound.
// Furthermore, buffers are only tested at most once per write(), so passing a very
// large string into write() might have undesirable effects, but this is manageable by
// the caller, so it is assumed to be safe.  Thus, a call to write() may, in the extreme
// edge case, result in creating at most one complete copy of the string passed in.
// Set to Infinity to have unlimited buffers.
sax.MAX_BUFFER_LENGTH = 64 * 1024

var buffers = [
  "comment", "sgmlDecl", "textNode", "tagName", "doctype",
  "procInstName", "procInstBody", "entity", "attribName",
  "attribValue", "cdata", "script"
]

sax.EVENTS = // for discoverability.
  [ "text"
  , "processinginstruction"
  , "sgmldeclaration"
  , "doctype"
  , "comment"
  , "attribute"
  , "opentag"
  , "closetag"
  , "opencdata"
  , "cdata"
  , "closecdata"
  , "error"
  , "end"
  , "ready"
  , "script"
  , "opennamespace"
  , "closenamespace"
  ]

function SAXParser (strict, opt) {
  if (!(this instanceof SAXParser)) return new SAXParser(strict, opt)

  var parser = this
  clearBuffers(parser)
  parser.q = parser.c = ""
  parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH
  parser.opt = opt || {}
  parser.tagCase = parser.opt.lowercasetags ? "toLowerCase" : "toUpperCase"
  parser.tags = []
  parser.closed = parser.closedRoot = parser.sawRoot = false
  parser.tag = parser.error = null
  parser.strict = !!strict
  parser.noscript = !!(strict || parser.opt.noscript)
  parser.state = S.BEGIN
  parser.ENTITIES = Object.create(sax.ENTITIES)
  parser.attribList = []

  // namespaces form a prototype chain.
  // it always points at the current tag,
  // which protos to its parent tag.
  if (parser.opt.xmlns) parser.ns = Object.create(rootNS)

  // mostly just for error reporting
  parser.position = parser.line = parser.column = 0
  emit(parser, "onready")
}

if (!Object.create) Object.create = function (o) {
  function f () { this.__proto__ = o }
  f.prototype = o
  return new f
}

if (!Object.getPrototypeOf) Object.getPrototypeOf = function (o) {
  return o.__proto__
}

if (!Object.keys) Object.keys = function (o) {
  var a = []
  for (var i in o) if (o.hasOwnProperty(i)) a.push(i)
  return a
}

function checkBufferLength (parser) {
  var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10)
    , maxActual = 0
  for (var i = 0, l = buffers.length; i < l; i ++) {
    var len = parser[buffers[i]].length
    if (len > maxAllowed) {
      // Text/cdata nodes can get big, and since they're buffered,
      // we can get here under normal conditions.
      // Avoid issues by emitting the text node now,
      // so at least it won't get any bigger.
      switch (buffers[i]) {
        case "textNode":
          closeText(parser)
        break

        case "cdata":
          emitNode(parser, "oncdata", parser.cdata)
          parser.cdata = ""
        break

        case "script":
          emitNode(parser, "onscript", parser.script)
          parser.script = ""
        break

        default:
          error(parser, "Max buffer length exceeded: "+buffers[i])
      }
    }
    maxActual = Math.max(maxActual, len)
  }
  // schedule the next check for the earliest possible buffer overrun.
  parser.bufferCheckPosition = (sax.MAX_BUFFER_LENGTH - maxActual)
                             + parser.position
}

function clearBuffers (parser) {
  for (var i = 0, l = buffers.length; i < l; i ++) {
    parser[buffers[i]] = ""
  }
}

SAXParser.prototype =
  { end: function () { end(this) }
  , write: write
  , resume: function () { this.error = null; return this }
  , close: function () { return this.write(null) }
  , end: function () { return this.write(null) }
  }

try {
  var Stream = __webpack_require__(11).Stream
} catch (ex) {
  var Stream = function () {}
}


var streamWraps = sax.EVENTS.filter(function (ev) {
  return ev !== "error" && ev !== "end"
})

function createStream (strict, opt) {
  return new SAXStream(strict, opt)
}

function SAXStream (strict, opt) {
  if (!(this instanceof SAXStream)) return new SAXStream(strict, opt)

  Stream.apply(me)

  this._parser = new SAXParser(strict, opt)
  this.writable = true
  this.readable = true


  var me = this

  this._parser.onend = function () {
    me.emit("end")
  }

  this._parser.onerror = function (er) {
    me.emit("error", er)

    // if didn't throw, then means error was handled.
    // go ahead and clear error, so we can write again.
    me._parser.error = null
  }

  streamWraps.forEach(function (ev) {
    Object.defineProperty(me, "on" + ev, {
      get: function () { return me._parser["on" + ev] },
      set: function (h) {
        if (!h) {
          me.removeAllListeners(ev)
          return me._parser["on"+ev] = h
        }
        me.on(ev, h)
      },
      enumerable: true,
      configurable: false
    })
  })
}

SAXStream.prototype = Object.create(Stream.prototype,
  { constructor: { value: SAXStream } })

SAXStream.prototype.write = function (data) {
  this._parser.write(data.toString())
  this.emit("data", data)
  return true
}

SAXStream.prototype.end = function (chunk) {
  if (chunk && chunk.length) this._parser.write(chunk.toString())
  this._parser.end()
  return true
}

SAXStream.prototype.on = function (ev, handler) {
  var me = this
  if (!me._parser["on"+ev] && streamWraps.indexOf(ev) !== -1) {
    me._parser["on"+ev] = function () {
      var args = arguments.length === 1 ? [arguments[0]]
               : Array.apply(null, arguments)
      args.splice(0, 0, ev)
      me.emit.apply(me, args)
    }
  }

  return Stream.prototype.on.call(me, ev, handler)
}



// character classes and tokens
var whitespace = "\r\n\t "
  // this really needs to be replaced with character classes.
  // XML allows all manner of ridiculous numbers and digits.
  , number = "0124356789"
  , letter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  // (Letter | "_" | ":")
  , nameStart = letter+"_:"
  , nameBody = nameStart+number+"-."
  , quote = "'\""
  , entity = number+letter+"#"
  , attribEnd = whitespace + ">"
  , CDATA = "[CDATA["
  , DOCTYPE = "DOCTYPE"
  , XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace"
  , XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/"
  , rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE }

// turn all the string character sets into character class objects.
whitespace = charClass(whitespace)
number = charClass(number)
letter = charClass(letter)
nameStart = charClass(nameStart)
nameBody = charClass(nameBody)
quote = charClass(quote)
entity = charClass(entity)
attribEnd = charClass(attribEnd)

function charClass (str) {
  return str.split("").reduce(function (s, c) {
    s[c] = true
    return s
  }, {})
}

function is (charclass, c) {
  return charclass[c]
}

function not (charclass, c) {
  return !charclass[c]
}

var S = 0
sax.STATE =
{ BEGIN                     : S++
, TEXT                      : S++ // general stuff
, TEXT_ENTITY               : S++ // &amp and such.
, OPEN_WAKA                 : S++ // <
, SGML_DECL                 : S++ // <!BLARG
, SGML_DECL_QUOTED          : S++ // <!BLARG foo "bar
, DOCTYPE                   : S++ // <!DOCTYPE
, DOCTYPE_QUOTED            : S++ // <!DOCTYPE "//blah
, DOCTYPE_DTD               : S++ // <!DOCTYPE "//blah" [ ...
, DOCTYPE_DTD_QUOTED        : S++ // <!DOCTYPE "//blah" [ "foo
, COMMENT_STARTING          : S++ // <!-
, COMMENT                   : S++ // <!--
, COMMENT_ENDING            : S++ // <!-- blah -
, COMMENT_ENDED             : S++ // <!-- blah --
, CDATA                     : S++ // <![CDATA[ something
, CDATA_ENDING              : S++ // ]
, CDATA_ENDING_2            : S++ // ]]
, PROC_INST                 : S++ // <?hi
, PROC_INST_BODY            : S++ // <?hi there
, PROC_INST_QUOTED          : S++ // <?hi "there
, PROC_INST_ENDING          : S++ // <?hi "there" ?
, OPEN_TAG                  : S++ // <strong
, OPEN_TAG_SLASH            : S++ // <strong /
, ATTRIB                    : S++ // <a
, ATTRIB_NAME               : S++ // <a foo
, ATTRIB_NAME_SAW_WHITE     : S++ // <a foo _
, ATTRIB_VALUE              : S++ // <a foo=
, ATTRIB_VALUE_QUOTED       : S++ // <a foo="bar
, ATTRIB_VALUE_UNQUOTED     : S++ // <a foo=bar
, ATTRIB_VALUE_ENTITY_Q     : S++ // <foo bar="&quot;"
, ATTRIB_VALUE_ENTITY_U     : S++ // <foo bar=&quot;
, CLOSE_TAG                 : S++ // </a
, CLOSE_TAG_SAW_WHITE       : S++ // </a   >
, SCRIPT                    : S++ // <script> ...
, SCRIPT_ENDING             : S++ // <script> ... <
}

sax.ENTITIES =
{ "apos" : "'"
, "quot" : "\""
, "amp"  : "&"
, "gt"   : ">"
, "lt"   : "<"
}

for (var S in sax.STATE) sax.STATE[sax.STATE[S]] = S

// shorthand
S = sax.STATE

function emit (parser, event, data) {
  parser[event] && parser[event](data)
}

function emitNode (parser, nodeType, data) {
  if (parser.textNode) closeText(parser)
  emit(parser, nodeType, data)
}

function closeText (parser) {
  parser.textNode = textopts(parser.opt, parser.textNode)
  if (parser.textNode) emit(parser, "ontext", parser.textNode)
  parser.textNode = ""
}

function textopts (opt, text) {
  if (opt.trim) text = text.trim()
  if (opt.normalize) text = text.replace(/\s+/g, " ")
  return text
}

function error (parser, er) {
  closeText(parser)
  er += "\nLine: "+parser.line+
        "\nColumn: "+parser.column+
        "\nChar: "+parser.c
  er = new Error(er)
  parser.error = er
  emit(parser, "onerror", er)
  return parser
}

function end (parser) {
  if (parser.state !== S.TEXT) error(parser, "Unexpected end")
  closeText(parser)
  parser.c = ""
  parser.closed = true
  emit(parser, "onend")
  SAXParser.call(parser, parser.strict, parser.opt)
  return parser
}

function strictFail (parser, message) {
  if (parser.strict) error(parser, message)
}

function newTag (parser) {
  if (!parser.strict) parser.tagName = parser.tagName[parser.tagCase]()
  var parent = parser.tags[parser.tags.length - 1] || parser
    , tag = parser.tag = { name : parser.tagName, attributes : {} }

  // will be overridden if tag contails an xmlns="foo" or xmlns:foo="bar"
  if (parser.opt.xmlns) tag.ns = parent.ns
  parser.attribList.length = 0
}

function qname (name) {
  var i = name.indexOf(":")
    , qualName = i < 0 ? [ "", name ] : name.split(":")
    , prefix = qualName[0]
    , local = qualName[1]

  // <x "xmlns"="http://foo">
  if (name === "xmlns") {
    prefix = "xmlns"
    local = ""
  }

  return { prefix: prefix, local: local }
}

function attrib (parser) {
  if (parser.opt.xmlns) {
    var qn = qname(parser.attribName)
      , prefix = qn.prefix
      , local = qn.local

    if (prefix === "xmlns") {
      // namespace binding attribute; push the binding into scope
      if (local === "xml" && parser.attribValue !== XML_NAMESPACE) {
        strictFail( parser
                  , "xml: prefix must be bound to " + XML_NAMESPACE + "\n"
                  + "Actual: " + parser.attribValue )
      } else if (local === "xmlns" && parser.attribValue !== XMLNS_NAMESPACE) {
        strictFail( parser
                  , "xmlns: prefix must be bound to " + XMLNS_NAMESPACE + "\n"
                  + "Actual: " + parser.attribValue )
      } else {
        var tag = parser.tag
          , parent = parser.tags[parser.tags.length - 1] || parser
        if (tag.ns === parent.ns) {
          tag.ns = Object.create(parent.ns)
        }
        tag.ns[local] = parser.attribValue
      }
    }

    // defer onattribute events until all attributes have been seen
    // so any new bindings can take effect; preserve attribute order
    // so deferred events can be emitted in document order
    parser.attribList.push([parser.attribName, parser.attribValue])
  } else {
    // in non-xmlns mode, we can emit the event right away
    parser.tag.attributes[parser.attribName] = parser.attribValue
    emitNode( parser
            , "onattribute"
            , { name: parser.attribName
              , value: parser.attribValue } )
  }

  parser.attribName = parser.attribValue = ""
}

function openTag (parser, selfClosing) {
  if (parser.opt.xmlns) {
    // emit namespace binding events
    var tag = parser.tag

    // add namespace info to tag
    var qn = qname(parser.tagName)
    tag.prefix = qn.prefix
    tag.local = qn.local
    tag.uri = tag.ns[qn.prefix] || qn.prefix

    if (tag.prefix && !tag.uri) {
      strictFail(parser, "Unbound namespace prefix: "
                       + JSON.stringify(parser.tagName))
    }

    var parent = parser.tags[parser.tags.length - 1] || parser
    if (tag.ns && parent.ns !== tag.ns) {
      Object.keys(tag.ns).forEach(function (p) {
        emitNode( parser
                , "onopennamespace"
                , { prefix: p , uri: tag.ns[p] } )
      })
    }

    // handle deferred onattribute events
    for (var i = 0, l = parser.attribList.length; i < l; i ++) {
      var nv = parser.attribList[i]
      var name = nv[0]
        , value = nv[1]
        , qualName = qname(name)
        , prefix = qualName.prefix
        , local = qualName.local
        , uri = tag.ns[prefix] || ""
        , a = { name: name
              , value: value
              , prefix: prefix
              , local: local
              , uri: uri
              }

      // if there's any attributes with an undefined namespace,
      // then fail on them now.
      if (prefix && prefix != "xmlns" && !uri) {
        strictFail(parser, "Unbound namespace prefix: "
                         + JSON.stringify(prefix))
        a.uri = prefix
      }
      parser.tag.attributes[name] = a
      emitNode(parser, "onattribute", a)
    }
    parser.attribList.length = 0
  }

  // process the tag
  parser.sawRoot = true
  parser.tags.push(parser.tag)
  emitNode(parser, "onopentag", parser.tag)
  if (!selfClosing) {
    // special case for <script> in non-strict mode.
    if (!parser.noscript && parser.tagName.toLowerCase() === "script") {
      parser.state = S.SCRIPT
    } else {
      parser.state = S.TEXT
    }
    parser.tag = null
    parser.tagName = ""
  }
  parser.attribName = parser.attribValue = ""
  parser.attribList.length = 0
}

function closeTag (parser) {
  if (!parser.tagName) {
    strictFail(parser, "Weird empty close tag.")
    parser.textNode += "</>"
    parser.state = S.TEXT
    return
  }
  // first make sure that the closing tag actually exists.
  // <a><b></c></b></a> will close everything, otherwise.
  var t = parser.tags.length
  var tagName = parser.tagName
  if (!parser.strict) tagName = tagName[parser.tagCase]()
  var closeTo = tagName
  while (t --) {
    var close = parser.tags[t]
    if (close.name !== closeTo) {
      // fail the first time in strict mode
      strictFail(parser, "Unexpected close tag")
    } else break
  }

  // didn't find it.  we already failed for strict, so just abort.
  if (t < 0) {
    strictFail(parser, "Unmatched closing tag: "+parser.tagName)
    parser.textNode += "</" + parser.tagName + ">"
    parser.state = S.TEXT
    return
  }
  parser.tagName = tagName
  var s = parser.tags.length
  while (s --> t) {
    var tag = parser.tag = parser.tags.pop()
    parser.tagName = parser.tag.name
    emitNode(parser, "onclosetag", parser.tagName)

    var x = {}
    for (var i in tag.ns) x[i] = tag.ns[i]

    var parent = parser.tags[parser.tags.length - 1] || parser
    if (parser.opt.xmlns && tag.ns !== parent.ns) {
      // remove namespace bindings introduced by tag
      Object.keys(tag.ns).forEach(function (p) {
        var n = tag.ns[p]
        emitNode(parser, "onclosenamespace", { prefix: p, uri: n })
      })
    }
  }
  if (t === 0) parser.closedRoot = true
  parser.tagName = parser.attribValue = parser.attribName = ""
  parser.attribList.length = 0
  parser.state = S.TEXT
}

function parseEntity (parser) {
  var entity = parser.entity.toLowerCase()
    , num
    , numStr = ""
  if (parser.ENTITIES[entity]) return parser.ENTITIES[entity]
  if (entity.charAt(0) === "#") {
    if (entity.charAt(1) === "x") {
      entity = entity.slice(2)
      num = parseInt(entity, 16)
      numStr = num.toString(16)
    } else {
      entity = entity.slice(1)
      num = parseInt(entity, 10)
      numStr = num.toString(10)
    }
  }
  entity = entity.replace(/^0+/, "")
  if (numStr.toLowerCase() !== entity) {
    strictFail(parser, "Invalid character entity")
    return "&"+parser.entity + ";"
  }
  return String.fromCharCode(num)
}

function write (chunk) {
  var parser = this
  if (this.error) throw this.error
  if (parser.closed) return error(parser,
    "Cannot write after close. Assign an onready handler.")
  if (chunk === null) return end(parser)
  var i = 0, c = ""
  while (parser.c = c = chunk.charAt(i++)) {
    parser.position ++
    if (c === "\n") {
      parser.line ++
      parser.column = 0
    } else parser.column ++
    switch (parser.state) {

      case S.BEGIN:
        if (c === "<") parser.state = S.OPEN_WAKA
        else if (not(whitespace,c)) {
          // have to process this as a text node.
          // weird, but happens.
          strictFail(parser, "Non-whitespace before first tag.")
          parser.textNode = c
          parser.state = S.TEXT
        }
      continue

      case S.TEXT:
        if (parser.sawRoot && !parser.closedRoot) {
          var starti = i-1
          while (c && c!=="<" && c!=="&") {
            c = chunk.charAt(i++)
            if (c) {
              parser.position ++
              if (c === "\n") {
                parser.line ++
                parser.column = 0
              } else parser.column ++
            }
          }
          parser.textNode += chunk.substring(starti, i-1)
        }
        if (c === "<") parser.state = S.OPEN_WAKA
        else {
          if (not(whitespace, c) && (!parser.sawRoot || parser.closedRoot))
            strictFail("Text data outside of root node.")
          if (c === "&") parser.state = S.TEXT_ENTITY
          else parser.textNode += c
        }
      continue

      case S.SCRIPT:
        // only non-strict
        if (c === "<") {
          parser.state = S.SCRIPT_ENDING
        } else parser.script += c
      continue

      case S.SCRIPT_ENDING:
        if (c === "/") {
          emitNode(parser, "onscript", parser.script)
          parser.state = S.CLOSE_TAG
          parser.script = ""
          parser.tagName = ""
        } else {
          parser.script += "<" + c
          parser.state = S.SCRIPT
        }
      continue

      case S.OPEN_WAKA:
        // either a /, ?, !, or text is coming next.
        if (c === "!") {
          parser.state = S.SGML_DECL
          parser.sgmlDecl = ""
        } else if (is(whitespace, c)) {
          // wait for it...
        } else if (is(nameStart,c)) {
          parser.startTagPosition = parser.position - 1
          parser.state = S.OPEN_TAG
          parser.tagName = c
        } else if (c === "/") {
          parser.startTagPosition = parser.position - 1
          parser.state = S.CLOSE_TAG
          parser.tagName = ""
        } else if (c === "?") {
          parser.state = S.PROC_INST
          parser.procInstName = parser.procInstBody = ""
        } else {
          strictFail(parser, "Unencoded <")
          parser.textNode += "<" + c
          parser.state = S.TEXT
        }
      continue

      case S.SGML_DECL:
        if ((parser.sgmlDecl+c).toUpperCase() === CDATA) {
          emitNode(parser, "onopencdata")
          parser.state = S.CDATA
          parser.sgmlDecl = ""
          parser.cdata = ""
        } else if (parser.sgmlDecl+c === "--") {
          parser.state = S.COMMENT
          parser.comment = ""
          parser.sgmlDecl = ""
        } else if ((parser.sgmlDecl+c).toUpperCase() === DOCTYPE) {
          parser.state = S.DOCTYPE
          if (parser.doctype || parser.sawRoot) strictFail(parser,
            "Inappropriately located doctype declaration")
          parser.doctype = ""
          parser.sgmlDecl = ""
        } else if (c === ">") {
          emitNode(parser, "onsgmldeclaration", parser.sgmlDecl)
          parser.sgmlDecl = ""
          parser.state = S.TEXT
        } else if (is(quote, c)) {
          parser.state = S.SGML_DECL_QUOTED
          parser.sgmlDecl += c
        } else parser.sgmlDecl += c
      continue

      case S.SGML_DECL_QUOTED:
        if (c === parser.q) {
          parser.state = S.SGML_DECL
          parser.q = ""
        }
        parser.sgmlDecl += c
      continue

      case S.DOCTYPE:
        if (c === ">") {
          parser.state = S.TEXT
          emitNode(parser, "ondoctype", parser.doctype)
          parser.doctype = true // just remember that we saw it.
        } else {
          parser.doctype += c
          if (c === "[") parser.state = S.DOCTYPE_DTD
          else if (is(quote, c)) {
            parser.state = S.DOCTYPE_QUOTED
            parser.q = c
          }
        }
      continue

      case S.DOCTYPE_QUOTED:
        parser.doctype += c
        if (c === parser.q) {
          parser.q = ""
          parser.state = S.DOCTYPE
        }
      continue

      case S.DOCTYPE_DTD:
        parser.doctype += c
        if (c === "]") parser.state = S.DOCTYPE
        else if (is(quote,c)) {
          parser.state = S.DOCTYPE_DTD_QUOTED
          parser.q = c
        }
      continue

      case S.DOCTYPE_DTD_QUOTED:
        parser.doctype += c
        if (c === parser.q) {
          parser.state = S.DOCTYPE_DTD
          parser.q = ""
        }
      continue

      case S.COMMENT:
        if (c === "-") parser.state = S.COMMENT_ENDING
        else parser.comment += c
      continue

      case S.COMMENT_ENDING:
        if (c === "-") {
          parser.state = S.COMMENT_ENDED
          parser.comment = textopts(parser.opt, parser.comment)
          if (parser.comment) emitNode(parser, "oncomment", parser.comment)
          parser.comment = ""
        } else {
          parser.comment += "-" + c
          parser.state = S.COMMENT
        }
      continue

      case S.COMMENT_ENDED:
        if (c !== ">") {
          strictFail(parser, "Malformed comment")
          // allow <!-- blah -- bloo --> in non-strict mode,
          // which is a comment of " blah -- bloo "
          parser.comment += "--" + c
          parser.state = S.COMMENT
        } else parser.state = S.TEXT
      continue

      case S.CDATA:
        if (c === "]") parser.state = S.CDATA_ENDING
        else parser.cdata += c
      continue

      case S.CDATA_ENDING:
        if (c === "]") parser.state = S.CDATA_ENDING_2
        else {
          parser.cdata += "]" + c
          parser.state = S.CDATA
        }
      continue

      case S.CDATA_ENDING_2:
        if (c === ">") {
          if (parser.cdata) emitNode(parser, "oncdata", parser.cdata)
          emitNode(parser, "onclosecdata")
          parser.cdata = ""
          parser.state = S.TEXT
        } else if (c === "]") {
          parser.cdata += "]"
        } else {
          parser.cdata += "]]" + c
          parser.state = S.CDATA
        }
      continue

      case S.PROC_INST:
        if (c === "?") parser.state = S.PROC_INST_ENDING
        else if (is(whitespace, c)) parser.state = S.PROC_INST_BODY
        else parser.procInstName += c
      continue

      case S.PROC_INST_BODY:
        if (!parser.procInstBody && is(whitespace, c)) continue
        else if (c === "?") parser.state = S.PROC_INST_ENDING
        else if (is(quote, c)) {
          parser.state = S.PROC_INST_QUOTED
          parser.q = c
          parser.procInstBody += c
        } else parser.procInstBody += c
      continue

      case S.PROC_INST_ENDING:
        if (c === ">") {
          emitNode(parser, "onprocessinginstruction", {
            name : parser.procInstName,
            body : parser.procInstBody
          })
          parser.procInstName = parser.procInstBody = ""
          parser.state = S.TEXT
        } else {
          parser.procInstBody += "?" + c
          parser.state = S.PROC_INST_BODY
        }
      continue

      case S.PROC_INST_QUOTED:
        parser.procInstBody += c
        if (c === parser.q) {
          parser.state = S.PROC_INST_BODY
          parser.q = ""
        }
      continue

      case S.OPEN_TAG:
        if (is(nameBody, c)) parser.tagName += c
        else {
          newTag(parser)
          if (c === ">") openTag(parser)
          else if (c === "/") parser.state = S.OPEN_TAG_SLASH
          else {
            if (not(whitespace, c)) strictFail(
              parser, "Invalid character in tag name")
            parser.state = S.ATTRIB
          }
        }
      continue

      case S.OPEN_TAG_SLASH:
        if (c === ">") {
          openTag(parser, true)
          closeTag(parser)
        } else {
          strictFail(parser, "Forward-slash in opening tag not followed by >")
          parser.state = S.ATTRIB
        }
      continue

      case S.ATTRIB:
        // haven't read the attribute name yet.
        if (is(whitespace, c)) continue
        else if (c === ">") openTag(parser)
        else if (c === "/") parser.state = S.OPEN_TAG_SLASH
        else if (is(nameStart, c)) {
          parser.attribName = c
          parser.attribValue = ""
          parser.state = S.ATTRIB_NAME
        } else strictFail(parser, "Invalid attribute name")
      continue

      case S.ATTRIB_NAME:
        if (c === "=") parser.state = S.ATTRIB_VALUE
        else if (is(whitespace, c)) parser.state = S.ATTRIB_NAME_SAW_WHITE
        else if (is(nameBody, c)) parser.attribName += c
        else strictFail(parser, "Invalid attribute name")
      continue

      case S.ATTRIB_NAME_SAW_WHITE:
        if (c === "=") parser.state = S.ATTRIB_VALUE
        else if (is(whitespace, c)) continue
        else {
          strictFail(parser, "Attribute without value")
          parser.tag.attributes[parser.attribName] = ""
          parser.attribValue = ""
          emitNode(parser, "onattribute",
                   { name : parser.attribName, value : "" })
          parser.attribName = ""
          if (c === ">") openTag(parser)
          else if (is(nameStart, c)) {
            parser.attribName = c
            parser.state = S.ATTRIB_NAME
          } else {
            strictFail(parser, "Invalid attribute name")
            parser.state = S.ATTRIB
          }
        }
      continue

      case S.ATTRIB_VALUE:
        if (is(whitespace, c)) continue
        else if (is(quote, c)) {
          parser.q = c
          parser.state = S.ATTRIB_VALUE_QUOTED
        } else {
          strictFail(parser, "Unquoted attribute value")
          parser.state = S.ATTRIB_VALUE_UNQUOTED
          parser.attribValue = c
        }
      continue

      case S.ATTRIB_VALUE_QUOTED:
        if (c !== parser.q) {
          if (c === "&") parser.state = S.ATTRIB_VALUE_ENTITY_Q
          else parser.attribValue += c
          continue
        }
        attrib(parser)
        parser.q = ""
        parser.state = S.ATTRIB
      continue

      case S.ATTRIB_VALUE_UNQUOTED:
        if (not(attribEnd,c)) {
          if (c === "&") parser.state = S.ATTRIB_VALUE_ENTITY_U
          else parser.attribValue += c
          continue
        }
        attrib(parser)
        if (c === ">") openTag(parser)
        else parser.state = S.ATTRIB
      continue

      case S.CLOSE_TAG:
        if (!parser.tagName) {
          if (is(whitespace, c)) continue
          else if (not(nameStart, c)) strictFail(parser,
            "Invalid tagname in closing tag.")
          else parser.tagName = c
        }
        else if (c === ">") closeTag(parser)
        else if (is(nameBody, c)) parser.tagName += c
        else {
          if (not(whitespace, c)) strictFail(parser,
            "Invalid tagname in closing tag")
          parser.state = S.CLOSE_TAG_SAW_WHITE
        }
      continue

      case S.CLOSE_TAG_SAW_WHITE:
        if (is(whitespace, c)) continue
        if (c === ">") closeTag(parser)
        else strictFail("Invalid characters in closing tag")
      continue

      case S.TEXT_ENTITY:
      case S.ATTRIB_VALUE_ENTITY_Q:
      case S.ATTRIB_VALUE_ENTITY_U:
        switch(parser.state) {
          case S.TEXT_ENTITY:
            var returnState = S.TEXT, buffer = "textNode"
          break

          case S.ATTRIB_VALUE_ENTITY_Q:
            var returnState = S.ATTRIB_VALUE_QUOTED, buffer = "attribValue"
          break

          case S.ATTRIB_VALUE_ENTITY_U:
            var returnState = S.ATTRIB_VALUE_UNQUOTED, buffer = "attribValue"
          break
        }
        if (c === ";") {
          parser[buffer] += parseEntity(parser)
          parser.entity = ""
          parser.state = returnState
        }
        else if (is(entity, c)) parser.entity += c
        else {
          strictFail("Invalid character entity")
          parser[buffer] += "&" + parser.entity + c
          parser.entity = ""
          parser.state = returnState
        }
      continue

      default:
        throw new Error(parser, "Unknown state: " + parser.state)
    }
  } // while
  // cdata blocks can get very big under normal conditions. emit and move on.
  // if (parser.state === S.CDATA && parser.cdata) {
  //   emitNode(parser, "oncdata", parser.cdata)
  //   parser.cdata = ""
  // }
  if (parser.position >= parser.bufferCheckPosition) checkBufferLength(parser)
  return parser
}

})( false ? sax = {} : exports)


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var Stream = (function (){
  try {
    return __webpack_require__(11); // hack to fix a circular dependency issue when used with browserify
  } catch(_){}
}());
exports = module.exports = __webpack_require__(29);
exports.Stream = Stream || exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(19);
exports.Duplex = __webpack_require__(4);
exports.Transform = __webpack_require__(20);
exports.PassThrough = __webpack_require__(31);

if (!process.browser && process.env.READABLE_STREAM === 'disable' && Stream) {
  module.exports = Stream;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 83 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Buffer = __webpack_require__(1).Buffer;
/*<replacement>*/
var bufferShim = __webpack_require__(18);
/*</replacement>*/

module.exports = BufferList;

function BufferList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

BufferList.prototype.push = function (v) {
  var entry = { data: v, next: null };
  if (this.length > 0) this.tail.next = entry;else this.head = entry;
  this.tail = entry;
  ++this.length;
};

BufferList.prototype.unshift = function (v) {
  var entry = { data: v, next: this.head };
  if (this.length === 0) this.tail = entry;
  this.head = entry;
  ++this.length;
};

BufferList.prototype.shift = function () {
  if (this.length === 0) return;
  var ret = this.head.data;
  if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
  --this.length;
  return ret;
};

BufferList.prototype.clear = function () {
  this.head = this.tail = null;
  this.length = 0;
};

BufferList.prototype.join = function (s) {
  if (this.length === 0) return '';
  var p = this.head;
  var ret = '' + p.data;
  while (p = p.next) {
    ret += s + p.data;
  }return ret;
};

BufferList.prototype.concat = function (n) {
  if (this.length === 0) return bufferShim.alloc(0);
  if (this.length === 1) return this.head.data;
  var ret = bufferShim.allocUnsafe(n >>> 0);
  var p = this.head;
  var i = 0;
  while (p) {
    p.data.copy(ret, i);
    i += p.data.length;
    p = p.next;
  }
  return ret;
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(86);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(2)))

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `log.debug()` instead of `log.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        log.debug(msg);
      } else {
        log.debug(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(19)


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4)


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20)


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(31)


/***/ }),
/* 92 */
/***/ (function(module, exports) {

/*
 *  Copyright 2011 Rackspace
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

var DEFAULT_PARSER = 'sax';

exports.DEFAULT_PARSER = DEFAULT_PARSER;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var elementtree_1 = __webpack_require__(10);
var _1 = __webpack_require__(0);
var XmlGateway_1 = __webpack_require__(21);
var RealexConnector = /** @class */ (function (_super) {
    __extends(RealexConnector, _super);
    function RealexConnector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.supportsHostedPayments = true;
        _this.supportsRetrieval = false;
        _this.supportsUpdatePaymentDetails = true;
        return _this;
    }
    RealexConnector.prototype.processAuthorization = function (builder) {
        var _this = this;
        var timestamp = _1.GenerationUtils.generateTimestamp();
        var orderId = builder.orderId
            ? builder.orderId
            : _1.GenerationUtils.generateOrderId();
        // build Request
        var request = elementtree_1.Element("request", {
            timestamp: timestamp,
            type: this.mapAuthRequestType(builder),
        });
        if (this.merchantId) {
            elementtree_1.SubElement(request, "merchantid").append(elementtree_1.CData(this.merchantId));
        }
        if (this.accountId) {
            elementtree_1.SubElement(request, "account").append(elementtree_1.CData(this.accountId));
        }
        if (this.channel) {
            elementtree_1.SubElement(request, "channel").append(elementtree_1.CData(this.channel));
        }
        elementtree_1.SubElement(request, "orderid").append(elementtree_1.CData(orderId));
        if (builder.amount) {
            var amountAttrs = builder.currency
                ? { currency: builder.currency }
                : {};
            elementtree_1.SubElement(request, "amount", amountAttrs).append(elementtree_1.CData(this.numberFormat(builder.amount)));
        }
        // hydrate the payment data fields
        if (builder.paymentMethod instanceof _1.CreditCardData) {
            var card = builder.paymentMethod;
            if (builder.transactionModifier === _1.TransactionModifier.EncryptedMobile) {
                elementtree_1.SubElement(request, "token").append(elementtree_1.CData(card.token));
                elementtree_1.SubElement(request, "mobile").append(elementtree_1.CData(card.mobileType));
            }
            else {
                var cardElement = elementtree_1.SubElement(request, "card");
                elementtree_1.SubElement(cardElement, "number").append(elementtree_1.CData(card.number));
                var date = _1.StringUtils.leftPad(card.expMonth, 2, "0") +
                    _1.StringUtils.leftPad((card.expYear || "").substr(2, 2), 2, "0");
                elementtree_1.SubElement(cardElement, "expdate").append(elementtree_1.CData(date));
                elementtree_1.SubElement(cardElement, "type").append(elementtree_1.CData(card.getCardType().toUpperCase()));
                elementtree_1.SubElement(cardElement, "chname").append(elementtree_1.CData(card.cardHolderName));
                if (card.cvn) {
                    var cvnElement = elementtree_1.SubElement(cardElement, "cvn");
                    elementtree_1.SubElement(cvnElement, "number").append(elementtree_1.CData(card.cvn));
                    elementtree_1.SubElement(cvnElement, "presind").append(elementtree_1.CData(card.cvnPresenceIndicator.toString()));
                }
                // issueno
            }
            var isVerify = builder.transactionType === _1.TransactionType.Verify;
            elementtree_1.SubElement(request, "sha1hash").append(elementtree_1.CData(this.generateHash(timestamp, orderId, builder.amount ? this.numberFormat(builder.amount) : "", builder.currency, builder.transactionModifier === _1.TransactionModifier.EncryptedMobile
                ? card.token
                : card.number, isVerify)));
        }
        if (builder.paymentMethod instanceof _1.RecurringPaymentMethod) {
            var recurring = builder.paymentMethod;
            elementtree_1.SubElement(request, "payerref").append(elementtree_1.CData(recurring.customerKey));
            elementtree_1.SubElement(request, "paymentmethod").append(elementtree_1.CData(recurring.key || recurring.id));
            if (builder.cvn) {
                var paymentData = elementtree_1.SubElement(request, "paymentdata");
                var cvn = elementtree_1.SubElement(paymentData, "cvn");
                elementtree_1.SubElement(cvn, "number").append(elementtree_1.CData(builder.cvn));
            }
            var isVerify = builder.transactionType === _1.TransactionType.Verify;
            elementtree_1.SubElement(request, "sha1hash").append(elementtree_1.CData(this.generateHash(timestamp, orderId, builder.amount ? this.numberFormat(builder.amount) : "", builder.currency, recurring.customerKey, isVerify)));
        }
        // refund hash
        if (builder.transactionType === _1.TransactionType.Refund) {
            elementtree_1.SubElement(request, "refundhash").append(elementtree_1.CData(_1.GenerationUtils.generateHash(this.refundPassword) || ""));
        }
        // this needs to be figured out based on txn type and set to 0, 1 or MULTI
        if (builder.transactionType === _1.TransactionType.Sale ||
            builder.transactionType === _1.TransactionType.Auth) {
            var autoSettle = builder.transactionType === _1.TransactionType.Sale ? "1" : "0";
            elementtree_1.SubElement(request, "autosettle", { flag: autoSettle });
        }
        if (builder.description) {
            var comments = elementtree_1.SubElement(request, "comments");
            elementtree_1.SubElement(comments, "comment", { id: 1 }).append(elementtree_1.CData(builder.description));
        }
        if (builder.customerId ||
            builder.productId ||
            builder.customerIpAddress ||
            builder.clientTransactionId) {
            var tssInfo = elementtree_1.SubElement(request, "tssinfo");
            elementtree_1.SubElement(tssInfo, "custnum").append(elementtree_1.CData(builder.customerId));
            elementtree_1.SubElement(tssInfo, "prodid").append(elementtree_1.CData(builder.productId));
            elementtree_1.SubElement(tssInfo, "varref").append(elementtree_1.CData(builder.clientTransactionId));
            elementtree_1.SubElement(tssInfo, "custipaddress").append(elementtree_1.CData(builder.customerIpAddress));
        }
        if (builder.ecommerceInfo) {
            var mpi = elementtree_1.SubElement(request, "mpi");
            elementtree_1.SubElement(mpi, "cavv").append(elementtree_1.CData(builder.ecommerceInfo.cavv));
            elementtree_1.SubElement(mpi, "xid").append(elementtree_1.CData(builder.ecommerceInfo.xid));
            elementtree_1.SubElement(mpi, "eci").append(elementtree_1.CData(builder.ecommerceInfo.eci));
        }
        return this.doTransaction(this.buildEnvelope(request)).then(function (response) {
            return _this.mapResponse(response);
        });
    };
    RealexConnector.prototype.serializeRequest = function (builder) {
        if (!this.hostedPaymentConfig) {
            throw new _1.ApiError("Hosted configuration missing. Please check your configuration");
        }
        var encoder = this.hostedPaymentConfig.version === _1.HppVersion.Version2
            ? function (t) { return t; }
            : _1.StringUtils.btoa;
        var request = {};
        var orderId = builder.orderId || _1.GenerationUtils.generateOrderId();
        var timestamp = builder.timestamp || _1.GenerationUtils.generateTimestamp();
        if (builder.transactionType !== _1.TransactionType.Sale &&
            builder.transactionType !== _1.TransactionType.Auth &&
            builder.transactionType !== _1.TransactionType.Verify) {
            throw new _1.UnsupportedTransactionError();
        }
        request.MERCHANT_ID = encoder(this.merchantId || "");
        request.ACCOUNT = encoder(this.accountId || "");
        request.CHANNEL = encoder(this.channel || "");
        request.ORDER_ID = encoder(orderId || "");
        if (builder.amount) {
            request.AMOUNT = encoder(this.numberFormat(builder.amount) || "");
        }
        request.CURRENCY = encoder(builder.currency || "");
        request.TIMESTAMP = encoder(timestamp || "");
        request.AUTO_SETTLE_FLAG = encoder(builder.transactionType === _1.TransactionType.Sale ? "1" : "0" || "");
        request.COMMENT1 = encoder(builder.Description || "");
        // request.COMMENT2 = encoder( || "");
        if (this.hostedPaymentConfig.requestTransactionStabilityScore) {
            request.RETURN_TSS = encoder(this.hostedPaymentConfig.requestTransactionStabilityScore
                ? "1"
                : "0" || "");
        }
        if (this.hostedPaymentConfig.directCurrencyConversionEnabled) {
            request.DCC_ENABLE = encoder(this.hostedPaymentConfig.directCurrencyConversionEnabled
                ? "1"
                : "0" || "");
        }
        if (builder.hostedPaymentData) {
            request.CUST_NUM = encoder(builder.hostedPaymentData.customerNumber || "");
            if (this.hostedPaymentConfig.displaySavedCards &&
                builder.hostedPaymentData.customerKey) {
                request.HPP_SELECT_STORED_CARD = encoder(builder.hostedPaymentData.customerKey || "");
            }
            if (builder.hostedPaymentData.offerToSaveCard) {
                request.OFFER_SAVE_CARD = encoder(builder.hostedPaymentData.offerToSaveCard ? "1" : "0" || "");
            }
            if (builder.hostedPaymentData.customerExists) {
                request.PAYER_EXIST = encoder(builder.hostedPaymentData.customerExists ? "1" : "0" || "");
            }
            request.PAYER_REF = encoder(builder.hostedPaymentData.customerKey || "");
            request.PMT_REF = encoder(builder.hostedPaymentData.paymentKey || "");
            request.PROD_ID = encoder(builder.hostedPaymentData.productId || "");
        }
        if (builder.shippingAddress) {
            request.SHIPPING_CODE = encoder(builder.shippingAddress.postalCode || "");
            request.SHIPPING_CO = encoder(builder.shippingAddress.country || "");
        }
        if (builder.sillingAddress) {
            request.BILLING_CODE = encoder(builder.billingAddress.postalCode || "");
            request.BILLING_CO = encoder(builder.billingAddress.country || "");
        }
        request.CUST_NUM = encoder(builder.customerId || "");
        request.VAR_REF = encoder(builder.clientTransactionId || "");
        request.HPP_LANG = encoder(this.hostedPaymentConfig.language || "");
        request.MERCHANT_RESPONSE_URL = encoder(this.hostedPaymentConfig.responseUrl || "");
        request.CARD_PAYMENT_BUTTON = encoder(this.hostedPaymentConfig.paymentButtonText || "");
        if (this.hostedPaymentConfig.cardStorageEnabled) {
            request.CARD_STORAGE_ENABLE = encoder(this.hostedPaymentConfig.cardStorageEnabled ? "1" : "0" || "");
        }
        if (builder.transactionType === _1.TransactionType.Verify) {
            request.VALIDATE_CARD_ONLY = encoder("1" || "");
        }
        if (this.hostedPaymentConfig.fraudFilterMode) {
            request.HPP_FRAUD_FILTER_MODE = encoder(this.hostedPaymentConfig.fraudFilterMode.toString() || "");
        }
        if (builder.recurringType || builder.recurringSequence) {
            if (builder.recurringType) {
                request.RECURRING_TYPE = encoder(builder.recurringType.toString().toLowerCase() || "");
            }
            if (builder.recurringSequence) {
                request.RECURRING_SEQUENCE = encoder(builder.recurringSequence.toString().toLowerCase() || "");
            }
        }
        if (this.hostedPaymentConfig.version) {
            request.HPP_VERSION = encoder(this.hostedPaymentConfig.version.toString() || "");
        }
        var toHash = [
            timestamp,
            this.merchantId,
            orderId,
            builder.amount ? this.numberFormat(builder.amount) : null,
            builder.currency,
        ];
        if (this.hostedPaymentConfig.cardStorageEnabled ||
            (builder.hostedPaymentData && builder.hostedPaymentData.offerToSaveCard)) {
            toHash.push(builder.hostedPaymentData.customerKey
                ? builder.hostedPaymentData.customerKey
                : null);
            toHash.push(builder.hostedPaymentData.paymentKey
                ? builder.hostedPaymentData.paymentKey
                : null);
        }
        if (this.hostedPaymentConfig.fraudFilterMode &&
            this.hostedPaymentConfig.fraudFilterMode !== _1.FraudFilterMode.None) {
            toHash.push(this.hostedPaymentConfig.fraudFilterMode.toString());
        }
        request.SHA1HASH = encoder(_1.GenerationUtils.generateHash(toHash.join("."), this.sharedSecret) || "");
        return JSON.stringify(request);
    };
    RealexConnector.prototype.manageTransaction = function (builder) {
        var _this = this;
        var timestamp = _1.GenerationUtils.generateTimestamp();
        var orderId = builder.orderId || _1.GenerationUtils.generateOrderId();
        // build Request
        var request = elementtree_1.Element("request", {
            timestamp: timestamp,
            type: this.mapManageRequestType(builder.transactionType),
        });
        if (this.merchantId) {
            elementtree_1.SubElement(request, "merchantid").append(elementtree_1.CData(this.merchantId));
        }
        if (this.accountId) {
            elementtree_1.SubElement(request, "account").append(elementtree_1.CData(this.accountId));
        }
        if (this.channel) {
            elementtree_1.SubElement(request, "channel").append(elementtree_1.CData(this.channel));
        }
        elementtree_1.SubElement(request, "orderid").append(elementtree_1.CData(orderId));
        if (builder.paymentMethod) {
            var ref = builder.paymentMethod;
            elementtree_1.SubElement(request, "pasref").append(elementtree_1.CData(ref.transactionId));
        }
        if (builder.amount) {
            var amountAttrs = builder.currency
                ? { currency: builder.currency }
                : {};
            elementtree_1.SubElement(request, "amount", amountAttrs).append(elementtree_1.CData(this.numberFormat(builder.amount)));
        }
        else if (builder.transactionType === _1.TransactionType.Capture) {
            throw new _1.BuilderError("Amount cannot be null for capture");
        }
        if (builder.transactionType === _1.TransactionType.Refund) {
            if (builder.authorizationCode) {
                elementtree_1.SubElement(request, "authcode").append(elementtree_1.CData(builder.authorizationCode));
            }
            elementtree_1.SubElement(request, "refundhash").append(elementtree_1.CData(_1.GenerationUtils.generateHash(this.rebatePassword)));
        }
        if (builder.reasonCode) {
            elementtree_1.SubElement(request, "reasoncode").append(elementtree_1.CData(builder.reasonCode.toString()));
        }
        if (builder.description) {
            var comments = elementtree_1.SubElement(request, "comments");
            elementtree_1.SubElement(comments, "comment", { id: 1 }).append(elementtree_1.CData(builder.description));
        }
        elementtree_1.SubElement(request, "sha1hash").append(elementtree_1.CData(this.generateHash(timestamp, orderId, builder.amount ? this.numberFormat(builder.amount) : "", builder.currency, "")));
        return this.doTransaction(this.buildEnvelope(request)).then(function (response) {
            return _this.mapResponse(response);
        });
    };
    RealexConnector.prototype.processReport = function (_builder) {
        throw new _1.UnsupportedTransactionError("Reporting functionality is not supported through this gateway.");
    };
    RealexConnector.prototype.processRecurring = function (builder) {
        var _this = this;
        var timestamp = _1.GenerationUtils.generateTimestamp();
        var orderId = builder.orderId || _1.GenerationUtils.generateOrderId();
        // build Request
        var request = elementtree_1.Element("request", {
            timestamp: timestamp,
            type: this.mapRecurringRequestType(builder),
        });
        if (this.merchantId) {
            elementtree_1.SubElement(request, "merchantid").append(elementtree_1.CData(this.merchantId));
        }
        if (this.accountId) {
            elementtree_1.SubElement(request, "account").append(elementtree_1.CData(this.accountId));
        }
        elementtree_1.SubElement(request, "orderid").append(elementtree_1.CData(orderId));
        if (builder.transactionType === _1.TransactionType.Create ||
            builder.transactionType === _1.TransactionType.Edit) {
            if (builder.entity instanceof _1.Customer) {
                var customer = builder.entity;
                request.append(this.buildCustomer(customer));
                elementtree_1.SubElement(request, "sha1hash").append(elementtree_1.CData(_1.GenerationUtils.generateHash([timestamp, this.merchantId, orderId, "", "", customer.key].join("."), this.sharedSecret)));
            }
            else if (builder.entity instanceof _1.RecurringPaymentMethod) {
                var payment = builder.entity;
                var cardElement = elementtree_1.SubElement(request, "card");
                elementtree_1.SubElement(cardElement, "ref").append(elementtree_1.CData(payment.key || payment.id));
                elementtree_1.SubElement(cardElement, "payerref").append(elementtree_1.CData(payment.customerKey));
                if (payment.paymentMethod) {
                    var card = payment.paymentMethod;
                    var expiry = _1.StringUtils.leftPad(card.expMonth, 2, "0") +
                        _1.StringUtils.leftPad((card.expYear || "").substr(2, 2), 2, "0");
                    elementtree_1.SubElement(cardElement, "number").append(elementtree_1.CData(card.number));
                    elementtree_1.SubElement(cardElement, "expdate").append(elementtree_1.CData(expiry));
                    elementtree_1.SubElement(cardElement, "chname").append(elementtree_1.CData(card.cardHolderName));
                    elementtree_1.SubElement(cardElement, "type").append(elementtree_1.CData(card.getCardType()));
                    var sha1hash = "";
                    if (builder.transactionType === _1.TransactionType.Create) {
                        sha1hash = _1.GenerationUtils.generateHash([
                            timestamp,
                            this.merchantId,
                            orderId,
                            "",
                            "",
                            payment.customerKey,
                            card.cardHolderName,
                            card.number,
                        ].join("."), this.sharedSecret);
                    }
                    else {
                        sha1hash = _1.GenerationUtils.generateHash([
                            timestamp,
                            this.merchantId,
                            payment.customerKey,
                            payment.key || payment.id,
                            expiry,
                            card.number,
                        ].join("."), this.sharedSecret);
                    }
                    elementtree_1.SubElement(request, "sha1hash").append(elementtree_1.CData(sha1hash));
                }
            }
        }
        else if (builder.transactionType === _1.TransactionType.Delete) {
            if (builder.entity instanceof _1.RecurringPaymentMethod) {
                var payment = builder.entity;
                var cardElement = elementtree_1.SubElement(request, "card");
                elementtree_1.SubElement(cardElement, "ref").append(elementtree_1.CData(payment.key || payment.id));
                elementtree_1.SubElement(cardElement, "payerref").append(elementtree_1.CData(payment.customerKey));
            }
        }
        return this.doTransaction(this.buildEnvelope(request)).then(function (response) {
            return _this.mapRecurringResponse(response, builder);
        });
    };
    RealexConnector.prototype.buildEnvelope = function (transaction) {
        return new elementtree_1.ElementTree(transaction).write();
    };
    RealexConnector.prototype.buildCustomer = function (customer) {
        var payer = elementtree_1.Element("payer", {
            ref: customer.key || _1.StringUtils.uuid(),
            type: "Retail",
        });
        elementtree_1.SubElement(payer, "title").append(elementtree_1.CData(customer.title));
        elementtree_1.SubElement(payer, "firstname").append(elementtree_1.CData(customer.firstName));
        elementtree_1.SubElement(payer, "surname").append(elementtree_1.CData(customer.lastName));
        elementtree_1.SubElement(payer, "company").append(elementtree_1.CData(customer.company));
        if (customer.address) {
            var address = elementtree_1.SubElement(payer, "address");
            elementtree_1.SubElement(address, "line1").append(elementtree_1.CData(customer.address.streetAddress1));
            elementtree_1.SubElement(address, "line2").append(elementtree_1.CData(customer.address.streetAddress2));
            elementtree_1.SubElement(address, "line3").append(elementtree_1.CData(customer.address.streetAddress3));
            elementtree_1.SubElement(address, "city").append(elementtree_1.CData(customer.address.city));
            elementtree_1.SubElement(address, "county").append(elementtree_1.CData(customer.address.province));
            elementtree_1.SubElement(address, "postcode").append(elementtree_1.CData(customer.address.postalCode));
            if (customer.address.country) {
                elementtree_1.SubElement(address, "country", { code: "GB" }).append(elementtree_1.CData(customer.address.country));
            }
        }
        var phone = elementtree_1.SubElement(payer, "phonenumbers");
        elementtree_1.SubElement(phone, "home").append(elementtree_1.CData(customer.homePhone));
        elementtree_1.SubElement(phone, "work").append(elementtree_1.CData(customer.workPhone));
        elementtree_1.SubElement(phone, "fax").append(elementtree_1.CData(customer.fax));
        elementtree_1.SubElement(phone, "mobile").append(elementtree_1.CData(customer.mobilePhone));
        elementtree_1.SubElement(payer, "email").append(elementtree_1.CData(customer.email));
        return payer;
    };
    RealexConnector.prototype.mapResponse = function (rawResponse) {
        var result = new _1.Transaction();
        var root = elementtree_1.XML(rawResponse);
        this.checkResponse(root);
        result.responseCode = root.findtext(".//result");
        result.responseMessage = root.findtext(".//message");
        result.cvnResponseCode = root.findtext(".//cvnresult");
        result.avsResponseCode = root.findtext(".//avspostcoderesponse");
        result.timestamp = root.findtext(".//timestamp");
        result.transactionReference = new _1.TransactionReference();
        result.transactionReference.authCode = root.findtext(".//authcode");
        result.transactionReference.orderId = root.findtext(".//orderid");
        result.transactionReference.paymentMethodType = _1.PaymentMethodType.Credit;
        result.transactionReference.transactionId = root.findtext(".//pasref");
        return result;
    };
    RealexConnector.prototype.mapRecurringResponse = function (rawResponse, builder) {
        var root = elementtree_1.XML(rawResponse);
        this.checkResponse(root);
        return builder.entity;
    };
    RealexConnector.prototype.checkResponse = function (root, acceptedCodes) {
        if (!acceptedCodes) {
            acceptedCodes = ["00"];
        }
        var responseCode = root.findtext(".//result");
        var responseMessage = root.findtext(".//message");
        if (acceptedCodes.indexOf(responseCode) === -1) {
            throw new _1.GatewayError("Unexpected Gateway Response: " + responseCode + " - " + responseMessage, responseCode, responseMessage);
        }
    };
    RealexConnector.prototype.generateHash = function (timestamp, orderId, amount, currency, paymentData, verify) {
        if (verify === void 0) { verify = false; }
        var data = [timestamp, this.merchantId, orderId];
        if (false === verify) {
            data.push(amount);
            data.push(currency);
        }
        data.push(paymentData);
        return _1.GenerationUtils.generateHash(data.join("."), this.sharedSecret);
    };
    RealexConnector.prototype.mapAuthRequestType = function (builder) {
        switch (builder.transactionType) {
            case _1.TransactionType.Sale:
            case _1.TransactionType.Auth:
                if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Credit) {
                    if (builder.transactionModifier === _1.TransactionModifier.Offline) {
                        return "offline";
                    }
                    if (builder.transactionModifier === _1.TransactionModifier.EncryptedMobile) {
                        return "auth-mobile";
                    }
                    return "auth";
                }
                return "receipt-in";
            case _1.TransactionType.Capture:
                return "settle";
            case _1.TransactionType.Verify:
                if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Credit) {
                    return "otb";
                }
                return "receipt-in-otb";
            case _1.TransactionType.Refund:
                if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Credit) {
                    return "credit";
                }
                return "payment-out";
            case _1.TransactionType.Reversal:
            default:
                throw new _1.UnsupportedTransactionError("The selected gateway does not support this transaction type.");
        }
    };
    RealexConnector.prototype.mapManageRequestType = function (type) {
        switch (type) {
            case _1.TransactionType.Capture:
                return "settle";
            case _1.TransactionType.Hold:
                return "hold";
            case _1.TransactionType.Refund:
                return "rebate";
            case _1.TransactionType.Release:
                return "release";
            case _1.TransactionType.Void:
            case _1.TransactionType.Reversal:
                return "void";
            default:
                return "unknown";
        }
    };
    RealexConnector.prototype.mapRecurringRequestType = function (builder) {
        var entity = builder.entity;
        switch (builder.transactionType) {
            case _1.TransactionType.Create:
                if (entity instanceof _1.Customer) {
                    return "payer-new";
                }
                if (entity instanceof _1.Schedule) {
                    throw new _1.UnsupportedTransactionError();
                }
                return "card-new";
            case _1.TransactionType.Edit:
                if (entity instanceof _1.Customer) {
                    return "payer-edit";
                }
                if (entity instanceof _1.Schedule) {
                    throw new _1.UnsupportedTransactionError();
                }
                return "card-update-card";
            case _1.TransactionType.Delete:
                if (entity instanceof _1.Customer || entity instanceof _1.Schedule) {
                    throw new _1.UnsupportedTransactionError();
                }
                return "card-cancel-card";
            default:
                throw new _1.UnsupportedTransactionError();
        }
    };
    RealexConnector.prototype.numberFormat = function (amount) {
        var f = parseFloat(amount.toString());
        return (parseFloat(f.toFixed(2)) * 100).toString();
    };
    return RealexConnector;
}(XmlGateway_1.XmlGateway));
exports.RealexConnector = RealexConnector;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(95));
__export(__webpack_require__(22));
__export(__webpack_require__(96));
__export(__webpack_require__(97));
__export(__webpack_require__(32));
__export(__webpack_require__(98));
__export(__webpack_require__(23));
__export(__webpack_require__(99));
__export(__webpack_require__(100));
__export(__webpack_require__(101));
__export(__webpack_require__(102));
__export(__webpack_require__(5));
__export(__webpack_require__(103));
__export(__webpack_require__(104));


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var PaymentMethod_1 = __webpack_require__(5);
var Cash = /** @class */ (function (_super) {
    __extends(Cash, _super);
    function Cash() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.paymentMethodType = _1.PaymentMethodType.Cash;
        return _this;
    }
    Cash.prototype.charge = function (_amount) {
        throw new _1.NotImplementedError();
    };
    Cash.prototype.refund = function (_amount) {
        throw new _1.NotImplementedError();
    };
    return Cash;
}(PaymentMethod_1.PaymentMethod));
exports.Cash = Cash;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var Credit_1 = __webpack_require__(22);
var CreditCardData = /** @class */ (function (_super) {
    __extends(CreditCardData, _super);
    function CreditCardData() {
        var _this = _super.call(this) || this;
        _this.cardPresent = false;
        _this.readerPresent = false;
        _this.cvnPresenceIndicator = _1.CvnPresenceIndicator.NotRequested;
        return _this;
    }
    CreditCardData.prototype.getCardType = function () {
        var number = this.number.replace(" ", "").replace("-", "");
        for (var _i = 0, _a = CreditCardData.cardTypes; _i < _a.length; _i++) {
            var type = _a[_i];
            if (type.regex.test(number)) {
                return type.name;
            }
        }
        return "Unknown";
    };
    CreditCardData.cardTypes = [
        { name: "Visa", regex: /^4/ },
        { name: "MasterCard", regex: /^(5[1-5]|2[2-7])/ },
        { name: "Amex", regex: /^3[47]/ },
        { name: "Diners", regex: /^3[0689]/ },
        { name: "EnRoute", regex: /^2(014|149)/ },
        { name: "Discover", regex: /^6([045]|22)/ },
        { name: "Jcb", regex: /^35/ },
    ];
    return CreditCardData;
}(Credit_1.Credit));
exports.CreditCardData = CreditCardData;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Credit_1 = __webpack_require__(22);
var CreditTrackData = /** @class */ (function (_super) {
    __extends(CreditTrackData, _super);
    function CreditTrackData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CreditTrackData;
}(Credit_1.Credit));
exports.CreditTrackData = CreditTrackData;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Debit_1 = __webpack_require__(32);
var DebitTrackData = /** @class */ (function (_super) {
    __extends(DebitTrackData, _super);
    function DebitTrackData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DebitTrackData;
}(Debit_1.Debit));
exports.DebitTrackData = DebitTrackData;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var EBT_1 = __webpack_require__(23);
var EBTCardData = /** @class */ (function (_super) {
    __extends(EBTCardData, _super);
    function EBTCardData() {
        var _this = _super.call(this) || this;
        _this.cardPresent = false;
        _this.readerPresent = false;
        _this.cvnPresenceIndicator = _1.CvnPresenceIndicator.NotRequested;
        return _this;
    }
    return EBTCardData;
}(EBT_1.EBT));
exports.EBTCardData = EBTCardData;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EBT_1 = __webpack_require__(23);
var EBTTrackData = /** @class */ (function (_super) {
    __extends(EBTTrackData, _super);
    function EBTTrackData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EBTTrackData;
}(EBT_1.EBT));
exports.EBTTrackData = EBTTrackData;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var PaymentMethod_1 = __webpack_require__(5);
var ECheck = /** @class */ (function (_super) {
    __extends(ECheck, _super);
    function ECheck() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.paymentMethodType = _1.PaymentMethodType.ACH;
        return _this;
    }
    /**
     * Authorizes the payment method and captures the entire authorized amount
     *
     * @param string|number amount Amount to authorize
     *
     * @return AuthorizationBuilder
     */
    ECheck.prototype.charge = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Sale, this).withAmount(amount);
    };
    return ECheck;
}(PaymentMethod_1.PaymentMethod));
exports.ECheck = ECheck;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var PaymentMethod_1 = __webpack_require__(5);
var GiftCard = /** @class */ (function (_super) {
    __extends(GiftCard, _super);
    function GiftCard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Payment method type
         *
         * @var PaymentMethodType
         */
        _this.paymentMethodType = _1.PaymentMethodType.Gift;
        return _this;
    }
    /**
     * Creates a new payment method
     *
     * @param string alias Alias to use
     *
     * @return GiftCard
     */
    GiftCard.create = function (alias) {
        var card = new GiftCard();
        return new _1.AuthorizationBuilder(_1.TransactionType.Alias, card)
            .withAlias(_1.AliasAction.Create, alias)
            .execute()
            .then(function (response) {
            if (response.responseCode === "00") {
                return response.giftCard;
            }
            throw new _1.ApiError(response.responseMessage);
        })
            .catch(function () {
            throw new _1.ApiError("Unable to create gift card alias");
        });
    };
    /**
     * Adds an alias to the payment method
     *
     * @param string alias Alias to add
     *
     * @return AuthorizationBuilder
     */
    GiftCard.prototype.addAlias = function (alias) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Alias, this).withAlias(_1.AliasAction.Add, alias);
    };
    /**
     * Activates the payment method with the given amount
     *
     * @param string|number amount Amount to add
     *
     * @return AuthorizationBuilder
     */
    GiftCard.prototype.activate = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Activate, this).withAmount(amount);
    };
    /**
     * Adds value to the payment method
     *
     * @param string|number amount Amount to add
     *
     * @return AuthorizationBuilder
     */
    GiftCard.prototype.addValue = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.AddValue, this).withAmount(amount);
    };
    /**
     * Inquires the balance of the payment method
     *
     * @param InquiryType inquiry Type of inquiry
     *
     * @return AuthorizationBuilder
     */
    GiftCard.prototype.balanceInquiry = function (inquiry) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Balance, this).withBalanceInquiryType(inquiry);
    };
    /**
     * Authorizes the payment method and captures the entire authorized amount
     *
     * @param string|number amount Amount to authorize
     *
     * @return AuthorizationBuilder
     */
    GiftCard.prototype.charge = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Sale, this).withAmount(amount);
    };
    /**
     * Deactivates the payment method
     *
     * @return AuthorizationBuilder
     */
    GiftCard.prototype.deactivate = function () {
        return new _1.AuthorizationBuilder(_1.TransactionType.Deactivate, this);
    };
    /**
     * Removes an alias to the payment method
     *
     * @param string alias Alias to remove
     *
     * @return AuthorizationBuilder
     */
    GiftCard.prototype.removeAlias = function (alias) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Alias, this).withAlias(_1.AliasAction.Delete, alias);
    };
    /**
     * Replaces the payment method with the given one
     *
     * @param GiftCard newCard Replacement gift card
     *
     * @return AuthorizationBuilder
     */
    GiftCard.prototype.replaceWith = function (newCard) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Replace, this).withReplacementCard(newCard);
    };
    /**
     * Reverses the payment method
     *
     * @param string|number amount Amount to reverse
     *
     * @return AuthorizationBuilder
     */
    GiftCard.prototype.reverse = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Reversal, this).withAmount(amount);
    };
    /**
     * Rewards the payment method
     *
     * @param string|number amount Amount to reward
     *
     * @return AuthorizationBuilder
     */
    GiftCard.prototype.rewards = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Reward, this).withAmount(amount);
    };
    Object.defineProperty(GiftCard.prototype, "alias", {
        get: function () {
            return this.value;
        },
        set: function (value) {
            this.value = value;
            this.valueType = "Alias";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GiftCard.prototype, "number", {
        get: function () {
            return this.value;
        },
        set: function (value) {
            this.value = value;
            this.valueType = "CardNbr";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GiftCard.prototype, "token", {
        get: function () {
            return this.value;
        },
        set: function (value) {
            this.value = value;
            this.valueType = "TokenValue";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GiftCard.prototype, "trackData", {
        get: function () {
            return this.value;
        },
        set: function (value) {
            this.value = value;
            this.valueType = "TrackData";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Payment method value types
     *
     * @var string[]
     */
    GiftCard.valueTypes = ["alias", "number", "token", "trackData"];
    return GiftCard;
}(PaymentMethod_1.PaymentMethod));
exports.GiftCard = GiftCard;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var Entities_1 = __webpack_require__(9);
var RecurringPaymentMethod = /** @class */ (function (_super) {
    __extends(RecurringPaymentMethod, _super);
    function RecurringPaymentMethod(customerIdOrPaymentMethod, paymentId) {
        var _this = _super.call(this) || this;
        _this.paymentMethodType = _1.PaymentMethodType.Recurring;
        if ((customerIdOrPaymentMethod &&
            typeof customerIdOrPaymentMethod === "string") ||
            customerIdOrPaymentMethod instanceof String) {
            _this.paymentType = "Credit Card";
            _this.customerKey = customerIdOrPaymentMethod;
            if (paymentId) {
                _this.key = paymentId;
            }
        }
        else if (customerIdOrPaymentMethod) {
            _this._paymentMethod = customerIdOrPaymentMethod;
        }
        return _this;
    }
    Object.defineProperty(RecurringPaymentMethod.prototype, "paymentMethod", {
        get: function () {
            return this._paymentMethod;
        },
        set: function (value) {
            var client = _1.ServicesContainer.instance().getRecurringClient();
            if (!client.supportsUpdatePaymentDetails) {
                throw new _1.UnsupportedTransactionError();
            }
            this._paymentMethod = value;
        },
        enumerable: true,
        configurable: true
    });
    RecurringPaymentMethod.prototype.authorize = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Auth, this)
            .withAmount(amount)
            .withOneTimePayment(true);
    };
    RecurringPaymentMethod.prototype.charge = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Sale, this)
            .withAmount(amount)
            .withOneTimePayment(true);
    };
    RecurringPaymentMethod.prototype.refund = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Refund, this).withAmount(amount);
    };
    RecurringPaymentMethod.prototype.verify = function () {
        return new _1.AuthorizationBuilder(_1.TransactionType.Verify, this);
    };
    RecurringPaymentMethod.prototype.addSchedule = function (scheduleId) {
        var schedule = new _1.Schedule(this.customerKey, this.key);
        schedule.id = scheduleId;
        return schedule;
    };
    return RecurringPaymentMethod;
}(Entities_1.RecurringEntity));
exports.RecurringPaymentMethod = RecurringPaymentMethod;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TransactionReference = /** @class */ (function () {
    function TransactionReference(transactionId) {
        if (transactionId) {
            this.transactionId = transactionId;
        }
    }
    return TransactionReference;
}());
exports.TransactionReference = TransactionReference;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(106));
__export(__webpack_require__(107));
__export(__webpack_require__(108));
__export(__webpack_require__(109));
__export(__webpack_require__(110));
__export(__webpack_require__(111));
__export(__webpack_require__(112));
__export(__webpack_require__(113));
__export(__webpack_require__(114));


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var BatchService = /** @class */ (function () {
    function BatchService() {
    }
    BatchService.closeBatch = function () {
        return new _1.ManagementBuilder(_1.TransactionType.BatchClose)
            .execute()
            .then(function (_response) {
            return new _1.BatchSummary();
        });
    };
    return BatchService;
}());
exports.BatchService = BatchService;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var CheckService = /** @class */ (function () {
    function CheckService(config) {
        _1.ServicesContainer.configure(config);
    }
    CheckService.prototype.charge = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Sale).withAmount(amount);
    };
    CheckService.prototype.void = function (transactionId) {
        var ref = new _1.TransactionReference();
        ref.paymentMethodType = _1.PaymentMethodType.ACH;
        ref.transactionId = transactionId;
        return new _1.ManagementBuilder(_1.TransactionType.Void).withPaymentMethod(ref);
    };
    return CheckService;
}());
exports.CheckService = CheckService;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var CreditService = /** @class */ (function () {
    function CreditService(config) {
        _1.ServicesContainer.configure(config);
    }
    CreditService.prototype.authorize = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Auth).withAmount(amount);
    };
    CreditService.prototype.capture = function (transactionId) {
        var ref = new _1.TransactionReference();
        ref.paymentMethodType = _1.PaymentMethodType.Credit;
        ref.transactionId = transactionId;
        return new _1.ManagementBuilder(_1.TransactionType.Capture).withPaymentMethod(ref);
    };
    CreditService.prototype.charge = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Sale).withAmount(amount);
    };
    CreditService.prototype.edit = function (transactionId) {
        var ref = new _1.TransactionReference();
        ref.paymentMethodType = _1.PaymentMethodType.Credit;
        if (transactionId) {
            ref.transactionId = transactionId;
        }
        return new _1.ManagementBuilder(_1.TransactionType.Edit).withPaymentMethod(ref);
    };
    CreditService.prototype.refund = function (amount) {
        var ref = new _1.TransactionReference();
        ref.paymentMethodType = _1.PaymentMethodType.Credit;
        return new _1.AuthorizationBuilder(_1.TransactionType.Refund)
            .withAmount(amount)
            .withPaymentMethod(ref);
    };
    CreditService.prototype.reverse = function (amount) {
        var ref = new _1.TransactionReference();
        ref.paymentMethodType = _1.PaymentMethodType.Credit;
        return new _1.AuthorizationBuilder(_1.TransactionType.Reversal)
            .withAmount(amount)
            .withPaymentMethod(ref);
    };
    CreditService.prototype.verify = function () {
        return new _1.AuthorizationBuilder(_1.TransactionType.Verify);
    };
    CreditService.prototype.void = function (transactionId) {
        var ref = new _1.TransactionReference();
        ref.paymentMethodType = _1.PaymentMethodType.Credit;
        ref.transactionId = transactionId;
        return new _1.ManagementBuilder(_1.TransactionType.Void).withPaymentMethod(ref);
    };
    return CreditService;
}());
exports.CreditService = CreditService;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var DebitService = /** @class */ (function () {
    function DebitService(config) {
        _1.ServicesContainer.configure(config);
    }
    DebitService.prototype.charge = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Sale).withAmount(amount);
    };
    DebitService.prototype.refund = function (amount) {
        var ref = new _1.TransactionReference();
        ref.paymentMethodType = _1.PaymentMethodType.Debit;
        return new _1.AuthorizationBuilder(_1.TransactionType.Refund)
            .withAmount(amount)
            .withPaymentMethod(ref);
    };
    DebitService.prototype.reverse = function (amount) {
        var ref = new _1.TransactionReference();
        ref.paymentMethodType = _1.PaymentMethodType.Debit;
        return new _1.AuthorizationBuilder(_1.TransactionType.Reversal)
            .withAmount(amount)
            .withPaymentMethod(ref);
    };
    return DebitService;
}());
exports.DebitService = DebitService;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var EBTService = /** @class */ (function () {
    function EBTService(config) {
        _1.ServicesContainer.configure(config);
    }
    EBTService.prototype.balanceInquiry = function (type) {
        if (type === void 0) { type = _1.InquiryType.Foodstamp; }
        return new _1.AuthorizationBuilder(_1.TransactionType.Balance)
            .withBalanceInquiryType(type)
            .withAmount(0);
    };
    EBTService.prototype.benefitWithdrawal = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.BenefitWithDrawal)
            .withAmount(amount)
            .withCashBack(0);
    };
    EBTService.prototype.charge = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Sale).withAmount(amount);
    };
    EBTService.prototype.refund = function (amount) {
        var ref = new _1.TransactionReference();
        ref.paymentMethodType = _1.PaymentMethodType.EBT;
        return new _1.AuthorizationBuilder(_1.TransactionType.Refund)
            .withAmount(amount)
            .withPaymentMethod(ref);
    };
    return EBTService;
}());
exports.EBTService = EBTService;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var GiftService = /** @class */ (function () {
    function GiftService(config) {
        _1.ServicesContainer.configure(config);
    }
    GiftService.prototype.activate = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Activate).withAmount(amount);
    };
    GiftService.prototype.addValue = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.AddValue).withAmount(amount);
    };
    GiftService.prototype.addAlias = function (phoneNumber) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Alias).withAlias(_1.AliasAction.Add, phoneNumber);
    };
    GiftService.prototype.balanceInquiry = function (type) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Balance).withBalanceInquiryType(type);
    };
    GiftService.prototype.charge = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Sale).withAmount(amount);
    };
    GiftService.prototype.create = function (phoneNumber) {
        return _1.GiftCard.create(phoneNumber);
    };
    GiftService.prototype.deactivate = function () {
        return new _1.AuthorizationBuilder(_1.TransactionType.Deactivate);
    };
    GiftService.prototype.removeAlias = function (phoneNumber) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Alias).withAlias(_1.AliasAction.Delete, phoneNumber);
    };
    GiftService.prototype.replaceWith = function (newCard) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Replace).withReplacementCard(newCard);
    };
    GiftService.prototype.reverse = function (amount) {
        var ref = new _1.TransactionReference();
        ref.paymentMethodType = _1.PaymentMethodType.Gift;
        return new _1.AuthorizationBuilder(_1.TransactionType.Reversal)
            .withAmount(amount)
            .withPaymentMethod(ref);
    };
    GiftService.prototype.rewards = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Reward).withAmount(amount);
    };
    GiftService.prototype.void = function (transactionId) {
        var ref = new _1.TransactionReference();
        ref.paymentMethodType = _1.PaymentMethodType.Gift;
        ref.transactionId = transactionId;
        return new _1.ManagementBuilder(_1.TransactionType.Void).withPaymentMethod(ref);
    };
    return GiftService;
}());
exports.GiftService = GiftService;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var HostedService = /** @class */ (function () {
    function HostedService(config) {
        this.config = config;
        _1.ServicesContainer.configure(config);
    }
    HostedService.prototype.authorize = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Auth).withAmount(amount);
    };
    HostedService.prototype.charge = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Sale).withAmount(amount);
    };
    HostedService.prototype.verify = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Verify).withAmount(amount);
    };
    HostedService.prototype.parseResponse = function (json, encoded) {
        if (encoded === void 0) { encoded = true; }
        var response = JSON.parse(json);
        var decoder = encoded ? _1.StringUtils.atob : function (t) { return t; };
        var timestamp = decoder(response.TIMESTAMP);
        var merchantId = decoder(response.MERCHANT_ID);
        var orderId = decoder(response.ORDER_ID);
        var result = decoder(response.RESULT);
        var message = decoder(response.MESSAGE);
        var transactionId = decoder(response.PASREF);
        var authCode = decoder(response.AUTHCODE);
        var sha1Hash = decoder(response.SHA1HASH);
        var hash = _1.GenerationUtils.generateHash([
            timestamp,
            merchantId,
            orderId,
            result,
            message,
            transactionId,
            authCode,
        ].join("."), this.config.sharedSecret);
        if (hash !== sha1Hash) {
            throw new _1.ApiError("Incorrect hash. Please check your code and the Developers Documentation.");
        }
        var transaction = new _1.Transaction();
        transaction.authorizedAmount = decoder(response.AMOUNT);
        transaction.cvnResponseCode = decoder(response.CVNRESULT);
        transaction.responseCode = result;
        transaction.responseMessage = message;
        transaction.avsResponseCode = decoder(response.AVSPOSTCODERESULT);
        transaction.transactionReference = new _1.TransactionReference();
        transaction.transactionReference.authCode = authCode;
        transaction.transactionReference.orderId = orderId;
        transaction.transactionReference.paymentMethodType =
            _1.PaymentMethodType.Credit;
        transaction.transactionReference.transactionId = transactionId;
        return transaction;
    };
    return HostedService;
}());
exports.HostedService = HostedService;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var RecurringService = /** @class */ (function () {
    function RecurringService() {
    }
    RecurringService.create = function (entity) {
        return new _1.RecurringBuilder(_1.TransactionType.Create, entity).execute();
    };
    RecurringService.delete = function (entity, _force) {
        if (_force === void 0) { _force = false; }
        return new _1.RecurringBuilder(_1.TransactionType.Delete, entity).execute();
    };
    RecurringService.edit = function (entity) {
        return new _1.RecurringBuilder(_1.TransactionType.Edit, entity).execute();
    };
    RecurringService.get = function (key) {
        var entity = {
            key: key,
        };
        return new _1.RecurringBuilder(_1.TransactionType.Fetch, entity).execute();
    };
    RecurringService.search = function () {
        return new _1.RecurringBuilder(_1.TransactionType.Search);
    };
    return RecurringService;
}());
exports.RecurringService = RecurringService;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var ReportingService = /** @class */ (function () {
    function ReportingService() {
    }
    ReportingService.activity = function () {
        return new _1.TransactionReportBuilder(_1.ReportType.Activity);
    };
    ReportingService.transactionDetail = function (transactionId) {
        return new _1.TransactionReportBuilder(_1.ReportType.TransactionDetail).withTransactionId(transactionId);
    };
    return ReportingService;
}());
exports.ReportingService = ReportingService;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(116));
__export(__webpack_require__(118));


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
Object.defineProperty(exports, "__esModule", { value: true });
var Sha1_1 = __webpack_require__(117);
var _1 = __webpack_require__(0);
var GenerationUtils = /** @class */ (function () {
    function GenerationUtils() {
    }
    GenerationUtils.generateHash = function (toHash, secret) {
        var toHashFirstPass = Sha1_1.hex_sha1(toHash);
        if (!secret) {
            return toHashFirstPass;
        }
        var toHashSecondPass = toHashFirstPass + "." + secret;
        return Sha1_1.hex_sha1(toHashSecondPass);
    };
    GenerationUtils.generateTimestamp = function () {
        var date = new Date();
        return (date.getUTCFullYear().toString() +
            _1.StringUtils.leftPad((date.getUTCMonth() + 1).toString(), 2, "0") +
            _1.StringUtils.leftPad(date.getUTCDate().toString(), 2, "0") +
            _1.StringUtils.leftPad(date.getUTCHours().toString(), 2, "0") +
            _1.StringUtils.leftPad(date.getUTCMinutes().toString(), 2, "0") +
            _1.StringUtils.leftPad(date.getUTCSeconds().toString(), 2, "0"));
    };
    GenerationUtils.generateOrderId = function () {
        var id = _1.StringUtils.uuid();
        return Buffer.from(id, "ascii")
            .toString("base64")
            .replace("=", "")
            .replace("+", "-")
            .replace("/", "_");
    };
    return GenerationUtils;
}());
exports.GenerationUtils = GenerationUtils;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * A TypeScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 *
 * This file is derived from JavaScript MD5 project ( http://pajhome.org.uk/crypt/md5/ )
 * and is modified for oauth-typescript project.
 *
 * Copyright 2000-2002 Paul Johnston.
 * (Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet)
 * Copyright 2015 NOBUOKA Yu.
 *
 * Licensed under the BSD License.
 *
 *   1. Redistributions of source code must retain the above copyright notice,
 *     this list of conditions and the following disclaimer.
 *   2. Redistributions in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *   3. Neither the name of the copyright holder nor the names of its contributors
 *     may be used to endorse or promote products derived from this software
 *     without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Configurable constiables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode      */
/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha1(s) {
    return binb2hex(core_sha1(str2binb(s), s.length * chrsz));
}
exports.hex_sha1 = hex_sha1;
function b64_sha1(s) {
    return binb2b64(core_sha1(str2binb(s), s.length * chrsz));
}
exports.b64_sha1 = b64_sha1;
function str_sha1(s) {
    return binb2str(core_sha1(str2binb(s), s.length * chrsz));
}
exports.str_sha1 = str_sha1;
function hex_hmac_sha1(key, data) {
    return binb2hex(core_hmac_sha1(key, data));
}
exports.hex_hmac_sha1 = hex_hmac_sha1;
function b64_hmac_sha1(key, data) {
    return binb2b64(core_hmac_sha1(key, data));
}
exports.b64_hmac_sha1 = b64_hmac_sha1;
function str_hmac_sha1(key, data) {
    return binb2str(core_hmac_sha1(key, data));
}
exports.str_hmac_sha1 = str_hmac_sha1;
/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function core_sha1(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (24 - len % 32);
    x[(((len + 64) >> 9) << 4) + 15] = len;
    var w = Array(80);
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    var e = -1009589776;
    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        var olde = e;
        for (var j = 0; j < 80; j++) {
            if (j < 16) {
                w[j] = x[i + j];
            }
            else {
                w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            }
            var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
            e = d;
            d = c;
            c = rol(b, 30);
            b = a;
            a = t;
        }
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
        e = safe_add(e, olde);
    }
    return Array(a, b, c, d, e);
}
/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d) {
    if (t < 20) {
        return (b & c) | (~b & d);
    }
    if (t < 40) {
        return b ^ c ^ d;
    }
    if (t < 60) {
        return (b & c) | (b & d) | (c & d);
    }
    return b ^ c ^ d;
}
/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t) {
    return t < 20
        ? 1518500249
        : t < 40 ? 1859775393 : t < 60 ? -1894007588 : -899497514;
}
/*
 * Calculate the HMAC-SHA1 of a key and some data
 */
function core_hmac_sha1(key, data) {
    var bkey = str2binb(key);
    if (bkey.length > 16) {
        bkey = core_sha1(bkey, key.length * chrsz);
    }
    var ipad = Array(16);
    var opad = Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5c5c5c5c;
    }
    var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
    return core_sha1(opad.concat(hash), 512 + 160);
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}
/*
 * Convert an 8-bit or 16-bit string to an array of big-endian words
 * In 8-bit function, characters >255 have their hi-byte silently ignored.
 */
function str2binb(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz) {
        bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i % 32);
    }
    return bin;
}
/*
 * Convert an array of big-endian words to a string
 */
function binb2str(bin) {
    var str = "";
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < bin.length * 32; i += chrsz) {
        str += String.fromCharCode((bin[i >> 5] >>> (32 - chrsz - i % 32)) & mask);
    }
    return str;
}
/*
 * Convert an array of big-endian words to a hex string.
 */
function binb2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
        str +=
            hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xf) +
                hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xf);
    }
    return str;
}
/*
 * Convert an array of big-endian words to a base-64 string
 */
function binb2b64(binarray) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i += 3) {
        var triplet = (((binarray[i >> 2] >> (8 * (3 - i % 4))) & 0xff) << 16) |
            (((binarray[(i + 1) >> 2] >> (8 * (3 - (i + 1) % 4))) & 0xff) << 8) |
            ((binarray[(i + 2) >> 2] >> (8 * (3 - (i + 2) % 4))) & 0xff);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > binarray.length * 32) {
                str += b64pad;
            }
            else {
                str += tab.charAt((triplet >> (6 * (3 - j))) & 0x3f);
            }
        }
    }
    return str;
}


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
Object.defineProperty(exports, "__esModule", { value: true });
var StringUtils = /** @class */ (function () {
    function StringUtils() {
    }
    StringUtils.leftPad = function (source, length, padString) {
        if (!source) {
            return source;
        }
        var pad = padString.repeat(length);
        return pad.substring(0, pad.length - source.length) + source;
    };
    StringUtils.uuid = function () {
        //// return uuid of form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
        var uuid = "";
        var ii;
        for (ii = 0; ii < 32; ii += 1) {
            switch (ii) {
                case 8:
                case 20:
                    uuid += "-";
                    uuid += ((Math.random() * 16) | 0).toString(16);
                    break;
                case 12:
                    uuid += "-";
                    uuid += "4";
                    break;
                case 16:
                    uuid += "-";
                    uuid += ((Math.random() * 4) | 8).toString(16);
                    break;
                default:
                    uuid += ((Math.random() * 16) | 0).toString(16);
            }
        }
        return uuid;
    };
    StringUtils.btoa = function (t) {
        if (Buffer.from) {
            return Buffer.from(t, "ascii").toString("base64");
        }
        return new Buffer(t, "ascii").toString("base64");
    };
    StringUtils.atob = function (t) {
        if (Buffer.from) {
            return Buffer.from(t, "base64").toString("ascii");
        }
        return new Buffer(t, "base64").toString("ascii");
    };
    return StringUtils;
}());
exports.StringUtils = StringUtils;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ })
/******/ ])});;