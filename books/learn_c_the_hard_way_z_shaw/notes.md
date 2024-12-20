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

## Exercise 14

- https://en.cppreference.com/w/c/language/functions
- https://jameshfisher.com/2016/11/27/c-k-and-r/

## Exercise 15 

- Use arrays to access memory instead of pointers. Only use pointers for optimisation if you absolutely have to.

- C lets us work with pointers like with arrays, but they are not the same thing.
```
char *name = "keech";
*name == name[0];
*(name + 1) == name[1];
```

```
int a = 23, b = 43, c = 12, d = 89, e = 2;
int *ages[] = { &a, &b, &c, &d, &e };
int *cur_age = ages;
// compile error: incompatible pointer types initializing 'int *' with an expression of type 'int *[5]'
// we're assigning an array of pointers to a pointer

// this is a correct way to initialize a new array of pointers with the value of another array of pointers:

int **cur_age = ages;

// using it as an argument:

int somefunction(int **arg) {
       //does something
}

somefunction(cur_age);
// '*' markers are only used in declaration

```

## Exercise 16

```assert(<something>)``` is a macro, a preprocessor directive. Macros are like functions that are invoked at compile time, as opposed to runtime.

How macro is defined:

```
#define <macro/directive> (<substitute value/expression>)
```

```
#define PI 3.14159

#define SQUARE(x) ((x) * (x))
```

- In C, "dereferencing" is accessing the value stored at the memory address that the pointer is pointing to:
*ptr == value of ptr
as opposed to "referencing": 
&ptr == address that the pointer is pointing to;

(*ptr).member == the value of member of the struct that ptr is pointing to;

ptr->member == shorthand of above;

- Pointer dereference is mostly used to assign values to struct members.

```
struct Person *Function_name()
struct Person * Function_name()
struct Person* Function_name()
```
all of the three above do the same thing.

- Struct is a compound data type.

- ```leak (pid)``` - log memory leaks in process (pid)

- Creating struct on the stack so it can be memory-managed automatically when we use malloc, we're storing things on the heap. That requires manual memory management.

- ex16 and ex16a return the same results although in ex16, the struct is stored on the heap and the memory is (de)allocated manually using libraries. In ex16a, the struct is created on the stack and released automatically.

## Exercise 17

_If you get a block of memory from malloc, and have that pointer on the stack, then when the function exits the pointer will get popped off and lost._

_If you take a pointer to something on the stack, and then pass or return it from your function, then the function receiving it will segmentation fault (segfault), because the actual data will get popped off and disappear. You’ll be pointing at dead space._

This command on program ex17: 
```
./ex17 keechdb s 07 xDgCtuYgWDRJxceYPPjdPPuptHzqjdixbVBWZDFyWSdQdequCJLNXBEmJdjvpiwMZPRpENixZhEgavKjTZbmxbALYLAtASKbauUtAjZVeGUKbbxPwJhrVRCafXyxqvmmdTWdeiPcTXkAmfxKQgpBdmiGzfqGVQaGPtcMgVBKyJRQTWebgjjHSHUeHgXHruUMGDTvjBuzLheadaccTfZaAUKxpjZZSTdRSrTAiMKrdLQLWmJLtTVPPavUQkGZYVwafFmzZMjaCBUCvRiFaZAckHzdZmyavTNNTFtGPjFYtCVGMMSypqFUjbmyekbheXSYaECCTdTgbkJQKRyRNMZbDtyuegkgfqTvKJiMZYDehXndYHzLcLaMXgZySQDLuMFcnetPNWFSGmeERSSvGTxVfEDQYMMUHDvqdaCyLfhUByjcNCXbgTpZCJGxxuMbGXbqyFHhNYPSGxPjaMZCAuBQgBmnveDbyXfSiKVqMiurzzxPBEKckMJXBdnpgNAezrMGvEBdNanReJHmLSRTCAEZhttqiZctEgMVEuENrABhpJHKrLThwMjmqaNZMSRAczUqVWbuwZDbDNFaRkhPZSiPWytw chook@mail.yu
```

