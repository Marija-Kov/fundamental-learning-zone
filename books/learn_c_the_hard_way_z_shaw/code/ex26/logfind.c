#include <stdio.h>
#include "dbg.h"
#include <dirent.h>
/*
 Command: logfind <args> - finds all files containing every arg; 
 May take -o flag for 'or' logic in args

 Logfiles are stored here: ~/var/log/
 They have .log extension
 */

int main(int argc, char *argv[]) {
 check(argc >= 2, "You need at least one parameter.");
  // Phase 1:
  // enter a directory - get a pointer to it 
  // print names of all files and subdrectories
  // https://pubs.opengroup.org/onlinepubs/7990989775/xsh/readdir.html
 struct dirent *entry;
 DIR *drptr = opendir(".");
 check(drptr != NULL, "Could not open directory.");
 
 while(drptr) {
  entry = readdir(drptr);
  if (!entry) {
   printf("--END--\n");
   closedir(drptr);
   return 0;
  }
  printf("%s\n", entry->d_name);
 } 
 
 int i = 1;
 for (int i = 1; i < argc; i++) {
  printf("%s\n", argv[i]);
 }

 closedir(drptr);

  return 0;
error:
  return -1;
}
