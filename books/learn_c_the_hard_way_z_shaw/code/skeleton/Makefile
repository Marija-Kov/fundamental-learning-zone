CFLAGS=-g -O2 -Wall -Wextra -Isrc -rdynamic -DNDEBUG $(OPTFLAGS) 
LIBS=-ldl $(OPTLIBS) # OPTsomething lets you augment something - build options, linking options...
PREFIX?=/usr/local # optional variable, will only run if there's no existing PREFIX

SOURCES=$(wildcard src/**/*.c src/*.c) # dynamically create SOURCES
OBJECTS=$(patsubst %.c, $.o, $(SOURCES)) # use source files to make a list of object files

TEST_SRC=$(wildcard tests/*_tests.c) # find all test source files
TESTS=$(patsubst %.c, %, $(TEST_SRC)) # get all the test targets, strip the .c extension 

TARGET=build/libYOUR_LIBRARY.a # specify the ultimate target (we're trying to build a library)
SO_TARGET=$(patsubst %.s, %.so, $(TARGET))

# The Target Build
all: $(TARGET) $(SO_TARGET) tests # build tests by default - when no target is given; TARGET is a library

dev: CFLAGS=-g -Wall -Isrc -Wall -Wextra $(OPTFLAGS) # changing options just for development build
dev: all # applying changed options

$(TARGET): CFLAGS += -fPIC # build TARGET library whatever it is at this point, add an option just for that build
$(TARGET): build $(OBJECTS) # make the build dir, compile all the objects (.o)
	ar rcs $@ $(OBJECTS) # make the target (ar), put it here ($@) and all the OBJECTS after; $@ --> TARGET --> library;
	ranlib $@ # make the library
$(SO_TARGET): $(TARGET) $(OBJECTS)
	$(CC) -shared -o $@ $(OBJECTS)

build:
	@mkdir -p build # make build dir if it doesn't exist
	@mkdir -p bin

# The Unit Tests
.PHONY: tests # when the target is not real but a dir exists under its name, make will ignore it
tests: CFLAGS += $(TARGET) # link test programs with the TARGET library
tests: $(TESTS) 
	sh ./tests/runtests.sh

# The Cleaner
clean:
	rm -rf build $(OBJECTS) $(TESTS)
	rm -f tests/tests.log
	find . -name "*.gc*" -exec rm {} \;
	rm -rf `find . -name "*.dSYM" -print`

# The Install
install: all # make install depend on the 'all' target
	install -d $(DESTDIR)/$(PREFIX)/lib/ # create target library dir if it doesn't exist
	install $(TARGET) $(DESTDIR)/$(PREFIX)/lib/ # install the library in the dir

# The Checker
check:
	@echo Files with potentially dangerous functions. # below: find bad functions in any files, prevent grep from returning error
	@egrep '[^_.>a-zA-Z0-9](str(n?cpy|n?cat|xfrm|n?dup|str|pbrk|tok|_)\
	|stpn?cpy|a?sn?printf|byte_)' $(SOURCES) || true


