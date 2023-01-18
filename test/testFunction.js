/**
 * To test functions for Bigint input(s) in function.js
 */
const chai = require('chai');
const funcs = require('../function');

// eslint-disable-next-line func-names
describe('addBigInt function', function () {
  const inputs = [
    {
      _bigintA: BigInt(10000),
      _bigintB: BigInt(10000),
      _output: BigInt(20000),
    },
    {
      _bigintA: BigInt('2124979127492149712904023748231859237523'),
      _bigintB: BigInt(1),
      _output: BigInt('2124979127492149712904023748231859237524'),
    },
    {
      _bigintA: BigInt('-2124979127492149712904023748231859237523'),
      _bigintB: BigInt(-1),
      _output: BigInt('-2124979127492149712904023748231859237524'),
    },
  ];

  for (const input of inputs) {
    // eslint-disable-next-line func-names
    describe(`addBigInt(${input._bigintA},${input._bigintB})`, function () {
      // eslint-disable-next-line func-names
      it(`should return ${input._output}`, function () {
        const ret = funcs.addBigInt(input._bigintA, input._bigintB);
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});

// eslint-disable-next-line func-names
describe('subBigInt function', function () {
  const inputs = [
    {
      _bigintA: BigInt(10000),
      _bigintB: BigInt(10000),
      _output: BigInt(0),
    },
    {
      _bigintA: BigInt('2124979127492149712904023748231859237523'),
      _bigintB: BigInt(1),
      _output: BigInt('2124979127492149712904023748231859237522'),
    },
    {
      _bigintA: BigInt(1),
      _bigintB: BigInt('2124979127492149712904023748231859237523'),
      _output: BigInt('-2124979127492149712904023748231859237522'),
    },
  ];

  for (const input of inputs) {
    // eslint-disable-next-line func-names
    describe(`subBigInt(${input._bigintA},${input._bigintB})`, function () {
      // eslint-disable-next-line func-names
      it(`should return ${input._output}`, function () {
        const ret = funcs.subBigInt(input._bigintA, input._bigintB);
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});

// eslint-disable-next-line func-names
describe('mulBigInt function', function () {
  const inputs = [
    {
      _bigintA: BigInt(0),
      _bigintB: BigInt(10000),
      _output: BigInt(0),
    },
    {
      _bigintA: BigInt(2),
      _bigintB: BigInt(1),
      _output: BigInt(2),
    },
    {
      _bigintA: BigInt(-11),
      _bigintB: BigInt(1),
      _output: BigInt(-11),
    },
  ];

  for (const input of inputs) {
    // eslint-disable-next-line func-names
    describe(`mulBigInt(${input._bigintA},${input._bigintB})`, function () {
      // eslint-disable-next-line func-names
      it(`should return ${input._output}`, function () {
        const ret = funcs.mulBigInt(input._bigintA, input._bigintB);
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});

// eslint-disable-next-line func-names
describe('addModBigInt function', function () {
  const inputs = [
    {
      _bigintA: BigInt(10000),
      _bigintB: BigInt(10000),
      _m: BigInt(3),
      _output: BigInt(2),
    },
    {
      _bigintA: BigInt('2124979127492149712904023748231859237523'),
      _bigintB: BigInt(1),
      _m: BigInt(2),
      _output: BigInt(0),
    },
    {
      _bigintA: BigInt('-2124979127492149712904023748231859237523'),
      _bigintB: BigInt(-1),
      _m: BigInt(2),
      _output: BigInt(0),
    },
  ];

  for (const input of inputs) {
    // eslint-disable-next-line func-names
    describe(`addModBigInt(${input._bigintA},${input._bigintB},${input._m})`, function () {
      // eslint-disable-next-line func-names
      it(`should return ${input._output}`, function () {
        const ret = funcs.addModBigInt(input._bigintA, input._bigintB, input._m);
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});

// eslint-disable-next-line func-names
describe('subModBigInt function', function () {
  const inputs = [
    {
      _bigintA: BigInt(30000),
      _bigintB: BigInt(10000),
      _m: BigInt(3),
      _output: BigInt(2),
    },
    {
      _bigintA: BigInt('2124979127492149712904023748231859237525'),
      _bigintB: BigInt(1),
      _m: BigInt(2),
      _output: BigInt(0),
    },
    {
      _bigintA: BigInt('-2124979127492149712904023748231859237525'),
      _bigintB: BigInt(-1),
      _m: BigInt(2),
      _output: BigInt(0),
    },
  ];

  for (const input of inputs) {
    // eslint-disable-next-line func-names
    describe(`subModBigInt(${input._bigintA},${input._bigintB},${input._m})`, function () {
      // eslint-disable-next-line func-names
      it(`should return ${input._output}`, function () {
        const ret = funcs.subModBigInt(input._bigintA, input._bigintB, input._m);
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});

// eslint-disable-next-line func-names
describe('mulModBigInt function', function () {
  const inputs = [
    {
      _bigintA: BigInt(200),
      _bigintB: BigInt(100),
      _m: BigInt(3),
      _output: BigInt(2),
    },
    {
      _bigintA: BigInt('2124979127492149712904023748231859237525'),
      _bigintB: BigInt(1),
      _m: BigInt(2),
      _output: BigInt(1),
    },
    {
      _bigintA: BigInt('-2124979127492149712904023748231859237525'),
      _bigintB: BigInt(-1),
      _m: BigInt(2),
      _output: BigInt(1),
    },
  ];

  for (const input of inputs) {
    // eslint-disable-next-line func-names
    describe(`mulModBigInt(${input._bigintA},${input._bigintB},${input._m})`, function () {
      // eslint-disable-next-line func-names
      it(`should return ${input._output}`, function () {
        const ret = funcs.mulModBigInt(input._bigintA, input._bigintB, input._m);
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});

// eslint-disable-next-line func-names
describe('powModBigInt function', function () {
  const inputs = [
    {
      _base: BigInt(2),
      _exponent: BigInt(3),
      _m: BigInt(2),
      _output: BigInt(0),
    },
    {
      _base: BigInt(4),
      _exponent: BigInt(-1),
      _m: BigInt(19),
      _output: BigInt(5),
    },
  ];

  for (const input of inputs) {
    // eslint-disable-next-line func-names
    describe(`powModBigInt(${input._base},${input._exponent},${input._m})`, function () {
      // eslint-disable-next-line func-names
      it(`should return ${input._output}`, function () {
        const ret = funcs.powModBigInt(input._base, input._exponent, input._m);
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});

// eslint-disable-next-line func-names
describe('absBigInt function', function () {
  const inputs = [
    {
      _bigint: BigInt(-2),
      _output: BigInt(2),
    },
    {
      _bigint: BigInt(2),
      _output: BigInt(2),
    },
  ];

  for (const input of inputs) {
    // eslint-disable-next-line func-names
    describe(`absBigInt(${input._bigint})`, function () {
      // eslint-disable-next-line func-names
      it(`should return ${input._output}`, function () {
        const ret = funcs.absBigInt(input._output);
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});

// eslint-disable-next-line func-names
describe('eGcdBigInt function', function () {
  const inputs = [
    {
      _bigintA: BigInt(1),
      _bigintB: BigInt(2),
      _output: { g: BigInt(1), x: BigInt(1), y: BigInt(0) },
    },
  ];

  for (const input of inputs) {
    // eslint-disable-next-line func-names
    describe(`eGcdBigInt(${input._bigintA},${input._bigintB})`, function () {
      // eslint-disable-next-line func-names
      it(`should return ${input._output}`, function () {
        const ret = funcs.eGcdBigInt(input._bigintA, input._bigintB);
        chai.expect(ret).to.eql(input._output);
      });
    });
  }
});

// eslint-disable-next-line func-names
describe('gcdBigInt function', function () {
  const inputs = [
    {
      _bigintA: BigInt(1),
      _bigintB: BigInt(2),
      _output: BigInt(1),
    },
  ];

  for (const input of inputs) {
    // eslint-disable-next-line func-names
    describe(`gcdBigInt(${input._bigintA},${input._bigintB})`, function () {
      // eslint-disable-next-line func-names
      it(`should return ${input._output}`, function () {
        const ret = funcs.gcdBigInt(input._bigintA, input._bigintB);
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});

// eslint-disable-next-line func-names
describe('lcmBigInt function', function () {
  const inputs = [
    {
      _bigintA: BigInt(1),
      _bigintB: BigInt(0),
      _output: BigInt(0),
    },
    {
      _bigintA: BigInt(0),
      _bigintB: BigInt(1),
      _output: BigInt(0),
    },
    {
      _bigintA: BigInt(123123123),
      _bigintB: BigInt(124235134),
      _output: BigInt('15296217684403482'),
    },
  ];

  for (const input of inputs) {
    // eslint-disable-next-line func-names
    describe(`lcmBigInt(${input._bigintA},${input._bigintB})`, function () {
      // eslint-disable-next-line func-names
      it(`should return ${input._output}`, function () {
        const ret = funcs.lcmBigInt(input._bigintA, input._bigintB);
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});

// eslint-disable-next-line func-names
describe('maxBigInt function', function () {
  const inputs = [
    {
      _bigintA: BigInt(1),
      _bigintB: BigInt(0),
      _output: BigInt(1),
    },
    {
      _bigintA: BigInt(1),
      _bigintB: BigInt(1),
      _output: BigInt(1),
    },
    {
      _bigintA: BigInt(123123123),
      _bigintB: BigInt('1242352353465426245634'),
      _output: BigInt('1242352353465426245634'),
    },
  ];

  for (const input of inputs) {
    // eslint-disable-next-line func-names
    describe(`maxBigInt(${input._bigintA},${input._bigintB})`, function () {
      // eslint-disable-next-line func-names
      it(`should return ${input._output}`, function () {
        const ret = funcs.maxBigInt(input._bigintA, input._bigintB);
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});

// eslint-disable-next-line func-names
describe('minBigInt function', function () {
  const inputs = [
    {
      _bigintA: BigInt(1),
      _bigintB: BigInt(0),
      _output: BigInt(0),
    },
    {
      _bigintA: BigInt(1),
      _bigintB: BigInt(1),
      _output: BigInt(1),
    },
    {
      _bigintA: BigInt(123123123),
      _bigintB: BigInt('1242352353465426245634'),
      _output: BigInt(123123123),
    },
  ];

  for (const input of inputs) {
    // eslint-disable-next-line func-names
    describe(`minBigInt(${input._bigintA},${input._bigintB})`, function () {
      // eslint-disable-next-line func-names
      it(`should return ${input._output}`, function () {
        const ret = funcs.minBigInt(input._bigintA, input._bigintB);
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});
