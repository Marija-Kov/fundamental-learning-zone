rm logfind
make logfind
echo '----> Test 1 - one arg'
./logfind abc
echo '----> Test 2 - multiple args'
./logfind a b c
echo '----> Test 3 - no args'
./logfind
