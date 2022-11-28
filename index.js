const {
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
} = require("./conversion");

const {
  addBigInt,
  subBigInt,
  mulBigInt,
  addModBigInt,
  subModBigInt,
  mulModBigInt,
  absBigInt,
  eGcdBigInt,
  gcdBigInt,
  lcmBigInt,
  maxBigInt,
  minBigInt,
  powModBigInt,
} = require("./function");

function isBinary(str) {
  let isBinary = false;
  var count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "0" || str[i] === "1") {
      count = count + 1;
    }
  }
  if (count === str.length) {
    isBinary = true;
  }
  return isBinary;
}

function isHex(_hex) {
  const hexMatch = _hex.match(/^(0x)([\da-fA-F]+)$/);
  if (hexMatch == null) return false;
  else return true;
}

const inferType = (value) => {
  if (value === undefined) throw new Error("Input value was undefined");
  if (value === "") throw new Error("Input was empty");
  if (Array.isArray(value)) {
    // ensure all elements of the array are of the same type:
    if (value.map(inferType).every((val, i, arr) => val === arr[0]))
      return "limbs";
    // infer arrays whcich contain elements of the same type as 'limbs'
  }
  if (typeof Object(value).valueOf() === "bigint") {
    return "bigint";
  }

  if (typeof value === "object") {
    // throw new Error(
    //   `Cannot construct a new GeneralNumber from an object
    //    (unless it's a 'BigInt' or 'limbs' array). Received ${value}.
    //     Try using the 'generalise()' function on this object instead.`
    // );
    if (value.__limbBitLength === 0n) {
      return "bigint";
    }
    return "limbs";
  }
  //if (typeof value === "boolean") return "boolean";
  if (typeof value === "string") {
    if (isBinary(value) === true) {
      return "binary";
    }
  }
  if (/^[0-9]+$/.test(value)) return "number"; // same effect as 'decimal' or 'number'
  if (isHex(value) === true) return "hex";
  //if (/^[\x00-\x7F]*$/.test(value) === true) return "ascii";
  return "utf8";
};

// const checkType = (value, purportedType) => {
//   let pass;
//   switch (purportedType) {
//     default:
//       pass = purportedType === inferType(value);
//       break;
//     case "integer":
//     case "decimal":
//     case "number":
//       pass = inferType(value) === "integer";
//       break;
//     case "hex":
//       pass = isHex(value);
//       break;
//     case "binary":
//       // allow binary values if user has explicitly passed `type = 'binary'` to the GeneralNumber constructor:
//       pass = /^[0-1]+$/.test(value);
//       break;
//     case "utf8":
//       pass = purportedType === inferType(value) || inferType(value) === "ascii";
//   }
//   if (!pass)
//     throw new Error(
//       `Type check failure. Input value ${value} is not of purported type ${purportedType}.`
//     );
// };

const convertToBigint = (value, type, limbBitLength) => {
  switch (type) {
    default:
      throw new Error(`invalid type "${type}"`);
    case "hex":
      return hexToBigint(value);
    case "binary":
      return binaryToBigint(value);
    case "decimal":
    case "integer":
    case "number":
      return numberTobigint(value);
    case "bigint":
      return value;
    case "utf8":
      return utf8ToBigint(value);
    case "limbs":
      if (limbBitLength === undefined) {
        throw new Error(`limbBitLength is not defined.`);
      } else return limbsToBigint(value, limbBitLength);
  }
};

class GeneralNumber {
  constructor(value, limbBitLength) {
    if (value === undefined) throw new Error("Input value is undefined");
    if (value === "") throw new Error("Input is empty");
    // if (type) {
    //   checkType(value, type);
    // } else {
    const type = inferType(value);

    // }
    this.__value = convertToBigint(value, type, limbBitLength);
    this.__limbBitLength = 0n;
  }
  get toBigint() {
    if (typeof this.__value === "object") {
      return Object.values(this.__value);
    } else return this.__value;
  }
  get toLimbs() {
    if (typeof this.__value === "object") {
      return Object.values(this.__value);
    } else return this.__value;
  }
  get binary() {
    const type = inferType(this.__value);
    this.__value = convertToBigint(this.__value, type, this.__limbBitLength);
    this.__limbBitLength = 0n;
    return bigintToBinary(this.__value);
  }

  get binaryArray() {
    const type = inferType(this.__value);
    this.__value = convertToBigint(this.__value, type, this.__limbBitLength);
    this.__limbBitLength = 0n;
    return bigintToBinaryArray(this.__value);
  }

  get decimal() {
    const type = inferType(this.__value);
    this.__value = convertToBigint(this.__value, type, this.__limbBitLength);
    this.__limbBitLength = 0n;
    return bigintToNumber(this.__value);
  }

  get integer() {
    const type = inferType(this.__value);
    this.__value = convertToBigint(this.__value, type, this.__limbBitLength);
    this.__limbBitLength = 0n;
    return bigintToNumber(this.__value);
  }

