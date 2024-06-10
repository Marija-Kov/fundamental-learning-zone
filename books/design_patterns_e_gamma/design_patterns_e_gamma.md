

- A pattern has 4 essential elements: name, problem, solution, consequences (tradeoffs);

- _descriptions of communicating objects and classes that are customized to solve a general design problem in a particular context_

- Some patterns can be represented more easily in one language than the other;

- Classes can be decoupled by establishing protocols, example: MVC;

* Patterns that sound familiar, like something I've already used or otherwise easy to wrap my head around:

  - Bridge - decouple abstraction from its implementation
  - Decorator - extend functionality dynamically
  - Facade - higher level interface that is easier to use
  - Mediator - prevents objects from referring to each other explicitly
  - Observer - one-to-many dependency that notifies all objects when one object changes (state container)
  - Prototype - 
  - Proxy - placeholder for an object
  - Singleton - make sure there's only one instance

- Design patterns vary in granularity and level of abstraction;
- Some are commonly used together. Some look similar but are used for different purposes.
- They can be categorised by scope (class, object) and purpose (creational, structural, behavioural)

- _Encapsulation_ comes from restrictions e.g. the only way to trigger an object to execute an operation is via _request_ and the only way to change objects internal data is via _operation_;

- THe many approaches to object-oriented design methodologies;

- How do we decide what should be an object?

#### Specifying object interfaces

Design patterns 
 - help define interfaces by identifying their key elements and the kinds of data that get sent across an interface;
 - specify relationships between interfaces;


- Signature: operation's name, parameters and return value;
- Interface: set of signatures; objects are only known by their interfaces;
- Type: denotes a particular interface;
- Dynamic binding: runtime association of a request to an object; an operation depends upon both the request and the receiver;
     |
- Polymorphism: object with same interfaces can substitute each other during runtime;

#### Specifying object implementations

ClassName
________________________
Operation1()
[type] Operation2()
________________________
instanceVariable1
[type] InstanceVariable2
________________________

Objects are created by instantiating a class, factory methods, builders, prototypes and dependency injection.

- Abstract class - polymorphic supertype; declares common interface for its (concrete) subclasses; not meant to be instantiated; 
- Abstract operations - operations that an abstract class declares but does not implement; they are implemented by subclasses and that is called polymorphism.

- Mixin class - similar to abstract class but requires multiple inheritance

 AClass          _Mixin_
      \         /
    AugmentedClass


#### Class vs Interface inheritance

Class - _how_ an object is implemented;      
Interface (type) - _which_ requests an object can respond to;

- Since a _class_ defines the operations an object can perform, it also defines its _type_.

- When an object is an instance of a class, it means that it supports the interface defined by the class;

