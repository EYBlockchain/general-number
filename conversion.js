BigInt.prototype.mod = function (_m) {
  "use strict";
  return ((this % _m) + _m) % _m;
};
/**
 *
 * A helper function to parse a hexdecimal string
 * to a new hexdecimal string with or without 0x prefix
 * and with predefined byte length.
 * This helper function is used by hex-bigint conversion and bigint-utf8 conversion
 * @param {string} _hex - the hex string to be parsed
 * @param {boolean} prefix0x - true for output hexstring with '0x'
 * @param {number} byteLength - bytelength of output hexstring,
 * if 2 * _hex.length < byteLength, pad 0 before the hexstring.
 *
 * @returns {string} _parsedHex which starts with 0x, if prefix0x === true
 * string.length is 2 * byteLength + 2 * prefix0x
 * or _hex.length + 2 * prefix0x
 *
 * @throws Error if the input string '_hex' is not a valid hex string with hexdecimal numbers.
 */
function parseHex(_hex, prefix0x, byteLength) {
  const hexMatch = _hex.match(/^(0x)?([\da-fA-F]+)$/);
  if (hexMatch == null) {
    throw new Error("Input string of parseHex must be a hexadecimal string.");
  }
  let hex = hexMatch[2];
  if (byteLength * 2 > hex.length) {
    // if (byteLength < hex.length / 2) {
    //   throw new Error(
    //     "Bytelength " +
    //       byteLength +
    //       " < input hex byte length " +
    //       Math.ceil(hex.length / 2)
    //   );
    // }
    hex = hex.padStart(byteLength * 2, "0");
  } else {
    hex = hex.substring(hex.length - byteLength * 2);
  }
  return prefix0x ? "0x" + hex : hex;
}
/** 
 *A function to convert a BigInt number to a hexdecimal string with prefix '0x'.
  @param {BigInt} _bigInt - the BigInt number (eg. 19201594n) to be converted to hex string.
  
  @return the hex string of _bigInt with 0x prefix (eg. '0x124fe3a').

  @throws Error if the BigInt number '_bigInt' is negative.

*/
const bigintToHex = (_bigInt) => {
  if (_bigInt < 0)
    throw new Error("Input of bigintToHex must be prositive BigInt number.");
  return parseHex(_bigInt.toString(16), true);
};

/** 
 *A function to convert a hex string with prefix '0x' to a BigInt number.
  @param {String} _hexStr - the hex string with or without 0x prefix 
  (eg. '0x124fe3a' or '124fe3a').
  @return BigInt of _hexStr (eg. 19201594n).

  @throws Error if the  hex string '_hexStr' is not a hex decimal string.

*/
function hexToBigint(_hexStr) {
  const hexMatch = _hexStr.match(/^(0x)([\da-fA-F]+)$/);
  if (hexMatch == null) {
    throw new Error("Input of hexToBigint must be a hex decimal string.");
  }
  let hex = hexMatch[2];
  return BigInt("0x" + hex);
}

/** 
 *A function to convert a BigInt number to a binary string.
  @param {BigInt} _bigInt - the BigInt number (eg. 10000n) to be converted to binary string.
  @return {String} binary string of _bigInt (eg. "10011100010000").
*/
const bigintToBinary = (_bigInt) => {
  return BigInt(_bigInt).toString(2);
};

/** 
 *A function to convert a BigInt number to a binary string.
  @param {BigInt} _bigInt - the BigInt number (eg. 10000n) to be converted to binary string.
  @return {Array} binary array of _bigInt (eg. [1,0,0,1,1,1,0,0,0,1,0,0,0,0]).
*/
const bigintToBinaryArray = (_bigInt) => {
  const binaryString = BigInt(_bigInt).toString(2);
  const binaryArray = binaryString.split("").map(Number);
  return binaryArray;
};

/** 
 *A function to convert a binary string to a BigInt number.
  @param {binary} _binary - binary string (eg. "10111").
  @return BigInt number of binary string _binary (eg. 10000n).
  @throws Error if the binary string '_binary' is not a binary string.

*/
const binaryToBigint = (_binary) => {
  let isBinary = false;
  var count = 0;
  for (let i = 0; i < _binary.length; i++) {
    if (_binary[i] === "0" || _binary[i] === "1") {
      count = count + 1;
    }
  }
  if (count === _binary.length) {
    isBinary = true;
  }
  if (isBinary === true) return BigInt("0b" + _binary);
  else throw new Error("Input of binaryToBigint must be a binary string.");
};

