const { generalise, GN, GO } = require('./index');
const gnNumber = new GN(333);
const gnLimbs = new GN([4n, 2n], 2n);
const gnUtf8 = new GN('hello');
const gnBinary = new GN('110110');
const gnBigint = new GN(120n);
const gnHex = new GN('0x123');
const gnNumber2 = new GN(333333);

console.log(gnBigint.min(gnNumber2));
