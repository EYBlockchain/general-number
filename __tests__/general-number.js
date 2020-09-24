const { hexToBinArray, hexToBytes } = require('zkp-utils');
const { generalise, GN, GO, stitchLimbs } = require('../index');

const dec = '17408914224622445472';
const hex = '0xf198e3403bdda3a0';
const bin = '1111000110011000111000110100000000111011110111011010001110100000';

const object = {
  dec,
  hex,
};

const array = [dec, hex];

const arrayOfObjects = [object, object];
const objectOfArrays = { key0: array, key1: array };

function deepEqual(x, y) {
  const ok = Object.keys;
  const tx = typeof x;
  const ty = typeof y;
  return x && y && tx === 'object' && tx === ty
    ? ok(x).length === ok(y).length && ok(x).every(key => deepEqual(x[key], y[key]))
    : x === y;
}

describe('GeneralNumber class', () => {
  test('Create GN from hex', () => {
    const gn = new GN(hex);

    expect(gn.binary).toEqual(bin);
    expect(gn.binaryArray).toEqual(hexToBinArray(hex));
    expect(gn.bytes).toEqual(hexToBytes(hex));
    expect(gn.decimal).toEqual(dec);
    expect(gn.integer).toEqual(dec);
    expect(() => gn.number).toThrow(); // number too large for native JS
    expect(gn.bigInt).toEqual(BigInt(dec));

    expect(gn.hex()).toEqual(hex);
    expect(gn.hex(32)).toEqual(
      '0x000000000000000000000000000000000000000000000000f198e3403bdda3a0',
    );
    expect(gn.hex(32, 4)).toEqual(
      '0x000000000000000000000000000000000000000000000000000000003bdda3a0',
    );
    expect(gn.hex(4)).toEqual('0x3bdda3a0');
    expect(() => gn.hex(4, 5)).toThrow();

    expect(() => gn.limbs()).toThrow();

    expect(gn.limbs(32)).toEqual(['4053328704', '1004381088']);
    expect(gn.limbs(32, 4)).toEqual(['0', '0', '4053328704', '1004381088']);
    expect(gn.limbs(32, 1)).toEqual(['1004381088']);
    expect(() => gn.limbs(32, 1, 'decimal', true)).toThrow(); // 'true' throws errors

    expect(gn.limbs(32, undefined, 'hex')).toEqual(['0xf198e340', '0x3bdda3a0']);
    expect(gn.limbs(32, 4, 'hex')).toEqual(['0x0', '0x0', '0xf198e340', '0x3bdda3a0']);
    expect(gn.limbs(32, 1, 'hex')).toEqual(['0x3bdda3a0']);
    expect(() => gn.limbs(32, 1, 'hex', true)).toThrow(); // 'true' throws errors

    expect(gn.field(256, false)).toEqual('160'); // 'false' allows overflow of the modulus, and results in modulo reduction, returning (gn % 256)
    expect(() => gn.field(256)).toThrow(); // defaults to preventing overflow of the field modulus (256)
  });

  test('Create GN from an integer', () => {
    const gn = new GN(dec, 'integer');

    expect(gn.binary).toEqual(bin);
    expect(gn.binaryArray).toEqual(hexToBinArray(hex));
    expect(gn.bytes).toEqual(hexToBytes(hex));
    expect(gn.decimal).toEqual(dec);
    expect(gn.integer).toEqual(dec);
    expect(() => gn.number).toThrow(); // number too large for native JS
    expect(gn.bigInt).toEqual(BigInt(dec));

    expect(gn.hex()).toEqual(hex);
    expect(gn.hex(32)).toEqual(
      '0x000000000000000000000000000000000000000000000000f198e3403bdda3a0',
    );
    expect(gn.hex(32, 4)).toEqual(
      '0x000000000000000000000000000000000000000000000000000000003bdda3a0',
    );
    expect(gn.hex(4)).toEqual('0x3bdda3a0');
    expect(() => gn.hex(4, 5)).toThrow();

    expect(() => gn.limbs()).toThrow();

    expect(gn.limbs(32)).toEqual(['4053328704', '1004381088']);
    expect(gn.limbs(32, 4)).toEqual(['0', '0', '4053328704', '1004381088']);
    expect(gn.limbs(32, 1)).toEqual(['1004381088']);
    expect(() => gn.limbs(32, 1, 'decimal', true)).toThrow(); // 'true' throws errors

    expect(gn.limbs(32, undefined, 'hex')).toEqual(['0xf198e340', '0x3bdda3a0']);
    expect(gn.limbs(32, 4, 'hex')).toEqual(['0x0', '0x0', '0xf198e340', '0x3bdda3a0']);
    expect(gn.limbs(32, 1, 'hex')).toEqual(['0x3bdda3a0']);
    expect(() => gn.limbs(32, 1, 'hex', true)).toThrow(); // 'true' throws errors
  });

  test('Create GN from a number', () => {
    const gn = new GN(1234, 'number');

    expect(gn.binary).toEqual('10011010010');
    expect(gn.binaryArray).toEqual(hexToBinArray('0x4d2'));
    expect(gn.bytes).toEqual(hexToBytes('0x4d2'));
    expect(gn.decimal).toEqual('1234');
    expect(gn.integer).toEqual('1234');
    expect(gn.number).toEqual(1234); // number too large for native JS
    expect(gn.bigInt).toEqual(BigInt(1234));

    // no need to check the other getters; they'll be similar to 'integer' getters.
  });

  test('Create GN from a BigInt', () => {
    const bigInt = BigInt(1234);
    const gn = new GN(bigInt);

    expect(gn.binary).toEqual('10011010010');
    expect(gn.binaryArray).toEqual(hexToBinArray('0x4d2'));
    expect(gn.bytes).toEqual(hexToBytes('0x4d2'));
    expect(gn.decimal).toEqual('1234');
    expect(gn.integer).toEqual('1234');
    expect(gn.number).toEqual(1234); // number too large for native JS
    expect(gn.bigInt).toEqual(BigInt(1234));

    // no need to check the other getters; they'll be similar to 'integer' getters.
  });

  test('Create GN from ascii', () => {
    const gn = new GN('hello', 'ascii');
    expect(gn.hex()).toEqual('0x68656c6c6f');
    expect(gn.binary).toEqual('110100001100101011011000110110001101111');
    expect(gn.binaryArray).toEqual(hexToBinArray(gn.hex()));
    expect(gn.bytes).toEqual(hexToBytes(gn.hex()));
    expect(gn.integer).toEqual('448378203247');
    expect(gn.limbs(32)).toEqual(['104', '1701604463']);
    expect(gn.limbs(32, 4)).toEqual(['0', '0', '104', '1701604463']);
  });

  test('Create GN from utf8', () => {
    const gn = new GN('hello', 'utf8');
    expect(gn.hex()).toEqual('0x68656c6c6f');
    expect(gn.binary).toEqual('110100001100101011011000110110001101111');
    expect(gn.binaryArray).toEqual(hexToBinArray(gn.hex()));
    expect(gn.bytes).toEqual(hexToBytes(gn.hex()));
    expect(gn.integer).toEqual('448378203247');
    expect(gn.limbs(32)).toEqual(['104', '1701604463']);
    expect(gn.limbs(32, 4)).toEqual(['0', '0', '104', '1701604463']);
  });
});

