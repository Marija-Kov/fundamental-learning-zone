#include <lcthw/bstrlib.h>
#include "minunit.h"
#include <assert.h>
#include <math.h>


char *test_bfromcstr()
{
    printf("### Testing bfromcstr....\n");
    const char *cstr = "keech";
    int len = 0;
    while (cstr[len] != '\0') {
        len++;
    }
    bstring result = bfromcstr(cstr);
    mu_assert(*cstr == *result->data, "Failed to create bstring from C string const");
    mu_assert(len == result->slen, "bstring length not as expected");

    bdestroy(result);

    return NULL;

}

char *test_bstrcpy()
{
    printf("### Testing bstrcpy....\n");
    const char *cstr = "keech";
    bstring bstr = bfromcstr(cstr);

    bstring copied = bstrcpy((const_bstring) bstr);
    mu_assert(*bstr->data == *copied->data, "bstr not copied as expected.");
    mu_assert(bstr->slen == copied->slen, "bstr copy slen not as expected.");
    mu_assert(bstr->mlen == copied->mlen, "bstr copy mlen not as expected.");

    bdestroy(bstr);
    bdestroy(copied);

    return NULL;
}

char *test_bdestroy()
{
    printf("### Testing bdestroy....\n");
    const char *cstr = "keech";
    bstring bstr = bfromcstr(cstr);
    check(bstr != NULL, "bstring not created");

    int destroyed = bdestroy(bstr);
    mu_assert(destroyed == 0, "bstring not destroyed as expected");

    return NULL;
error:
    return NULL;
}

char *test_bassign()
{
    printf("### Testing bassign....\n");
    const char *cstr1 = "keech";
    const char *cstr2 = "poozh";
    bstring bstr1 = bfromcstr(cstr1);
    bstring bstr2 = bfromcstr(cstr2);
    int result = bassign(bstr1, (const_bstring)bstr2);

    mu_assert(*bstr1->data == *bstr2->data, "bstrings' data should match.");
    mu_assert(result == 0, "bstring not assigned as expected");

    bdestroy(bstr1);
    bdestroy(bstr2);

    return NULL;
}

char *test_bassigncstr()
{
    printf("### Testing bassigncstr....\n");
    const char *cstr1 = "keech";
    const char *cstr2 = "poozh";
    bstring bstr = bfromcstr(cstr1);
    int result = bassigncstr(bstr, cstr2);

    mu_assert(*bstr->data == *cstr2, "bstring data should match cstr.");
    mu_assert(result == 0, "bstring not assigned as expected");

    bdestroy(bstr);

    return NULL;
}

char *test_bassignblk()
{
    printf("### Testing bassignblk....\n");
    const char *cstr1 = "keech";
    const char *cstr2 = "poozh";
    int newlen = 16;
    bstring bstr = bfromcstr(cstr1);
    int result = bassignblk(bstr, cstr2, newlen);

    mu_assert(*bstr->data == *cstr2, "bstring data should match cstr.");
    mu_assert(*(bstr->data+1) == *(cstr2+1), "bstring data should match cstr.");
    mu_assert(bstr->slen == newlen, "bstring slen should match newlen.");
    mu_assert(result == 0, "bstring not assigned as expected");

    bdestroy(bstr);

    return NULL;
}

char *test_blk2bstr()
{
    printf("### Testing blk2bstr....\n");
    const char *cstr = "keech";
    bstring bstr = blk2bstr(cstr, 16);

    mu_assert(bstr->slen == 16, "slen not as expected");
    
    bdestroy(bstr);

    return NULL;
}

char *test_bconcat()
{
    printf("### Testing bconcat....\n");
    const char *cstr1 = "keech";
    const char *cstr2 = "poozh";
    bstring bstr1 = bfromcstr(cstr1);
    int len1 = bstr1->slen;
    bstring bstr2 = bfromcstr(cstr2);
    int len2 = bstr2->slen;
    int bconc = bconcat(bstr1, bstr2);

    mu_assert(*(bstr1->data+len1) == *cstr2, "new bstring not as expected");
    mu_assert(bstr1->slen == len1 + len2, "new bstring length not as expected");
    mu_assert(bconc == 0, "bstrings not concatenated as expected");

    bdestroy(bstr1);
    bdestroy(bstr2);

    return NULL;
}

char *test_bstricmp()
{
    printf("### Testing bstricmp....\n");
    const char *cstr1 = "keech";
    const char *cstr2 = "poozh";
    const char *cstr3 = "Poozh";
    bstring bstr1 = bfromcstr(cstr1);
    bstring bstr2 = bfromcstr(cstr2);
    bstring bstr3 = bfromcstr(cstr3);

    int bcmp1 = bstricmp(bstr1, bstr2);
    int bcmp2 = bstricmp(bstr2, bstr3);

    mu_assert(bcmp1 != 0, "the bstrings should not be equal.");
    mu_assert(bcmp2 == 0, "the bstrings should be equal.");

    bdestroy(bstr1);
    bdestroy(bstr2);
    bdestroy(bstr3);

    return NULL;
}

