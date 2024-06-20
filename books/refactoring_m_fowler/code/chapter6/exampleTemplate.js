// refactoring template

(() => {
  console.log("*** EXAMPLE 1 ***");
  // Starter
  (() => {

    test("Starter", () => {
      test(` returns correct output`, () => {
        const result = 0;
        if (result) {
          console.log(`  ✅ PASS`);
        } else {
          console.log(`  ❌ FAIL: ${result[0]}`);
        }
      });
    });
  })();

  // Refactored
  (() => {

    test("Refactored", () => {
      test(` returns correct output`, () => {
        const result = 0;
        if (result) {
          console.log(`  ✅ PASS`);
        } else {
          console.log(`  ❌ FAIL: ${result}`);
        }
      });
    });
  })();
})();

function test(title, callback) {
  console.log(title);
  callback();
}