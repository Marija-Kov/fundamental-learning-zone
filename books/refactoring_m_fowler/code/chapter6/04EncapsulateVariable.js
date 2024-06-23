(() => {
  // Starter
  let defaultOwner = { firstName: "Martin", lastName: "Fowler" };
  const spaceship = {};
  spaceship.owner = defaultOwner;
  defaultOwner = { firstName: "Rebecca", lastName: "Parsons" };

  test("Starter", () => {
    test(` returns correct output`, () => {
      if (
        defaultOwner.firstName === "Rebecca" &&
        spaceship.owner.firstName === "Martin"
      ) {
        console.log(`  ✅ PASS`);
      } else {
        console.log(
          `  ❌ FAIL: defaultOwner.firstname: ${defaultOwner.firstName}, spaceship.owner.firstName:${spaceship.owner.firstName}
          `
        );
      }
    });
  });
})();

(() => {
  // Step 1: define functions to read and write data
  let defaultOwner = { firstName: "Martin", lastName: "Fowler" };
  const spaceship = {};
  spaceship.owner = defaultOwner;
  defaultOwner = { firstName: "Rebecca", lastName: "Parsons" };

  function getDefaultOwner() {
    return defaultOwner;
  }
  function setDefaultOwner(arg) {
    defaultOwner = arg;
  }
})();

(() => {
  // Step 2: replace references with a function call
  let defaultOwner = { firstName: "Martin", lastName: "Fowler" };
  const spaceship = {};
  spaceship.owner = getDefaultOwner();
  setDefaultOwner({ firstName: "Rebecca", lastName: "Parsons" });

  function getDefaultOwner() {
    return defaultOwner;
  }
  function setDefaultOwner(arg) {
    defaultOwner = arg;
  }

  test("Starter", () => {
    test(` returns correct output`, () => {
      if (
        defaultOwner.firstName === "Rebecca" &&
        spaceship.owner.firstName === "Martin"
      ) {
        console.log(`  ✅ PASS`);
      } else {
        console.log(
          `  ❌ FAIL: defaultOwner.firstname: ${defaultOwner.firstName}, spaceship.owner.firstName: ${spaceship.owner.firstName}
          `
        );
      }
    });
  });
})();

function test(title, callback) {
  console.log(title);
  callback();
}