/** 
 * A function to convert a BigInt number to a number.
 * As the value of number is between Number.MIN_SAFE_INTEGER and 
 * Number.MAX_SAFE_INTEGER, therefore _bigInt should be in this range
  @param {BigInt} _bigInt - the BigInt number (eg. 10000n) to be converted to number.
  @return {number} number of _bigInt (eg. 10000).
  @throws Error if the BigInt number is not in [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER].
*/
const bigintToNumber = (_bigInt) => {
  if (
    _bigInt <= Number.MIN_SAFE_INTEGER ||
    _bigInt >= Number.MAX_SAFE_INTEGER
  ) {
    throw new Error(
      `Input of bigintToNumber must be between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER.`
    );
  }
  return Number(_bigInt);
};

/** 
 * A function to convert a number to a BigInt number.
  @param {number} _number - the number (eg. 10000).
  @return {BigInt} BigInt of _number (eg. 10000n).
*/
const numberTobigint = (_number) => {
  return BigInt(_number);
};

/** 
 * A helper function used in BigInt-Limbs converion
 * to calculate minium number of limbs in bigintToLimbs. 
  @param {BigInt} _bigIntBase - BigInt Base (eg. 2n).
  @param {BigInt} _bigIntNumber - BigInt number (eg. 4n).
  @return log_(_bigIntBase){_bigIntNumber} (eg. 2n).
*/

function getBaseLogBigInt(_bigIntBase, _bigIntNumber) {
  const tempX = _bigIntBase.toString(2).length - 1;
  const bigIntX = _bigIntBase <= 0n ? 0n : BigInt(tempX);
  const tempY = _bigIntNumber.toString(2).length - 1;
  const bigIntY = _bigIntNumber <= 0n ? 0n : BigInt(tempY);
  return bigIntY / bigIntX;
}

// const binToLimbs = (bitStr, limbBitLength) => {
//   let a = [];
//   const len = bitStr.length;
//   if (len <= limbBitLength) {
//     return [bitStr.toString().padStart(limbBitLength, 0)];
//   }
//   const nStr = bitStr.slice(-limbBitLength); // the rightmost limbBitLength bits
//   const remainderStr = bitStr.slice(0, len - limbBitLength); // the remaining rightmost bits
//   a = [...binToLimbs(remainderStr, limbBitLength), nStr, ...a];
//   return a;
// };

/** 
 * A function to convert a BigInt number to limbs,
 * with predefined bit length of limbs and number of limbs. 

  @param {BigInt} _bigint - the BigInt value  (eg. 23n).
  @param {BigInt} _limbBitLength - BigInt _limbBitLength of _bigint limbs  (eg. 2n).
  @param {object} _numberOfLimbs - BigInt _numberOfLimbs of _bigint limbs (eg. 6n).

  @return limbs of _bigint, each limbBit can store at most 2**_limbBitLength,
  if _numberOfLimbs is bigger than the minNumberOfLimbs, extra "0n" are padded 
  before limbs.

  @throws Error if the number of limbs given is less than the minNumberOfLimbs.
*/
const bigintTolimbs = (_bigint, limbBitLength, _numberOfLimbs) => {
  const minNumberOfLimbs = getBaseLogBigInt(2n ** limbBitLength, _bigint) + 1n;
  let limbs = [];
  var reminder = 0n;
  var quotient = 0n;
  let temp = _bigint;

  for (let i = 0; i <= bigintToNumber(minNumberOfLimbs) - 1; i += 1) {
    reminder = temp % BigInt(2 ** bigintToNumber(limbBitLength));
    quotient = temp / BigInt(2 ** bigintToNumber(limbBitLength));
    temp = quotient;
    limbs[i] = reminder;
  }
  limbs = limbs.reverse();
  if (_numberOfLimbs < minNumberOfLimbs) {
    throw new Error(
      "NumberOfLimbs should be at least " +
        minNumberOfLimbs +
        ", otherwise extra limbs will be removed."
    );
  } else if (minNumberOfLimbs < _numberOfLimbs) {
    const padding = _numberOfLimbs - BigInt(limbs.length);
    for (let i = 0; i < padding; i += 1)
      limbs.unshift(BigInt("0".repeat(bigintToNumber(limbBitLength))));
    return limbs;
  } else return limbs; //.reverse();
};

