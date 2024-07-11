import _ from "lodash";
function test(title, callback) {
  console.log(title);
  callback();
}

// Simple record
(() => {
  // Starter
  (() => {
    const org = { name: "Acme Gooseberries", country: "GB" };
    // Access:
    // org.name; org.name = "new name";
    function getRawDataOfOrg() {
      return org;
    }
    // Access:
    // getRawDataOrg().name;
  })();

  // Refactored
  (() => {
    class Organization {
      constructor(data) {
        this._name = data.name;
        this._country = data.country;
      }
      /**
       * @param {string} aString
       */
      set name(aString) {
        this._name = aString;
      }

      get name() {
        return this._name;
      }

      /**
       * @param {string} aCountryCode
       */
      set country(aCountryCode) {
        this._country = aCountryCode;
      }

      get country() {
        return this._country;
      }
    }
    const org = new Organization({ name: "Acme Gooseberries", country: "GB" });

    function getOrgData() {
      return org;
    }
  })();
})();

// Nested records
(() => {
  // Starter
  (() => {
    const customerData = {
      1920: {
        name: "martin",
        id: "1920",
        usages: {
          2016: {
            1: 50,
            2: 55,
            // remaining months of the year
          },
          2015: {
            1: 70,
            2: 63,
            // remaining months of the year
          },
        },
      },
      38673: {
        name: "neal",
        id: "38673",
        // more customers in a similar form
      },
    };
    // Update:
    // customerData[1920].usages[2015][2] = 33;

    function compareUsage(customerId, laterYear, month) {
      const later = customerData[customerId].usages[laterYear][month];
      const earlier = customerData[customerId].usages[laterYear - 1][month];
      return { laterAmount: later, change: later - earlier };
    }

    test("Starter", () => {
      test(` returns correct output`, () => {
        const result = compareUsage(1920, 2016, 2);
        if (result.laterAmount === 55 && result.change === -8) {
          console.log(`  ✅ PASS`);
        } else {
          console.log(
            `  ❌ FAIL: laterAmount: ${result.laterAmount}, change: ${result.change}`
          );
        }
      });
    });
  })();

  // Refactored
  (() => {
    class CustomerData {
      constructor(data) {
        this._data = data;
      }

      get rawData() {
        // we're creating a copy to avoid unintended mutations
        // but also posing a possible performance issue
        return _.cloneDeep(this._data);
      }

      setUsage(customerId, year, month, amount) {
        this._data[customerId].usages[year][month] = amount;
      }

      usage(customerID, year, month) {
        return this._data[customerID].usages[year][month];
      }
    }

    const customerData = new CustomerData({
      1920: {
        name: "martin",
        id: "1920",
        usages: {
          2016: {
            1: 50,
            2: 55,
            // remaining months of the year
          },
          2015: {
            1: 70,
            2: 63,
            // remaining months of the year
          },
        },
      },
      38673: {
        name: "neal",
        id: "38673",
        // more customers in a similar form
      },
    });

    function getCustomerData() {
      return customerData;
    }

    function getRawCustomerData() {
      return customerData.rawData;
    }
    // Update:
    function setCustomerData(data) {
      customerData = new CustomerData(data);
    }

    function setRawDataOfCustomers(data) {
      customerData = new CustomerData(data);
    }

    function compareUsage(customerId, laterYear, month) {
      const later = getCustomerData().usage(customerId, laterYear, month);
      const earlier = getCustomerData().usage(customerId, laterYear - 1, month);
    //  Also:
    //   const later =
    //     getRawCustomerData()[customerId].usages[laterYear][month];
    //   const earlier =
    //     getRawCustomerData()[customerId].usages[laterYear - 1][month];
      return { laterAmount: later, change: later - earlier };
    }

    test("Refactored", () => {
      test(` returns correct output`, () => {
        const result = compareUsage(1920, 2016, 2);
        if (result.laterAmount === 55 && result.change === -8) {
          console.log(`  ✅ PASS`);
        } else {
          console.log(
            `  ❌ FAIL: laterAmount: ${result.laterAmount}, change: ${result.change}`
          );
        }
      });
    });
  })();
})();
