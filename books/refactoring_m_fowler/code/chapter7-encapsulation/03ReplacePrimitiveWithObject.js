function test(title, callback) {
  console.log(title);
  callback();
}

// Starter
(() => {
  class Order {
   constructor(data) {
    this.priority = data.priority;
     // more init
   }
  }

  // usage example
  // const highPriorityCount = 
  //   orders.filter(o => 
  //     "high" === o.priority 
  //  || "rush" === o.priority).length;

})();

// Refactored
(() => {
 class Order {
  constructor(data) {
   this._priority = data.priority;
  }

  get priority() {
   return this._priority;
  }

  get priorityString() {
   return this._priority.toString();
  }
  
  set priority(aString) {
   this._priority = new Priority(aString);
  }
 }

 class Priority {
  constructor(value) {
   if (value instanceof Priority) {
    return value;
   } else {
    if (!Priority.legalValues().includes(value)) {
     throw new Error(`<${value}> is invalid for Priority`);
    } 
    this._value = value;
   }
  }

  toString() {
   return this._value;
  }

  get _index() {
    return Priority.legalValues().findIndex(s => s === this._value);
  }

  static legalValues() {
   return ['low', 'normal', 'high', 'rush'];
  }

  equals(other) {
   return this._index === other._index;
  }

  higherThan(other) {
   return this._index > other._index;
  }

  lowerThan(other) {
   return this._index < other._index;
  }

 }
  test("Order", () => { 
   const order1 = new Order({ priority: new Priority("high")});
   const order2 = new Order({ priority: new Priority("rush")});
   const order3 = new Order({ priority: new Priority("low")});
  
   test("gets the right count of high priority orders", () => {
    const highPriority = [order1, order2, order3].filter(o => {
     return o.priorityString === "high" || o.priorityString === "rush"
    });

    if(highPriority.length === 2){
     console.log("PASS");
    } else {
     console.log("FAIL");
     console.log(highPriority);
    }
   });

   test("gets higher priority orders", () => { 
     const higherPriority = [order1, order2, order3].filter(o => o.priority.higherThan(new Priority("high")));
     if (higherPriority.length === 1) {
      console.log("PASS");
     } else {
      console.log("FAIL");
      console.log(higherPriority);
     }
   });

   test("gets lower priority orders", () => { 
     const lowerPriority = [order1, order2, order3].filter(o => o.priority.lowerThan(new Priority("high")));
     if (lowerPriority.length === 1) {
      console.log("PASS");
     } else {
      console.log("FAIL");
      console.log(lowerPriority);
     }
   });
 });
})();

