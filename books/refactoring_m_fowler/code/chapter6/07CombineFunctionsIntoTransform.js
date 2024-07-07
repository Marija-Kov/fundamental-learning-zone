const _ = require("lodash");

function test(title, callback) {
  console.log(title);
  callback();
}

const reading = {
  customer: "keech",
  quantity: 10,
  month: 5,
  year: 2017,
};

function acquireReading() {
  return reading;
}

function baseRate(month, year) {
  // I really have no idea what this is supposed to do with month and year
  return month * year;
}

function taxThreshold(year) {
 // and I'm just making this up as well
  return Math.floor(year/12);
}

// 1
(() => {
  const aReading = acquireReading();
  const baseCharge =
    baseRate(aReading.month, aReading.year) * aReading.quantity;
})();

// 2
(() => {
  const aReading = acquireReading();
  const base = baseRate(aReading.month, aReading.year) * aReading.quantity;
  const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
})();

// 3
(() => {
  const aReading = acquireReading();
  const basicChargeAmount = calculateBaseCharge(aReading);
  const taxableCharge = Math.max(
    0,
    basicChargeAmount - taxThreshold(aReading.year)
  );

  function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
  }
})();

// 4
(() => {
  const rawReading = acquireReading();
  const aReading = enrichReading(rawReading);
  const basicChargeAmount = calculateBaseCharge(aReading);
  const taxableCharge = Math.max(
    0,
    basicChargeAmount - taxThreshold(aReading.year)
  );
  // the transformer
  function enrichReading(original) {
    const result = _.cloneDeep(original); // lodash method
    return result;
  }

  function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
  }
})();

// 5
(() => {
  const rawReading = acquireReading();
  const aReading = enrichReading(rawReading);
  const basicChargeAmount = aReading.baseCharge;
  const taxableCharge = Math.max(
    0,
    basicChargeAmount - taxThreshold(aReading.year)
  );

  function enrichReading(original) {
    const result = _.cloneDeep(original);
    return result;
  }

  test("Refactored", () => {
    test(` raw reading not mutated`, () => {
      if (
        rawReading.customer === "keech" &&
        rawReading.month === 5 &&
        rawReading.quantity === 10 &&
        rawReading.year === 2017
      ) {
        console.log(`  ✅ PASS`);
      } else {
        console.log(`  ❌ FAIL:`);
        console.dir(rawReading);
      }
    });
  });
})();

// 6
(() => {
  const rawReading = acquireReading();
  const aReading = enrichReading(rawReading);
  const base = aReading.baseCharge;
  const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));

  function enrichReading(original) {
    const result = _.cloneDeep(original);
    return result;
  }
})();

// 7
(() => {
  const rawReading = acquireReading();
  const aReading = enrichReading(rawReading);
  const taxableCharge = aReading.taxableCharge;

  function enrichReading(original) {
    const result = _.cloneDeep(original);
    result.baseCharge = calculateBaseCharge(result);
    result.taxableCharge = Math.max(
        0,
        result.baseCharge - taxThreshold(result.year)
    );

    return result;
  }

  function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
  }

  test("Refactored", () => {
    test(` gets the right taxable charge`, () => {
      if (taxableCharge == 100682) {
        console.log(`  ✅ PASS`);
      } else {
        console.log(`  ❌ FAIL:`);
        console.dir(taxableCharge);
      }
    });
  });
})();
