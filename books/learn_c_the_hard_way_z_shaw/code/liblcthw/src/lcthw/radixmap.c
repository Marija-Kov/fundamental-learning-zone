/* A. Reinald -> Z. Shaw */

#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <lcthw/dbg.h>
#include <lcthw/radixmap.h>

RadixMap *RadixMap_create(size_t max) 
{
    RadixMap *map = calloc(sizeof(RadixMap), 1);
    check_mem(map);
    map->contents = calloc(sizeof(RMElement), 1);
    check_mem(map->contents);
    map->temp = calloc(sizeof(RMElement), 1);
    check_mem(map->temp);
    map->max = max;
    map->end = 0;
    return map;
 error:
    if(map) {
      if(map->contents) free(map->contents);
      if(map->temp) free(map->temp);
      free(map);
    };
    return NULL;
}

void RadixMap_destroy(RadixMap * map) 
{
    if (map) {
       free(map->contents);
       free(map->temp);
       free(map);
    }
}

/*
 Casting (uint64_t *) to (uint8_t *) allows access to individual bytes.
*/
#define ByteOf(x, y) (((uint8_t *)x)[(y)])

/*
 - short offset - Specifies which byte of the uint64_t values to sort on.
 - uint64_t max - The number of elements in the source array.
 - uint64_t *source - Pointer to the array of integers to be sorted.
 - uint64_t *dest: Pointer to the array where the sorted output will be stored.
*/
static inline void radix_sort(short offset, uint64_t max, uint64_t *source, uint64_t *dest)
{
    /*
     Buckets to store the distribution of the numbers by their (byte) digits - meaning bucket N (0 <= N <= 255) would hold the count of how many times byte value N appears.
    */
    uint64_t count[256] = { 0 };

    uint64_t *cptr = NULL; // an address in the count histogram
    uint64_t *sptr = NULL; // an address in the source array of integers
    uint64_t *end = NULL; // the last memory address

    uint64_t sum = 0; // holds sum of values at an address in the count histogram
    uint64_t cur = 0; // holds the value at the current count address

    for (sptr = source, end = source + max; sptr < end; sptr++) {
        count[ByteOf(sptr, offset)]++;
    } // ?? why don't the tests fail when this for loop is commented out?
    
    // cumulative count
    for (cptr = count, end = count + 256; cptr < end; cptr++) {
        cur = *cptr;
        *cptr = sum;
        sum += cur;
    }
    
    // placing elements from source to dest in the correct order using cumulative count values
    for (sptr = source, end = source + max; sptr < end; sptr++) {
        cptr = count + ByteOf(sptr, offset); 
        dest[*cptr] = *sptr;
        /* 
         This increment ensures that the next occurrence of the same byte value 
         will be placed in the next available position in the dest array:
        */
        ++(*cptr);
    }

}

void RadixMap_sort(RadixMap * map)
{
    uint64_t *source = &map->contents[0].raw; // first byte in a RadixMap
    uint64_t *temp = &map->temp[0].raw; // temporarily holds sorted elements
    /* 
      Running it 4 times to sort elements by first 32b - the key; 32b / 8b = 4 passes
    */
    radix_sort(0, map->end, source, temp);
    radix_sort(0, map->end, temp, source);
    radix_sort(0, map->end, source, temp);
    radix_sort(0, map->end, temp, source);
}

RMElement *RadixMap_find(RadixMap * map, uint32_t target)
{
    check(map != NULL, "Map is NULL.");
    check(map->contents != NULL, "Map has no contents.");
    int low = 0;
    int high = map->end - 1;
    RMElement *el = map->contents;

    while (low <= high) {
        int middle = low + (high - low) / 2; // why not just: (low + high) / 2 ?
        uint32_t key = el[middle].data.key;

        if (target < key) {
            // move high below the current middle
            high = middle - 1;
        } else if (target > key) {
            // move low above the current middle
            low = middle + 1;
        } else {
            return &el[middle];
        }
    }
error:
    return NULL;
}

int RadixMap_add(RadixMap * map, uint32_t key, uint32_t value)
{
    //check(map && key && value, "Needs all three parameters."); // this crashed it
    check(key < UINT32_MAX, "Key has to be less than UINT32_MAX.");
    check(map->end + 1 < map->max, "RadixMap is full.");
    RMElement el = {.data = {.key = key, .value = value}};
    map->contents[map->end++] = el;
 
    RadixMap_sort(map);

    return 0;
error:
    return -1;
}

int RadixMap_delete(RadixMap * map, RMElement * el) 
{
    check(map->end > 0, "There's nothing to delete.");
    check(el != NULL, "Can't delete a NULL element.");
    // this works because we want the key to be less than UINT32_MAX (see RadixMap_add):
    el->data.key = UINT32_MAX; 
    if (map->end > 1) {
        RadixMap_sort(map);
    } 

    map->end--;

    return 0;
error:
    return -1;
}