/** 
 * A function to convert limbs to a BigInt number,
  @param {object} _limbs - the limbs  (eg. [ 0n, 0n, 0n, 1n, 1n, 3n ]).
  @param {BigInt} _limbBitLength - BigInt _limbBitLength of _bigint limbs  (eg. 2n).

  @return BigInt of limbs, each limbBit stores at most 2**_limbBitLength
*/
const limbsToBigint = (_limbs, _limbBitLength) => {
  const number = _limbs
    .reverse()
    .reduce(
      (acc, cur, idx) =>
        acc +
        BigInt(cur) * BigInt(2n ** (BigInt(_limbBitLength) * BigInt(idx))),
      BigInt(0)
    );
  return numberTobigint(number);
};

/** 
 * A function to convert a Bigint number to an element of a Finite Field GF(fieldSize)
  @param {BigInt} _bigint - the positive BigInt _bigint
  (eg.492997048111900109466724n).
  @param {BigInt} _bigintModulus - the modulus of the finite field.
  @return {BigInt} the Field Value

  @throw error if noOverflow && _bigint > _bigintModulus
*/

const bigintToField = (_bigint, _bigintModulus, noOverflow) => {
  if (noOverflow && _bigint > _bigintModulus) {
    throw new Error("field modulus overflow.");
  }
  const _bigintField = _bigint.mod(_bigintModulus);
  return _bigintField < 0n ? _bigintField + _bigintModulus : _bigintField;
};

/** 
 * A function to convert a Bigint number to utf8 string
  @param {BigInt} _bigint - the positive BigInt _bigint
  (eg.3430008n).
  @return {String} utf8 string of _bigint (eg.4Vx).

  @throw error if _bigint < 0n
*/

const bigintToUtf8 = (_bigint) => {
  if (_bigint < 0) throw new Error("Input of bigintToUtf8 should be positive.");
  return bufferToUtf8(hexToBuf(_bigint.toString(16)));
};
/**
 *
 * A helper function to convert hex to buffer
 * which is used by bigintToUtf8
 * @param {string} _hex - the hex string to be converted
 * @returns {Buffer}
 */
function hexToBuf(_hex) {
  let hex = parseHex(_hex);
  hex = parseHex(_hex, false, Math.ceil(hex.length / 2));
  return Buffer.from(hex, "hex");
}
/**
 *
 * A helper function to convert buffer to Utf8
 * which is used by bigintToUtf8
 * @param {Buffer} _hex - the hex string to be converted
 * @returns {string}
 */
function bufferToUtf8(_buffer) {
  return Buffer.from(_buffer).toString("utf8");
}

/** 
 * A function to convert a utf8 string to Bigint number
  @param {String} _utf8.
  @return {Bigint}
*/
function utf8ToBigint(_utf8) {
  return hexToBigint(bufToHex(utf8ToBuf(_utf8)));
}

/**
 *
 * A helper function to convert Utf8 to buffer
 * which is used by utf8ToBigint
 * @param {String} _utf8 - the utf8 string to be converted
 * @returns {Buffer}
 */
function utf8ToBuf(_utf8) {
  return Buffer.from(new TextEncoder().encode(_utf8).buffer);
}

/**
 *
 * A helper function to convert buffer to hex string
 * which is used by utf8ToBigint
 * @param {Buffer} _buffer
 * @returns {String}
 */
function bufToHex(buf) {
  let s = "";
  const h = "0123456789abcdef";
  buf = new Uint8Array(buf.buffer);
  buf.forEach((v) => {
    s += h[v >> 4] + h[v & 15];
  });
  return parseHex(s, true);
}

module.exports = {
  parseHex,
  bigintToHex,
  hexToBigint,
  bigintToBinary,
  bigintToBinaryArray,
  binaryToBigint,
  bigintToNumber,
  numberTobigint,
  bigintTolimbs,
  limbsToBigint,
  bigintToField,
  bigintToUtf8,
  utf8ToBigint,
};
