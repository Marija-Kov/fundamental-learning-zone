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