will successfully set a row in the database. Max length for name and email is 512 bytes and the length of the random string passed as name argument is 600.
Upon query, it will return this:
```
7 xDgCtuYgWDRJxceYPPjdPPuptHzqjdixbVBWZDFyWSdQdequCJLNXBEmJdjvpiwMZPRpENixZhEgavKjTZbmxbALYLAtASKbauUtAjZVeGUKbbxPwJhrVRCafXyxqvmmdTWdeiPcTXkAmfxKQgpBdmiGzfqGVQaGPtcMgVBKyJRQTWebgjjHSHUeHgXHruUMGDTvjBuzLheadaccTfZaAUKxpjZZSTdRSrTAiMKrdLQLWmJLtTVPPavUQkGZYVwafFmzZMjaCBUCvRiFaZAckHzdZmyavTNNTFtGPjFYtCVGMMSypqFUjbmyekbheXSYaECCTdTgbkJQKRyRNMZbDtyuegkgfqTvKJiMZYDehXndYHzLcLaMXgZySQDLuMFcnetPNWFSGmeERSSvGTxVfEDQYMMUHDvqdaCyLfhUByjcNCXbgTpZCJGxxuMbGXbqyFHhNYPSGxPjaMZCAuBQgBmnveDbyXfSiKVqMiurzzxPBEKckMJXBdnpgNAezrMGchook@mail.yu chook@mail.yu
```
the name parameter was cut down to 512 characters but then the email argument string was concatenated to it unexpectedly. That's the flaw in ```strncpy``` method.

```
 char *cropped(char *str, int max)
  {
    char cropped_str[max]; // NO.
    // use malloc instead and also remember to free the memory!
    int i;
    for (i = 0; i < max - 1; i++) {
      cropped_str[i] = str[i];
    }
    cropped_str[max - 1] = '\0';
    return cropped_str;
  }    
```
The function above returns a pointer to a local variable and is a common cause of undefined behaviour. When the function returns, the cropped_str array goes out of scope, and the pointer to that memory location becomes invalid.

### Extra

#### Struct packing in C

http://www.catb.org/esr/structure-packing/

_rearranging the order of struct members in careful ways so that it saves memory_
 
Basic datatypes (except chars) are _self aligned_ : laid out in memory under certain constraints to make memory access faster - it's not arbitrary.  

_each type except char has an alignment requirement: 2-byte shorts must start on an even address, 4-byte ints or floats must start on an address divisible by 4, and 8-byte longs or doubles must start on an address divisible by 8_

ISA (Instruction set architecture) - refers to processors/their layouts.

THe allocated order of static variables is not always their source order.

A struct _has the pointer alignment of its widest member_. 

## Exercise 18

Functions in C are just pointers to some code.

C does not support nested functions / function definitions by default.

### Extra

#### Passing bad arguments

```
typedef int (*some_cb)(int a, int b);

int *some_func(some_cb cb)
{
  //some code
} 

int a_func()
{
  return 0;
}

int b_func(char *a)
{
  return atoi(*a);
}

char b_func()
{
  return 'a';
}

some_func(a_func); // this will fail silently
some_func(b_func); // this will throw incompatible pointer types warning
some_func(c_func); // this will throw incompatible pointer types warning

```
typedef int (* somefunc)(int a, int b) // defines somefunc as a function pointer type that takes 2 ints as args and returns an integer;
typedef int *somefunc(int a, int b)  // defines somefunc as a function type that takes 2 ints as args and returns a pointer to integer; 

## Exercise 19

### Zed's Debug Macros

- defend against using the same file twice


#### clean errno

- What makes errno (potentially) unsafe?

```
#define log_err(M, ...) fprintf(stderr, "[ERROR] (%s:%d: errno: %s) "M"\n",\
  __FILE__, __LINE__, clean_errno(), ##__VA_ARGS__)               
```
- Preprocessor replaces log_err with fprintf. It also knows what to do with M (we instucted it) and variadic arguments (...). It will also give us other values (__FILE__, __LINE__, the return value of clean_errno()) that we asked for.

- Some values like __FILE__ and __LINE__ are only available as preprocessor macros which is why macros have no alternative.

## Exercise 20

