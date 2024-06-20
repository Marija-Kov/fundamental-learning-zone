(() => {
  console.log("*** EXAMPLE 1 ***");
  // Starter
  (() => {
    function price(order) {
      //price is base price - quantity discount + shipping
      return (
        order.quantity * order.itemPrice -
        Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
        Math.min(order.quantity * order.itemPrice * 0.1, 100)
      );
    }

    test("Starter", () => {
      test(` returns correct output`, () => {
        const order = {
          quantity: 1000,
          itemPrice: 2,
        };
        const result = price(order);
        if (result === 2050) {
          console.log(`  ✅ PASS`);
        } else {
          console.log(`  ❌ FAIL: ${result}`);
        }
      });
    });
  })();

  // Refactored
  (() => {
    function price(order) {
      const basePrice = order.quantity * order.itemPrice;
      const quantityDiscount =
        Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
      const shippingPrice = Math.min(basePrice * 0.1, 100);
      return basePrice - quantityDiscount + shippingPrice;
    }

    test("Refactored", () => {
      test(` returns correct output`, () => {
        const order = {
          quantity: 1000,
          itemPrice: 2,
        };
        const result = price(order);
        if (result === 2050) {
          console.log(`  ✅ PASS`);
        } else {
          console.log(`  ❌ FAIL: ${result}`);
        }
      });
    });
  })();
})();

(() => {
  console.log("*** EXAMPLE 2 ***");
  // Starter
  (() => {
    class Order {
      constructor(aRecord) {
        this._data = aRecord;
      }
      get quantity() {
        return this._data.quantity;
      }
      get itemPrice() {
        return this._data.itemPrice;
      }

      get price() {
        return (
          this.quantity * this.itemPrice -
          Math.max(0, this.quantity - 500) * this.itemPrice * 0.05 +
          Math.min(this.quantity * this.itemPrice * 0.1, 100)
        );
      }
    }

    test("Starter", () => {
      test(` returns correct output`, () => {
        const order = new Order({
          quantity: 1000,
          itemPrice: 2,
        });
        if (order.price === 2050) {
          console.log(`  ✅ PASS`);
        } else {
          console.log(`  ❌ FAIL: ${order.price}`);
        }
      });
    });
  })();

  // Refactored
  (() => {
    class Order {
      constructor(aRecord) {
        this._data = aRecord;
      }
      get quantity() {
        return this._data.quantity;
      }
      get itemPrice() {
        return this._data.itemPrice;
      }

      get basePrice() {
        return this.quantity * this.itemPrice;
      }

      get quantityDiscount() {
        return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05;
      }

      get shippingPrice() {
        return Math.min(this.quantity * this.itemPrice * 0.1, 100);
      }

      get price() {
        return this.basePrice - this.quantityDiscount + this.shippingPrice;
      }
    }

    test("Refactored", () => {
      test(` returns correct output`, () => {
        const order = new Order({
          quantity: 1000,
          itemPrice: 2,
        });

        if (
          order.price === 2050 &&
          order.basePrice === 2000 &&
          order.quantityDiscount === 50 &&
          order.shippingPrice === 100
        ) {
          console.log(`  ✅ PASS`);
        } else {
          console.log(`  ❌ FAIL: 
            order.price: ${order.price},
            order.basePrice: ${order.basePrice},
            order.quantityDiscount: ${order.quantityDiscount},
            order.shippingPrice: ${order.shippingPrice},
            `);
        }
      });
    });
  })();
})();

/*
 Inline variable: when the expression is simple and self-descriptive, there is no need to name it.
*/

function test(title, callback) {
  console.log(title);
  callback();
}
