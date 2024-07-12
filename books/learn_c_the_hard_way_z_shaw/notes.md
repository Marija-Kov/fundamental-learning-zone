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

- Creating struct on the stack so it can be memory-manages automatically when we use malloc, we're storing things on the heap. That requires manual memory management.

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
typedef int (* somefunc)(int a, int b) // defines somefunc as a function pointer type that takes 2 ints as args 
typedef int *somefunc(int a, int b)  // defines somefunc as a function type that takes 2 ints as args
