/* eslint-disable func-names */
/**
 * To test the general number operations in index.js
 */

const chai = require('chai');
const { binaryToBigint, bigintToBinaryArray, bigintToUtf8 } = require('../conversion');

const { generalise, GN, GO } = require('../index');
/**
 * Set a group of values in different types of bigint 17408914224622445472n
 */
const hexString = '0xf198e3403bdda3a0';
const binString = '1111000110011000111000110100000000111011110111011010001110100000';
const bigintNumber = 17408914224622445472n;
const hex32String = '0x000000000000000000000000000000000000000000000000f198e3403bdda3a0';
const hex324String = '0x000000000000000000000000000000000000000000000000000000003bdda3a0';
const hex4String = '0x3bdda3a0';
const limbs32 = [4053328704n, 1004381088n];
const limbs324 = [0n, 0n, 4053328704n, 1004381088n];
const field256nfalse = 160n;

describe('GeneralNumber class', function () {
  describe('Create GN from a BigInt', () => {
    const gn = new GN(bigintNumber);

    it('should convert to bigint correctly', function () {
      chai.expect(bigintNumber).to.eql(gn.bigint);
    });

    it('should convert to hex string correctly', function () {
      chai.expect(hexString).to.eql(gn.hex());
    });

    it('should convert to hex string correctly', function () {
      chai.expect(hexString).to.eql(gn.hex());
    });

    it('should convert to hex(32) string correctly', function () {
      chai.expect(hex32String).to.eql(gn.hex(32));
    });

    it('should convert to hex(32,4) string correctly', function () {
      chai.expect(hex324String).to.eql(gn.hex(32, 4));
    });

    it('should convert to hex(4) string correctly', function () {
      chai.expect(hex4String).to.eql(gn.hex(4));
    });

    it('should convert to binary correctly', function () {
      chai.expect(binString).to.eql(gn.binary);
    });

    it('should convert to binaryArray correctly', function () {
      chai.expect(bigintToBinaryArray(bigintNumber)).to.eql(gn.binaryArray);
    });

    it("should throw error because it's out of number range", function () {
      chai.expect(() => gn.number).to.throw();
    });

    it('should throw error because we need parameters for limbs()', function () {
      chai.expect(() => gn.limbs()).to.throw();
    });
    it('should convert to limbs(32) correctly', function () {
      chai.expect(limbs32).to.eql(gn.limbs(32n).__value);
    });
    it('should convert to limbs(32,4) correctly', function () {
      chai.expect(limbs324).to.eql(gn.limbs(32n, 4n).__value);
    });
    it('should convert to field(256n,false) correctly', function () {
      chai.expect(field256nfalse).to.eql(gn.field(256n, false).__value);
    });
    it('should throw error because of overflow', function () {
      chai.expect(() => gn.field(2n)).to.throw();
    });
  });

  describe('Create GN from hex', function () {
    const gn = new GN(hexString);
    it('should convert to bigint correctly', function () {
      chai.expect(bigintNumber).to.equal(gn.bigint);
    });
    it('should convert to binary correctly', function () {
      chai.expect(binaryToBigint(binString)).to.equal(gn.bigint);
    });
    it("should throw error because it's out of number range", function () {
      chai.expect(() => gn.number).to.throw();
    });
    it('should convert to hex() correctly', function () {
      chai.expect(hexString).to.equal(gn.hex());
    });
    it('should convert to hex(32) correctly', function () {
      chai.expect(hex32String).to.equal(gn.hex(32));
    });
    it('should convert to hex(32,4) correctly', function () {
      chai.expect(hex324String).to.equal(gn.hex(32, 4));
    });
    it('should convert to hex(4) correctly', function () {
      chai.expect(hex4String).to.equal(gn.hex(4));
    });
    it("should throw error because it's butTruncateValueToByteLength is bigger than byteLength", function () {
      chai.expect(() => gn.hex(4, 5)).to.throw();
    });
    it('should throw error because we need parameters for limbs()', function () {
      chai.expect(() => gn.limbs()).to.throw();
    });
    it('should convert to limbs(32) correctly', function () {
      chai.expect(limbs32).to.eql(gn.limbs(32n).__value);
    });
    it('should convert to limbs(32,4) correctly', function () {
      chai.expect(limbs324).to.eql(gn.limbs(32n, 4n).__value);
    });
    it('should convert to limbs(32,4) and then convert tobinary correctly', function () {
      chai.expect(binString).to.eql(gn.limbs(32n).binary);
    });
    it('should convert to binaryArray correctly', function () {
      chai.expect(bigintToBinaryArray(bigintNumber)).to.eql(gn.binaryArray);
    });
    it('should convert to field(256n,false) correctly', function () {
      chai.expect(field256nfalse).to.eql(gn.field(256n, false).__value);
    });
    it('should throw error because of overflow', function () {
      chai.expect(() => gn.field(2n)).to.throw();
    });
  });
});

