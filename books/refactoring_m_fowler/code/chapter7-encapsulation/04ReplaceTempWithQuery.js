function test(title, callback) {
  console.log(title);
  callback();
}

// Starter
(() => {
  class Order {
    constructor(quantity, item) {
      this._quantity = quantity;
      this._item = item;
    }

    get price() {
      var basePrice = this._quantity * this._item.price;
      var discountFactor = 0.98;
      if (basePrice > 1000) {
        discountFactor -= 0.03;
      }
      return basePrice * discountFactor;
    }
  }

  test("starter: gets correct price", () => {
    const order1 = new Order(100, { price: 20 });
    if (order1.price === 1900) {
      console.log(` PASS`);
    } else {
      console.log(` FAIL`);
      console.log(order1.price);
    }
  });
})();

// Refactored
(() => {
  class Order {
    constructor(quantity, item) {
      this._quantity = quantity;
      this._item = item;
    }

    get price() {
      return this.basePrice * this.discount;
    }

    get basePrice() {
      return this._quantity * this._item.price;
    }

    get discount() {
      return this.basePrice > 1000
        ? this._item.discountFactor - 0.03
        : this._item.discountFactor;
    }
  }

  test("refactored: gets correct price", () => {
    const order1 = new Order(100, { price: 20, discountFactor: 0.98 });
    if (order1.price === 1900) {
      console.log(` PASS`);
    } else {
      console.log(` FAIL`);
      console.log(order1.price);
    }
  });
})();
