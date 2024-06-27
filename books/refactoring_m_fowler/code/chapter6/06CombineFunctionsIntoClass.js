const reading = {
  customer: "keech",
  quantity: 10,
  month: 5,
  year: 2017,
};

(() => {
  const aReading = acquireReading();
  const baseCharge =
    baseRate(aReading.month, aReading.year) * aReading.quantity;
})();

(() => {
  const aReading = acquireReading();
  const base = baseRate(aReading.month, aReading.year) * aReading.quantity;
  const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
})();

(() => {
  const aReading = acquireReading();
  const basicChargeAmount = calculateBaseCharge(aReading);

  function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
  }
})();

(() => {
  class Reading {
    constructor(data) {
      this._customer = data.customer;
      this._quantity = data.quantity;
      this._month = data.month;
      this._year = data.year;
    }
    get customer() {
      return this._customer;
    }
    get quantity() {
      return this._quantity;
    }
    get month() {
      return this._month;
    }
    get year() {
      return this._year;
    }
  }
  const rawReading = acquireReading();
  const aReading = new Reading(rawReading);
  const basicChargeAmount = calculateBaseCharge(aReading);
})();

(() => {
  class Reading {
    constructor(data) {
      this._customer = data.customer;
      this._quantity = data.quantity;
      this._month = data.month;
      this._year = data.year;
    }
    get customer() {
      return this._customer;
    }
    get quantity() {
      return this._quantity;
    }
    get month() {
      return this._month;
    }
    get year() {
      return this._year;
    }
    get calculateBaseCharge() {
      return baseRate(this.month, this.year) * this.quantity;
    }
  }

  const rawReading = acquireReading();
  const aReading = new Reading(rawReading);
  const basicChargeAmount = calculateBaseCharge(aReading);
})();

(() => {
  class Reading {
    constructor(data) {
      this._customer = data.customer;
      this._quantity = data.quantity;
      this._month = data.month;
      this._year = data.year;
    }
    get customer() {
      return this._customer;
    }
    get quantity() {
      return this._quantity;
    }
    get month() {
      return this._month;
    }
    get year() {
      return this._year;
    }
    get baseCharge() {
      return baseRate(this.month, this.year) * this.quantity;
    }
    get taxableCharge() {
      return Math.max(0, this.baseCharge - taxThreshold(this.year));
    }
  }

  const rawReading = acquireReading();
  const aReading = new Reading(rawReading);
  const baseCharge = aReading.baseCharge;
  const taxableCharge = aReading.taxableCharge;
})();
