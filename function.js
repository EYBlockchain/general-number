/**
 * A helper function for BigInt mod computation.
  @param {BigInt} this - the BigInt base (eg. 20n).
  @param {BigInt} _m - the BigInt modular (eg. 2n).
  @return this mod _m (eg. 20n.mod(2n)=0n).
*/
BigInt.prototype.mod = function (_m) {
  'use strict';
  return ((this % _m) + _m) % _m;
};

/** 
  @param {object} _bigints - the BigInt array object
  (eg. [ 0n, 0n, 0n, 1n, 1n, 3n ] or [1n]).
  @return BigInt sum of each element in _bigint
  (eg. [ 5n ] or [1n]).
*/
function addBigInt(_bigintA, _bigintB) {
  return _bigintA + _bigintB;
}
/** 
  @param {BigInt} _bigintA - the BigInt _bigintA
  (eg. [1n]).
  @param {BigInt} _bigintB - the BigInt _bigintB
  (eg. [2n]).
  @return BigInt _bigintA - _bigintB
  (eg. [ -1n ]).
*/
function subBigInt(_bigintA, _bigintB) {
  return _bigintA - _bigintB;
}
/** 
  @param {BigInt} _bigintA - the BigInt _bigintA
  (eg. [1n]).
  @param {BigInt} _bigintB - the BigInt _bigintB
  (eg. [2n]).
  @return BigInt _bigintA * _bigintB
  (eg. [ 1n ]).
*/
function mulBigInt(_bigintA, _bigintB) {
  return _bigintA * _bigintB;
}

/** 
  @param {object} _bigints - the BigInt array object
  (eg. [ 0n, 0n, 0n, 1n, 1n, 3n ] or [1n]).
  @param {BigInt} _m - the BigInt modular (eg. 2n).
  @return BigInt sum of each element mod _m in _bigint
  (eg. [ 1n ]).
*/
// function addMod(_bigints, _m) {
//   return _bigints.reduce((e, acc) => (e + acc).mod(_m), BigInt(0));
// }
function addModBigInt(_bigintA, _bigintB, _m) {
  return (_bigintA + _bigintB).mod(_m);
}

/** 
  @param {BigInt} _bigintA - the BigInt _bigintA
  (eg. [1n]).
  @param {BigInt} _bigintB - the BigInt _bigintB
  (eg. [2n]).
  @param {BigInt} _m - the BigInt modular (eg. 2n).
  @return BigInt (_bigintA - _bigintB) mod _m 
  (eg. [ 1n ]).
*/

function subModBigInt(_bigintA, _bigintB, _m) {
  return (_bigintA - _bigintB).mod(_m);
}

/** 
  @param {BigInt} _bigintA - the BigInt _bigintA
  (eg. [1n]).
  @param {BigInt} _bigintB - the BigInt _bigintB
  (eg. [2n]).
  @param {BigInt} _m - the BigInt modular (eg. 2n).
  @return BigInt (_bigintA * _bigintB) mod _m 
  (eg. [ 1n ]).
*/

function mulModBigInt(_bigintA, _bigintB, _m) {
  return (_bigintA * _bigintB).mod(_m);
}

/** 
  @param {BigInt} _base - the BigInt _base (eg. 3n).
  @param {BigInt} _exponent - the BigInt modular (eg. 3n).
  @param {BigInt} _m - the BigInt modular (eg. 25n).
  @return {BigInt}- BigInt _powMod = _base ** _exponent mod _m (eg. 2n).
*/
function powModBigInt(_base, _exponent, _m) {
  if (_m <= 0n) {
    throw new Error('Error: Modular of powMod must be positive');
  } else if (_m === 1n) {
    return 0n;
  }
  let _powMod = 1n;
  let b = _base.mod(_m);
  if (_exponent < 0) {
    return modInv(powModBigInt(_base, absBigInt(_exponent), _m), _m);
  }
  while (_exponent > 0) {
    if (_exponent.mod(2n) === 1n) {
      _powMod = (_powMod * b).mod(_m);
    }
    _exponent = _exponent / 2n;
    b = (b ** 2n).mod(_m);
  }
  return _powMod;
}

/** 
  @param {BigInt} _bigint - the BigInt _bigint (eg. 3n).
  @param {BigInt} _m - the BigInt modular (eg. 25n).
  @return {BigInt}- BigInt Modular inverse
*/
function modInv(a, n) {
  const egcd = eGcdBigInt(a.mod(n), n);
  if (egcd.g !== 1n) {
    throw new RangeError(`${a.toString()} does not have inverse modulo ${n.toString()}`); // modular inverse does not exist
  } else {
    return egcd.x.mod(n);
  }
}

