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
  if (array == NULL) {
    printf("Cannot push into NULL.\n");
    return -1;
  }
  if (array->end >= array->max) {
   DArray_expand(array);
  }
  array->contents[array->end] = malloc(sizeof(void *));
  check_mem(array->contents[array->end]);
  array->contents[array->end] = el;
  array->end++;
 return 0;
error:
 return -1;
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
  }
  array->end = 0;
error:
  return;
}

int DArray_expand(DArray * array)
{
 array->max = array->max + array->expand_rate;
 // allocate more memory for the expanded array
 void *new_contents = realloc(array->contents, array->max * sizeof(void *)); 
 check_mem(new_contents); // make sure we don't lose access to contents..
 array->contents = new_contents;
 
 return 0;
error:
 return -1;
}

int DArray_contract(DArray * array)
{
 check(array != NULL, "Cannot contract NULL;");
 check(array->max > (int)array->expand_rate, "Cannot contract, array too small.");
 for (int i = 0; i < (int)array->expand_rate; i++) {
  // We may want to check if the slot contains some data we might not want 
  // to lose before releasing it.
  if (array->contents[array->max]) {
   free(array->contents[array->max]);
  }
  array->max--;
 }
 return 0;
error:
 return -1;
}

void *DArray_pop(DArray * array)
{
  if (array == NULL || array->end < 1) {
   printf("Nothing to pop here.\n");
   return array;
  };
  void *result = array->contents[array->end - 1];
  /* The problem with doing just this is that the popped element is still accessible in the array
   but if it's freed and nullified, we won't be able to return it.
  */
  array->end--;
  if (array->max - array->end == (int)array->expand_rate) {
    DArray_contract(array);
    array->max = array->end;
  }
    return result;
}

void DArray_destroy(DArray * array)
{

}

void DArray_clear_destroy(DArray * array)
{
 
}