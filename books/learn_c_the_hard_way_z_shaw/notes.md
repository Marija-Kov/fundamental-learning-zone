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

### Exercise 4

#### GDB debugger

- Install GDB from the source code (https://www.sourceware.org/gdb/download/) since Homebrew will not install properly on Catalina; 
- run ```./configure --prefix=/usr/local``` and build;
- BUT FIRST install:
    GMP (GNU Multiple Precision Arithmetic Library) and 
    MPFR (GNU Multiple Precision Floating-Point Reliable Library) 
     from the source code (https://gmplib.org/, https://www.mpfr.org/); 
  and, in corresponding extracted directories, run:
  1. 
   a) GMP: ```./configure --prefix=/usr/local```;
   b) MPFR: ```./configure --prefix=/usr/local --with-gmp=/usr/local```
  2. ```make```
  3. ```sudo make install```
  4. ```make check```

* macOS SIP requires adding explicit permissions to GDB.
 It might take several attempts to get right. 
 Helpful articles:
 - https://sourceware.org/gdb/wiki/PermissionsDarwin#Create_a_certificate_in_the_System_Keychain
 - https://www.thomasvitale.com/how-to-setup-gdb-and-eclipse-to-debug-c-files-on-macos-sierra/

* GDB hangs on starting debugging processes, it has been a recurrent issue on macOS and the only solution is to kill and retry (a few times). 

Helpful videos on how to use GDB:
- https://www.youtube.com/watch?v=Dq8l1_-QgAc (buggy comes from here)
- 

#### LLDB debugger

- https://www.youtube.com/watch?v=2GV0K9Y2MKA

- start lldb and set target executable - ```lldb execname arg?```
- run - ```r```
- set breakpoint on line # - ```b filename.ext : #```
                 on a function - ```b funcname(argtype?)```
                 on a class/struct method - ```b Classname::methodname(argtype?)```
                 inside a namespace - ```b Namespacename::methodname(argtype?)```

- list breakpoints - ```br list```
- delete a breakpoint - ```br del #```
- delete all breakpoints - ```br del```

- step over - ```n```
- step into - ```s```
- continue to the next breakpoint or program termination - ```c```

- print variable - ```p varname```

- print variables in the current frame - ```frame variable```

- current frame - ```fr s```

- backtrace i.e. show the call stack with current frame marked - ```bt```
- switch to frame number - ```f #```

- watch variable - ```w s v variablename```


### Exercise 5 - Operators

- https://en.cppreference.com/w/c/language/expressions#Operators

- The use of bitwise (assignment) operators (```|=```, ```^=```)?
   (5)  00000101 ^
   (9)  00001001
 = (12) 00001100   

  ~00000101 = 11111010
  00000101 >> 2 = 00000001 
  00000101 << 2 = 00010100 

- Bitwise operators return integer values.

- https://www.geeksforgeeks.org/bitwise-operators-in-c-cpp/

- Array subscript operator - array index operator (```[]```) - subscript === index
- The use of structure (de)reference (```.```, ```->```)?

### Exercise 6 - Keywords and formations

#### Name / identifier
```
  int x = 10; // x is a name and an identifier
  printf("Value of x: %d\n", x); // x is an identifier from the compiler's perspective
```

#### enum

- Compound statements?

#### continue

#### auto, static, extern
- https://www.geeksforgeeks.org/storage-classes-in-c/

#### double

- macros

### Exercise 7

#### unsigned 
Shorthand of ```unsigned int```.
When a variable is declared as ```unsigned```, it changes the range of values that the variable can hold.

For a 16 bit (short) integer:

- ```int``` holds values in range -32768 - 32767
- ```unsigned int``` holds values in range 0 - 65535

- Huge numbers in C print 0.

- The example below does not cause a compile error, why?

```
unsigned long universe_of_defects = -1L * 1024L * 1024L;
```

- Why can we multiply a ```char``` with an ```int```?

- https://stackoverflow.com/questions/46073295/implicit-type-promotion-rules

### Exercise 8

- https://en.cppreference.com/w/c/language/statements

### Exercise 9

- https://en.cppreference.com/w/c/language/while

### Exercise 10

- Switch statement in C is a jump table, not quite like if-else. Run the program in the debugger and see how it doesn't walk through every case to find the right one (like a series of if-else statements would).

- The compiler marks the place in the program where the switch statement starts, then it translates all the case blocks into a location in the program (number);

- If there's no ```break```, the program 'falls through';

- Jump tables require a contiguous block of memory to store the jump addresses.


- https://github.com/zedshaw/learn-c-the-hard-way-lectures/blob/master/ex10/lecture.md


### Exercise 11

- If we don't assign '\0' to the last byte in an array of chars, it will print random unexpected characters.

 ```
 int numbers[4] = { 'a', 'a' }; 
 printf("%d %d %d %d\n",
         numbers[0], numbers[1], numbers[2], numbers[3]);
 // prints: 97 97 0 0 

 char name[5] = { 'a', 'a', 1, 'a', '\0'};
 printf(" %c %c %c %c\n",
         name[0], name[1], name[2], name[3]);
 // prints: a a <empty space> a 

 printf("%s\n", name);
 // prints: aaa

 char name[5] = { 'a', 'a', '\0', 'a',};
 printf("%s\n", name);
 // prints: aa
 
 printf("%c %c %c %c\n",
        name[0], name[1], name[2], name[3]);
 // prints: a a <empty space> a

 printf("%c %c %d %c\n",
        name[0], name[1], name[2], name[3]);
 // prints: a a 0 a

 char *namealt = "Zed";
 printf("%c %d %c %c\n",
        namealt[0], namealt[1], namealt[2], namealt[3]);
 // prints: Z 101 d


 ```
 - https://github.com/zedshaw/learn-c-the-hard-way-lectures/blob/master/ex11/ex11.c

 ## Exercise 12

 - To C, char abc1[] = "abc" and char abc2[] = { 'a', 'b', 'c' } are the same identifiers i.e. identical methods of creating an array (although "abc" is 1B bigger because of the implicit null terminator).

```
int areas[] = { 10, 12, 13, 14, 20 };
printf("%d, %d.\n", areas[0], areas[10]);
// prints: 10, <random integer>
// compiler als says that int areas has already been declared - which means that C implicitly tries to allocate memory to values out of range?
```

