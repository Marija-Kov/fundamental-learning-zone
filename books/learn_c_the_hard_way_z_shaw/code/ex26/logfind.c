#include <stdio.h>
#include <string.h>
#include <dirent.h>
#include <unistd.h>
#include "dbg.h"
/*
 Command: logfind <args> - finds all files containing every arg; 
 May take -o flag for 'or' logic in args

 Logfiles are stored here: ~/var/log/
 They have .log extension
 */

int main(int argc, char *argv[]) {
 check(argc >= 2, "You need at least one parameter.");

 struct dirent *entry;
 char dirpath[] = "/var/log/";
 DIR *drptr = opendir(dirpath);
 check(drptr != NULL, "Could not open directory.");
 
 char *ext = ".log";
 long extl = strlen(ext);
 FILE *fp = NULL; // initialize file pointer
 long argl; // TODO: there needs to be max length of an arg
  
 int targetdir = chdir(dirpath);
 check(targetdir == 0, "Could not change dir.");

 while(drptr) {
  entry = readdir(drptr);
  if (!entry) {
   closedir(drptr);
   return 0;
  }
 
  long el = strlen(entry->d_name);
  int cmatch = 0; // character match count
  while (cmatch < extl) {
   if (entry->d_name[el - extl + cmatch] == ext[cmatch]) {
     cmatch++;
   } else break;
  }
  if (cmatch != extl) continue;
 
  if (entry->d_type != DT_REG) {
   printf("d %s\n", entry->d_name);
  } else {
   fp = fopen(entry->d_name, "r");
   check(fp != NULL, "Could not open %s.", entry->d_name);
   printf("\nChecking %s ...", entry->d_name);
   char ch = fgetc(fp);
   cmatch = 0; // reusing character match count
   int found = 0;
   for (int y = 1; y < argc; y++) {
    argl = strlen(argv[y]);
    while (ch != EOF) {
     if (cmatch == argl) {
      found = 1;
      printf("\n Found \"%s\"", argv[y]);
      break;
     }
     for (int i = 0; i < argl; i++) {
      if (ch == argv[y][i]) {
       ch = fgetc(fp);
       cmatch++;
       continue;
      } else {
       ch = fgetc(fp);
       cmatch = 0;
       break;
      }
     } 
    }
   } 
   if (found == 0) {
    printf("nothing.\n");
   } else printf("\n");
   int closed = fclose(fp);
   check(closed == 0, "Could not close %s.", entry->d_name);
  }
 } 

 closedir(drptr);

  return 0;
error:
  if (fp) fclose(fp);
  if (drptr) closedir(drptr);
  return -1;
}
