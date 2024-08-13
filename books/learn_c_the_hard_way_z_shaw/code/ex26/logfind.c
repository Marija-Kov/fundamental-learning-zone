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
  // Phase 4:
  // print some part of the file  
 struct dirent *entry;
 DIR *drptr = opendir(".");
 check(drptr != NULL, "Could not open directory.");
 
 char *ext = ".c";
 long exl = strlen(ext);
 FILE *fp = NULL; // initialize file pointer
 long argl = strlen(argv[1]); // there needs to be max length of an arg

 while(drptr) {
  entry = readdir(drptr);
  if (!entry) {
   closedir(drptr);
   return 0;
  }
 
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
   // check if entry is a file (not a directory or something else)
   if (entry->d_type == DT_REG) {
    printf("f %s\n", entry->d_name);
    fp = fopen(entry->d_name, "r"); // how to specify an entry path other than current directory?
    check(fp != NULL, "Could not open file.");
    char ch = fgetc(fp);
    int i = 0;
    for (i = 0; i < argl; ++i) { // what if the file has less chars than the arg?
     printf("%c", ch);
     ch = fgetc(fp);
    }
    printf("\n");
    int closed = fclose(fp);
    check(closed == 0, "Could not close file properly.");
   } else {
    printf("d %s\n", entry->d_name);
   }
  }
 } 

 closedir(drptr);

  return 0;
error:
  if (fp) fclose(fp);
  if (drptr) closedir(drptr);
  return -1;
}
