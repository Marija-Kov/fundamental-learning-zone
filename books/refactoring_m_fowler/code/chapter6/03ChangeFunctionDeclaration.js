(() => {
  // Example: Adding a parameter
  (() => {
    // Starter

    function addReservation(customer) {
      this._reservations.push(customer);
    }
  })();

  (() => {
    // Step 1 : extract function

    function addReservation(customer) {
      this.zz_addReservation(customer);
    }

    function zz_addReservation(customer) {
      this._reservations.push(customer);
    }
  })();

  (() => {
    // Step 2: add parameter

    function addReservation(customer) {
      this.zz_addReservation(customer, false);
    }

    function zz_addReservation(customer, isPriority) {
      this._reservations.push(customer);
    }
  })();

  (() => {
    // Step 3: check if the new parameter is used by the caller

    function addReservation(customer) {
      this.zz_addReservation(customer, false);
    }

    function zz_addReservation(customer, isPriority) {
      if (isPriority) console.log("isPriority provided");
      console.log("isPriority not provided");
      this._reservations.push(customer);
    }
  })();
  (() => {
    // Step 4: simply replace or migrate
    function addReservation(customer, isPriority) {
      if (isPriority) console.log("isPriority provided");
      console.log("isPriority not provided");
      this._reservations.push(customer);
    }
  })();
})();

(() => {
  // Example: Changing a parameter to one of its properties

  (() => {
    // Starter

    function inNewEngland(aCustomer) {
      return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(
        aCustomer.address.state
      );
    }

    const newEnglanders = someCustomers.filter((c) => inNewEngland(c));
  })();

  (() => {
    // Step 1: extract variable

    function inNewEngland(aCustomer) {
      const stateCode = aCustomer.address.state;
      return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
    }
    const newEnglanders = someCustomers.filter((c) => inNewEngland(c));
  })();

  (() => {
    // Step 2: Extract function

    function inNewEngland(aCustomer) {
      const stateCode = aCustomer.address.state;
      return NEW_inNewEngland(stateCode);
    }

    function NEW_inNewEngland(stateCode) {
      return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
    }
    const newEnglanders = someCustomers.filter((c) => inNewEngland(c));
  })();

  (() => {
    // Step 3: Inline variable on old function

    function inNewEngland(aCustomer) {
      return NEW_inNewEngland(aCustomer.address.state);
    }

    function NEW_inNewEngland(stateCode) {
      return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
    }
    const newEnglanders = someCustomers.filter((c) => inNewEngland(c));
  })();

  (() => {
    // Step 4: Replace old function in the caller

    function inNewEngland(aCustomer) {
      return NEW_inNewEngland(aCustomer.address.state);
    }

    function NEW_inNewEngland(stateCode) {
      return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
    }

    const newEnglanders = someCustomers.filter((c) =>
      NEW_inNewEngland(c.address.state)
    );
  })();

  (() => {
    // Step 5: Remove old and rename new function

    function inNewEngland(stateCode) {
      return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
    }

    const newEnglanders = someCustomers.filter((c) =>
      inNewEngland(c.address.state)
    );
  })();
})();