describe('Create GN from a binary string', () => {
  const gn = new GN(binString);

  it('should convert to bigint correctly', function () {
    chai.expect(bigintNumber).to.eql(gn.bigint);
  });

  it('should convert to hex string correctly', function () {
    chai.expect(hexString).to.eql(gn.hex());
  });

  it('should convert to hex(32) string correctly', function () {
    chai.expect(hex32String).to.eql(gn.hex(32));
  });

  it('should convert to hex(32,4) string correctly', function () {
    chai.expect(hex324String).to.eql(gn.hex(32, 4));
  });

  it('should convert to hex(4) string correctly', function () {
    chai.expect(hex4String).to.eql(gn.hex(4));
  });

  it('should convert to binary correctly', function () {
    chai.expect(binString).to.eql(gn.binary);
  });

  it('should convert to binaryArray correctly', function () {
    chai.expect(bigintToBinaryArray(bigintNumber)).to.eql(gn.binaryArray);
  });

  it("should throw error because it's out of number range", function () {
    chai.expect(() => gn.number).to.throw();
  });

  it('should throw error because we need parameters for limbs()', function () {
    chai.expect(() => gn.limbs()).to.throw();
  });
  it('should convert to limbs(32) correctly', function () {
    chai.expect(limbs32).to.eql(gn.limbs(32n).__value);
  });
  it('should convert to limbs(32,4) correctly', function () {
    chai.expect(limbs324).to.eql(gn.limbs(32n, 4n).__value);
  });
  it('should convert to field(256n,false) correctly', function () {
    chai.expect(field256nfalse).to.eql(gn.field(256n, false).__value);
  });
  it('should throw error because of overflow', function () {
    chai.expect(() => gn.field(2n)).to.throw();
  });
});

describe('Create GN from number', () => {
  const gn = new GN(12345);

  it('should convert to bigint correctly', function () {
    chai.expect(12345n).to.eql(gn.bigint);
  });

  it('should convert to hex string correctly', function () {
    chai.expect('0x3039').to.eql(gn.hex());
  });

  it('should convert to hex(32) string correctly', function () {
    chai
      .expect('0x0000000000000000000000000000000000000000000000000000000000003039')
      .to.eql(gn.hex(32));
  });

  it('should convert to hex(32,4) string correctly', function () {
    chai
      .expect('0x0000000000000000000000000000000000000000000000000000000000003039')
      .to.eql(gn.hex(32, 4));
  });

  it('should convert to hex(4) string correctly', function () {
    chai.expect('0x00003039').to.eql(gn.hex(4));
  });

  it('should convert to binary correctly', function () {
    chai.expect('11000000111001').to.eql(gn.binary);
  });

  it('should convert to binaryArray correctly', function () {
    chai.expect(bigintToBinaryArray(12345n)).to.eql(gn.binaryArray);
  });

  it('should convert to number correctlye', function () {
    chai.expect(12345).to.eql(gn.number);
  });

  it('should throw error because we need parameters for limbs()', function () {
    chai.expect(() => gn.limbs()).to.throw();
  });
  it('should convert to limbs(32) correctly', function () {
    chai.expect([12345n]).to.eql(gn.limbs(32n).__value);
  });
  it('should convert to limbs(32,4) correctly', function () {
    chai.expect([0n, 0n, 0n, 12345n]).to.eql(gn.limbs(32n, 4n).__value);
  });
  it('should convert to field(256n,false) correctly', function () {
    chai.expect(57n).to.eql(gn.field(256n, false).__value);
  });
  it('should throw error because of overflow', function () {
    chai.expect(() => gn.field(2n)).to.throw();
  });
});

