function test(title, callback) {
  console.log(title);
  callback();
}

// Starter
(() => {
  class Customer {
    constructor(name, discountRate) {
      this._name = name;
      this._discountRate = discountRate;
      this._contract = new CustomerContract(dateToday());
    }

    get discountRate() {
      return this._discountRate;
    }

    becomePreferred() {
      this._discountRate += 0.03;
      // other nice things
    }

    applyDiscount(amount) {
      return amount.subtract(amount.multiply(this._discountRate));
    }
  }

  class CustomerContract {
    constructor(startDate) {
      this._startDate = startDate;
    }
  }
  // Adding this because it should exist according to the examples:
  class Amount {
    constructor(aNumber) {
      this._value = aNumber;
    }

    subtract(aNumber) {
      return this._value - aNumber;
    }

    multiply(aNumber) {
      return this._value * aNumber;
    }
  }

  function dateToday() {
    return new Date();
  }

  test("Starter", () => {
    const keech = new Customer("Keech", 99);
    const amount = new Amount(1);
    const discount = keech.applyDiscount(amount);
    keech.becomePreferred();

    if (keech.discountRate === 99.03 && discount === -98) {
      console.log(` PASS`);
    } else {
      console.log(` FAIL`);
      console.log(` keech.discountRate: ${keech.discountRate}`);
      console.log(` discount: ${discount}`);
    }
  });
})();

// Refactored
(() => {
  class Customer {
    constructor(name, discountRate) {
      this._name = name;
      this._contract = new CustomerContract(dateToday());
      this._setDiscountRate(discountRate);
    }

    get discountRate() {
      return this._contract.discountRate;
    }

    _setDiscountRate(aNumber) {
      this._contract.discountRate = aNumber;
    }

    becomePreferred() {
      this._contract.discountRate += 0.03;
      // other nice things
    }

    applyDiscount(amount) {
      return amount.subtract(amount.multiply(this._contract.discountRate));
    }
  }

  class CustomerContract {
    constructor(startDate, discountRate) {
      this._startDate = startDate;
      this._discountRate = discountRate;
    }

    get discountRate() {
      return this._discountRate;
    }

    set discountRate(arg) {
      this._discountRate = arg;
    }
  }

  class Amount {
    constructor(value) {
      this._value = value;
    }

    subtract(val) {
      return this._value - val;
    }

    multiply(val) {
      return this._value * val;
    }
  }

  function dateToday() {
    return new Date();
  }

  test("Refactored", () => {
    const keech = new Customer("Keech", 99);
    const amount = new Amount(1);
    const discount = keech.applyDiscount(amount);
    keech.becomePreferred();

    if (keech.discountRate === 99.03 && discount === -98) {
      console.log(` PASS`);
    } else {
      console.log(` FAIL`);
      console.log(` keech.discountRate: ${keech.discountRate}`);
      console.log(` discount: ${discount}`);
    }
  });
})();
