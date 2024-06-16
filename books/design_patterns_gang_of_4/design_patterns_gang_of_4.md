## Design Patterns: Elements of Reusable Object Oriented Software

- A pattern has 4 essential elements: name, problem, solution, consequences (tradeoffs);

- _descriptions of communicating objects and classes that are customized to solve a general design problem in a particular context_

- Some patterns can be represented more easily in one language than the other;

- Classes can be decoupled by establishing protocols, example: MVC;

* Patterns that sound familiar, like something I've already used or otherwise easy(ish) to wrap my head around:

  - Bridge - decouple abstraction from its implementation
  - Decorator - extend functionality dynamically
  - Facade - higher level interface that is easier to use
  - Mediator - prevents objects from referring to each other explicitly
  - Observer - one-to-many dependency that notifies all objects when one object changes (state container)
  - Prototype - something used to create objects
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
- But when a message is sent, what is checked is the type of the receiver i.e. whether it implements the message.

Class inheritance defines an object's implementation in terms of another object's implementation.
Interface inheritance (or subtyping) describes when an object can be used in place of another.

- Most languages (including JavaScript) don't make/support a difference between interface and implementation inheritance, but people make distinction in practice. Many design patterns depend on this distinction;

#### Programming to an Interface, not an Implementation

Dependency inversion

#### Inheritance vs Composition

Inheritance - white box reuse - for clear hierarchical relationship between classes; defined statically at compile time;
Composition - black box reuse (does not break encapsulation) - flexible, dynamic relationships between objects;

- Should always favour composition over inheritance to avoid descendants seeing the ascendants inner business as well as to avoid tight coupling with the descendants messing with ascendants too much;

- Interface (abstract class, method) over implementation (concrete class, method) inheritance; concrete - implemented, abstract - not implemented.

* JavaScript is different compared to Java and C# in that it does not have the same formal distinction between abstract classes and interfaces.

#### Delegation

- Why/when would an object want to delegate a request to another object? Because it's doing too much already? To make sure it's handled more specifically? For better organisation?

- Delegation -> flexibility -> complexity;

- State, strategy and visitor patterns depend on delegation

Avoid these to dodge redesign:
 
 1. creating an object with class explicitly -> use abstract factory;
 2. dependence on specific operations -> use chain of responsibility;
 3. dependence on software platforms -> use abstract factory, bridge;
 4. dependence on object representation/implementation;  clients that know a lot about an object will need to be changed every time the object changes -> use abstract factory, bridge, memento, proxy;
 5. algorithmic dependencies; algorithms that are likely to change should be isolated -> use builder, iterator, strategy, template method, visitor;
 6. tight coupling; tightly coupled classes are hard to reuse in isolation -> use abstract factory, bridge, chain of responsibility, command, facade, mediator, observer;
 7. extending functionality by subclassing; requires in-depth understanding of the parent class and gets messy fast -> use bridge, chain of responsibility, composite, decorator, observer, strategy;
 8. Inability to alter classes conveniently -> use adapter, decorator, visitor;

- Importance of design patterns in application programs, toolkits and frameworks;

#### How to select design patterns?

Consider:

1. how they solve problems;
2. intent;
3. how patterns interrelate;
4. which patterns serve similar purpose;
5. the cause of redesign;
6. what should be variable in your design;


### Design patterns catalogue

#### Abstract Factory

 - Product is returned immediately

#### Builder

- Product is built in steps

- Often bulds a composite

#### Factory Method 

- concrete

#### Prototype

- Competing with Abstract factory in a way
- Goes well with Composite and Decorator

#### Singleton

- One instance with global point access
- reduced name space
- protected constructor




