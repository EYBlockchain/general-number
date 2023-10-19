_This code is not owned by EY and EY provides no warranty and disclaims any and all liability for use of this code. Users must conduct their own diligence with respect to use for their purposes and any and all usage is on an as-is basis and at your own risk._

# general-number

general-number is a library to perform conversion among different types (eg., BigInt, Hexdecimal
String, Binary String, Integer, Decimal, Number, Limbs, UTF8, and Field)

Intermediate result is stored as GeneralNumber Object, eg., GeneralNumber { **value: 123n,
**limbBitLength: 0n },GeneralNumber { **value: [ 3n, 24n, 17n, 31n ], **limbBitLength: 5n }.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Install](#install)
- [Usage](#usage)
  - [new GN()](#new-gn)
  - [generalise()](#generalise)
- [Developer](#developer)
  - [Test](#test)
  - [Test with yalc](#test-with-yalc)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

In your NodeJS project:  
`npm i @eyblockchain/general-number`

## Usage

See `./tests/testConversion.js` for a comprehensive set of type conversion commands). See
`./tests/testFunction.js` for a comprehensive set of BigInt arithmetic function commands). See
`./tests/testIndex.js` for a comprehensive set of GN conversion commands).

### new GN()

If passed some value, `new GN()` will infer the type of that value, and can return conversions of
that value through custom getters:

```js
import { GN } from 'general-number';

const myOriginalNumber = '0x12345678';

const myGN = new GN(myOriginalNumber);

console.log(myGN.hex());
// should return hex string "0x12345678"

console.log(myGN.hex(32));
// should return as 32 bytes hex string: "0x0000000000000000000000000000000000000000000000000000000012345678"

console.log(myGN.hex(2));
// should return as 2 bytes hex string: "0x5678"

console.log(myGN.hex(8, 2));
// should return as 2 bytes, padded to 8 bytes hex string: "0x0000000000005678"

console.log(myGN.decimal);
// should return as a decimal number: 305419896

console.log(myGN.integer);
// should return as an integer number: 305419896

console.log(myGN.number);
// should return as a number: 305419896

console.log(myGN.bigint);
// should return as a js BigInt: BigInt(myOriginalNumber):305419896n

console.log(myGN.binary);
// should return as a binary string: "10010001101000101011001111000"

console.log(myGN.binaryArray);
// should return as a binary array: [
//   1, 0, 0, 1, 0, 0, 0, 1, 1,
//   0, 1, 0, 0, 0, 1, 0, 1, 0,
//   1, 1, 0, 0, 1, 1, 1, 1, 0,
//   0, 0
// ]

console.log(myGN.field(256, false));
// should return as a finite field GeneralNumber: (myGN % 256):
//GeneralNumber { __value: 120n, __limbBitLength: 0n }

console.log(myGN.field(256));
// should throw an error: Error: field modulus overflow.
// (myGN is larger than the requested modulus 256)

console.log(myGN.limbs(16));
// should return as GeneralNumber of which the value is limbs:
// GeneralNumber { __value: [ 4660n, 22136n ], __limbBitLength: 16n }

console.log(myGN.limbs(16, 4));
// should return as GeneralNumber of which the value is limbs:

console.log(myGN.utf8);
// should return as an ascii string: "4Vx"
```

In some circumstances, you may need to get the value of a GeneralNumber object:

```js
import { GN } from 'general-number';

const myOriginalNumber = '10010001101000101011001111000';

// const myGN = new GN(myOriginalNumber); // BAD!!! - this would infer the 'type' as decimal!!!

const myGN = new GN(myOriginalNumber);

console.log(myGN.toBigint);
// should return '0x12345678'

const myGNLimbs = myGN.limbs(2n);
console.log(myGNLimbs.toLimbs);
// should return [
//   1n, 0n, 2n, 0n, 3n, 1n,
//   0n, 1n, 1n, 1n, 2n, 1n,
//   3n, 2n, 0n
// ]
```

### generalise()

Generalise is a powerful function for generalising _all_ values within an object or an array.

:us: Americans: don't worry, `generalize` works too!

```js
import { generalise } from 'general-number';

// OBJECTS:

const myObj = {
  key1: '0xf198e3403bdda3a0',
  key2: '17408914224622445472',
};

const myGeneralisedObj = generalise(myObj);

console.log(myGeneralisedObj.key1.hex());
// should return as hex: '0xf198e3403bdda3a0'

console.log(myGeneralisedObj.key2.hex());
// should return as hex: '0xf198e3403bdda3a0'

console.log(myGeneralisedObj.all.hex());
// should return the original object's structure, but all values as hex:
// {
//   key1: '0xf198e3403bdda3a0',
//   key2: '0xf198e3403bdda3a0',
// }

// ARRAYS:

const myArr = ['0xf19a0', '17402'];

const myGeneralisedArr = generalise(myArr);

console.log(myGeneralisedObj[0].decimal);
// should return as number: 989600

console.log(myGeneralisedObj[1].decimal);
// should return as number: 17402

console.log(myGeneralisedObj.all.decimal);
// should return the original array's structure, but all values as number:
// [ 989600, 17402 ]
```

Notice: `.all` is a custom property given to generalised objects (and arrays), which enables
developers to 'get' _all_ values of the object (or array) as the same 'type' (e.g. as `hex` in the
above example).

`generalise()` can also be used on _nested_ objects or arrays (including arrays of objects or
objects of arrays). Each sub-object will be given its own `.all` property.

`generalise()` can also be used instead of `new GN()` for simple values in all cases (except when
passing a value of type `limbs`). So in the [first example](#new-gn),
`const myGN = generalise(myOriginalNumber);` would have been equally valid sytax.

### Arithnetic Operations

A set of operation are provided for GeneralNumber, including add, sub, mul, addMod, subMod, mulMod,
powMod, dbs, gcd, egcd, lcm, max, min.

```js
import { GN } from 'general-number';

const gnNumber = new GN(333);
const gnLimbs = new GN([4n, 2n], 2n);
const gnUtf8 = new GN('hello');
const gnBinary = new GN('110110');
const gnBigint = new GN(120n);
const gnHex = new GN('0x123');

console.log(gnBigint.add(gnHex));
// should return as GeneralNumber object: GeneralNumber { __value: 411n, __limbBitLength: 0n }
console.log(gnBigint.add(gnHex).add(gnBinary));
// should return as GeneralNumber object: GeneralNumber { __value: 756n, __limbBitLength: 0n }
console.log(gnBigint.sub(gnHex));
// should return as GeneralNumber object: GeneralNumber { __value: -171n, __limbBitLength: 0n }
console.log(gnBigint.mul(gnHex));
// should return as GeneralNumber object: GeneralNumber { __value: 34920n, __limbBitLength: 0n }
console.log(gnBigint.addMod(gnHex, 2n));
// should return as GeneralNumber object: GeneralNumber { __value: 1n, __limbBitLength: 0n }
console.log(gnBigint.addMod(gnHex, 2n).addMod(gnBinary, 2n));
// should return as GeneralNumber object: GeneralNumber { __value: 1n, __limbBitLength: 0n }
console.log(gnBigint.subMod(gnHex, 2n));
//should return as GeneralNumber object: GeneralNumber { __value: 1n, __limbBitLength: 0n }
console.log(gnBigint.subMod(gnHex, 2n).subMod(gnBinary, 2n));
//should return as GeneralNumber object: GeneralNumber { __value: 1n, __limbBitLength: 0n }
console.log(gnBigint.mulMod(gnHex, 2n));
//should return as GeneralNumber object: GeneralNumber { __value: 0n, __limbBitLength: 0n }
console.log(gnBigint.mulMod(gnHex, 2n).mulMod(gnBinary, 2n));
//should return as GeneralNumber object: GeneralNumber { __value: 0n, __limbBitLength: 0n }
console.log(gnNumber.powMod(gnLimbs, 5n));
//should return as GeneralNumber object: GeneralNumber { __value: 4n, __limbBitLength: 0n }

const gnBigint1 = new GN(-120n);
console.log(gnBigint1.abs());
//should return as GeneralNumber object: GeneralNumber { __value: 120n, __limbBitLength: 0n }
console.log(gnBigint.gcd(gnHex));
//should return as GeneralNumber object: GeneralNumber { __value: 3n, __limbBitLength: 0n }
console.log(gnBigint.lcm(gnHex).toBigint);
//should return as BigInt number: 11640n
const gnBigint2 = new GN(120n);
const gnBigint3 = new GN(1n);
console.log(gnBigint3.max(gnBigint2));
//should return as GeneralNumber object: GeneralNumber { __value: 120n, __limbBitLength: 0n }
const gnNumber2 = new GN(333333);
console.log(gnBigint.min(gnNumber2));
//should return as GeneralNumber object: GeneralNumber { __value: 120n, __limbBitLength: 0n }
```

## Developer

### Test

Clone the repo. `npm i`  
`npm test`

### Test with yalc

If you've made local changes to this repo, and would like to test whether those (unpublished)
changes will work with some dependent zkp appliation (zApp)...

...then you’ll need to install your local, ‘branched’ version of `general-number` in your zApp.

```sh
cd path/to/general-number/
yalc publish
```

You should see something like "`@eyblockchain/general-number@0.0.0-3df45b8c published in store.`".
Notice the ‘signature’ `3df45b8c` .

```sh
cd path/to/your/zApp/
```

Remove the package-lock.json and the node_modules from your zApp's root (if they exist on your
machine).

Then:

```sh
yalc add @eyblockchain/general-number
```

You’ll see that this has ‘swapped-in’ the ‘published’ (yalc version) of `general-number` in the
`package.json`. It’s also created `.yalc.lock` (which shows that you’ve replaced the ‘proper’ npm
package of `general-number` with your ‘yalc version’ (see the `signature` field in this file, which
should match the signature from earlier)).

Now install node modules:

```sh
npm i
```

If your zApp runs in a container, then you might need to also edit its dockerfile:

Change a line in `<your zApp>/Dockerfile` from `RUN npm ci` to `RUN npm install`.

Add a line in `<your zApp>/docker-compose.yml`:

```yaml
yourService:
  build:
    context: .
    dockerfile: Dockerfile
volumes:
  - ./.yalc:/app/.yalc # <<< ADD THIS LINE (or something similar)!!!
```

When you're happy that your local changes to `general-number` work and you wish to create a PR, you
MUST remove any references to `yalc`, or the PR shouldn't be accepted.
