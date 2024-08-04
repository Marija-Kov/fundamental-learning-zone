#include <stdio.h>
#include "ex22.h"
#include "dbg.h"

int THE_SIZE = 1000;

static int THE_AGE = 37;

int get_age()
{
 return THE_AGE;
}

void set_age(int age)
{
  THE_AGE = age;
}

double update_ratio(double new_ratio)
{
 static double ratio = 1.0; // don't do this

 double old_ratio = ratio;
 ratio = new_ratio;

 return old_ratio;
}

float *inaccessible_huh()
{
 static float num = 1.1;
 return &num;
}

int reassign_static()
{
 static int a = 1;
 a = 2;
 return a;
}

int reassign_const()
{
 const int a = 1;
 // a = 2; // this will break it
 return a;
}

void print_size()
{
 log_info("I think size is: %d", THE_SIZE);
}

void icallbyvalue(int n)
{
 printf("the value %d in the scope of icallbyvalue", n);
 n++;
 printf(" was incremented by 1 and is now %d\n", n);
}

void icallbyreference(int *n)
{
 printf("the value %d in the scope of icallbyreference",*n);
 *n = *n + 1;
 printf(" was incremented by 1 and is now %d\n", *n);
}

