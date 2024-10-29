#ifndef darray_algos_h
#define darray_algos_h

#include <lcthw/darray.h>

/*
 A pointer to a function that compares 2 arrays.
 */
typedef int (*DArray_compare) (const void *a, const void *b);

int DArray_qsort(DArray * array, DArray_compare cmp);

int DArray_heapsort(DArray * array, DArray_compare cmp);

int DArray_mergesort(DArray * array, DArray_compare cmp);

#endif