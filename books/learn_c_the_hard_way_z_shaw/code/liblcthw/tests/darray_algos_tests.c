#include "minunit.h"
#include <lcthw/darray_algos.h>

/*
  It has to take char ** and not char * because qsort takes DArray->contents, which is type void ** (array of pointers). 
  Sorting functions are scanning the arrays (a and b), and handing pointers to each element in the array to the comparison function ((DArray_compare) testcmp).     
*/
int testcmp(char **a, char **b)
{
    return strcmp(*a, *b);
}

DArray *create_words()
{
    DArray *result = DArray_create(0, 5);
    char *words[] = { "asdfasfd", "werwar", "13234", "asdfasfd", "oioj" };
    int i = 0;
    
    for (i = 0; i < 5; i++) {
        DArray_push(result, words[i]);
    }
    return result;
}

int is_sorted(DArray *array)
{
    int i = 0;
    for (i = 0; i < DArray_count(array) - 1; i++) {
        if (strcmp(DArray_get(array, i), DArray_get(array, i + 1)) > 0) {
            return 0;
        }
    }
    return 1;
}

/*
 parameter *func - pointer to a function that takes an array pointer and a comparer function that will compare the array elements. 
*/
char *run_sort_test(int (*func) (DArray *, DArray_compare), const char *algo_name)
{
    DArray *words = create_words();
    mu_assert(!is_sorted(words), "Words should start not sorted for the purpose of this test.");

    debug("---- Testing %s sorting algorithm", algo_name);
    int rc = func(words, (DArray_compare) testcmp);
    mu_assert(rc == 0, "Sort failed.");
    mu_assert(is_sorted(words), "Sort failed.");
    
    free(words);
    //DArray_destroy(words);

     return NULL;
}

char *test_qsort()
{
    return run_sort_test(DArray_qsort, "QSORT");
}

char *test_heapsort()
{
    return run_sort_test(DArray_heapsort, "HEAPSORT");
}

char *test_mergesort()
{
    return run_sort_test(DArray_mergesort, "MERGESORT");
}

char *all_tests()
{
    mu_suite_start();

    mu_run_test(test_qsort);
    mu_run_test(test_heapsort);
    mu_run_test(test_mergesort);

    return NULL;
}

RUN_TESTS(all_tests);