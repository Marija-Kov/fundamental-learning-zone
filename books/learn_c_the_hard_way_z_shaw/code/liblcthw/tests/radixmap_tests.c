#include "minunit.h"
#include <lcthw/radixmap.h>
#include <time.h>
#include <math.h>

double elapsed;
clock_t start, end; 

static int make_random(RadixMap * map)
{
    size_t i = 0;

    for (i = 0; i < map->max - 1; i++) {
        uint32_t key = (uint32_t) (rand() | (rand() << 16)); // why shift it by 16 specifically?
        check(RadixMap_add(map, key, i) == 0, "Failed to add element with key %u.", key);
    }
    return i;
error:
    return 0;
}

static int test_search(RadixMap * map)
{
    unsigned i = 0;
    RMElement *el = NULL;
    RMElement *found = NULL;

    for (i = map->end / 2; i < (unsigned) map->end; i++) {
        el = &map->contents[i];
        found = RadixMap_find(map, el->data.key);
        check(found != NULL, "Didn't find %u at %u.", el->data.key, i);
        check(found->data.key == el->data.key, "Got the wrong result: %p:%u, looking for %u at %u.", found, found->data.key, el->data.key, i);
    }
    return 1;
error:
    return 0;
}

static int check_order(RadixMap *map)
{
    RMElement d1, d2;
    unsigned int i = 0;

    for (i = 0; map->end > 0 && i < map->end - 1; i++) {
        d1 = map->contents[i];
        d2 = map->contents[i + 1];

        if (d1.data.key > d2.data.key) {
            debug("FAIL:i=%u, key: %u, value: %u, equals max? %d\n", 
            i, d1.data.key, d1.data.value, d2.data.key == UINT32_MAX);

            return 0;
        }
    }

    return 1;
}

static char *test_operations()
{
    size_t N = 200;

    RadixMap *map = RadixMap_create(N);
    mu_assert(map != NULL, "Failed to make map.");
    mu_assert(make_random(map), "Failed to make random fake radix map.");


    start = clock();
    RadixMap_sort(map);
    end = clock();

    mu_assert(check_order(map), "Failed to sort the RadixMap.");
    mu_assert(test_search(map), "Failed the search test.");
    mu_assert(check_order(map), "RadixMap didn't stay sorted after search.");

    while (map->end > 0) {
        RMElement *el = RadixMap_find(map, map->contents[map->end - 1].data.key);
        mu_assert(el != NULL, "Should find the radix map element.");
        size_t old_end = map->end;
        mu_assert(RadixMap_delete(map, el) == 0, "Failed to delete.");
        mu_assert(old_end - 1 == map->end, "Wrong size after delete.");
        mu_assert(check_order(map), "RadixMap didn't stay sorted after delete.");
    }

    RadixMap_destroy(map);

    elapsed = ((double)(end - start)) / CLOCKS_PER_SEC;
    printf("Radix sort took %f seconds\n", elapsed);

    return NULL;
}

char *all_tests()
{
    mu_suite_start();
    srand(time(NULL));

    mu_run_test(test_operations);

    return NULL;
}

RUN_TESTS(all_tests);