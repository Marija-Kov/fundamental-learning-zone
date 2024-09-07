#include <stdio.h>
#include <assert.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>

void die(const char *message)
{
	if (errno) {
		perror(message);
	} else {
		printf("ERROR: %s\n", message);
	}

	exit(1);
}

// we define a function type and use a function pointer
typedef int (*compare_cb)(int a, int b);
//      int *(int *, int)
typedef int *sorting_func (int *numbers, int count, compare_cb cmp);
//      int *(*)          (int *,        int,       int (*)(int, int))'

// this function is asking for a pointer to a function
// of type compare_cb
int *bubble_sort(int *numbers, int count, compare_cb cmp)
{
	int temp = 0, j = 0, i = 0;
	// allocate memory for the array of numbers
	int *target = malloc(count * sizeof(int));
	
	if (!target) die("Memory error");
	// copy all bytes from numbers to target memory area:
	memcpy(target, numbers, count * sizeof(int));

	for (i = 0; i < count; ++i) { // bubble sort worst case scenario
		for (j = 0; j < count - 1; ++j) {
			// the comparison could have been done without cmp functions
			if (cmp(target[j], target[j+1]) > 0) {
				temp = target[j+1];
				target[j+1] = target[j];
				target[j] = temp;
			}
		}
	}
	return target;
}

int *other_sort(int *numbers, int count, compare_cb cmp)
{
 int *result = malloc(count * sizeof(int));
 memcpy(result, numbers, count * sizeof(int));
 int temp = result[0];
 result[0] = result[count - 1];
 result[count - 1] = temp;
 return result;
}

int sorted_order(int a, int b)
{
	return a - b;
}

int reverse_order(int a, int b)
{
	return b - a;
}

int strange_order(int a, int b)
{
	if (a == 0 || b == 0) {
		return 0;
	} else {
		return a % b;
	}
}

// this is a pass-through function that passes its arguments
// to another function, prints its output and cleans up
void test_sorting(int *numbers, int count, compare_cb cmp, sorting_func sorter)
{
	int i = 0;
	// passing the arguments to the sorting function
	
	int *sorted = sorter(numbers, count, cmp);

	if (!sorted) {
		die("Failed to sort as requested");
	}

	for (i = 0; i < count; ++i) {
		printf("%d", sorted[i]);
	}
	printf("\n");

	free(sorted);
	
	// this prints raw assembler code of the function: 
	// unsigned char *data = (unsigned char*)cmp;
	// for (i = 0; i < 25; ++i) {
	// 	printf("%02x:", data[i]);
	// }
	printf("\n");
}

int main(int argc, char *argv[])
{
	if (argc < 2) die("USAGE: ex18 [args: integers]");
	int count = argc - 1; 
	int i = 0;
	// inputs are args that come after ex18
	char **inputs = argv + 1; // get the pointer to the first input arg
	int *numbers = malloc(count * sizeof(int)); // allocate memory for all ints
	if (!numbers) die("Memory error");
	for (i = 0; i < count; ++i) {
	// assign each input (cast to int) to each number
		numbers[i] = atoi(inputs[i]);
	}
	
	// line 86-96 sum-up:
	// we pick out numerical string input from our command,
	// convert each of them to int and store into memory
	// previously allocated for that purpose.
	
	test_sorting(numbers, count, sorted_order, bubble_sort);
	test_sorting(numbers, count, reverse_order, bubble_sort);
	test_sorting(numbers, count, strange_order, bubble_sort);
	test_sorting(numbers, count, NULL, other_sort);
	free(numbers);

	return 0;
}
