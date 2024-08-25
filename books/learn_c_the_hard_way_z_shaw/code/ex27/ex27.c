#undef NDEBUG
#include "dbg.h"
#include <stdio.h>
#include <assert.h>

// naive copy that assumes all inputs are valid:
void copy (char to[], char from[])
{
 int i = 0;

 while ((to[i] = from[i]) != '\0') ++i;
 // but what if it isn't null terminated?
}

int safercopy (int from_len, char *from, int to_len, char *to)
{
 assert(from != NULL && to != NULL && "from and to can't be NULL");
 int i = 0;

 // determine number of loops based on the shorter string:
 int max = from_len > to_len - 1 ? to_len - 1 : from_len - 1;

 if (from_len <= 0 || to_len <= 0) return -1;

 for (i = 0; i < max; i++) {
   to[i] = from[i];
 }

 // terminate the destination string:
 to[to_len - 1] = '\0';

 return i;
}

int main (int argc, char *argv[])
{
 char from[] = "0123456789";
 int from_len = sizeof(from);

 char to[] = "0123456";
 int to_len = sizeof(to);

 debug("Copying '%s':%d to '%s':%d", from, from_len, to, to_len);

 int rc = safercopy(from_len, from, to_len, to);
 check(rc > 0, "Failed to safercopy.");
 check(to[to_len - 1] == '\0', "String not terminated.");

 debug("Result is: '%s':%d", to, to_len);

 // break it #1:
 rc = safercopy(from_len *-1, from, to_len, to); 
 check(rc == -1, "Safercopy should fail #1");
 check(to[to_len - 1] == '\0', "String not terminated.");
 
 // break it #2:
 rc = safercopy(from_len, from, 0, to);
 check(rc == -1, "Safercopy should fail #2");
 check(to[to_len - 1] == '\0', "String not terminated.");

 return 0;
error:
 return 1;
}
