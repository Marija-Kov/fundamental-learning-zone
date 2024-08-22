#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <glob.h>
#include "dbg.h"

#define MAX_LINE 500
/*
 Command: logfind <args> - finds all files containing every arg; 
 May take -o flag for 'or' logic in args

 Logfiles are stored here: ~/var/log/
 They have .log extension
 */

int find_args_or(FILE *fp, int argc, char *argv[])
{
   size_t buf_size = MAX_LINE;
   char *buf = malloc(buf_size);
   check(buf != NULL, "Failed to malloc."); 
   char *line = fgets(buf, MAX_LINE, fp);
   int result = 0;
   int lnum = 0;
   while (line != NULL) {
    for (int i = 2; i < argc; i++) {
     if (strstr(line, argv[i])) {
      printf("\nFound \"%s\" at line: %d", argv[i], lnum);
      result = 1;
     }
    }
    buf = realloc(buf, buf_size);
    // what if realloc fails?
    line = fgets(buf, MAX_LINE, fp);
    lnum++;
   }
   free(buf);
   return result;
error:
   if(buf) free(buf);
   return -1;
}

int find_args_and(FILE *fp, int argc, char *argv[]) 
{
   size_t buf_size = MAX_LINE;
   char *buf = malloc(buf_size);
   check(buf != NULL, "Failed to malloc."); 
   char *line = fgets(buf, MAX_LINE, fp);
   int result = 0;
   int match = 0;
   int lnum = 0;
   while (line != NULL) {
    match = 0;
    for (int i = 1; i < argc; i++) {
     if (strstr(line, argv[i])) match++;
    }
    if (match == argc - 1) {
     printf("\nMatch at line: %d", lnum);
     result = 1;
    }
    buf = realloc(buf, buf_size);
    // what if realloc fails?
    line = fgets(buf, MAX_LINE, fp);
    lnum++;
   }
   free(buf);
   return result;
error:
   if(buf) free(buf);
   return -1;
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
   int found;
   if(!strcmp(argv[1], "-o")) {
    check(argv[2], "You need at least one parameter after -o flag.");
    printf("\nChecking %s ...", *fname);
    found = find_args_or(fp, argc, argv);
   } else {
    printf("\nChecking %s ...", *fname);
    found = find_args_and(fp, argc, argv);
   }
   if (found == 0) {
    printf("no match.\n");
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