  get number() {
    const type = inferType(this.__value);
    this.__value = convertToBigint(this.__value, type, this.__limbBitLength);
    this.__limbBitLength = 0n;
    return bigintToNumber(this.__value);
  }

  get bigint() {
    const type = inferType(this.__value);
    this.__value = convertToBigint(this.__value, type, this.__limbBitLength);
    this.__limbBitLength = 0n;
    return this.__value;
  }

  get utf8() {
    const type = inferType(this.__value);
    this.__value = convertToBigint(this.__value, type, this.__limbBitLength);
    this.__limbBitLength = 0n;
    return bigintToUtf8(this.__value);
  }
  get ascii() {
    const type = inferType(this.__value);
    this.__value = convertToBigint(this.__value, type, this.__limbBitLength);
    this.__limbBitLength = 0n;
    return bigintToUtf8(this.__value);
  }

  get all() {
    return this;
  }

  limbs(_limbBitLength, _numberOfLimbs) {
    if (inferType(this.__value) === "limbs") {
      this.__value = limbsToBigint(this.__value, _limbBitLength);
      this.__limbBitLength = 0n;
    }
    var _numberOfLimbsBigint = 0n;
    if (!_limbBitLength) throw new Error("limbBitLength not specified");
    const _limbBitLengthBigint = new GeneralNumber(_limbBitLength).__value;
    if (_numberOfLimbs != undefined) {
      _numberOfLimbsBigint = new GeneralNumber(_numberOfLimbs).__value;
      const limbsString = bigintTolimbs(
        this.__value,
        _limbBitLengthBigint,
        _numberOfLimbsBigint
      );
      this.__value = limbsString;
      this.__limbBitLength = _limbBitLengthBigint;
      return this;
    } else {
      const limbsString = bigintTolimbs(this.__value, _limbBitLengthBigint);
      this.__value = limbsString;
      this.__limbBitLength = _limbBitLengthBigint;
      return this;
    }
  }

  hex(byteLength, butTruncateValueToByteLength = 0) {
    if (inferType(this.__value) === "limbs") {
      this.__value = limbsToBigint(this.__value, _limbBitLength);
    }
    var hexString = bigintToHex(this.__value);
    if (byteLength) {
      if (butTruncateValueToByteLength) {
        if (butTruncateValueToByteLength > byteLength)
          throw new Error(
            `butTruncateValueToByteLength (${butTruncateValueToByteLength}) > byteLength (${byteLength})`
          );
        hexString = parseHex(hexString, true, butTruncateValueToByteLength);
      }
      hexString = parseHex(hexString, true, byteLength);
    }
    this.__limbBitLength = 0n;
    return hexString;
  }