describe('Convert to utf8', () => {
  it('should convert to utf8 from number correctly', function () {
    const gn = new GN(123455);
    chai.expect(bigintToUtf8(123455n)).to.eql(gn.utf8);
  });
  it('should convert to utf8 from bigint correctly', function () {
    const gn = new GN(123455n);
    chai.expect(bigintToUtf8(123455n)).to.eql(gn.utf8);
  });
  it('should convert to utf8 from limbs correctly', function () {
    const gn = new GN(123455n);
    const gnLimbs = gn.limbs(32n);
    chai.expect(bigintToUtf8(123455n)).to.eql(gnLimbs.utf8);
  });
  it('should convert to utf8 from hex correctly', function () {
    const gn = new GN('0x1e23f');
    chai.expect(bigintToUtf8(123455n)).to.eql(gn.utf8);
  });
});

describe('Create GN from limbs', () => {
  //   const gn1 = new GN(limbs32, 32n);
  const gn = new GN([4053328704n, 1004381088n], 32n);
  it('should convert to bigint correctly', function () {
    chai.expect(bigintNumber).to.eql(gn.bigint);
  });
  it('should convert to hex string correctly', function () {
    chai.expect(hexString).to.eql(gn.hex());
  });
  it('should convert to hex(32) string correctly', function () {
    chai.expect(hex32String).to.eql(gn.hex(32));
  });
  it('should convert to hex(32,4) string correctly', function () {
    chai.expect(hex324String).to.eql(gn.hex(32, 4));
  });
  it('should convert to hex(4) string correctly', function () {
    chai.expect(hex4String).to.eql(gn.hex(4));
  });
  it('should convert to binary correctly', function () {
    chai.expect(binString).to.eql(gn.binary);
  });
  it('should convert to binaryArray correctly', function () {
    chai.expect(bigintToBinaryArray(bigintNumber)).to.eql(gn.binaryArray);
  });
  it("should throw error because it's out of number range", function () {
    chai.expect(() => gn.number).to.throw();
  });
  it('should throw error because we need parameters for limbs()', function () {
    chai.expect(() => gn.limbs()).to.throw();
  });
  it('should convert to limbs(32) correctly', function () {
    chai.expect(limbs32).to.eql(gn.limbs(32n).__value);
  });
  it('should convert to limbs(32,4) correctly', function () {
    chai.expect(limbs324).to.eql(gn.limbs(32n, 4n).__value);
  });
  it('should convert to field(256n,false) correctly', function () {
    chai.expect(field256nfalse).to.eql(gn.field(256n, false).__value);
  });
  it('should throw error because of overflow', function () {
    chai.expect(() => gn.field(2n)).to.throw();
  });
});

describe('Create GN from utf8', () => {
  //   const gn1 = new GN(limbs32, 32n);
  const gn = new GN('hello');
  it('should convert to bigint correctly', function () {
    chai.expect(448378203247n).to.eql(gn.bigint);
  });
  it('should convert to hex string correctly', function () {
    chai.expect('0x68656c6c6f').to.eql(gn.hex());
  });
  it('should convert to hex(32) string correctly', function () {
    chai
      .expect('0x00000000000000000000000000000000000000000000000000000068656c6c6f')
      .to.eql(gn.hex(32));
  });
  it('should convert to hex(32,4) string correctly', function () {
    chai
      .expect('0x00000000000000000000000000000000000000000000000000000000656c6c6f')
      .to.eql(gn.hex(32, 4));
  });
  it('should convert to hex(4) string correctly', function () {
    chai.expect('0x656c6c6f').to.eql(gn.hex(4));
  });
  it('should convert to binary correctly', function () {
    chai.expect('110100001100101011011000110110001101111').to.eql(gn.binary);
  });
  it('should convert to binaryArray correctly', function () {
    chai
      .expect([
        1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0,
        0, 1, 1, 0, 1, 1, 1, 1,
      ])
      .to.eql(gn.binaryArray);
  });
  it('should convert to number correctly', function () {
    chai.expect(448378203247).to.eql(gn.number);
  });
  it('should throw error because we need parameters for limbs()', function () {
    chai.expect(() => gn.limbs()).to.throw();
  });
  it('should convert to limbs(32) correctly', function () {
    chai.expect([104n, 1701604463n]).to.eql(gn.limbs(32n).__value);
  });
  it('should convert to limbs(32,4) correctly', function () {
    chai.expect([0n, 0n, 104n, 1701604463n]).to.eql(gn.limbs(32n, 4n).__value);
  });
  it('should convert to field(256n,false) correctly', function () {
    chai.expect(111n).to.eql(gn.field(256n, false).__value);
  });
  it('should throw error because of overflow', function () {
    chai.expect(() => gn.field(2n)).to.throw();
  });
});

