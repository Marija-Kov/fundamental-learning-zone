#include <stdio.h>
#include <string.h>
#include <dirent.h>
#include "dbg.h"
/*
 Command: logfind <args> - finds all files containing every arg; 
 May take -o flag for 'or' logic in args

 Logfiles are stored here: ~/var/log/
 They have .log extension
 */

int main(int argc, char *argv[]) {
 check(argc >= 2, "You need at least one parameter.");
  // Phase 2:
  // print names of files with a specific extension  
 struct dirent *entry;
 DIR *drptr = opendir("../");
 check(drptr != NULL, "Could not open directory.");
  
 // set the extension
 char *ext = ".c\0";
 long exl = strlen(ext);
 int found = 0;
 // check the last exl chars of every entry->d_name for matches with ext chars
 while(drptr) {
  entry = readdir(drptr);
  if (!entry) {
   printf("Found %d files.\n", found);
   closedir(drptr);
   return 0;
  }
  // check if the extension is matching char by char
  long el = strlen(entry->d_name);
  int cmatch = 0;
  while (cmatch < exl) {
   if (entry->d_name[el - exl + cmatch] == ext[cmatch]) {
     cmatch++;
   } else {
     break;
   }
  }

  if (cmatch == exl) {
   printf("%s\n", entry->d_name);
   found++;
  }
 } 

 int i = 1;
 for (i = 1; i < argc; i++) {
  printf("%s\n", argv[i]);
 }

 closedir(drptr);

  return 0;
error:
  return -1;
}