char *test_biseq()
{
    printf("### Testing biseq....\n");
    const char *cstr1 = "Poozh";
    const char *cstr2 = "poozh";
    const char *cstr3 = "poozh";
    bstring bstr1 = bfromcstr(cstr1);
    bstring bstr2 = bfromcstr(cstr2);
    bstring bstr3 = bfromcstr(cstr3);

    int bcmp1 = biseq(bstr1, bstr2);
    int bcmp2 = biseq(bstr2, bstr3);

    mu_assert(bcmp1 == 0, "the bstrings should not be equal.");
    mu_assert(bcmp2 != 0, "the bstrings should be equal.");

    bdestroy(bstr1);
    bdestroy(bstr2);
    bdestroy(bstr3);

    return NULL;
}

char *test_binstr()
{
    printf("### Testing binstr....\n");
    const char *cstr1 = "poozh";
    const char *cstr2 = "poozh";
    const char *cstr3 = "oz";
    bstring bstr1 = bfromcstr(cstr1);
    bstring bstr2 = bfromcstr(cstr2);
    bstring bstr3 = bfromcstr(cstr3);

    int case1 = binstr(bstr1, 0, bstr2);
    int case2 = binstr(bstr2, 3, bstr3);
    int case3 = binstr(bstr2, 2, bstr3);
    int case4 = binstr(bstr3, 2, bstr2);

    mu_assert(case1 == 0, "the bstring should have been found in another bstring");
    mu_assert(case2 == -1, "the bstring should have not been found in another bstring.");
    mu_assert(case3 == 2, "the bstring should have been found in another bstring.");
    mu_assert(case4 == -1, "the bstring should have not been found in another bstring.");

    bdestroy(bstr1);
    bdestroy(bstr2);
    bdestroy(bstr3);

    return NULL;
}

char *test_bfindreplace()
{
    printf("### Testing bfindreplace....\n");
    const char *cstr1 = "poozh";
    const char *cstr2 = "abc";
    const char *cstr3 = "oz";
    bstring bstr1 = bfromcstr(cstr1);
    bstring bstr2 = bfromcstr(cstr2);
    bstring bstr3 = bfromcstr(cstr3);

    unsigned char *before = bstr1->data;
    printf("%s\n", before);
    int case1 = bfindreplace(bstr1, bstr3, bstr2, 1);
    
    mu_assert(case1 == 0, "bstring not found nor replaced as expected.");
    printf("%s\n", bstr1->data); // obviously does not contain "oz" at this point

    int case2 = bfindreplace(bstr1, bstr3, bstr2, 1);
    printf("%s\n", bstr1->data);
    mu_assert(case2 != 0, "bstring should not have been found nor replaced."); // fails

    bdestroy(bstr1);
    bdestroy(bstr2);
    bdestroy(bstr3);

    return NULL;
}

char *test_bsplit()
{
    printf("### Testing bsplit....\n");
    const char *cstr1 = "awwawwawwawwwawwawwawwa";
    bstring bstr1 = bfromcstr(cstr1);
    char ch = 'a';
    int chcount = 0;
    for (int i = 0; i < bstr1->slen; i++) {
        if(bstr1->data[i] == ch) {
            chcount++;
        }
    }
    bstrList *list = bsplit(bstr1, ch);
    check(list, "bstrList not created");
    mu_assert(list->qty == chcount + 1, "sub(b)string count not as expected");
    mu_assert(list->mlen == floor((list->qty + 8) / 8) * 8, "sub(b)string mlen not as expected"); // does not pass if qty <= 4
    
    // When split produces 4 or less substrings:

    const char *cstr2 = "aww";
    bstring bstr2 = bfromcstr(cstr2);
    bstrList *shlist = bsplit(bstr2, ch);
    check(shlist, "short bstrList not created");
    mu_assert(shlist->mlen == 4, "short sub(b)string mlen not as expected");

    bdestroy(bstr1);
    bdestroy(bstr2);
    bstrListDestroy(list);
    bstrListDestroy(shlist);
    
    return NULL;
error:
    return NULL;
}

char *test_bformat()
{
    printf("### Testing bformat....");
    const char *s = "poozh";
    bstring bstr1 = bformat("a string %s", s);
    char *exp = "a string poozh";
    bstring bexp = bfromcstr(exp);

    mu_assert(bstricmp(bstr1, bexp) == 0, "output bstring not as expected.");

    bdestroy(bstr1);
    bdestroy(bexp);

    return NULL;
}

char *all_tests()
{
    mu_suite_start();

    mu_run_test(test_bfromcstr);
    mu_run_test(test_bstrcpy);
    mu_run_test(test_bdestroy);
    mu_run_test(test_bassign);
    mu_run_test(test_bassigncstr);
    mu_run_test(test_bassignblk);
    mu_run_test(test_blk2bstr);
    mu_run_test(test_bconcat);
    mu_run_test(test_bstricmp);
    mu_run_test(test_biseq);
    mu_run_test(test_binstr);
    // mu_run_test(test_bfindreplace);
    mu_run_test(test_bsplit);
    mu_run_test(test_bformat);

    return NULL;
}

RUN_TESTS(all_tests);
