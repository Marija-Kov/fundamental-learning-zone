function test(title, callback) {
  console.log(title);
  callback();
}

//Starter
(() => {
 
 class Person {

  constructor(name, officeNumber, officeAreaCode) {
   this._name = name;
   this._officeNumber = officeNumber;
   this._officeAreaCode = officeAreaCode;
  }

  get name() {
   return this._name;
  }

  set name(arg) {
   this._name = arg;
  }

  get telephoneNumber() {
   return `(${this.officeAreaCode})${this.officeNumber}`;
  }

  get officeAreaCode() {
   return this._officeAreaCode;
  }

  set officeAreaCode(arg) {
   this._officeAreaCode = arg;
  }

  get officeNumber() {
   return this._officeNumber;
  }

  set officeNumber(arg) {
   this._officeNumber = arg;
  }
 }
   
   test("Starter: this class is right", () => {
    const person1 = new Person("Keech", "4444", "123");
     test(` it returns correct telephone number`, () => {
       if(person1.telephoneNumber === "(123)4444"){
        console.log(`  PASS`);
       } else {
        console.log(`  FAIL`);
        console.log(person1.telephoneNumber);
       }
     })
   }) 

})();


//Refactored
(() => {
 
 class Person {

  constructor(name) {
   this._name = name;
   this._telephoneNumber = new TelephoneNumber();
  }

  get name() {
   return this._name;
  }

  set name(arg) {
   this._name = arg;
  }
  
  get officeAreaCode() {
   return this._telephoneNumber.areaCode;
  }

  set officeAreaCode(arg) {
   this._telephoneNumber.areaCode = arg;
  }
  
  get officeNumber() {
   return this._telephoneNumber.number;
  }

  set officeNumber(arg) {
   this._telephoneNumber.number = arg;
  } 
  
  get telephoneNumber() {
   return this._telephoneNumber.toString();
  }
 }

 class TelephoneNumber {

   constructor() {
    this._areaCode = undefined;
    this._number = undefined;
   }
   
   get areaCode() {
    return this._areaCode;
   }
   
   set areaCode(arg) {
    this._areaCode = arg;
   }

   get number() {
    return this._number;
   }
 
   set number(arg) {
    this._number = arg;
   }
   
   toString() {
    return `(${this.areaCode})${this.number}`
   }
 }
   
  test("Refactored: This class is right", () => {
    const person1 = new Person("Keech");
    person1.officeAreaCode = 123;
    person1.officeNumber = 4444;
     test(` it returns correct telephone number`, () => {
       if(person1.telephoneNumber === "(123)4444"){
        console.log(`  PASS`);
       } else {
        console.log(`  FAIL`);
        console.log(person1.telephoneNumber);
       }
     })
   }) 

})();