function deepEqual(x, y) {
  const ok = Object.keys;
  const tx = typeof x;
  const ty = typeof y;
  return x && y && tx === 'object' && tx === ty
    ? ok(x).length === ok(y).length && ok(x).every(key => deepEqual(x[key], y[key]))
    : x === y;
}
const object = {
  binString,
  hexString,
};
const array = [binString, hexString];
const objectOfArrays = { key0: array, key1: array };

describe('generalise function', () => {
  it('should output the same result as GeneralNumber class from hex', function () {
    const gn1 = generalise(hexString);
    const gn2 = new GN(hexString);
    chai.expect(deepEqual(gn1, gn2)).to.eql(true);
  });
  it('should output the same result as GeneralNumber class from bigint', function () {
    const gn1 = generalise(bigintNumber);
    const gn2 = new GN(bigintNumber);
    chai.expect(deepEqual(gn1, gn2)).to.eql(true);
  });
  it('should output the same result as GeneralNumber class from binary', function () {
    const gn1 = generalise(binString);
    const gn2 = new GN(binString);
    chai.expect(deepEqual(gn1, gn2)).to.eql(true);
  });
  it('should output the same result as GeneralNumber class from number', function () {
    const gn1 = generalise(12345678);
    const gn2 = new GN(12345678);
    chai.expect(deepEqual(gn1, gn2)).to.eql(true);
  });
  it('should output the same result as GeneralNumber class from limbs', function () {
    const gn1 = generalise([4053328704n, 1004381088n], 32n);
    const gn2 = new GN([4053328704n, 1004381088n], 32n);
    chai.expect(deepEqual(gn1, gn2)).to.eql(true);
  });
  it('should output the same result as GeneralNumber class from utf8', function () {
    const gn1 = generalise('hello');
    const gn2 = new GN('hello');
    chai.expect(deepEqual(gn1, gn2)).to.eql(true);
  });
  it('generalise an object', () => {
    const obj = generalise(object);
    const gnHex = new GN(hexString);
    const gnBin = new GN(binString);
    chai.expect(deepEqual(obj.hexString, gnHex)).to.eql(true);
    chai.expect(deepEqual(obj.binString, gnBin)).to.eql(true);
  });
  it('generalise an array', () => {
    const arr = generalise(array);
    const gnHex = new GN(hexString);
    const gnBin = new GN(binString);
    chai.expect(deepEqual(arr[0], gnBin)).to.eql(true);
    chai.expect(deepEqual(arr[1], gnHex)).to.eql(true);
  });
});

