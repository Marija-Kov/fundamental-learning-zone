#include <stdio.h>

typedef enum {
    TYPE_INT,
    TYPE_FLOAT,
    TYPE_STRING,
} VariantType;

struct Variant {
    VariantType type;
    union {
        int as_integer;
        float as_float;
        char *as_string;
    } data;
};
typedef struct Variant Variant;

void Variant_print(Variant *var)
{
    switch (var->type) {
        case TYPE_INT:
         printf("INT: %d\n", var->data.as_integer);
         break;
        case TYPE_FLOAT:
         printf("FLOAT: %f\n", var->data.as_float);
         break;
        case TYPE_STRING:
         printf("STRING: %s\n", var->data.as_string);
         break;
        default:
         printf("UNKNOWN TYPE: %d\n", var->type);
    }
}

int main(int argc, char *argv[])
{

    Variant a_int = {.type = TYPE_INT, .data.as_integer = 100};
    Variant a_float = {.type = TYPE_FLOAT, .data.as_float = 100.34};
    Variant a_string = {.type = TYPE_STRING, .data.as_string = "POOZH"};

    Variant_print(&a_int);
    Variant_print(&a_float);
    Variant_print(&a_string);

    a_int.data.as_integer = 101;

    Variant_print(&a_int);

    return 0;
}

/*
 The Variant only takes up as much space as the VariantType type tag and the largest member of the union. 
 This is because C is layering each element of the Variant.data union together, so they overlap. 
 To do that, C sizes the union big enough to hold the largest element.
*/

/*
 This:
  struct Variant { ... };
  typedef struct Variant Variant;

 is the same as this:
  typedef struct Variant { ... } Variant;
*/