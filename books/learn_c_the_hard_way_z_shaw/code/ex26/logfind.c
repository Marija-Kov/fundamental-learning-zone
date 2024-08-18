#include <stdio.h>
#include <string.h>
#include <dirent.h>
#include <unistd.h>
#include <glob.h>
#include "dbg.h"
/*
 Command: logfind <args> - finds all files containing every arg; 
 May take -o flag for 'or' logic in args

 Logfiles are stored here: ~/var/log/
 They have .log extension
 */

int find_args(FILE *fp, int argc, char *argv[])
{
   char ch = fgetc(fp);
   int cmatch = 0;
   int result = 0;
   for (int y = 1; y < argc; y++) {
    int argl = strlen(argv[y]);
    while (ch != EOF) {
     if (cmatch == argl) {
      result = 1;
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
   return result;
}

int main(int argc, char *argv[]) {
 check(argc >= 2, "You need at least one parameter.");

 char dirpath[] = "/var/log/";
 
 char *pat = "*.log";
 FILE *fp = NULL;
  
 int logdir = chdir(dirpath);
 check(logdir == 0, "Could not change dir.");
 
 glob_t gstruct;
 int g = glob(pat, GLOB_ERR, NULL, &gstruct);
 check(g == 0, "Couldn't glob.");
 char **fname= gstruct.gl_pathv;

 while(*fname) {
   fp = fopen(*fname, "r");
   check(fp != NULL, "Could not open %s.", *fname);
   printf("\nChecking %s ...", *fname);
   
   int found = find_args(fp, argc, argv);
   
   if (found == 0) {
    printf("nothing.\n");
   } else printf("\n");
   
   int closed = fclose(fp);
   check(closed == 0, "Could not close %s.", *fname);
   fname++;
 } 

  return 0;
error:
  if (fp) fclose(fp);
  return -1;
}

