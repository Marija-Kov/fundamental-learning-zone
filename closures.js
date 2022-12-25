
//TODO: Deeply understand the power of closures

//HINT: It's not just a function within a function.



// DONE: Understand the flow of the function below:

// Function curry takes a function as an argument and returns another function - currying in functional programming.

function curry(fn) { 
  const args = [] 
  return function inner(arg) {    //// curry(fn) returns a function that's asking for one arg;
    if(args.length === fn.length) return fn(...args)  //// fn.length --> number of arguments fn is asking for; fn only runs when it receives enough args
    args.push(arg)  //// args is only being updated within the scope of inner - *
    return inner /// recursion; asking for an arg first
  }
}

function add(a, b) { // if b has a default value, it will be used; if a has a default value, NaN will be returned
  return a + b
}

// Who's currying and who is being curried???
// * - inner/curriedAdd will have access to args after curry has executed because in JS, under the hood,..
// .. every function (except functions created with constructors) creates a reference to any variables in its..
//... lexical environment. 
const curriedAdd = curry(add);
//console.log(curriedAdd(2)(3)()); // calling inner via curriedAdd