describe('generalise function', () => {
  test('Create GN from hex', () => {
    const gn1 = generalise(hex);
    const gn2 = new GN(hex);
    expect(deepEqual(gn1, gn2)).toEqual(true);
  });

  test('Create GN from an integer', () => {
    const gn1 = generalise(dec);
    const gn2 = new GN(dec);
    expect(deepEqual(gn1, gn2)).toEqual(true);
  });

  test('generalise an object', () => {
    const obj = generalise(object);
    const gnHex = new GN(hex);
    const gnDec = new GN(dec);
    expect(deepEqual(obj.hex, gnHex)).toEqual(true);
    expect(deepEqual(obj.dec, gnDec)).toEqual(true);
  });

  test('generalise an array', () => {
    const arr = generalise(array);
    const gnHex = new GN(hex);
    const gnDec = new GN(dec);
    expect(deepEqual(arr[0], gnDec)).toEqual(true);
    expect(deepEqual(arr[1], gnHex)).toEqual(true);
  });
});

describe('the ".all" property', () => {
  test('Call ".all" on an array', () => {
    const arr = generalise(array);
    const gn = new GN(hex);
    const goArr = new GO(arr);
    expect(deepEqual(arr.all, goArr)).toEqual(true);
    expect(arr.all.hex()).toEqual([hex, hex]);
    expect(arr.all.decimal).toEqual([dec, dec]);
    expect(arr.all.binary).toEqual([bin, bin]);
    expect(arr.all.hex(2)).toEqual([gn.hex(2), gn.hex(2)]);
    expect(arr.all.limbs(32)).toEqual([gn.limbs(32), gn.limbs(32)]);
    expect(arr.all.limbs(32, 4, 'hex')).toEqual([gn.limbs(32, 4, 'hex'), gn.limbs(32, 4, 'hex')]);
  });

  test('Call ".all" on an object', () => {
    const obj = generalise(object);
    const gn = new GN(hex);
    const go = new GO(obj);
    expect(deepEqual(obj.all, go)).toEqual(true);
    expect(
      deepEqual(obj.all.hex(), {
        dec: hex,
        hex,
      }),
    ).toEqual(true);
    expect(
      deepEqual(obj.all.decimal, {
        dec,
        hex: dec,
      }),
    ).toEqual(true);
    expect(
      deepEqual(obj.all.binary, {
        dec: bin,
        hex: bin,
      }),
    ).toEqual(true);
    expect(
      deepEqual(obj.all.hex(2), {
        dec: gn.hex(2),
        hex: gn.hex(2),
      }),
    ).toEqual(true);
    expect(
      deepEqual(obj.all.limbs(32, 4, 'hex'), {
        dec: gn.limbs(32, 4, 'hex'),
        hex: gn.limbs(32, 4, 'hex'),
      }),
    ).toEqual(true);
  });

  test('Call ".all" on an array of objects', () => {
    const arr = generalise(arrayOfObjects);
    const go = new GO(arrayOfObjects);
    const gn = new GN(hex);
    expect(deepEqual(arr.all, go)).toEqual(true);
    expect(
      deepEqual(arr.all.hex(), [
        {
          dec: hex,
          hex,
        },
        {
          dec: hex,
          hex,
        },
      ]),
    ).toEqual(true);
    expect(
      deepEqual(arr.all.decimal, [
        {
          dec,
          hex: dec,
        },
        {
          dec,
          hex: dec,
        },
      ]),
    ).toEqual(true);
    expect(
      deepEqual(arr.all.binary, [
        {
          dec: bin,
          hex: bin,
        },
        {
          dec: bin,
          hex: bin,
        },
      ]),
    ).toEqual(true);
    expect(
      deepEqual(arr.all.hex(2), [
        {
          dec: gn.hex(2),
          hex: gn.hex(2),
        },
        {
          dec: gn.hex(2),
          hex: gn.hex(2),
        },
      ]),
    ).toEqual(true);
    expect(
      deepEqual(arr.all.limbs(32, 4, 'hex'), [
        {
          dec: gn.limbs(32, 4, 'hex'),
          hex: gn.limbs(32, 4, 'hex'),
        },
        {
          dec: gn.limbs(32, 4, 'hex'),
          hex: gn.limbs(32, 4, 'hex'),
        },
      ]),
    ).toEqual(true);
  });

  test('Call ".all" on an object of arrays', () => {
    const obj = generalise(objectOfArrays);
    const go = new GO(objectOfArrays);
    const gn = new GN(hex);
    expect(deepEqual(obj.all, go)).toEqual(true);
    expect(obj.all.hex()).toEqual({
      key0: [hex, hex],
      key1: [hex, hex],
    });
    expect(obj.all.decimal).toEqual({
      key0: [dec, dec],
      key1: [dec, dec],
    });
    expect(obj.all.binary).toEqual({
      key0: [bin, bin],
      key1: [bin, bin],
    });
    expect(obj.all.hex(2)).toEqual({
      key0: [gn.hex(2), gn.hex(2)],
      key1: [gn.hex(2), gn.hex(2)],
    });
    expect(obj.all.limbs(32)).toEqual({
      key0: [gn.limbs(32), gn.limbs(32)],
      key1: [gn.limbs(32), gn.limbs(32)],
    });
    expect(obj.all.limbs(32, 4, 'hex')).toEqual({
      key0: [gn.limbs(32, 4, 'hex'), gn.limbs(32, 4, 'hex')],
      key1: [gn.limbs(32, 4, 'hex'), gn.limbs(32, 4, 'hex')],
    });
  });

  test('Call ".all" on a GN', () => {
    const gn = new GN(hex);
    expect(deepEqual(gn.all, gn)).toEqual(true);
  });
});

describe('stitchLimbs function', () => {
  test('Create a hex string from limbs', () => {
    const limbs = [1, 10, 15];
    const hexStr = stitchLimbs(limbs, 16);
    expect(hexStr).toEqual('0x1000a000f');
  });
});
