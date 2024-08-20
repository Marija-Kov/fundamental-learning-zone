/*

   *** Single responsibility ***

       One responsibility - one reason to change.
       No module should break because another module changed.
       Gather together the things that change for the same reasons.
       Separate those things that change for different reasons.

   *** Open-closed ***

       A module should be open for extension and closed for modification.
       For example, if a new method is introduced inside a class whose methods are used by other modules,
       that shouldn't break anything in the said modules.

   *** Liskov substitution *** 

       A child should be able to replace the parent without breaking the code.
       The code should work without knowing the actual class of the X object.
       “If S is a declared subtype of T, objects of type S should behave as objects of type T
        are expected to behave, if they are treated as objects of type T” 

   *** Interface segregation ***

       No code should be forced to depend on methods it does not use.
       I.e. a developer shouldn't have to import a large interface just because they need a couple of methods.
       It's a key principle behind microservices architecture. _Role interfaces_


   *** Dependency inversion ***

       Higher component should not depend on the lower, both should depend upon abstractions;
       Abstractions should not depend upon details

*/
class EdiblePlants {
  constructor(name) {
    this.name = name;
  }
  areRichInCarbs() {
    return `${this.name} is rich in carbs`;
  }
}

class Legumes extends EdiblePlants {
  areRichInProtein() {
    return `I'm rich in protein`;
  }
}

class Nuts extends EdiblePlants {
  areRichInFats() {
    return `I'm rich in fats`;
  }
}

const corn = new EdiblePlants("corn");
const lentils = new Legumes();
const walnuts = new Nuts();
console.log(walnuts.areRichInFats());
console.log(lentils.areRichInProtein());
console.log(corn.areRichInCarbs());
