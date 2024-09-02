rm ex29
rm libex29.o
rm libex29.so


cc -c libex29.c -o libex29.o
cc -shared -o libex29.so libex29.o
cc -Wall -g -DNDEBUG ex29.c -ldl -o ex29

echo " "
echo " ----> Command not found ---->"
echo " "

ex29 ./libex29.so print_a_message "hello there"

echo " "
echo " ----> Print a message ---->"
echo " "

./ex29 ./libex29.so print_a_message "hello there 1"

echo " "
echo " ----> Lowercase ---->"
echo " "

./ex29 ./libex29.so lowercase "helLO KEEch lowercased"

echo " "
echo " ----> Uppercase ---->"
echo " "

./ex29 ./libex29.so uppercase "helLO KEEch uppercased"

echo " "
echo " ----> Fail on purpose ---->"
echo " "


./ex29 ./libex29.so fail_on_purpose "I fail"

echo " "
echo " ----> Load .so that doesn't exist ---->"
echo " "

./ex29 ./libex.so lowercase "HELLO"


