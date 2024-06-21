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
