/**
 * A helper function for BigInt mod computation.
  @param {BigInt} this - the BigInt base (eg. 20n).
  @param {BigInt} _m - the BigInt modular (eg. BigInt(2)).
  @return this mod _m (eg. 20n.mod(BigInt(2))=BigInt(0)).
*/
// eslint-disable-next-line no-extend-native, func-names
BigInt.prototype.mod = function (_m) {
  return ((this % _m) + _m) % _m;
};

/** 
  @param {object} _bigints - the BigInt array object
  (eg. [ BigInt(0), BigInt(0), BigInt(0), BigInt(1), BigInt(1), 3n ] or [BigInt(1)]).
  @return BigInt sum of each element in _bigint
  (eg. [ 5n ] or [BigInt(1)]).
*/
function addBigInt(_bigintA, _bigintB) {
  return _bigintA + _bigintB;
}
/** 
  @param {BigInt} _bigintA - the BigInt _bigintA
  (eg. [BigInt(1)]).
  @param {BigInt} _bigintB - the BigInt _bigintB
  (eg. [BigInt(2)]).
  @return BigInt _bigintA - _bigintB
  (eg. [ -BigInt(1) ]).
*/
function subBigInt(_bigintA, _bigintB) {
  return _bigintA - _bigintB;
}
/** 
  @param {BigInt} _bigintA - the BigInt _bigintA
  (eg. [BigInt(1)]).
  @param {BigInt} _bigintB - the BigInt _bigintB
  (eg. [BigInt(2)]).
  @return BigInt _bigintA * _bigintB
  (eg. [ BigInt(1) ]).
*/
function mulBigInt(_bigintA, _bigintB) {
  return _bigintA * _bigintB;
}

/** 
  @param {object} _bigints - the BigInt array object
  (eg. [ BigInt(0), BigInt(0), BigInt(0), BigInt(1), BigInt(1), 3n ] or [BigInt(1)]).
  @param {BigInt} _m - the BigInt modular (eg. BigInt(2)).
  @return BigInt sum of each element mod _m in _bigint
  (eg. [ BigInt(1) ]).
*/
// function addMod(_bigints, _m) {
//   return _bigints.reduce((e, acc) => (e + acc).mod(_m), BigInt(0));
// }
function addModBigInt(_bigintA, _bigintB, _m) {
  return (_bigintA + _bigintB).mod(_m);
}

/** 
  @param {BigInt} _bigintA - the BigInt _bigintA
  (eg. [BigInt(1)]).
  @param {BigInt} _bigintB - the BigInt _bigintB
  (eg. [BigInt(2)]).
  @param {BigInt} _m - the BigInt modular (eg. BigInt(2)).
  @return BigInt (_bigintA - _bigintB) mod _m 
  (eg. [ BigInt(1) ]).
*/

function subModBigInt(_bigintA, _bigintB, _m) {
  return (_bigintA - _bigintB).mod(_m);
}

/** 
  @param {BigInt} _bigintA - the BigInt _bigintA
  (eg. [BigInt(1)]).
  @param {BigInt} _bigintB - the BigInt _bigintB
  (eg. [BigInt(2)]).
  @param {BigInt} _m - the BigInt modular (eg. BigInt(2)).
  @return BigInt (_bigintA * _bigintB) mod _m 
  (eg. [ BigInt(1) ]).
*/

