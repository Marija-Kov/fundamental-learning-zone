#include <stdio.h>

int main(int argc, char *argv[])
{
	int i = 0;

	if(argc == 1){
		printf("You have no arguments! Please provide up to 3 arguments.\n");
	} else if (argc > 1 && argc < 5){
		printf("Here are your arguments:\n");

		for (i = 1; i < argc; i++){
			printf(" %s", argv[i]);
		}
		printf("\n");
	} else {
		printf("You have too many arguments\n.");
		printf("Please provide up to 3 arguments.\n");
	}

	return 0;
} 
