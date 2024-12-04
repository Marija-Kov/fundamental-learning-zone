#ifndef hashmap_algos_h
#define hashmap_algos_h

#include <stdint.h>

// Glenn Fowler, Phong Vo, and Landon Curt Noll
uint32_t Hashmap_fnv1a_hash(void *data);

// named after Mark Adler
uint32_t Hashmap_adler32_hash(void *data);

// attributed to Dan J. Bernstein (DJB
uint32_t Hashmap_djb_hash(void *data);

#endif

