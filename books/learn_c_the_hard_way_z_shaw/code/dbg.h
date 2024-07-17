// Header guard ensures that the contents of the header file are only included once during compilation process
#ifndef __dbg_h__ // checks of the macro has not been defined yet
#define __dbg_h__ // defines the macro if above is true

#include <stdio.h>
#include <errno.h>
#include <string.h>

// Conditionally compiled macro
#ifdef NDEBUG // when NDEBUG macro is defined, we're in non-debug/release mode
#define debug(M, ...) //..and we don't want to replace debug() with anything at compile time
#else
// print error, file and line where it occurred and any extra arguments; ... --> ##__VA_ARGS__ 
#define debug(M, ...) fprintf(stderr, "DEBUG %s: %d: "M"\n",\
		__FILE__, __LINE__, ##__VA_ARGS__) 
#endif

#define clean_errno() (errno == 0 ? "None" : strerror(errno)) // safe, readable errno

// The next 3 macros log messages meant for the end user
#define log_err(M, ...) fprintf(stderr,	"[ERROR] (%s:%d: errno: %s) "M"\n",\
		__FILE__, __LINE__,	clean_errno(), ##__VA_ARGS__)

#define log_warn(M, ...) fprintf(stderr, "[WARN] (%s:%d: errno: %s) "M"\n",\
		__FILE__, __LINE__, clean_errno(), ##__VA_ARGS__)

#define log_info(M, ...) fprintf(stderr, "[INFO] (%s:%d) "M"\n",\
		__FILE__, __LINE__, ##__VA_ARGS__)

// args: A - condition, M - error message
#define check(A, M, ...) if(!(A)) {\
	log_err(M, ##__VA_ARGS__); errno=0; goto error; }

// place inside any part of function that shouldn't run
#define sentinel(M, ...) { log_err(M, ##__VA_ARGS__);	errno=0; goto error; }

// makes sure the pointer is valid, otherwise report an error
#define check_mem(A) check((A), "Out of memory.")

// doesn't bother reporting if the error is common
#define check_debug(A, M, ...) if(!(A)) {\
	debug(M, ##__VA_ARGS__);	errno=0; goto error; }

#endif
