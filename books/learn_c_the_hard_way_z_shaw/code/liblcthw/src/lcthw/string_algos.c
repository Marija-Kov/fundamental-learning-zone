 #include <lcthw/string_algos.h>
 #include <limits.h>

 // Boyer-Moore-Horspool 🐎

 static inline void String_setup_skip_chars(
    size_t *skip_chars,
    const unsigned char *needle, 
    ssize_t nlen)
 {
    // What if nlen is <= 0 ?
    size_t i = 0;
    size_t last = nlen - 1;

    // assign skip value nlen to every possible (8-bit) byte:
    for (i = 0; i < UCHAR_MAX + 1; i++) { // UCHAR_MAX == 255
        skip_chars[i] = nlen;
    }

    // reassign every byte found in needle to a specific skip value:
    for (i = 0; i < last; i++) {
        skip_chars[needle[i]] = last - i;
    }
 }

 static inline const unsigned char *String_base_search(
    const unsigned char *haystack, 
    ssize_t hlen, 
    const unsigned char *needle,
    ssize_t nlen,
    size_t *skip_chars)
{
    size_t i = 0;
    size_t last = nlen - 1;

    assert(haystack != NULL && "Bad haystack.");
    assert(needle != NULL && "Bad needle.");

    check(hlen > 0, "hlen must be > 0");
    check(nlen >= nlen, "nlen must be >= hlen");

    while (hlen >= nlen) {
        // loop until a char from the pattern mismatches a char from the section of the text:
        for (i = last; haystack[i] == needle[i]; i--) {
            if (i == 0) {
                return haystack;
            }
        }
        // shorten the length of the text to check by one length of the pattern:
        hlen -= skip_chars[haystack[last]];
        // adjust the haystack pointer:
        haystack += skip_chars[haystack[last]];
    }

    error:
        return NULL;
}

int String_find(bstring in, bstring what)
{
    const unsigned char *found = NULL;
    const unsigned char *haystack = (const unsigned char *)bdata(in);
    ssize_t hlen = blength(in);
    const unsigned char *needle = (const unsigned char *)bdata(what);
    ssize_t nlen = blength(what);
    size_t skip_chars[UCHAR_MAX +1] = { 0 };

    String_setup_skip_chars(skip_chars, needle, nlen);
    found = String_base_search(haystack, hlen, needle, nlen, skip_chars);

    return found != NULL ? found - haystack : -1;
}

StringScanner *StringScanner_create(bstring in)
{
    StringScanner *scan = calloc(1, sizeof(StringScanner)); // anyway, how does C get teh Size of a typedeffed struct?
    check_mem(scan);
    scan->in = in;
    scan->haystack = (const unsigned char *)bdata(in); // store bstring data
    scan->hlen = blength(in); // store bstring length

    assert(scan != NULL && "darn");
    return scan;
error:
    free(scan);
    return NULL;
}

// Throw the needle in the haystack
static inline void StringScanner_set_needle(StringScanner *scan, bstring tofind)
{
    scan->needle = (const unsigned char *)bdata(tofind);
    scan->nlen = blength(tofind);

    String_setup_skip_chars(scan->skip_chars, scan->needle, scan->nlen);
}

static inline void StringScanner_reset(StringScanner *scan)
{
    scan->haystack = (const unsigned char *)bdata(scan->in);
    scan->hlen = blength(scan->in);
}

int StringScanner_scan(StringScanner *scan, bstring tofind)
{
    const unsigned char *found = NULL;
    ssize_t found_at = 0;
    // no hay - reset and return
    if (scan->hlen <= 0) {
        StringScanner_reset(scan);
        return -1;
    }
    // make sure the target is set
    if ((const unsigned char *)bdata(tofind) != scan->needle) {
        StringScanner_set_needle(scan, tofind);
    }

    found = String_base_search(scan->haystack, scan->hlen, scan->needle, scan->nlen, scan->skip_chars);
    if (found) {
        found_at = found - (const unsigned char *)bdata(scan->in); // subtracting char* from char* returns ssize_t ??
        scan->haystack = found + scan->nlen; // how does this work?
        scan->hlen -= found_at - scan->nlen;
    } else {
        // done, reset the setup
        StringScanner_reset(scan);
        found_at = -1;
    }

    return found_at;

}

void StringScanner_destroy(StringScanner *scan)
{
    if (scan) {
        free(scan);
    }
}