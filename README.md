# general-number

A library for easily converting a number to various types.

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
`npm i -s general-number`

## Usage

(See `./__tests__/general-number.js` for a comprehensive set of GN conversion commands).

### new GN()

If passed a some value, `new GN()` will infer the type of that value, and can return conversions of that value through custom getters:

```js
import { GN } from 'general-number';

const myOriginalNumber = '0x12345678';

const myGN = new GN(myOriginalNumber);

console.log(myGN.hex());
// should return '0x12345678'

console.log(myGN.hex(32));
// should return as 32 bytes: '0x0000000000000000000000000000000000000000000000000000000012345678'

console.log(myGN.hex(2));
// should return as 2 bytes: '0x5678'

console.log(myGN.hex(8, 2));
// should return as 2 bytes, padded to 8 bytes: '0x0000000000005678'

console.log(myGN.decimal);
// should return as a decimal string: '305419896'

console.log(myGN.integer);
// synonym for 'decimal': '305419896'

console.log(myGN.number);
// should return as a js number: 305419896

console.log(myGN.bigInt);
// should return as a js BigInt: BigInt(myOriginalNumber)

console.log(myGN.binary);
// should return as a binary string: '10010001101000101011001111000'

console.log(myGN.binaryArray);
// should return as a binary array: '[1,0,0,1,0,0,0,1,1,0,1,0,0,0,1,0,1,0,1,1,0,0,1,1,1,1,0,0,0]'

console.log(myGN.field(256, false));
// should return as a finite field element: (myGN % 256): '120'

console.log(myGN.field(256));
// should throw an error (myGN is larger than the requested modulus 256)

console.log(myGN.limbs(16));
// should return as 16-bit decimal limbs: ['4660', '22136']

console.log(myGN.limbs(16, 4));
// should return as 4x 16-bit decimal limbs: ['0', '0', '4660', '22136']

console.log(myGN.limbs(16, 4, 'hex'));
// should return as 4x 16-bit hex limbs: ['0x0', '0x0', '0x1234', '0x5678']

console.log(myGN.ascii);
// should return as an ascii string: '#Eg'

console.log(myGN.utf8);
// should return as an ascii string: 'x'

```

In some circumstances, you may need to be specific about the type you're passing to `new GN()`. In particular, when passing a `binary` value.


```js
import { GN } from 'general-number';

const myOriginalNumber = '10010001101000101011001111000';

// const myGN = new GN(myOriginalNumber); // BAD!!! - this would infer the 'type' as decimal!!!

const myGN = new GN(myOriginalNumber, 'binary');

console.log(myGN.hex());
// should return '0x12345678'

```

### generalise()

Generalise is a powerful function for generalising _all_ values within an object or an array.

Americans: don't worry, `generalize` works too!

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

const myArr = [
  '0xf198e3403bdda3a0',
  '17408914224622445472',
];

const myGeneralisedArr = generalise(myArr);

console.log(myGeneralisedObj[0].decimal);
// should return as hex: '17408914224622445472'

console.log(myGeneralisedObj[1].decimal);
// should return as hex: '17408914224622445472'

console.log(myGeneralisedObj.all.decimal);
// should return the original array's structure, but all values as hex:
// [
//   '17408914224622445472',
//   '17408914224622445472',
// ]
```

Notice: `.all` is a custom property given to generalised objects (and arrays), which enables developers to 'get' _all_ values of the object (or array) as the same 'type' (e.g. as `hex` in the above example).

`generalise()` can also be used on *nested* objects or arrays (including arrays of objects or objects of arrays). Each sub-object will be given its own `.all` property.

`generalise()` can also be used instead of `new GN()` for simple values in all cases (except when passing a value of type `limbs`). So in the [first example](#new-gn), `const myGN = generalise(myOriginalNumber);` would have been equally valid sytax.

## Developer

### Test

Clone the repo. `npm i`  
`npm test`

### Test with yalc

If you've made local changes to this repo, and would like to test whether those (unpublished) changes will work with some dependent zkp appliation (zApp)...

...then you’ll need to install your local, ‘branched’ version of `general-number` in your zApp.

```sh
cd path/to/general-number/
yalc publish
```

You should see something like "`@eyblockchain/general-number@0.0.0-3df45b8c published in store.`". Notice the ‘signature’ `3df45b8c` .

```sh
cd path/to/your/zApp/
```

Remove the package-lock.json and the node_modules from your zApp's root (if they exist on your machine).

Then:

```sh
yalc add @eyblockchain/general-number
```

You’ll see that this has ‘swapped-in’ the ‘published’ (yalc version) of `general-number` in the `package.json`. It’s also created `.yalc.lock` (which shows that you’ve replaced the ‘proper’ npm package of `general-number` with your ‘yalc version’ (see the `signature` field in this file, which should match the signature from earlier)).

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

When you're happy that your local changes to `general-number` work and you wish to create a PR, you MUST remove any references to `yalc`, or the PR shouldn't be accepted.
