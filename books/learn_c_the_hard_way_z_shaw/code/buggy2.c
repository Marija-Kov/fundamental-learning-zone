#include <stdio.h>

int square(int value) {
    return value * value;
}

void demo(struct Demo* d){
	printf("demo function called!\n");
}

struct Demo {
    int memberVar;
    void (*demo)(struct Demo*);
};

int globalVariable;

int main(int argc, char *argv[]) {
    if (argc > 1) {
        printf("%s\n", argv[1]);
    }

    int value = 5;
    int result1 = square(value);
    printf("%d\n", result1);

    int result2 = square(10);
    printf("%d\n", result2);

    globalVariable = 75;

    struct Demo d;
    d.demo(&d);
    d.memberVar = 10;
    d.memberVar = 0;

    return 0;
}

