#include <stdio.h>

// *argv[] is actually a 2 dimensional array
int main(int argc, char *argv[])
{
    int i = 0;

    for (i = 0; i < argc; i++) {
			printf("arg %d: %s\n", i, argv[i]);
    }

    // let's make our own array of strings
		// i.e. array of pointers to strings
    char *states[] = {
        "California", "Oregon",
        NULL, "Texas"
    };

    int num_states = 4;

    for (i = 0; i < num_states; i++) {
        printf("state %d: %s\n", i, states[i]);
				// also print every letter in a string
				if(states[i] == NULL){
				printf("it's a NULL\n");
				} else {
				char *letter = states[i];
					while(*letter != '\0'){
						printf("%c\n", *letter);
						letter++;
					}
				}
    }

    return 0;
}
