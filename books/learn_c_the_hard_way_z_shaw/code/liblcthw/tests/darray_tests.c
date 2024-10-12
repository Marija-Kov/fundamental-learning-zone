#include "minunit.h"
#include <lcthw/darray.h>
#include <assert.h>

char *test_darray_create()
{
 printf("### Testing darray_create....\n");

 size_t element_size = sizeof(void *);
 size_t initial_max = 100;
 DArray *result = DArray_create(element_size, initial_max);
 mu_assert(result != NULL, "DArray should have been created.");
 mu_assert(result->max == (int)initial_max, "Max value not as expected.");
 mu_assert(result->expand_rate > 0, "expand_rate should be greater than 0."); // but maybe it can be 0, theoretically, although that beats the point of a dynamic array.
 mu_assert(result->contents != NULL, "contents ptr should not be NULL.");
 
 free(result);

 return NULL;
}

char *test_darray_push()
{
 printf("### Testing darray_push....\n");
 
 typedef struct Test {
    void *test;
 } Test;

 DArray *array = DArray_create(sizeof(void *), 100);
 mu_assert(array != NULL, "DArray should have been created.");
 mu_assert(array->end == 0, "Array end index should be 0 at this point");
 mu_assert(array->contents[0] == NULL, "Contents of an empty array not as expected.");
 Test *el1 = malloc(sizeof(Test));
 Test *el2 = malloc(sizeof(Test));
 DArray_push(array, el1);
 DArray_push(array, el2);
 mu_assert(array->end == 2, "Array end index not as expected after push.");
 mu_assert(array->contents[0] == el1, "Contents[0] not as expected.");
 mu_assert(array->contents[1] == el2, "Contents[1] not as expected.");

 free(array->contents[0]);
 free(array->contents[1]); 
 free(array->contents);
 free(array);

 return NULL; 
}

char *test_darray_clear()
{
 printf("### Testing darray_clear....\n");

 typedef struct Test {
    void *test;
 } Test;
 
 DArray *array = DArray_create(sizeof(void *), 100);
 mu_assert(array != NULL, "DArray should have been created.");
 Test *keech = malloc(sizeof(Test));
 Test *poozh = malloc(sizeof(Test));

 
 DArray_push(array, keech);
 DArray_push(array, poozh);

 mu_assert(array->contents[0] == keech, "Array element not assigned as expected.");
 mu_assert(array->contents[1] == poozh, "Array element not assigned as expected.");
 mu_assert(array->end == 2, "Array end not as expected after push");

 DArray_clear(NULL); // How to test this when there is no return value?
 DArray_clear(array);
 
 mu_assert(array->end == 0, "Array end should be 0 after clear operation.");
 mu_assert(array->contents[0] == NULL, "Array not cleared as expected.");
 mu_assert(array->contents[1] == NULL, "Array not cleared as expected.");
 
 free(array);

 return NULL;
}

char *test_darray_pop()
{
  printf("### Testing darray_pop....\n");

  typedef struct Test {
     void *test;
  } Test;

  // NULL input..
  void *result = DArray_pop(NULL);
  mu_assert(result == NULL, "Output should be NULL with NULL input.");

  DArray *array = DArray_create(sizeof(void *), 100);
  mu_assert(array != NULL, "DArray should have been created.");
  
  // Empty array input..
  result = DArray_pop(array);
  mu_assert(result == array, "Input should have been returned if it's an empty array.");
  
  // Non-empty array nput..
  Test *el1 = malloc(sizeof(Test));
  Test *el2 = malloc(sizeof(Test)); 
  DArray_push(array, el1);
  DArray_push(array, el2);
  mu_assert(array->end == 2, "Array end index not as expected after push.");
  mu_assert(array->contents[0] == el1, "Contents[0] not as expected.");
  mu_assert(array->contents[1] == el2, "Contents[1] not as expected.");
  
  result = DArray_pop(array);
  mu_assert(array->end == 1, "Array end index not as expected after pop.");
  mu_assert(result == el2, "Popped array element not as expected");
  mu_assert(array->contents[array->end] == el2, "Popped array data not accessible from the array");
  
  Test *el3 = malloc(sizeof(Test));
  DArray_push(array, el3);
  mu_assert(array->contents[1] == el3, "Contents[1] not as expected after a push after a pop.");
  mu_assert(array->end == 2, "Array end index not as expected after a push after a pop.");

  free(result);
  free(el1);
  free(el3);
  free(array);

  return NULL;
}

char *all_tests() 
{
 mu_suite_start();

 mu_run_test(test_darray_create);
 mu_run_test(test_darray_push);
 mu_run_test(test_darray_clear);
 mu_run_test(test_darray_pop);

 return NULL;
}

RUN_TESTS(all_tests);

