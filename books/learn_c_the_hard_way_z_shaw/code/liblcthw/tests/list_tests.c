#include "minunit.h"
#include <lcthw/list.h>
#include <assert.h>

static List *list = NULL;

char *test1 = "test1 data";
char *test2 = "test2 data";
char *test3 = "test3 data";

char *test_create()
{
 list = List_create();
 mu_assert(list != NULL, "Failed to create list.");
 return NULL; 
}

char *test_destroy()
{
 List_clear_destroy(list);
 return NULL;
}

char *test_push_pop()
{
 List_push(list, test1);
 mu_assert(List_last(list) == test1, "Wrong last value.");

 List_push(list, test2);
 mu_assert(List_last(list) == test2, "Wrong last value.");

 List_push(list, test3);
 mu_assert(List_last(list) == test3, "Wrong last value.");
 mu_assert(List_count(list) == 3, "Wrong count on push.");

 char *val = List_pop(list);
 mu_assert(val == test3, "Wrong value on pop.");

 val = List_pop(list);
 mu_assert(val == test2, "Wrong value on pop.");

 val = List_pop(list);
 mu_assert(val == test1, "Wrong value on pop.");

 mu_assert(List_count(list) == 0, "Wrong count after pop.");

 return NULL;
}

char *test_unshift()
{
 List_unshift(list, test1);
 mu_assert(List_first(list) == test1, "Wrong first value.");
 
 List_unshift(list, test2);
 mu_assert(List_first(list) == test2, "Wrong first value.");  

 List_unshift(list, test3);
 mu_assert(List_first(list) == test3, "Wrong first value.");

 mu_assert(List_count(list) == 3, "Wrong count after unshift.");

 return NULL;
}

char *test_remove()
{
 char *val = List_remove(list, list->first->next);
 
 mu_assert(val == test2, "Wrong removed element.");
 mu_assert(List_count(list) == 2, "Wrong count after remove.");
 mu_assert(List_first(list) == test3, "Wrong first after remove.");
 mu_assert(List_last(list) == test1, "Wrong last after remove.");

 return NULL;
}

char *test_shift()
{
 mu_assert(List_count(list) != 0, "Wrong count before shift.");
 char *val = List_shift(list);
 mu_assert(val == test3, "Wrong value on shift.");

 val = List_shift(list);
 mu_assert(val == test1, "Wrong value on shift.");
 mu_assert(List_count(list) == 0, "Wrong count after shift.");

 return NULL;
}

char *test_list_join()
{
 static List *list1 = NULL;
 static List *list2 = NULL;

 list1 = List_create();
 list2 = List_create();
 
 char *t1 = "t1";
 char *t2 = "t2";
 char *t3 = "t3";
 char *t4 = "t4";

 List_push(list1, t1);
 List_push(list1, t2);
 List_push(list2, t3);
 List_push(list2, t4);

 printf("### Testing list_join....\n");
 mu_assert(List_first(list1) == t1, "list1->first not as expected.");
 mu_assert(List_last(list1) == t2, "list1->last not as expected.");
 mu_assert(List_first(list2) == t3, "list2->first not as expected.");
 mu_assert(List_last(list2) == t4, "list2->last not as expected.");

 List *new_list = List_join(list1, list2);

 mu_assert(List_last(new_list) == t4, "new_list->last not as expected.");
 mu_assert(List_first(new_list) == t1, "new_list->first not as expected.");

 return NULL;
}

char *all_tests()
{
 mu_suite_start();
 
 mu_run_test(test_create);
 mu_run_test(test_push_pop);
 mu_run_test(test_unshift);
 mu_run_test(test_remove);
 mu_run_test(test_shift);
 mu_run_test(test_destroy);
 mu_run_test(test_list_join);

 return NULL;
}

RUN_TESTS(all_tests);
