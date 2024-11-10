#ifndef _radixmap_h
#define _radixmap_h
#include <stdint.h>
#include <stddef.h>

typedef union RMElement {
 uint64_t raw;
 struct {
    uint32_t key;
    uint32_t value;
 } data;
} RMElement;

typedef struct RadixMap {
    size_t max;
    size_t end;
    uint32_t counter;
    RMElement *contents;
    RMElement *temp;
} RadixMap;

RadixMap *RadixMap_create(size_t max);

void RadixMap_destroy(RadixMap * map);

void RadixMap_sort(RadixMap * map);

RMElement *RadixMap_find(RadixMap * map, uint32_t key);

int RadixMap_add(RadixMap * map, uint32_t key, uint32_t value);

int RadixMap_delete(RadixMap * map, RMElement * el);

#endif

/*
 Unions enable storing different data types in the same memory region at different times.
 _Only one 'active' member can be read at a time_ 
   - implying that multiple members of different types actually can be stored in an union at the same time?
    (and it's just that they cannot be accessed at the same time?) 
*/