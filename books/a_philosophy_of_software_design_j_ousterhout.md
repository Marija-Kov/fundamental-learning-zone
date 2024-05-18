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

(my effort below)

class TextEditor {
  constructor() {
    this.written = [];
    this.unwritten = [];
  }
  write(text) {
    if (!text) {
      // if no parameter is specified, the method will perform a "redo":
      this.written.push(this.unwritten.pop());
    } else {
      this.written.push(text);
    }
  }
  unwrite() {
    this.unwritten.push(this.written.pop());
  }
}

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


### Error handling

One of the worst sources of code complexity.

How does code encounter exceptions?
1. bad arguments;
2. invoked method unable to complete operation - I/O failed, resource not found;
3. network: lost/delayed packets, untimely server response, unconventional communication;
4. buggy code, unhandled situations;

How do we deal with exceptions?
1. move forward and complete WIP (e.g. resend lost network packet);
2. abort the operation in progress, report the exception upwards;

Exception handling creates opportunities for more exceptions.

Some exceptions can't be accurately simulated in test environment.

#### Too many exceptions

It's possible to be overdefensive!

Best way to deal with exceptions: _reduce the number of places where exceptions have to be handled._

Best way to reduce bugs: write simpler software.

#### Exception-masking

1. Detect and handle exceptions at lower level.
E.g. TCP resending lost packets within its implementation. 

2. Reissue requests over and over if server is unresponsive.
When can throwing exceptions make things worse? When an application loses access to its files and the client keeps retrying.

#### Exception aggregation

Handle errors at the high level. E.g:
- wrap many methods in one try-catch block;
- use RAMCloud storage systems for crash recovery by 
   1. compensating for lost data if one server crashes
   2. crashing a server where corrupt data is found;

In most apps there will be exceptions that are difficult or impossible to handle and don't occur very often.
E.g. exhausted memory - there’s a good chance that the exception handler will also try to allocate memory.
The simplest thing to do when they occur is print diagnostic info and abort the application.


#### Eliminate special cases from the design

E.g. instead of handling no-selection case, represent it internally as "".

_Masking exceptions inside a module only makes sense if the exception information isn’t needed outside the module_

Think of who needs to see the exception information and when before deciding to _define it away_!


### On design

Never design anything just once, no matter how smart you are.

Solutions that require higher-level software to perform additional manipulations - red flag.

### Comments

Comments should improve system design.

Good software loses value if it's poorly documented.

_If users must read the code of a method in order to use it, then there is no abstraction._

Declaration of a method itself is a small part of what true abstraction consists of.

Human language is less precise but more expressive than code which makes it perfect for abstraction.

_The overall idea behind comments is to capture information that was in the mind of the designer but couldn’t be represented in the code._

Good comments compensate for code complexity by reducing cognitive load.

_it is easier to comment everything rather than spend energy worrying about whether a comment is needed_

_Comments augment the code by providing information at a different level of detail._

Interface and implementation comments

_If interface comments must also describe the implementation, then the class or method is shallow._

Document side-effects in the interface comments. A side effect is any consequence of the method that affects the future behavior of the system but is not part of the result.

Implementation comments answerthe questions _what_ the code is doing and _why_, not how.

Add comments before every major block in a method. Explain the _why_ of any tricky aspects.

Cross-module documentation - where to put it so that it's naturally found by developers?




