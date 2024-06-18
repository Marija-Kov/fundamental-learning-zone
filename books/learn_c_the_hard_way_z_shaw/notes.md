## Learn C the hard way

- Problems with the design of C: lack of security, UBs, pointers everywhere
- UB - Undefined behaviour
- NUL byte string end, without it C keeps reading until crash

### Exercise 1 extra

#### printf family of functions

- writing to standard vs given output stream; 
- writing to given file descriptor;
- writing to character string;
- dynamic allocation of a new string with malloc(3);

- extended locale versions?

% - conversion specifier (as in %s, %d ?)

### Exercise 2 

- Create and run Makefile, learn ```make``` command;
- Read ```man make```; there are variants of ```make```;
- https://makefiletutorial.com/

### Exercise 3

- Find all printf escape codes;
- Break ex3 in as many ways as you can;
- REad ```man 3 printf```