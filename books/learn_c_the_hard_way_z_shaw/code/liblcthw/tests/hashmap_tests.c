#include "minunit.h"
#include <lcthw/hashmap.h>
#include <assert.h>
#include <lcthw/bstrlib.h>

Hashmap *map = NULL;
static int traverse_called = 0;
struct tagbstring test1 = bsStatic("test data 1");
struct tagbstring test2 = bsStatic("test data 2");
struct tagbstring test3 = bsStatic("test data 3");
struct tagbstring expect1 = bsStatic("THE VALUE 1");
struct tagbstring expect2 = bsStatic("THE VALUE 2");
struct tagbstring expect3 = bsStatic("THE VALUE 3");

static int traverse_good_cb(HashmapNode *node) // what does this mean
{
    debug("KEY: %s", bdata((bstring)node->key));
    traverse_called++;
    return 0;
}

static int traverse_fail_cb(HashmapNode *node)
{
    debug("KEY: %s", bdata((bstring)node->key));
    traverse_called++;
    if (traverse_called == 2)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

char *test_hashmap_create()
{
    printf("### Testing Hashmap_create....\n");
    map = Hashmap_create(NULL, NULL);
    mu_assert(map != NULL, "Failed to create map.");

    return NULL;
}

char *test_hashmap_destroy()
{
    printf("### Testing Hashmap_destroy....\n");
    Hashmap_destroy(map);
    //mu_assert(map == NULL, "Failed to destroy map."); // Why is this failing?

    return NULL;
}

char *test_hashmap_get_set()
{
    int rc = Hashmap_set(map, &test1, &expect1);
    mu_assert(rc == 0, "Failed to set &test1");

    bstring result = Hashmap_get(map, &test1);
    mu_assert(result == &expect1, "Wrong value for test1.");

    rc = Hashmap_set(map, &test2, &expect2);
    mu_assert(rc == 0, "Failed to set test2");
    result = Hashmap_get(map, &test2);
    mu_assert(result == &expect2, "Wrong value for test2.");

    rc = Hashmap_set(map, &test3, &expect3);
    mu_assert(rc == 0, "Failed to set test3");
    result = Hashmap_get(map, &test3);
    mu_assert(result == &expect3, "Wrong value for test3.");

    return NULL;
}

char *test_hashmap_traverse()
{
    int rc = Hashmap_traverse(map, traverse_good_cb);
    mu_assert(rc == 0, "Failed to traverse (good_cb).");
    printf("traverse called %d\n", traverse_called);
    mu_assert(traverse_called == 3, "Wrong count traverse for good.");

    traverse_called = 0;
    rc = Hashmap_traverse(map, traverse_fail_cb);
    mu_assert(rc == 1, "Failed to traverse (fail_cb).");
    mu_assert(traverse_called == 2, "Wrong count traverse for fail.");

    return NULL;
}

char *test_hashmap_delete()
{
    bstring deleted = (bstring) Hashmap_delete(map, &test1);
    mu_assert(deleted != NULL, "Should not get NULL on hashmap delete.");
    mu_assert(deleted == &expect1, "Should get test1");
    bstring result = Hashmap_get(map, &test1);
    mu_assert(result == NULL, "Should have deleted the hashmap node.");

    deleted = (bstring) Hashmap_delete(map, &test2);
    mu_assert(deleted != NULL, "Should not get NULL on delete.");
    mu_assert(deleted == &expect2, "Should get test2.");
    result = Hashmap_get(map, &test2);
    mu_assert(result == NULL, "Should have deleted the hashmap node.");
    
    return NULL;
}

char *all_tests()
{
    mu_suite_start();
    // the order of tests matters here
    mu_run_test(test_hashmap_create);
    mu_run_test(test_hashmap_get_set);
    mu_run_test(test_hashmap_traverse);
    mu_run_test(test_hashmap_delete);
    mu_run_test(test_hashmap_destroy);

    return NULL;
}

RUN_TESTS(all_tests);