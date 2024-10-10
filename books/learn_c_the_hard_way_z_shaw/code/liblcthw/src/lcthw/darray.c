#include <lcthw/darray.h>

DArray *DArray_create(size_t element_size, size_t initial_max)
{
 DArray *array = malloc(sizeof(DArray));
 check_mem(array);
 array->max = initial_max;
 check(array->max > 0, "initial_max must be > 0.");
 array->end = 0;
 array->element_size = element_size;
 array->expand_rate = DEFAULT_EXPAND_RATE;
 array->contents = calloc(initial_max, sizeof(void *));
 check_mem(array->contents);
 return array;
error:
 if(array) {
  free(array);
 }
 return NULL;
}

/* If el is a (short) string, it (triggers SSO and) leads
   to issues (Abort trap: 6) when freeing the address 
   it was supposed to be stored at..
*/
int DArray_push(DArray * array, void *el)
{
  if (array->contents == NULL) {
    printf("array->contents is NULL\n");
    return array;
  }
  array->contents[array->end] = malloc(sizeof(void *));
  check_mem(array->contents[array->end]);
  array->contents[array->end] = el;
  array->end++;
  if (array->end >= array->max) {
   // TODO: if the end index goes over max, expand the array
   printf("The array size went over max\n");
   return array->max;
  }
 return 0;
error:
 return array->end;
}

void DArray_clear(DArray * array)
{
  if (array == NULL) {
   printf("Cannot clear NULL.\n");
   return;
  };
  if (array->element_size == 0) {
    printf("Element size is 0, nothing to clear.\n");
    return;
  }
  for (int i = 0; i < array->end; i++) {
     check_mem(array->contents[i]);
     free(array->contents[i]);
     array->contents[i] = NULL;
     printf("success at index %d\n", i);
  }
  array->end = 0;
error:
  return;
}

int DArray_expand(DArray * array)
{
 
}

int DArray_contract(DArray * array)
{
 return 0;
}

void *DArray_pop(DArray * array)
{
 return array;
}

void DArray_destroy(DArray * array)
{

}

void DArray_clear_destroy(DArray * array)
{
 
}