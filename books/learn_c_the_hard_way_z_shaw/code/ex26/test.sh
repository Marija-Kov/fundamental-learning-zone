rm logfind
make logfind
echo '~~~~~~~~~~~~~~~~~~~~~'
echo '----> Test 1 - AND'
echo '~~~~~~~~~~~~~~~~~~~~~'

./logfind Keech include smash

echo ' '
echo '~~~~~~~~~~~~~~~~~~~~~'
echo '----> Test 2 - OR'
echo '~~~~~~~~~~~~~~~~~~~~~'

./logfind -o Keech include smash

echo ' '
echo '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
echo '----> Test 3 - less than 2 args'
echo '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'

./logfind

echo ' '
echo '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
echo '----> Test 4 - no args after -o'
echo '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'

./logfind -o

echo ' '
echo '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
echo '----> Test 5 - too many args'
echo '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'

./logfind asd asd asd asd add asd asd asd ads addd ssse

echo ' '
echo '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
echo '----> Test 6 - too long arg'
echo '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'

./logfind -o Keech fssdfsdfsdfdsfsdfsdfsfsdfsdfdssdfssddfsfsddfsf include 

echo ' '

