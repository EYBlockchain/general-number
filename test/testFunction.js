/**
 * To test functions for Bigint input(s) in function.js
 */
const chai = require("chai");
funcs = require("../function");

describe("addBigInt function", function () {
  const inputs = [
    {
      _bigintA: 10000n,
      _bigintB: 10000n,
      _output: 20000n,
    },
    {
      _bigintA: 2124979127492149712904023748231859237523n,
      _bigintB: 1n,
      _output: 2124979127492149712904023748231859237524n,
    },
    {
      _bigintA: -2124979127492149712904023748231859237523n,
      _bigintB: -1n,
      _output: -2124979127492149712904023748231859237524n,
    },
  ];

  for (const input of inputs) {
    describe(`addBigInt(${input._bigintA},${input._bigintB})`, function () {
      it(`should return ${input._output}`, function () {
        const ret = funcs.addBigInt(input._bigintA, input._bigintB);
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});

describe("subBigInt function", function () {
  const inputs = [
    {
      _bigintA: 10000n,
      _bigintB: 10000n,
      _output: 0n,
    },
    {
      _bigintA: 2124979127492149712904023748231859237523n,
      _bigintB: 1n,
      _output: 2124979127492149712904023748231859237522n,
    },
    {
      _bigintA: 1n,
      _bigintB: 2124979127492149712904023748231859237523n,
      _output: -2124979127492149712904023748231859237522n,
    },
  ];

  for (const input of inputs) {
    describe(`subBigInt(${input._bigintA},${input._bigintB})`, function () {
      it(`should return ${input._output}`, function () {
        const ret = funcs.subBigInt(input._bigintA, input._bigintB);
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});

describe("mulBigInt function", function () {
  const inputs = [
    {
      _bigintA: 0n,
      _bigintB: 10000n,
      _output: 0n,
    },
    {
      _bigintA: 2n,
      _bigintB: 1n,
      _output: 2n,
    },
    {
      _bigintA: -11n,
      _bigintB: 1n,
      _output: -11n,
    },
  ];

  for (const input of inputs) {
    describe(`mulBigInt(${input._bigintA},${input._bigintB})`, function () {
      it(`should return ${input._output}`, function () {
        const ret = funcs.mulBigInt(input._bigintA, input._bigintB);
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});

describe("addModBigInt function", function () {
  const inputs = [
    {
      _bigintA: 10000n,
      _bigintB: 10000n,
      _m: 3n,
      _output: 2n,
    },
    {
      _bigintA: 2124979127492149712904023748231859237523n,
      _bigintB: 1n,
      _m: 2n,
      _output: 0n,
    },
    {
      _bigintA: -2124979127492149712904023748231859237523n,
      _bigintB: -1n,
      _m: 2n,
      _output: 0n,
    },
  ];

  for (const input of inputs) {
    describe(`addModBigInt(${input._bigintA},${input._bigintB},${input._m})`, function () {
      it(`should return ${input._output}`, function () {
        const ret = funcs.addModBigInt(
          input._bigintA,
          input._bigintB,
          input._m
        );
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});

describe("subModBigInt function", function () {
  const inputs = [
    {
      _bigintA: 30000n,
      _bigintB: 10000n,
      _m: 3n,
      _output: 2n,
    },
    {
      _bigintA: 2124979127492149712904023748231859237525n,
      _bigintB: 1n,
      _m: 2n,
      _output: 0n,
    },
    {
      _bigintA: -2124979127492149712904023748231859237525n,
      _bigintB: -1n,
      _m: 2n,
      _output: 0n,
    },
  ];

  for (const input of inputs) {
    describe(`subModBigInt(${input._bigintA},${input._bigintB},${input._m})`, function () {
      it(`should return ${input._output}`, function () {
        const ret = funcs.subModBigInt(
          input._bigintA,
          input._bigintB,
          input._m
        );
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});

describe("mulModBigInt function", function () {
  const inputs = [
    {
      _bigintA: 200n,
      _bigintB: 100n,
      _m: 3n,
      _output: 2n,
    },
    {
      _bigintA: 2124979127492149712904023748231859237525n,
      _bigintB: 1n,
      _m: 2n,
      _output: 1n,
    },
    {
      _bigintA: -2124979127492149712904023748231859237525n,
      _bigintB: -1n,
      _m: 2n,
      _output: 1n,
    },
  ];

  for (const input of inputs) {
    describe(`mulModBigInt(${input._bigintA},${input._bigintB},${input._m})`, function () {
      it(`should return ${input._output}`, function () {
        const ret = funcs.mulModBigInt(
          input._bigintA,
          input._bigintB,
          input._m
        );
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});

describe("powModBigInt function", function () {
  const inputs = [
    {
      _base: 2n,
      _exponent: 3n,
      _m: 2n,
      _output: 0n,
    },
    {
      _base: 4n,
      _exponent: -1n,
      _m: 19n,
      _output: 5n,
    },
  ];

  for (const input of inputs) {
    describe(`powModBigInt(${input._base},${input._exponent},${input._m})`, function () {
      it(`should return ${input._output}`, function () {
        const ret = funcs.powModBigInt(input._base, input._exponent, input._m);
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});

describe("absBigInt function", function () {
  const inputs = [
    {
      _bigint: -2n,
      _output: 2n,
    },
    {
      _bigint: 2n,
      _output: 2n,
    },
  ];

  for (const input of inputs) {
    describe(`absBigInt(${input._bigint})`, function () {
      it(`should return ${input._output}`, function () {
        const ret = funcs.absBigInt(input._output);
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});

describe("eGcdBigInt function", function () {
  const inputs = [
    {
      _bigintA: 1n,
      _bigintB: 2n,
      _output: { g: 1n, x: 1n, y: 0n },
    },
  ];

  for (const input of inputs) {
    describe(`eGcdBigInt(${input._bigintA},${input._bigintB})`, function () {
      it(`should return ${input._output}`, function () {
        const ret = funcs.eGcdBigInt(input._bigintA, input._bigintB);
        chai.expect(ret).to.eql(input._output);
      });
    });
  }
});

describe("gcdBigInt function", function () {
  const inputs = [
    {
      _bigintA: 1n,
      _bigintB: 2n,
      _output: 1n,
    },
  ];

  for (const input of inputs) {
    describe(`gcdBigInt(${input._bigintA},${input._bigintB})`, function () {
      it(`should return ${input._output}`, function () {
        const ret = funcs.gcdBigInt(input._bigintA, input._bigintB);
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});

describe("lcmBigInt function", function () {
  const inputs = [
    {
      _bigintA: 1n,
      _bigintB: 0n,
      _output: 0n,
    },
    {
      _bigintA: 0n,
      _bigintB: 1n,
      _output: 0n,
    },
    {
      _bigintA: 123123123n,
      _bigintB: 124235134n,
      _output: 15296217684403482n,
    },
  ];

  for (const input of inputs) {
    describe(`lcmBigInt(${input._bigintA},${input._bigintB})`, function () {
      it(`should return ${input._output}`, function () {
        const ret = funcs.lcmBigInt(input._bigintA, input._bigintB);
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});

describe("maxBigInt function", function () {
  const inputs = [
    {
      _bigintA: 1n,
      _bigintB: 0n,
      _output: 1n,
    },
    {
      _bigintA: 1n,
      _bigintB: 1n,
      _output: 1n,
    },
    {
      _bigintA: 123123123n,
      _bigintB: 1242352353465426245634n,
      _output: 1242352353465426245634n,
    },
  ];

  for (const input of inputs) {
    describe(`maxBigInt(${input._bigintA},${input._bigintB})`, function () {
      it(`should return ${input._output}`, function () {
        const ret = funcs.maxBigInt(input._bigintA, input._bigintB);
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});

describe("minBigInt function", function () {
  const inputs = [
    {
      _bigintA: 1n,
      _bigintB: 0n,
      _output: 0n,
    },
    {
      _bigintA: 1n,
      _bigintB: 1n,
      _output: 1n,
    },
    {
      _bigintA: 123123123n,
      _bigintB: 1242352353465426245634n,
      _output: 123123123n,
    },
  ];

  for (const input of inputs) {
    describe(`minBigInt(${input._bigintA},${input._bigintB})`, function () {
      it(`should return ${input._output}`, function () {
        const ret = funcs.minBigInt(input._bigintA, input._bigintB);
        chai.expect(ret).to.equal(input._output);
      });
    });
  }
});
