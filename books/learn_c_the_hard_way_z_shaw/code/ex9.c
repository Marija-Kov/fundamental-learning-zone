#include <stdio.h>

int main(int argc, char *argv[])
{
	int i = 1;
	while (i < 25) {
		if(argc == 1) {
		 printf("Please provide arguments and rerun the program\n");
		 break;
		}
		if (argv[i]) {
			printf("State %d: %s \n", i, argv[i]);
			if (i == argc - 1){
				printf("No more args!\n");
				break;
			}
		} else {	
			printf("%d\n", i);
		}
		i++;
	}
	return 0;
}