- Do not use variable after freeing the memory.

```
    free(something);
    // We may still have access to the value of something at this point,
    // but it's not as guaranteed as before;
    // by free()-ing memory we're enabling overwriting
    // but not overwriting implicitly.
    // If we don't want the content of freed memory
    // to be accessed, we have to overwrite it manually.
    something = NULL;
```
### Debug steps

1. You can't debug code by just looking at it.
2. Repeat the bug with an automated test.
3. Run the program under a debugger and valgrind(another debugger) and lint.
4. Find the backtrace and print out all the variables on the path.
5. Once you fix it, add check()(macro) to prevent it.

#### Inspecting core dumps

Set the size of the core dump for programs run in the current terminal window: ```ulimit -c unlimited```

A known issue with macOS Catalina not creating core dumps.

https://stackoverflow.com/questions/58844265/mac-catalina-corefile-locations/

Access cores from any folder: ```cd /cores```

(Check where core dump files are: ```sysctl kern.corefile```)

```
// this will crash a C program:
int* ptr = NULL;
*ptr = 44; // dereferencing NULL
```
## Exercise 21

- "Fast" integer types are aligned in memory in a way that allows for more efficient memory access.

- unary, binary, ternary and prefix operators

### Size Types

- N - The least number of bits that a size type can hold. Possible values for N: 8, 16, 32 or 64.

```<u>int_least(N)_t``` - the smallest <unsigned> int type able to hold at least N bit;
```<U>INT_LEAST(N)_MAX/MIN``` - <unsigned> max/min value of <u>int_least(N)_t;

```<u>int_fast(N)_t``` - the fastest <unsigned> size type
```<U>INT_FAST(N)_MAX/MIN``` - <unsigned> max value 

```<u>intmax_t``` - largest possible <unsigned> number on the system
```<U>INTMAX_MAX/MIN``` - <unsigned> max/min value of the largest number on the system

```<u>intptr_t``` - <unsigned> integer large enough to hold a pointer
```<U>INTPTR_MAX/MIN``` - max/min value of integer large enough to hold a pointer

```ptrdiff_t``` - difference in size of two pointers
```PTRDIFF_MAX/MIN``` - min/max difference in size of two pointers

```size_t```
```SIZE_MAX``` - max of size_t 

- Why do we have all these? For safety, memory and time efficiency.

- The all-caps names are standard C library macros. 
- The default value for _MIN macros - with the exception of ptr ones - is 0. INTPTR always has to be large enough to hold a pointer. 
- The default value for _MAX macros varies depending on N: for 16 - 0xFFFF, 32 - 0xFFFFFFFF, 64 - 0xFFFFFFFFFFFFFFFF (the number of Fs is always N/4)

Why do we have ptrdiff_t and why can't we use intptr_t instead?
 - It's designed to handle overflows in results when performing pointer arithmetic, among other things. intptr_t does not deal with overflows.

## Exercise 22

- ```const``` is an alternative for ```define```, both create a constant variable.

- Passing a variable to a function that does something with it won't change it.
- In order to change the value of a variable in a function, the function will need to have the pointer to the variable.

To avoid stack-related bugs:
1) do not shadow a variable
2) avoid using too many globals - use accessor functions for globals
3) when in doubt, use malloc
4) don't use static variables in a function
5) avoid reusing function parameters

### Extra

Call by value vs. reference:
```
int num = 5;

void icallbyvalue(int n)
{
 n++; 
 printf("%d\n", n); // should be 6
}

icallbyvalue(num);

printf("%d\n", num); // prints 5

void icallbyreference(int *n)
{
 *n = *n + 1;
 printf("%d\n", n);
}

icallbyreference(&num);

printf("%d\n", num); // prints 6
```

## Exercise 23

- Duff's device takes advantage of loose specifics of the switch statement to chunk up loop iterations so that the program runs faster.


## Exercise 24

In this situation:

```
 29   printf("What's your First Name? ");  
 30   in = fgets(you.first_name, MAX_DATA - 1, stdin);
 31   check(in != NULL, "Failed to read first name.");
 32                                      
 33   printf("What's your last name? "); 
 34   in = fgets(you.last_name, MAX_DATA - 1, stdin); 
 35   check(in != NULL, "Failed to read last name."); 
 36
 37 printf("How old are you? ");  
```

