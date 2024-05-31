- Better structure makes it easier to add features. So fix the structure first.

- Taking out local variables makes it easier to do function extractions.

- Why can temporary variables be a problem? They encourage complex routines.

- Used patterns: Extract Function, Inline Variable, Move Function, Replace Conditional with Polymorphism, Split Phase.

### Principles in Refactoring

- Resist the urge to modify functionality when refactoring.

- Refactor to improve the design of software. 
  Do not mess with code structure for the sake of short-term goals, it leads to decay.

- YAGNI vs architectural thinking. 
  Deal with issues later when you understand them better. 
  Iterate over architectural decisions -> evolutionary architecture.

- Make software easier to understand.

- Refactoring helps us find bugs and program faster.

- Refactor just before you add a new feature.

- When you understand what code is doing but realize that it's doing it badly.

- Don't just refactor code because it looks ugly. 
  If it's ugly and doesn't need to be modified, don't refactor.

- Most refactoring should be opportunistic and unremarkable.
 
(Short-living feature branches -> CI / Trunk-based development)

- Lack of tests makes refactoring legacy code difficult.
  Self-testing code is the foundation for refactoring.

- Refactoring may initially slow down the program, but makes it easier to tune during optimization.

### Bad smells in code

- Mysterious name; _“When you can’t think of a good name for something, it’s often a sign of a deeper design malaise.”_

- Duplicated code; 

- Long functions; _“the programs that live best and longest are those with short functions”_
  _“A heuristic we follow is that whenever we feel the need to comment something, we write a function instead”_
  (Older languages carried overhead of subroutine calls, this was overcome in newer languages for in-process calls.)
  - Find parts of the function that go nicely together and extract function.

- Long parameter lists; combining functions into a class;

- Global data; there's no mechanism to determine what part of the codebase changed the data.
  Small amounts of global data is ok.

- Mutable data; functional programming is based on immutable data for this reason;
  Cured with: encapsulate var, split var, slide statements, extract function, 
              separate query from modifier, remove setting method, replace derived var with query,
              combine f()s into class (multiple f()s operating on same data), combine f()s into transform (multiple f()s enriching same data), change ref to value;

- Divergent change; not having a clear point of change;

- Shotgun surgery; when you make a change and it messes up different part of the codebase;

- Feature envy; put things together that change together; minimise cross-module interactions;

- Data clumps; introduce parameter objects;

- Primitive obsession; "stringly typed" variables;

- Repeated switches; use polymorphism;

- Loops; replace loop with pipeline (filter, map);

- Lazy element; something without much functionality;

- Speculative generality; basically yagni;

- Temporary field; 
  dealing with exceptional cases;

- Message chains;
  basically wrap complex property access chain into a separate method

- Middle man;

- Insider trading; 
  trading data around too much increases coupling;
  _Subclasses are always going to know more about their parents than their parents would like them to know_

- Large class;

- Dumb class;

- Comments;






