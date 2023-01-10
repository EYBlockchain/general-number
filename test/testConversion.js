/* eslint-disable func-names */
// /**
//  * To test conversion in conversion.js
//  */
const chai = require('chai');
const con = require('../conversion');

describe('bigintToHex', function () {
  const inputs = [
    {
      _bigint: BigInt('2124979127492149712904023748231859237523'),
      _hex: '0x63ea817e16d6ab0d485b57a2eb7237293',
    },
    {
      _bigint: BigInt('-2124979127492149712904023748231859237523'),
    },
  ];

  for (const input of inputs) {
    if (input._bigint >= 0) {
      // eslint-disable-next-line no-loop-func
      describe(`bigintToHex(${input._bigint})`, function () {
        it(`should return ${input._hex}`, function () {
          const ret = con.bigintToHex(input._bigint);
          chai.expect(ret).to.equal(input._hex);
        });
      });
    } else {
      it('should throw new Error that the input BigInt is negative', function () {
        chai.expect(() => con.bigintToHex(input._bigint)).to.throw();
      });
    }
  }
});

describe('hexToBigint', function () {
  const inputs = [
    {
      _bigint: BigInt('2124979127492149712904023748231859237523'),
      _hex: '0x63ea817e16d6ab0d485b57a2eb7237293',
    },
    {
      _hex: 'aaa',
    },
  ];

  for (const input of inputs) {
    const hexMatch = input._hex.match(/^(0x)([\da-fA-F]+)$/);
    if (hexMatch == null) {
      it('should throw new Error that Input of hexToBigint must be a hex decimal string.', function () {
        chai.expect(() => con.hexToBigint(input._hex)).to.throw();
      });
    } else {
      describe(`hexToBigint(${input._hex})`, function () {
        it(`should return ${input._bigint}`, function () {
          const ret = con.hexToBigint(input._hex);
          chai.expect(ret).to.equal(input._bigint);
        });
      });
    }
  }
});

describe('bigintToBinary', function () {
  const inputs = [
    {
      _bigint: BigInt(10000),
      _binary: '10011100010000',
    },
    {
      _bigint: BigInt('2124979127492149712904023748231859237523'),
      _binary:
        '11000111110101010000001011111100001011011010110101010110000110101001000010110110101011110100010111010110111001000110111001010010011',
    },
  ];

  for (const input of inputs) {
    describe(`bigintToBinary(${input._bigint})`, function () {
      it(`should return ${input._binary}`, function () {
        const ret = con.bigintToBinary(input._bigint);
        chai.expect(ret).to.equal(input._binary);
      });
    });
  }
});