if the input for the first name is too large, the excess will be grabbed/read by the next fgets function.

```
cc -Wall -g    ex24.c   -o ex24
What's your First Name? tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt
```
and on enter, we get to this:
```
What's your last name? How old are you?
```
which means that fgets on line 34 has been run with the excess data not processed by fgets on line 30. 

The result will be:
```
First Name: ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttLast Name: tttttttttttttttttttttttt
Age: ...
```
 
Notice how the enter key is eaten.

- fgets should be used instead of fscanf, tho. fgets, NOT gets.

### Extra

https://www.geeksforgeeks.org/scansets-in-c/

## Exercise 25

Variable argument function may take any number of arguments before the ```...``` keyword.

```va_start``` is the initializer function macro that runs inside vararg function and takes a list of varargs first and the last non-vararg before the ```...```;

```va_arg``` function returns each vararg in the order of succession - the first call after ```va_start``` returns the first vararg in the list.

```va_end``` invalidates ```va_list```, must be run in the same function as ```va_start```.

Vararg functions are rarely used.

## Exercise 26

Working with directories in C

https://pubs.opengroup.org/onlinepubs/7990989775/xsh/readdir.html

- Explore approaches to finding a string within a file.

1. For every char in a stream inspect their subsequent chars while they correspond to the sequence of chars in the string until the match is found or until the end of file.
 
2. Use ```fgets()``` to get lines from the file stream and ```strstr()``` to check for word matches,

- Research glob patterns and using them to find files of certain types.

https://c-for-dummies.com/blog/?p=4782

## Exercise 27

Creative vs defensive programming. Use both as needed.

- Implementation phase is the time to be defensive. 
- Don't think you can ever _eliminate_ the probability of errors if you know that they are possible. 

The eight strategies:

1. Never trust input;
2. If error is _possible_, try and fix it;
3. Fail early and openly. Favour returning an error code over aborting the process, only do the latter if there are too many errors;
4. Document pre- and post-conditions and invariants of every parameter. Build _a contract of how your functions expect the world to be_;
5. Prevention over documentation. If you can fix the error, documentation doesn't matter.
6. Automate testing, validation, build, deployment, system administration, error reporting.
7. Simplify and clarify. _Simple and dirty beats complex and clean_.
8. Question authority periodically.

## Exercise 27

Makefile in more depth

https://www.gnu.org/software/make/

```
target: prerequisite
<TAB>recipe
<TAB>                 # this is an empty recipe
```
- Recipe is interpreted by the shell. ```make``` program does not try to understand them. This means that there can be two distinc syntaxes in a Makefile.

- If any prerequisite is newer than the target, the target must be rebuilt.

- Target ```clean``` (in this specific context) is an action that has no prerequisite and is not a prerequisite to any other rule.

- To avoid confusion between action-targets and file-targets of the same name, we use ```.PHONY: <target>```.

- ```$(wildcard <pattern>)``` - this is a function that returns a space-separated list of file names matching the pattern.

- ```$(patsubst <replaced ext>, <replacing ext>, <wildcard func (return value)>)``` - this function replaces the extension in the result of the wildcard function.

```
CHARS = a b c
    echo $(CHARS)  # passing a variable to a recipe, it will expand in shell

```

- ```cc -M filename.ext``` - this will trigger rebuild whenever an #included file changes in filename.ext .

-  ```@echo This recipe will not echo, it will just run and log the result maybe``` 

- make -s flag silences all the echoes but executes teh recipes, -n flag only echoes recipes without executing them. 

## Exercise 28 - 30

Project structure (skeleton), using Makefiles, unit test frameworks and usage.

## Exercise 31

Common causes of undefined behaviour:

- using something that doesn't exist (anymore);
- writing to something beyond its allocated memory size;
- incompatible type conversion;
- type mismatch;
- unspecified type;
- declaring something more than once;
- dividing by zero;
- modification of a constant;

## Exercise 34

- Read about Small String Optimization (SSO);

