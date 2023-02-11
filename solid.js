
// Single responsibility
// Open for extension - closed for modification 
// Liskov principle - a child should be able to replace the parent without breaking the code
// Interface segregation - 
// Dependency inversion - higher should not depend on lower class component, both should depend upon abstractions;
                       // abstractions should not depend upon details
class EdiblePlants {
    constructor(name){
        this.name = name;
    }
    areRichInCarbs() {
        return `${this.name} is rich in carbs`
    }
}

class Legumes extends EdiblePlants {
    areRichInProtein(){
        return `I'm rich in protein`
    }
}

class Nuts extends EdiblePlants {
    areRichInFats(){
        return `I'm rich in fats`
    }
}

const corn = new EdiblePlants("corn");
const lentils = new Legumes();
const walnuts = new Nuts();
console.log(walnuts.areRichInFats())
console.log(lentils.areRichInProtein())
console.log(corn.areRichInCarbs())

