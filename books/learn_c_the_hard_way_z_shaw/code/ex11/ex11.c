#include <stdio.h>

int main(int argc, char *argv[])
{
	int numbers[4] = { 'a', 'a' };
	// if we don't assign '\0' at the end, it will print random weird characters; 
	// for any array of characters of length n, array[n-1] has to be '\0'.
	// an array of characters is a string only if it's null-terminated.
	char name[5] = { 'a', 'a', 'a', 'b', '\0' };

	printf("numbers: %d %d %d %d\n",
			numbers[0], numbers[1], numbers[2], numbers[3]);

	printf("name each: %c %c %c %c\n",
			name[0], name[1], name[2], name[3]);

	printf("name: %s\n", name);
	
	numbers[0] = 1;
  numbers[1] = 2;
  numbers[2] = 3;
  numbers[3] = 4;
	
	name[0] = 'Z';
  name[1] = 'e';
  name[2] = 'd';
  name[3] = '\0';

	printf("numbers: %d %d %d %d\n",
			numbers[0], numbers[1], numbers[2], numbers[3]);

	printf("name each: %c %c %c %c\n",
			name[0], name[1], name[2], name[3]);

	printf("name: %s\n", name);

	// store the pointer to the location of the first character ('Z');
	char *namealt = "Zed";

	printf("namealt: %s\n", namealt);

	printf("namealt each: %c %d %c %c\n",
			namealt[0], namealt[1], namealt[2], namealt[3]);

	return 0;
}
