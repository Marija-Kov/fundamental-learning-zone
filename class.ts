

class Rectangle {
    height: number;
    width: number;
    constructor(height: number, width: number) {
      this.height = height;
      this.width = width;
    }
  }

const square = new Rectangle(2,2);
const r1 = new Rectangle(7,18)
/*

CONSTRUCTOR is a class method; it determines what properties an instance of a class will have and
i.e. the arguments that must (or may) be provided when creating an instance of the class in question

Thought process to remember class syntax:

Following certain patterns enables us to perform meaningful actions. 
Classes exist to replicate patterns. We replicate patterns by creating instances of classes.
We elaborate on patterns by defining parameters for creating class instances and we extend them, 
literally, through extending classes.

For a class to replicate, JavaScript provides it with constructor method/function 
that will take in parameters and bind them to the class (may look like a lot of boilerplate with all 'this') 

*/