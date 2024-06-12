/*
 Builder pattern implementation (scope: object, purpose: creational)
 - this is also an example of composition; 
*/

class Car {
  constructor() {
    this.model = "";
    this.color = "";
    this.engine = "";
  }
}
class CarBuilder {
  constructor() {
    this.car = new Car();
  }

  setModel(model) {
    this.car.model = model;
  }
  setColor(color) {
    this.car.color = color;
  }
  setColor(engine) {
    this.car.engine = engine;
  }
  build() {
    return this.car;
  }
}

const car1Builder = new CarBuilder()
  .setModel("model1")
  .setColor("pink")
  .setEngine("engine1");
const car1 = car1Builder.build();

/*
 Factory pattern (scope: object, purpose: creational)
*/

function shapeFactory(shape) {
  //...
  return {
    name: shape,
  };
}

const square = shapeFactory("square");

/*
 Inheritance without breaking the encapsulation principle:
*/
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
  }
// override
  speak() {
    console.log(`${this.name} barks.`);
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name);
  }

  speak() {
    console.log(`${this.name} meows.`);
  }
}

/*
 Create an object indirectly with class:
*/

class A {
  constructor(){
  }
}

function createInstanceA(){
  return new A;
}

const a = createInstanceA()
