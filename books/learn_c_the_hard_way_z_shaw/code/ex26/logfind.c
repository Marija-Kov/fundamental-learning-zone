#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <glob.h>
#include "dbg.h"

#define MAX_LINE 500
#define MAX_WORD 30
#define MAX_ARGC 10

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
   int lnum = 0;
   while (line != NULL) {
    int match = 0;
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

int is_or(char *arg)
{
 if (!strcmp(arg, "-o")) return 1;
 return 0;
}

int validate_args(int argc, char *argv[])
{
 check(argc >= 2, "USAGE: ./logfind arg1 arg2...");

 int isor = is_or(argv[1]);
 if (isor) {
  check(argv[2], "USAGE: ./logfind -o arg1 arg2...");
 }

 check(argc <= MAX_ARGC + 1, "You can enter %d args at most.", MAX_ARGC);
 
 int i = 1; // argv[1] might be '-o' flag and that won't be an issue greater than one unnecessary iteration
 int too_long = 0;
 for (i = 1; i < argc; i++) {
  if (strlen(argv[i]) > MAX_WORD) too_long = 1;
 }
 if (too_long) { 
   log_info("Some args will be skipped for being too long. Max length is %d chars.", MAX_WORD);
 }

  return 0;
error:
  return -1;
}

int main(int argc, char *argv[]) {
 
 int valid = validate_args(argc, argv);
 if (valid != 0) {
  printf("Validation failed.");
  return -1;
 }

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
   
   int found = 0;
   if(is_or(argv[1])) {
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

