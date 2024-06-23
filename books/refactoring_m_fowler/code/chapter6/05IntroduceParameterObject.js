(() => {
  console.log("*** EXAMPLE 1 ***");
  // Starter
  (() => {
    function readingsOutsideRange(station, min, max) {
      return station.readings.filter((r) => r.temp < min || r.temp > max);
    }

    test("Starter", () => {
      test(` returns correct output`, () => {
        const station = {
          name: "ZB1",
          readings: [
            { temp: 47, time: "2016-11-10 09:10" },
            { temp: 53, time: "2016-11-10 09:20" },
            { temp: 58, time: "2016-11-10 09:30" },
            { temp: 53, time: "2016-11-10 09:40" },
            { temp: 51, time: "2016-11-10 09:50" },
          ],
        };
        const operatingPlan = {
          temperatureFloor: 50,
          temperatureCeiling: 55,
        };
        const result = readingsOutsideRange(
          station,
          operatingPlan.temperatureFloor,
          operatingPlan.temperatureCeiling
        );
        if (result[0].temp === 47 && result[1].temp === 58) {
          console.log(`  ✅ PASS`);
        } else {
          console.log(`  ❌ FAIL`);
          console.log(result);
        }
      });
    });
  })();

  // Refactored I
  (() => {
    function readingsOutsideRange(station, range) {
      return station.readings.filter(
        (r) => r.temp < range.min || r.temp > range.max
      );
    }
    // Using class instead of plain object opens new possibilities (see Refactor II)
    class NumberRange {
      constructor(min, max) {
        this._data = { min: min, max: max };
      }
      get min() {
        return this._data.min;
      }
      get max() {
        return this._data.max;
      }
    }

    test("Refactored I", () => {
      test(` returns correct output`, () => {
        const station = {
          name: "ZB1",
          readings: [
            { temp: 47, time: "2016-11-10 09:10" },
            { temp: 53, time: "2016-11-10 09:20" },
            { temp: 58, time: "2016-11-10 09:30" },
            { temp: 53, time: "2016-11-10 09:40" },
            { temp: 51, time: "2016-11-10 09:50" },
          ],
        };
        const operatingPlan = {
          temperatureFloor: 50,
          temperatureCeiling: 55,
        };
        const range = new NumberRange(
          operatingPlan.temperatureFloor,
          operatingPlan.temperatureCeiling
        );
        const result = readingsOutsideRange(station, range);
        if (result[0].temp === 47 && result[1].temp === 58) {
          console.log(`  ✅ PASS`);
        } else {
          console.log(`  ❌ FAIL`);
          console.log(result);
        }
      });
    });
  })();

  // Refactored II
  (() => {
    function readingsOutsideRange(station, range) {
      return station.readings.filter((r) => !range.isWithinRange(r.temp));
    }
    class NumberRange {
      constructor(min, max) {
        this._data = { min: min, max: max };
      }
      get min() {
        return this._data.min;
      }
      get max() {
        return this._data.max;
      }
      isWithinRange(value) {
        return value > this._data.min && value < this._data.max;
      }
    }

    test("Refactored II - extract function and move into class method", () => {
      test(` returns correct output`, () => {
        const station = {
          name: "ZB1",
          readings: [
            { temp: 47, time: "2016-11-10 09:10" },
            { temp: 53, time: "2016-11-10 09:20" },
            { temp: 58, time: "2016-11-10 09:30" },
            { temp: 53, time: "2016-11-10 09:40" },
            { temp: 51, time: "2016-11-10 09:50" },
          ],
        };
        const operatingPlan = {
          temperatureFloor: 50,
          temperatureCeiling: 55,
        };
        const range = new NumberRange(
          operatingPlan.temperatureFloor,
          operatingPlan.temperatureCeiling
        );
        const result = readingsOutsideRange(station, range);
        if (result[0].temp === 47 && result[1].temp === 58) {
          console.log(`  ✅ PASS`);
        } else {
          console.log(`  ❌ FAIL`);
          console.log(result);
        }
      });
    });
  })();
})();

function test(title, callback) {
  console.log(title);
  callback();
}
