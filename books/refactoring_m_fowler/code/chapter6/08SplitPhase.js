const product = {
  basePrice: 100,
  discountRate: 2,
  discountThreshold: 50,
};

const shippingMethod = {
  feePerCase: 10,
  discountedFee: 5,
  discountThreshold: 60,
};

function test(title, callback) {
  console.log(title);
  callback();
}

// Starter
(() => {
  function priceOrder(product, quantity, shippingMethod) {
    const basePrice = product.basePrice * quantity;
    const discount =
      Math.max(quantity - product.discountThreshold, 0) *
      product.basePrice *
      product.discountRate;
    const shippingPerCase =
      basePrice > shippingMethod.discountThreshold
        ? shippingMethod.discountedFee
        : shippingMethod.feePerCase;
    const shippingCost = quantity * shippingPerCase;
    const price = basePrice - discount + shippingCost;
    return price;
  }

  test("Starter", () => {
    test(` returns correct output`, () => {
      const result = priceOrder(product, 100, shippingMethod);
      if (result === 500) {
        console.log(`  ✅ PASS`);
      } else {
        console.log(`  ❌ FAIL: ${result}`);
      }
    });
  });
})();

// Refactored
(() => {
  function priceOrder(product, quantity, shippingMethod) {
    const priceData = calculatePricingData(product, quantity);
    return applyShipping(priceData, shippingMethod);
  }

  function calculatePricingData(product, quantity) {
    return {
      basePrice: product.basePrice * quantity,
      quantity: quantity,
      discount:
        Math.max(quantity - product.discountThreshold, 0) *
        product.basePrice *
        product.discountRate,
    };
  }

  function applyShipping(priceData, shippingMethod) {
    const shippingPerCase =
      priceData.basePrice > shippingMethod.discountThreshold
        ? shippingMethod.discountedFee
        : shippingMethod.feePerCase;
    const shippingCost = priceData.quantity * shippingPerCase;
    return priceData.basePrice - priceData.discount + shippingCost;
  }

  test("Refactored", () => {
    test(` returns correct output`, () => {
      const result = priceOrder(product, 100, shippingMethod);
      if (result === 500) {
        console.log(`  ✅ PASS`);
      } else {
        console.log(`  ❌ FAIL: ${result}`);
      }
    });
  });
})();