describe('the ".all" property', () => {
  const hexStringSmall = '0x7b';
  const binStringSmall = '1111011';
  const objectSmall = {
    binStringSmall,
    hexStringSmall,
  };
  const objSmall = generalise(objectSmall);
  const gnSmall = new GN(hexStringSmall);
  const goSmall = new GO(objSmall);
  it('Call ".all" on an array', () => {
    const arr = generalise(array);
    const gn = new GN(hexString);
    const goArr = new GO(arr);
    chai.expect(deepEqual(arr.all, goArr)).to.eql(true);
    chai.expect(arr.all.hex()).to.eql([hexString, hexString]);
    chai.expect(arr.all.binary).to.eql([binString, binString]);
    chai.expect(arr.all.hex(2)).to.eql([gn.hex(2), gn.hex(2)]);
    chai.expect(arr.all.limbs(32)).to.eql([gn.limbs(32), gn.limbs(32)]);
    chai
      .expect(arr.all.limbs(32, 4, 'hex'))
      .to.eql([gn.limbs(32, 4, 'hex'), gn.limbs(32, 4, 'hex')]);
  });

  it('Call ".all" on an object', () => {
    chai.expect(deepEqual(objSmall.all, goSmall)).to.eql(true);
    chai
      .expect(
        deepEqual(objSmall.all.hex(), {
          binStringSmall: hexStringSmall,
          hexStringSmall,
        }),
      )
      .to.eql(true);
    chai.expect(objSmall.all.binary).to.eql({
      binStringSmall: gnSmall.binary,
      hexStringSmall: gnSmall.binary,
    });
    chai.expect(objSmall.all.decimal).to.eql({
      binStringSmall: gnSmall.decimal,
      hexStringSmall: gnSmall.decimal,
    });
    chai.expect(objSmall.all.hex(2)).to.eql({
      binStringSmall: gnSmall.hex(2),
      hexStringSmall: gnSmall.hex(2),
    });
    chai.expect(objSmall.all.limbs(32, 4)).to.eql({
      binStringSmall: gnSmall.limbs(32, 4),
      hexStringSmall: gnSmall.limbs(32, 4),
    });
  });

  it('Call ".all" on an array of objects', () => {
    // const hexString = '0x7b';
    // const binString = '1111011';
    // const object = {
    //   binString,
    //   hexString,
    // };
    // const array = [binString, hexString];
    const arrayOfObjectsSmall = [objectSmall, objectSmall];
    // const objectOfArrays = { key0: array, key1: array };
    // const obj = generalise(object);
    const arrSmall = generalise(arrayOfObjectsSmall);
    const go = new GO(arrayOfObjectsSmall);
    const gn = new GN(hexStringSmall);
    chai.expect(arrSmall.all).to.eql(go);
    chai.expect(arrSmall.all.hex()).to.eql([
      {
        binStringSmall: hexStringSmall,
        hexStringSmall,
      },
      {
        binStringSmall: hexStringSmall,
        hexStringSmall,
      },
    ]);
    chai.expect(arrSmall.all.decimal).to.eql([
      {
        binStringSmall: gn.decimal,
        hexStringSmall: gn.decimal,
      },
      {
        binStringSmall: gn.decimal,
        hexStringSmall: gn.decimal,
      },
    ]);
    chai.expect(arrSmall.all.binary).to.eql([
      {
        binStringSmall: gn.binary,
        hexStringSmall: gn.binary,
      },
      {
        binStringSmall: gn.binary,
        hexStringSmall: gn.binary,
      },
    ]);
    chai.expect(arrSmall.all.hex(2)).to.eql([
      {
        binStringSmall: gn.hex(2),
        hexStringSmall: gn.hex(2),
      },
      {
        binStringSmall: gn.hex(2),
        hexStringSmall: gn.hex(2),
      },
    ]);
    chai.expect(arrSmall.all.limbs(32, 4)).to.eql([
      {
        binStringSmall: gn.limbs(32, 4),
        hexStringSmall: gn.limbs(32, 4),
      },
      {
        binStringSmall: gn.limbs(32, 4),
        hexStringSmall: gn.limbs(32, 4),
      },
    ]);
  });

  describe('Call ".all" on an object of arrays', () => {
    const obj = generalise(objectOfArrays);
    const go = new GO(objectOfArrays);
    const gn = new GN(hexString);
    chai.expect(obj.all).to.eql(go);
    chai.expect(obj.all.hex()).to.eql({
      key0: [hexString, hexString],
      key1: [hexString, hexString],
    });
    chai.expect(obj.all.binary).to.eql({
      key0: [binString, binString],
      key1: [binString, binString],
    });
    chai.expect(obj.all.hex(2)).to.eql({
      key0: [gn.hex(2), gn.hex(2)],
      key1: [gn.hex(2), gn.hex(2)],
    });
    chai.expect(obj.all.limbs(32)).to.eql({
      key0: [gn.limbs(32), gn.limbs(32)],
      key1: [gn.limbs(32), gn.limbs(32)],
    });
  });

  it('Call ".all" on a GN', () => {
    const gn = new GN(hexString);
    chai.expect(gn.all).to.eql(gn);
  });
});