## Exercise 35

### Radix sort

- Read about number 256 in computing.

Given that x is uint64_t *, and y a short with value range 0-7, here:
```
#define ByteOf(x, y) (((uint8_t *)x)[(y)])
```
we are casting x into uint8_t * to get access to individual byte at index y.

    y:   [0]       [1]      [2]     [3]       [4]      [5]     [6]      [7]
    x: 00010010 00100110 01110000 00000011 00010000 01110100 00010111 0000001

So, to focus on the 4th byte in x, we would do: ByteOf(x, 3) i.e. ((uint8_t *)x)[(3)]

#### Cumulative count in radix sort

Example:

byte value        0  1  2  3  4  5  6  7  8 
--------------------------------------------
occurrence count  3  0  1  2  0  1  0  0  0
--------------------------------------------
first appears
in dest array     0  3  3  4  6  6  7  7  7
at index
--------------------------------------------

- Read about the importance of stable sort (multi-level sorting, predictability..) as well as its performance implications.

Radix sort is stable because it preserves the order of previous(ly sorted) byte values. 

## Exercise 36

External attackers can control strings and pointers when they can be determined by external input. C strings allow attackers to trigger undefined behaviour.

## Exercise 39

### Boyer Moore Horspool string search algorithm 
https://www.youtube.com/watch?v=PHXAOKQk2dw

- The worst case scenario has the complexity of the brute force string search approach - `O(nm)` where `n` is the text and `m` is the pattern.

- In the best case, the last char in the pattern never matches a char in the text - `O(n/m)`

- How does someone come up with the idea of skip table?

#### Performance test logs

- SCAN
SCAN COUNT: 138012000, END TIME: 2, OPS: 69006000.000000

SCAN COUNT: 158384000, END TIME: 3, OPS: 52794666.666667
- order: find > scan > binstr
SCAN COUNT: 262024000, END TIME: 3, OPS: 87341333.333333
SCAN COUNT: 266424000, END TIME: 3, OPS: 88808000.000000
- order: binstr > scan > find
SCAN COUNT: 246504000, END TIME: 3, OPS: 82168000.000000 
SCAN COUNT: 252240000, END TIME: 3, OPS: 84080000.000000

SCAN COUNT: 268760000, END TIME: 4, OPS: 67190000.000000
SCAN COUNT: 422128000, END TIME: 6, OPS: 70354666.666667

- FIND
FIND COUNT: 18168000, END TIME: 2, OPS: 9084000.000000

FIND COUNT: 28253000, END TIME: 3, OPS: 9417666.666667
- order: find > scan > binstr
FIND COUNT: 25707000, END TIME: 3, OPS: 8569000.000000 
FIND COUNT: 25060000, END TIME: 3, OPS: 8353333.333333
- order: binstr > scan > find
FIND COUNT: 29028000, END TIME: 3, OPS: 9676000.000000 
FIND COUNT: 29149000, END TIME: 3, OPS: 9716333.333333

FIND COUNT: 37847000, END TIME: 4, OPS: 9461750.000000
FIND COUNT: 58117000, END TIME: 6, OPS: 9686166.666667

- BINSTR
BINSTR COUNT: 90148000, END TIME: 2, OPS: 45074000.000000

BINSTR COUNT: 133132000, END TIME: 3, OPS: 44377333.333333
- order: find > scan > binstr:
BINSTR COUNT: 136361000, END TIME: 3, OPS: 45453666.666667 
BINSTR COUNT: 138471000, END TIME: 3, OPS: 46157000.000000
- order: binstr > scan > find
BINSTR COUNT: 109771000, END TIME: 3, OPS: 36590333.333333 
BINSTR COUNT: 131288000, END TIME: 3, OPS: 43762666.666667

BINSTR COUNT: 184608000, END TIME: 4, OPS: 46152000.000000
BINSTR COUNT: 279190000, END TIME: 6, OPS: 46531666.666667


- The author says that something about String_setup_skip_chars could be slowing String_find down. I can see that every time we run the setup function, we iterate over 256 bytes. And we loop as many times as possible in the set timeframe looking for the exact same substring in the exact same string.
