/*
 Builder pattern implementation (scope: object, purpose: creational)
*/

class Car {
    constructor() {
     this.model = '';
     this.color = '';
     this.engine = '';
    }
}
class CarBuilder {
    constructor() {
        this.car = new Car()
    }

    setModel(model) {
        this.car.model = model
    }
    setModel(color) {
        this.car.color = color
    }
    setModel(emgine) {
        this.car.engine = engine
    }
    build() {
        return this.car
    }
}

const car1Builder = new CarBuilder().setModel("model1").setColor("pink").setEngine("engine1");
const car1 = car1Builder.build();

/*
 Factory pattern (scope: object, purpose: creational)
*/

function shapeFactory(shape){
    //...
    return {
        name: shape
    }
}

const square = shapeFactory("square");

/*
 
*/