// eslint-disable-next-line no-extend-native
BigInt.prototype.mod = function (_m) {
  return ((this % _m) + _m) % _m;
};
describe('arithmatic function', () => {
  // const gnNumber = new GN(333);
  // const gnLimbs = new GN([4n, 2n], 2n);
  // const gnUtf8 = new GN('hello');

  it('should perform addition correctly', function () {
    const gnBigint = new GN(120n);
    const gnHex = new GN('0x123');
    chai.expect(new GN(gnBigint.bigint + gnHex.bigint)).to.eql(gnBigint.add(gnHex));
  });
  it('should perform multiple additions correctly', function () {
    const gnBigint = new GN(120n);
    const gnHex = new GN('0x123');
    const gnBinary = new GN('110110');
    chai
      .expect(new GN(gnBigint.bigint + gnHex.bigint + gnBinary.bigint))
      .to.eql(gnBigint.add(gnHex).add(gnBinary));
  });
  it('should perform sub correctly', function () {
    const gnBigint = new GN(120n);
    const gnHex = new GN('0x123');
    chai.expect(new GN(gnBigint.bigint - gnHex.bigint)).to.eql(gnBigint.sub(gnHex));
  });
  it('should perform mul correctly', function () {
    const gnBigint = new GN(120n);
    const gnHex = new GN('0x123');
    chai.expect(new GN(gnBigint.bigint * gnHex.bigint)).to.eql(gnBigint.mul(gnHex));
  });
  it('should perform addMod correctly', function () {
    const gnBigint = new GN(120n);
    const gnHex = new GN('0x123');
    chai
      .expect(new GN((gnBigint.bigint + gnHex.bigint).mod(2n)))
      .to.eql(gnBigint.addMod(gnHex, 2n));
  });
  it('should perform addMod correctly', function () {
    const gnBigint = new GN(120n);
    const gnHex = new GN('0x123');
    chai
      .expect(new GN((gnBigint.bigint + gnHex.bigint).mod(2n)))
      .to.eql(gnBigint.addMod(gnHex, 2n));
  });
  it('should perform multiple addMod correctly', function () {
    const gnBigint = new GN(120n);
    const gnHex = new GN('0x123');
    const gnBinary = new GN('110110');
    chai
      .expect(new GN((gnBigint.bigint + gnHex.bigint + gnBinary.bigint).mod(2n)))
      .to.eql(gnBigint.addMod(gnHex, 2n).addMod(gnBinary, 2n));
  });
  it('should perform subMod correctly', function () {
    const gnBigint = new GN(120n);
    const gnHex = new GN('0x123');
    chai
      .expect(new GN((gnBigint.bigint - gnHex.bigint).mod(2n)))
      .to.eql(gnBigint.subMod(gnHex, 2n));
  });
  it('should perform multiple subMod correctly', function () {
    const gnBigint = new GN(120n);
    const gnHex = new GN('0x123');
    const gnBinary = new GN('110110');
    chai
      .expect(new GN((gnBigint.bigint - gnHex.bigint - gnBinary.bigint).mod(2n)))
      .to.eql(gnBigint.subMod(gnHex, 2n).subMod(gnBinary, 2n));
  });
  it('should perform mulMod correctly', function () {
    const gnBigint = new GN(120n);
    const gnHex = new GN('0x123');
    chai
      .expect(new GN((gnBigint.bigint * gnHex.bigint).mod(2n)))
      .to.eql(gnBigint.mulMod(gnHex, 2n));
  });
  it('should perform multiple mulMod correctly', function () {
    const gnBigint = new GN(120n);
    const gnHex = new GN('0x123');
    const gnBinary = new GN('110110');
    chai
      .expect(new GN((gnBigint.bigint * gnHex.bigint * gnBinary.bigint).mod(2n)))
      .to.eql(gnBigint.mulMod(gnHex, 2n).mulMod(gnBinary, 2n));
  });
  it('should perform powMod correctly', function () {
    const gnBigint = new GN(120n);
    const gnHex = new GN('0x123');
    chai
      .expect(new GN((gnBigint.bigint ** gnHex.bigint).mod(2n)))
      .to.eql(gnBigint.powMod(gnHex, 2n));
  });
  it('should perform abs correctly', function () {
    const gnBigint = new GN(-120n);
    chai.expect(new GN(120n)).to.eql(gnBigint.abs());
  });
  it('should perform egcd correctly', function () {
    const gnBigint = new GN(120n);
    const gnHex = new GN('0x123');
    const desiredResult = {
      g: 3n,
      x: 17n,
      y: -7n,
    };
    chai.expect(desiredResult).to.eql(gnBigint.egcd(gnHex).__value);
  });
  it('should perform gcd correctly', function () {
    const gnBigint = new GN(120n);
    const gnHex = new GN('0x123');
    const desiredResult = 3n;
    chai.expect(desiredResult).to.eql(gnBigint.gcd(gnHex).__value);
  });
  it('should perform lcm correctly', function () {
    const gnBigint = new GN(120n);
    const gnHex = new GN('0x123');
    const desiredResult = 11640n;
    chai.expect(desiredResult).to.eql(gnBigint.lcm(gnHex).__value);
  });
  it('should perform max correctly', function () {
    const gnBigint = new GN(120n);
    const gnBigint2 = new GN(1n);
    chai.expect(gnBigint).to.eql(gnBigint.max(gnBigint2));
  });
  it('should perform min correctly', function () {
    const gnBigint = new GN(120n);
    const gnHex = new GN('0x1000000');
    chai.expect(gnBigint).to.eql(gnBigint.min(gnHex));
  });
});