  field(__valueModulus, noOverflow = true) {
    if (inferType(this.__value) === "limbs") {
      this.__value = limbsToBigint(this.__value, this.__limbBitLength);
    }
    // this._modulus = __valueModulus;
    if (!__valueModulus) throw new Error("no field modulus specified");
    if (typeof _addend !== "object") {
      __valueModulus = new GeneralNumber(__valueModulus).__value;
    }
    const fieldResult = bigintToField(this.__value, __valueModulus, noOverflow);
    // this._field = fieldResult;
    this.__value = fieldResult;
    this.__limbBitLength = 0n;
    return this;
  }
  add(_addend) {
    if (typeof _addend !== "object") {
      _addend = new GeneralNumber(_addend);
    }
    const result = addBigInt(this.__value, _addend.__value);
    this.__value = result;
    return this;
  }
  sub(_minuend) {
    if (typeof _minuend !== "object") {
      _minuend = new GeneralNumber(_minuend);
    }
    const result = subBigInt(this.__value, _minuend.__value);
    this.__value = result;
    return this;
  }
  mul(_multiplicand) {
    if (typeof _multiplicand !== "object") {
      _multiplicand = new GeneralNumber(_multiplicand);
    }
    const result = mulBigInt(this.__value, _multiplicand.__value);
    this.__value = result;
    return this;
  }
  addMod(_addend, _modular) {
    if (typeof _addend !== "object") {
      _addend = new GeneralNumber(_addend);
    }
    if (typeof _modular !== "object") {
      _modular = new GeneralNumber(_modular);
    }
    const result = addModBigInt(
      this.__value,
      _addend.__value,
      _modular.__value
    );
    this.__value = result;
    return this;
  }
  subMod(_minuend, _modular) {
    if (typeof _minuend !== "object") {
      _minuend = new GeneralNumber(_minuend);
    }
    if (typeof _modular !== "object") {
      _modular = new GeneralNumber(_modular);
    }
    const result = subModBigInt(
      this.__value,
      _minuend.__value,
      _modular.__value
    );
    this.__value = result;
    return this;
  }
  mulMod(_multiplicand, _modular) {
    if (typeof _multiplicand !== "object") {
      _multiplicand = new GeneralNumber(_multiplicand);
    }
    if (typeof _modular !== "object") {
      _modular = new GeneralNumber(_modular);
    }
    const result = mulModBigInt(
      this.__value,
      _multiplicand.__value,
      _modular.__value
    );
    this.__value = result;
    return this;
  }
  powMod(_exponent, _modular) {
    if (typeof _exponent !== "object") {
      _exponent = new GeneralNumber(_exponent);
    }
    if (typeof _modular !== "object") {
      _modular = new GeneralNumber(_modular);
    }
    const _base = this.__value;
    const result = powModBigInt(_base, _exponent.__value, _modular.__value);
    this.__value = result;
    return this;
  }
  abs() {
    const result = absBigInt(this.__value);
    this.__value = result;
    return this;
  }
  egcd(_secondInput) {
    if (typeof _secondInput !== "object") {
      _secondInput = new GeneralNumber(_secondInput);
    }
    const result = eGcdBigInt(this.__value, _secondInput.__value);
    this.__value = result;
    return this;
  }
  gcd(_secondInput) {
    if (typeof _secondInput !== "object") {
      _secondInput = new GeneralNumber(_secondInput);
    }
    const result = gcdBigInt(this.__value, _secondInput.__value);
    this.__value = result;
    return this;
  }
  lcm(_secondInput) {
    if (typeof _secondInput !== "object") {
      _secondInput = new GeneralNumber(_secondInput);
    }
    const result = lcmBigInt(this.__value, _secondInput.__value);
    this.__value = result;
    return this;
  }
  max(_secondInput) {
    if (typeof _secondInput !== "object") {
      _secondInput = new GeneralNumber(_secondInput);
    }
    const result = maxBigInt(this.__value, _secondInput.__value);
    this.__value = result;
    return this;
  }
  min(_secondInput) {
    if (typeof _secondInput !== "object") {
      _secondInput = new GeneralNumber(_secondInput);
    }
    const result = minBigInt(this.__value, _secondInput.__value);
    this.__value = result;
    return this;
  }
}

const attachPropertyAll = (thing) => {
  try {
    Object.defineProperty(thing, "all", {
      get() {
        return new GeneralObject(thing);
      },
      configurable: true,
    });
  } catch (err) {
    logger.error(`Error adding property '.all' to this:`);
    logger.error(thing);
    throw new Error(err);
  }
};

const generalise = (thing, limbBitLength) => {
  if (typeof thing === "undefined") {
    return thing;
  }
  if (thing instanceof GeneralNumber) {
    return thing;
  }
  if (typeof Object(thing).valueOf() === "bigint") {
    // a bigint is not to be confused with a regular object, and so this check must come first
    return new GN(thing);
  }
  if (typeof thing === "object") {
    if (limbBitLength != undefined) {
      return new GN(thing, limbBitLength);
    } else {
      const result = Array.isArray(thing) ? [] : {};
      for (const [key, value] of Object.entries(thing)) {
        result[key] = generalise(value);
      }
      attachPropertyAll(result);
      return result;
    }
  }
  return new GN(thing);
};

const convert = (thing, type, args) => {
  if (typeof thing !== "object")
    throw new Error(
      `Attempting to 'convert' something other than an object/array: ${thing}`
    );

  const result = Array.isArray(thing) ? [] : {};

  for (const [key, value] of Object.entries(thing)) {
    if (value instanceof GeneralNumber) {
      // each value is a GeneralNumber
      result[key] =
        typeof value[type] === "function" ? value[type](...args) : value[type];
    } else result[key] = convert(value, type, args);
  }

  return result;
};

class GeneralObject {
  constructor(object) {
    this._object = generalise(object);
  }

  get object() {
    return this._object;
  }

  get binary() {
    return convert(this._object, "binary");
  }
  get binaryArray() {
    return bigintToBinaryArray(this._object, "binaryArray");
  }

  get decimal() {
    return convert(this._object, "integer");
  }

  get integer() {
    return convert(this._object, "decimal");
  }

  get number() {
    return convert(this._object, "number");
  }

  get bigInt() {
    return convert(this._object, "bigInt");
  }

  get utf8() {
    return convert(this._object, "utf8");
  }

  limbs(limbBitLength, numberOfLimbs) {
    return convert(this._object, "limbs", [
      limbBitLength, //
      numberOfLimbs,
    ]);
  }

  hex(byteLength) {
    return convert(this._object, "hex", [byteLength]);
  }

  field(modulus) {
    return convert(this._object, "field", [modulus]);
  }
}

const GN = GeneralNumber;
const GO = GeneralObject;
const generalize = generalise; // for Americans

module.exports = {
  GeneralNumber,
  GN,
  generalise,
  generalize,
  GeneralObject,
  GO,
  convertToBigint,
};