/** 
  @param {BigInt} _bigint - the BigInt _bigint (eg.-11n).
  @return abs of _bigint (eg.11n).
*/
function absBigInt(_bigint) {
  return _bigint >= 0n ? _bigint : -_bigint;
}

/** 
 * extended Euclidean algorithm 
 * given  two  numbers a, b
 * compute (g,x,y) such that ax+by=gcd(a,b)=g.
  @param {BigInt} _bigintA - the BigInt _bigintA 
  (eg.23894798501898n).
  @param {BigInt} _bigintB - the BigInt _bigintB 
  (eg.23948178468116n).
  @return a BigInt triple { g: 2n, x: 2437250447493n, y: -2431817869532n }, 
  such that _bigintA * x + _bigintB * y = g = gcd(_bigintA, _bigintB).
*/
function eGcdBigInt(_bigintA, _bigintB) {
  let _bigintAAbs = absBigInt(_bigintA);
  let _bigintBAbs = absBigInt(_bigintB);

  let x = 0n;
  let y = 1n;
  let u = 1n;
  let v = 0n;

  while (_bigintAAbs !== 0n) {
    const q = _bigintBAbs / _bigintAAbs;
    const r = BigInt(_bigintBAbs % _bigintAAbs);
    const m = x - u * q;
    const n = y - v * q;
    _bigintBAbs = _bigintAAbs;
    _bigintAAbs = r;
    x = u;
    y = v;
    u = m;
    v = n;
  }
  var results = [];
  //results = [_bigintBAbs, x, y];
  return {
    g: _bigintBAbs,
    x: x,
    y: y,
  };
}

/** 
 * Euclidean algorithm
 Greatest common divisor of two integers 
 based on the iterative binary algorithm.
  @param {BigInt} _bigintA - the BigInt _bigintA 
  (eg.23894798501898n).
  @param {BigInt} _bigintB - the BigInt _bigintB
  @return a BigInt Greatest common divisor of _bigintA and _bigintB. 
  (eg.2n).
*/
function gcdBigInt(_bigintA, _bigintB) {
  let aAbs = absBigInt(_bigintA);
  let bAbs = absBigInt(_bigintB);

  if (aAbs === 0n) {
    return bAbs;
  } else if (bAbs === 0n) {
    return aAbs;
  }

  let shift = 0n;
  while (((aAbs | bAbs) & 1n) === 0n) {
    aAbs >>= 1n;
    bAbs >>= 1n;
    shift++;
  }
  while ((aAbs & 1n) === 0n) aAbs >>= 1n;
  do {
    while ((bAbs & 1n) === 0n) bAbs >>= 1n;
    if (aAbs > bAbs) {
      const x = aAbs;
      aAbs = bAbs;
      bAbs = x;
    }
    bAbs -= aAbs;
  } while (bAbs !== 0n);
  return aAbs << shift;
}
/** 
 * least common multiple of two Bigints
  @param {BigInt} _bigintA - the BigInt _bigintA 
  (eg.492997048111900109466724n).
  @param {BigInt} _bigintB - the BigInt _bigintB
  @return abs(_bigintA*_bigintB)/gcd(_bigintA,_bigintB)
*/
function lcmBigInt(_bigintA, _bigintB) {
  if (_bigintA === 0n && _bigintB === 0n) {
    return BigInt(0);
  } else {
    return BigInt(absBigInt((_bigintA / gcdBigInt(_bigintA, _bigintB)) * _bigintB));
  }
}

/** 
  @param {BigInt} _bigintA - the positive BigInt _bigintA 
  (eg.492997048111900109466724n).
  @param {BigInt} _bigintB - the positive BigInt _bigintB
  @return the max value of {_bigintA, _bigintB}
*/
function maxBigInt(_bigintA, _bigintB) {
  return _bigintA >= _bigintB ? _bigintA : _bigintB;
}

/** 
  @param {BigInt} _bigintA - the positive BigInt _bigintA 
  (eg.492997048111900109466724n).
  @param {BigInt} _bigintB - the positive BigInt _bigintB
  @return the min value of {_bigintA, _bigintB}
*/
function minBigInt(_bigintA, _bigintB) {
  return _bigintA >= _bigintB ? _bigintB : _bigintA;
}

module.exports = {
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
};