describe('bigintToBinaryArray', function () {
  const inputs = [
    {
      _bigint: BigInt(10000),
      _binaryArray: [1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    },
  ];

  for (const input of inputs) {
    describe(`bigintToBinaryArray(${input._bigint})`, function () {
      it(`should return ${input._binaryArray}`, function () {
        const ret = con.bigintToBinaryArray(input._bigint);
        chai.expect(ret).to.eql(input._binaryArray);
      });
    });
  }
});

describe('binaryToBigint', function () {
  const inputs = [
    {
      _bigint: BigInt(10000),
      _binary: '10011100010000',
    },
    {
      _bigint: BigInt('2124979127492149712904023748231859237523'),
      _binary:
        '11000111110101010000001011111100001011011010110101010110000110101001000010110110101011110100010111010110111001000110111001010010011',
    },
    {
      _binary: 'aa',
    },
  ];

  for (const input of inputs) {
    let isBinary = false;
    for (let i = 0; i < input._binary.length; i++) {
      if (input._binary[i] === '0' || input._binary[i] === '1') {
        isBinary = true;
      } else {
        isBinary = false;
      }
    }
    if (isBinary === false) {
      it('should throw new Error that Input of binaryToBigint must be a binary string.', function () {
        chai.expect(() => con.binaryToBigint(input._binary)).to.throw();
      });
    } else {
      describe(`binaryToBigint(${input._binary})`, function () {
        it(`should return ${input._bigint}`, function () {
          const ret = con.binaryToBigint(input._binary);
          chai.expect(ret).to.equal(input._bigint);
        });
      });
    }
  }
});

describe('bigintToNumber', function () {
  const inputs = [
    {
      _bigint: BigInt(10000),
      _number: 10000,
    },
    {
      _bigint: Number.MIN_SAFE_INTEGER - 1,
    },
  ];

  for (const input of inputs) {
    if (input._bigint < Number.MIN_SAFE_INTEGER || input._bigint > Number.MAX_SAFE_INTEGER) {
      it('should throw new Error that Input of bigintToNumber must be between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER.', function () {
        chai.expect(() => con.bigintToNumber(input._bigint)).to.throw();
      });
    } else {
      describe(`bigintToNumber(${input._bigint})`, function () {
        it(`should return ${input._number}`, function () {
          const ret = con.bigintToNumber(input._bigint);
          chai.expect(ret).to.equal(input._number);
        });
      });
    }
  }
});

describe('numberTobigint', function () {
  const inputs = [
    {
      _bigint: BigInt(10000),
      _number: 10000,
    },
  ];

  for (const input of inputs) {
    describe(`numberTobigint(${input._number})`, function () {
      it(`should return ${input._bigint}`, function () {
        const ret = con.numberTobigint(input._number);
        chai.expect(ret).to.equal(input._bigint);
      });
    });
  }
});

function getBaseLogBigInt(_bigIntBase, _bigIntNumber) {
  const tempX = _bigIntBase.toString(2).length - 1;
  const bigIntX = _bigIntBase <= BigInt(0) ? BigInt(0) : BigInt(tempX);
  const tempY = _bigIntNumber.toString(2).length - 1;
  const bigIntY = _bigIntNumber <= BigInt(0) ? BigInt(0) : BigInt(tempY);
  return bigIntY / bigIntX;
}

describe('bigintTolimbs', function () {
  const inputs = [
    {
      _bigint: BigInt(23),
      _limbBitLength: BigInt(2),
      _numberOfLimbs: BigInt(6),
      _limbs: [BigInt(0), BigInt(0), BigInt(0), BigInt(1), BigInt(1), BigInt(3)],
    },
  ];

  for (const input of inputs) {
    const minNumberOfLimbs =
      getBaseLogBigInt(2 ** con.bigintToNumber(input._limbBitLength), input._bigint) + BigInt(1);
    if (minNumberOfLimbs > input._numberOfLimbs) {
      it('should throw new Error that  NumberOfLimbs should be at least {minNumberOfLimbs}', function () {
        chai
          .expect(() =>
            con.minNumberOfLimbs(input._bigint, input._limbBitLength, input._numberOfLimbs),
          )
          .to.throw();
      });
    } else {
      describe(`bigintTolimbs(${input._bigint},${input._limbBitLength},${input._numberOfLimbs})`, function () {
        it(`should return ${input._limbs}`, function () {
          const ret = con.bigintTolimbs(input._bigint, input._limbBitLength, input._numberOfLimbs);
          chai.expect(ret).to.eql(input._limbs);
        });
      });
    }
  }
});

describe('limbsToBigint', function () {
  const inputs = [
    {
      _bigint: BigInt(23),
      _limbBitLength: BigInt(2),
      _limbs: [BigInt(0), BigInt(0), BigInt(0), BigInt(1), BigInt(1), BigInt(3)],
    },
  ];

  for (const input of inputs) {
    describe(`limbsToBigint(${input._limbs},${input._limbBitLength})`, function () {
      it(`should return ${input._bigint}`, function () {
        const ret = con.limbsToBigint(input._limbs, input._limbBitLength);
        chai.expect(ret).to.equal(input._bigint);
      });
    });
  }
});

describe('bigintToField', function () {
  const inputs = [
    {
      _bigint: BigInt(30),
      _bigintModulus: BigInt(20),
      _field: BigInt(10),
      _noOverflow: true,
    },
    {
      _bigint: BigInt(-30),
      _bigintModulus: BigInt(20),
      _field: BigInt(10),
      _noOverflow: true,
    },
  ];

  for (const input of inputs) {
    if (input._noOverflow && input._bigint > input._bigintModulus) {
      it('should throw new Error that field modulus overflow.', function () {
        chai
          .expect(() => con.bigintToField(input._bigint, input._bigintModulus, input._noOverflow))
          .to.throw();
      });
    } else {
      describe(`bigintToField(${input._bigint},${input._bigintModulus},${input._noOverflow})`, function () {
        it(`should return ${input._field}`, function () {
          const ret = con.bigintToField(input._bigint, input._bigintModulus, input._noOverflow);
          chai.expect(ret).to.equal(input._field);
        });
      });
    }
  }
});

describe('bigintToUtf8', function () {
  const inputs = [
    {
      _bigint: BigInt(3430008),
      _utf8: '4Vx',
    },
    {
      _bigint: BigInt(-3430008),
    },
  ];

  for (const input of inputs) {
    if (input._bigint > 0) {
      describe(`bigintToUtf8(${input._bigint})`, function () {
        it(`should return ${input._utf8}`, function () {
          const ret = con.bigintToUtf8(input._bigint);
          chai.expect(ret).to.equal(input._utf8);
        });
      });
    } else {
      it('should throw new Error that Input of bigintToUtf8 should be positive.', function () {
        chai.expect(() => con.bigintToUtf8(input._bigint, input._bigintModulus)).to.throw();
      });
    }
  }
});

describe('utf8ToBigint', function () {
  const inputs = [
    {
      _bigint: BigInt(3430008),
      _utf8: '4Vx',
    },
  ];

  for (const input of inputs) {
    describe(`utf8ToBigint(${input._utf8})`, function () {
      it(`should return ${input._bigint}`, function () {
        const ret = con.utf8ToBigint(input._utf8);
        chai.expect(ret).to.equal(input._bigint);
      });
    });
  }
});
