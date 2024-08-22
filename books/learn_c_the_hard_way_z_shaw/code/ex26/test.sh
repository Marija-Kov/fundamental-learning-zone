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
