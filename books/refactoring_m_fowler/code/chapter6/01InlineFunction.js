(() => {
  console.log("*** EXAMPLE 1 ***");
  // Starter:
  (() => {
    function rating(aDriver) {
      return moreThanFiveLateDeliveries(aDriver) ? 2 : 1;
    }
    function moreThanFiveLateDeliveries(dvr) {
      return dvr.numberOfLateDeliveries > 5;
    }

    test("Starter:", () => {
      test(` low rating`, () => {
        const r = rating({ numberOfLateDeliveries: 2 });
        if (r === 1) {
          console.log(`  ✅ PASS`);
        } else {
          console.log(`  ❌ FAIL: ${r} === 1`);
        }
      });
      test(` high rating`, () => {
        const r = rating({ numberOfLateDeliveries: 7 });
        if (r === 2) {
          console.log(`  ✅ PASS`);
        } else {
          console.log(`  ❌ FAIL: ${r} === 1`);
        }
      });
    });
  })();

  // Refactored:
  (() => {
    function rating(aDriver) {
      return aDriver.numberOfLateDeliveries > 5 ? 2 : 1;
    }

    test("Refactored:", () => {
      test(` low rating`, () => {
        const r = rating({ numberOfLateDeliveries: 2 });
        if (r === 1) {
          console.log(`  ✅ PASS`);
        } else {
          console.log(`  ❌ FAIL: ${r} === 1`);
        }
      });
      test(` high rating`, () => {
        const r = rating({ numberOfLateDeliveries: 7 });
        if (r === 2) {
          console.log(`  ✅ PASS`);
        } else {
          console.log(`  ❌ FAIL: ${r} === 1`);
        }
      });
    });
  })();
})();

(() => {
  console.log("*** EXAMPLE 2 ***");
  // Starter
  (() => {
    function reportLines(aCustomer) {
      const lines = [];
      gatherCustomerData(lines, aCustomer);
      return lines;
    }
    function gatherCustomerData(out, aCustomer) {
      out.push(["name", aCustomer.name]);
      out.push(["location", aCustomer.location]);
    }

    test("Starter", () => {
      test(` returns correct output`, () => {
        const result = reportLines({ name: "keech", location: "nearby" });
        if (result[0][0] === "name" && result[0][1] === "keech") {
          console.log(`  ✅ PASS`);
        } else {
          console.log(`  ❌ FAIL: ${result[0]}`);
        }
      });
    });
  })();

  // Refactored
  (() => {
    function reportLines(aCustomer) {
      return Object.keys(aCustomer).map((key) => [key, aCustomer[key]]);
    }

    test("Refactored", () => {
      test(` returns correct output`, () => {
        const result = reportLines({ name: "keech", location: "nearby" });
        if (result[0][0] === "name" && result[0][1] === "keech") {
          console.log(`  ✅ PASS`);
        } else {
          console.log(`  ❌ FAIL: ${result[0]}`);
        }
      });
    });
  })();
})();

function test(title, callback) {
  console.log(title);
  callback();
}
