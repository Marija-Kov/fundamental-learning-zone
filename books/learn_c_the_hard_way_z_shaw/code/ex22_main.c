#include "ex22.h"
#include "dbg.h"

const char *MY_NAME = "Keech Bleech";

void scope_demo(int count)
{
 log_info("count is: %d", count);

 if (count > 10) {
  int count = 100; //BAD! BUGS!

  log_info("count in this if block scope is %d", count);
 }

 log_info("count is at exit: %d", count);

 count = 3000;

 log_info("count after assign: %d", count);
}

int main(int argc, char *argv[])
{
 //test out THE_AGE accessors
 log_info("My name: %s, age %d", MY_NAME, get_age());
 
 set_age(100);

 log_info("My age is now: %d", get_age());

 //test out THE_SIZE extern
 log_info("THE_SIZE is: %d", THE_SIZE);

 print_size();

 THE_SIZE = 9;

 log_info("THE_SIZE is now: %d", THE_SIZE);

 print_size();

 //test the ratio function static
 log_info("Ratio at first: %f", update_ratio(2.0));
 log_info("Ratio once more: %f", update_ratio(10.0));
 log_info("Ratio once more: %f", update_ratio(300.0));

 //test scope demo
 int count = 4;
 scope_demo(count);
 scope_demo(count * 20);

 log_info("count after calling scope_demo: %d", count);

 log_info("this is a pointer to a static variable: %p", inaccessible_huh());

 log_info("I just reassigned a static, it's now %d", reassign_static());
 
 icallbyvalue(count);
 log_info("count is now %d here", count);

 icallbyreference(&count);
 log_info("count is now %d here", count);

 return 0;
}
