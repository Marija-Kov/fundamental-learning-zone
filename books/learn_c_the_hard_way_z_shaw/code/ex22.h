#ifndef _ex22_h
#define _ex22_h

// make THE_SIZE from ex22.c available to other .c files
int THE_SIZE;

// get and set an internal static variable in ex22.c
int get_age();
void set_age(int age);

// update a static variable that's inside update_ratio
double update_ratio(double ratio);

void print_size();

float *inaccessible_huh();

int reassign_static();

int reassign_const();

void icallbyvalue(int n);

void icallbyreference(int *n);
#endif