function mulModBigInt(_bigintA, _bigintB, _m) {
  return (_bigintA * _bigintB).mod(_m);
}
/** 
  @param {BigInt} _bigint - the BigInt _bigint (eg.-11n).
  @return abs of _bigint (eg.11n).
*/
function absBigInt(_bigint) {
  return _bigint >= BigInt(0) ? _bigint : -_bigint;
}
/** 
 * extended Euclidean algorithm 
 * given  two  numbers a, b
 * compute (g,x,y) such that ax+by=gcd(a,b)=g.
  @param {BigInt} _bigintA - the BigInt _bigintA 
  (eg.23894798501898n).
  @param {BigInt} _bigintB - the BigInt _bigintB 
  (eg.23948178468116n).
  @return a BigInt triple { g: BigInt(2), x: 2437250447493n, y: -2431817869532n }, 
  such that _bigintA * x + _bigintB * y = g = gcd(_bigintA, _bigintB).
*/
function eGcdBigInt(_bigintA, _bigintB) {
  let _bigintAAbs = absBigInt(_bigintA);
  let _bigintBAbs = absBigInt(_bigintB);

  let x = BigInt(0);
  let y = BigInt(1);
  let u = BigInt(1);
  let v = BigInt(0);

  while (_bigintAAbs !== BigInt(0)) {
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
  return {
    g: _bigintBAbs,
    x,
    y,
  };
}

/** 
  @param {BigInt} _bigint - the BigInt _bigint (eg. 3n).
  @param {BigInt} _m - the BigInt modular (eg. 25n).
  @return {BigInt}- BigInt Modular inverse
*/
function modInv(a, n) {
  const egcd = eGcdBigInt(a.mod(n), n);
  if (egcd.g !== BigInt(1)) {
    throw new RangeError(`${a.toString()} does not have inverse modulo ${n.toString()}`); // modular inverse does not exist
  } else {
    return egcd.x.mod(n);
  }
}

/** 
  @param {BigInt} _base - the BigInt _base (eg. 3n).
  @param {BigInt} _exponent - the BigInt modular (eg. 3n).
  @param {BigInt} _m - the BigInt modular (eg. 25n).
  @return {BigInt}- BigInt _powMod = _base ** _exponent mod _m (eg. BigInt(2)).
*/
function powModBigInt(_base, _exponent, _m) {
  if (_m <= BigInt(0)) {
    throw new Error('Error: Modular of powMod must be positive');
  } else if (_m === BigInt(1)) {
    return BigInt(0);
  }
  let _powMod = BigInt(1);
  let b = _base.mod(_m);
  if (_exponent < 0) {
    return modInv(powModBigInt(_base, absBigInt(_exponent), _m), _m);
  }
  while (_exponent > 0) {
    if (_exponent.mod(BigInt(2)) === BigInt(1)) {
      _powMod = (_powMod * b).mod(_m);
    }
    // eslint-disable-next-line no-param-reassign
    _exponent /= BigInt(2);
    b = (b ** BigInt(2)).mod(_m);
  }
  return _powMod;
}

/** 
 * Euclidean algorithm
 Greatest common divisor of two integers 
 based on the iterative binary algorithm.
  @param {BigInt} _bigintA - the BigInt _bigintA 
  (eg.23894798501898n).
  @param {BigInt} _bigintB - the BigInt _bigintB
  @return a BigInt Greatest common divisor of _bigintA and _bigintB. 
  (eg.BigInt(2)).
*/
function gcdBigInt(_bigintA, _bigintB) {
  let aAbs = absBigInt(_bigintA);
  let bAbs = absBigInt(_bigintB);

  if (aAbs === BigInt(0)) {
    return bAbs;
  }
  if (bAbs === BigInt(0)) {
    return aAbs;
  }

  let shift = BigInt(0);
  // eslint-disable-next-line no-bitwise
  while (((aAbs | bAbs) & BigInt(1)) === BigInt(0)) {
    // eslint-disable-next-line no-bitwise
    aAbs >>= BigInt(1);
    // eslint-disable-next-line no-bitwise
    bAbs >>= BigInt(1);
    shift++;
  }
  // eslint-disable-next-line no-bitwise
  while ((aAbs & BigInt(1)) === BigInt(0)) aAbs >>= BigInt(1);
  do {
    // eslint-disable-next-line no-bitwise
    while ((bAbs & BigInt(1)) === BigInt(0)) bAbs >>= BigInt(1);
    if (aAbs > bAbs) {
      const x = aAbs;
      aAbs = bAbs;
      bAbs = x;
    }
    bAbs -= aAbs;
  } while (bAbs !== BigInt(0));
  // eslint-disable-next-line no-bitwise
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
  if (_bigintA === BigInt(0) && _bigintB === BigInt(0)) {
    return BigInt(0);
  }
  return BigInt(absBigInt((_bigintA / gcdBigInt(_bigintA, _bigintB)) * _bigintB));
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
