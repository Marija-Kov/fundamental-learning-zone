#include <stdio.h>


int age_addresses(int **ages, int count) 
{ 
	int i;
	for (i = 0; i < count; ++i) {
 	printf("The address if the number %d is %p and the address of its address is %p.\n", *ages[i], &*ages[i], &ages[i]);
	}	
	return 0;
}

int name_addresses(char **names, int count)
{
	int i;
	for(i = 0; i < count; ++i) {
		printf("Name %s is stored at address %p.\n", names[i], &names[i]); 
		printf("The 3rd character of the name %s (%c) is stored at the address %p. \n", names[i], names[i][2], &names[i][2]);
	}
	return 0;
}

int value_at_array_index(char **name, int **age, int count)
{
	printf("Using pointers to get value at index \n");
	int i;
	for (i = count - 1; i >= 0; i--) {
		printf("%s is %d years old. \n", *(name + i), **(age + i));
	}
	return 0;
}

int array_subscript(char **name, int **age, int count)
{
	printf("Using array subscript to get values\n");
	while (count) {
		count--;
		printf("%s is %d years old again. \n", name[count], *age[count]);
	}
	return 0;
}

int stupid_complex(char **name, int **age, int count)
{
	printf("Stupid complex way to access values with pointers\n");
	
	return 0;
}	

int main(int argc, char *argv[])
{
	int a = 23, b = 43, c = 12, d = 89, e = 2;
	// a pointer to an array of addresses / pointers
	int *ages[] = { &a, &b, &c, &d, &e };

	char *names[] = {
		"Alan", "Frank", "Mary", "John", "Lisa"
	};
  
	int count = sizeof(ages) / sizeof(ages[0]);
	
	age_addresses(ages, count);	
	name_addresses(names, count);

	printf("---\n");

	int **cur_age = ages;
	char **cur_name = names;

	// using pointers to get value at index
	value_at_array_index(cur_name, cur_age, count);

	printf("---\n");	

	array_subscript(cur_name, cur_age, count);

	printf("---\n");

  stupid_complex(cur_name, cur_age, count);

	return 0;
}




