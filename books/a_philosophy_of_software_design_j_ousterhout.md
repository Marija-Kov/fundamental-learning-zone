## A Philosophy of Software Design, J. Ousterhout

### On information hiding

Purpose: to achieve deep modules.

Information hiding reduces complexity by 
1. simplifying interface, 
2. making it easier to evolve the system.

Declaring something as _private_ is not the same as info hiding!

Info about _private_ methods can still be exposed by _public_ methods!

#### Information leakage

If 2 clases have info about one file's format, that's info leakage.

Because both classes need to be modified if the file format changes.

We should always consider reorganizing so that a piece of info is only accessible in one class.

We should not think about order of operations during runtime when designing classes!

Instead, we should think about different pieces of info needed to carry out tasks.

Options:

1. merging classes that have the same knowledge into one;
2. creating a separate class that encapsulates the info

_Temporal decomposition_ can be a cause of info leakage.

```the read - modify - write example```

_When designing modules, focus on the knowledge that’s needed to perform each task, not the order in which tasks occur_

##### HTTP parameter handling example

- hiding knowledge of whether parameters are sent in the headers or body
- hiding knowledge of URL encoding
- methods to retrieve parameters as int or String

* What is info hiding really/more about? Making things simpler or more secure? 
* What exactly is the problem with classes sharing info? Is it maintenance? Reusability?

##### HTTP response defaults example

_interfaces should be designed to make the common case as simple as possible_

- Overexposure: API for a commonly used feature forcing users to learn about rarely used features


### General-purpose modules

_The interface should be easy to use for today’s needs without being tied specifically to them_

* How far should we go with this?

##### Text editor example

Creating a method for each action (copy, paste, undo, redo..)
vs
Creating fewer more general methods

The purpose of the latter being decreasing the cognitive load for devs who are using the code.
_One of the most important elements of software design is determining who needs to know what, and when._


### Different layer, different abstraction

File system:
- file abstraction
- cache - fixed size blocks - for frequently accessed files
- device drivers

- Pass-through methods - shallow, indicate no clean responsibility division between the classes

- Interface duplication - justified in dispatcher methods, different implementations for the same interface

- Decorators / wrappers - Tend to be shallow, easy to overuse.

- Abstractions used _internally_ should be different from the _interface_ abstractions, otherwise the class is shallow.

- Pass-through variables - passed through many methods to be used in one (reminiscent of prop drilling in React); 
To fix, either: 
1. look for shared object of main and target method and put variable there, 
2. make the variable global,
3. store variable in a context object


### Pull complexity downwards

It's more important to have simple interface than simple implementation.

Most modules have more users than developers.

- Avoid configuration parameters!

- Avoid mixing general and particular purpose code!





