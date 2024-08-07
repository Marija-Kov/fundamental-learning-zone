#include <stdio.h>
#include "dbg.h"
#include <stdlib.h>

#define MAX_DATA 100

typedef enum EyeColor {
  BLUE_EYES, GREEN_EYES, BROWN_EYES,
  BLACK_EYES, OTHER_EYES
} EyeColor;

const char *EYE_COLOR_NAMES[] = {
  "Blue", "Green", "Brown", "Black", "Other"
};

typedef struct Person {
  int age;
  char first_name[MAX_DATA];
  char last_name[MAX_DATA];
  EyeColor eyes;
  float income;
} Person;

char *trim(char *str)
{
 int strlen = 0;
 int ws_pre = 0; //number of leading empty chars/index of the first non-empty char
 while (str[strlen]) {
  strlen++;
 }

 while (str[ws_pre] == ' '){
  ws_pre++;
 }
 
 int ws_post = strlen - 1;//index of the first trailing char
 while (str[ws_post - 1] == ' '){
  ws_post--;
 }
 
 int i = 0;
 int j = ws_pre;
 for (int j = ws_pre; j < ws_post; j++) {
  str[i] = str[j];
  i++;
 }  

 str[i + 1] = '\0';

 return str;
}

int main(int argc, char *argv[])
{
  Person you = {.age = 0 };
  int i = 0;
  char *in = NULL;

  printf("What's your First Name? ");
  in = fgets(you.first_name, MAX_DATA - 1, stdin);
  check(in != NULL, "Failed to read first name.");
  trim(in);

  printf("What's your last name? ");
  in = fgets(you.last_name, MAX_DATA - 1, stdin);
  check(in != NULL, "Failed to read last name.");
  trim(in);

  printf("How old are you? ");
  int rc = scanf("%d", &you.age);
  check(rc > 0, "You have to enter a number.");

  printf("What color are your eyes:");
  for (i = 0; i <= OTHER_EYES; i++) {
   printf("\n%d) %s", i + 1, EYE_COLOR_NAMES[i]);
  }
  printf("\n> ");

  int eyes = -1;
  rc = scanf("%d", &eyes);
  check(rc > 0, "You have to enter a number.");

  you.eyes = eyes - 1;
  check(you.eyes <= OTHER_EYES 
      && you.eyes >= 0, "That's not an option.");

  printf("How much do you make an hour? ");
  rc = scanf("%f", &you.income);
  check(rc > 0, "Enter a floating point number.");

  printf("\n----- RESULTS -----");

  printf("\nFirst Name: %s", you.first_name);
  printf("\nLast Name: %s", you.last_name);
  printf("\nAge: %d", you.age);
  printf("\nEyes: %s", EYE_COLOR_NAMES[you.eyes]);
  printf("\nIncome: %f", you.income);
  printf("\n");

  return 0;
error:

  return -1;
}
