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

 struct dirent *entry;
 char dirpath[] = "."; // ultimately, we need an absolute path to the target dir so that we can run the program from anywhere
 DIR *drptr = opendir(dirpath);
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
  int cmatch = 0; // character match count
  while (cmatch < exl) {
   if (entry->d_name[el - exl + cmatch] == ext[cmatch]) {
     cmatch++;
   } else break;
  }

  if (cmatch != exl) continue; 
  if (entry->d_type != DT_REG) {
   printf("d %s\n", entry->d_name);
  } else {
   printf("f %s\n", entry->d_name);
   fp = fopen(entry->d_name, "r"); // how to specify an entry path other than current directory?
   check(fp != NULL, "Could not open file.");
   char ch = fgetc(fp);
   
   while (ch != EOF) {
    if (ch != argv[1][0]) {
      ch = fgetc(fp);
      continue; 
    }
    printf("1/%ld match\n", argl);
    
    ch = fgetc(fp);
    if (ch != argv[1][1]) {
     ch = fgetc(fp);
     continue;
    }
    printf("2/%ld match\n", argl);
    
    ch = fgetc(fp);
    if (ch != argv[1][2]) {
     ch = fgetc(fp);
     continue;
    }     
    printf("3/%ld match\n", argl);
    
    // at this point it's certain that argv[1] is found in the file
    printf("Found \"%s\" in %s.\n", argv[1], entry->d_name);
    break;
   }  
   int closed = fclose(fp);
   check(closed == 0, "Could not close file properly.");
  }
 } 

 closedir(drptr);

  return 0;
error:
  if (fp) fclose(fp);
  if (drptr) closedir(drptr);
  return -1;
}
