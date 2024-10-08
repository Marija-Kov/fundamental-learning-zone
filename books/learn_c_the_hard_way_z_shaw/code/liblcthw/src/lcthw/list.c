#include <lcthw/list.h>
#include <lcthw/dbg.h>
#include <math.h>

List *List_create()
{
 return calloc(1, sizeof(List));
}

SplitList *Split_list_create(int count) {
 SplitList *result = calloc(count + 1, sizeof(List));
 result->lists_ptr = calloc(count, sizeof(List));
 result->length = count;
 return result;
}

void List_destroy(List *list)
{
 // TODO: make sure that list isn't NULL
 check(list != NULL,"List input cannot be NULL.");
 
 LIST_FOREACH(list, first, next, cur)
 {
  if (cur->prev) {
    free(cur->prev);
    cur->prev = NULL;
  }
 }
 free(list->last);
 list->last = NULL;
 // deallocate every single ListNode and the List itself
 free(list);
 list = NULL;
error:
 list = NULL; // any statement
}

void List_clear(List *list)
{
 LIST_FOREACH(list, first, next, cur)
 {
  free(cur->value);
  cur->value = NULL;
 }
}

void List_clear_destroy(List *list)
{
 LIST_FOREACH(list, first, next, cur)
 {
  free(cur->value);
  cur->value = NULL;
  if (cur->prev) {
   free(cur->prev);
   cur->prev = NULL;
  }
  free(list->last);
  list->last = NULL;
  free(list);
  list = NULL;
  // List_clear(list);
  // List_destroy(list);
 }
}

void List_push(List *list, void *value)
{
 ListNode *node = calloc(1, sizeof(ListNode));
 check_mem(node);
 node->value = value;
 
 if (list->last == NULL) {
   list->first = node;
   list->last = node;
 } else {
  list->last->next = node;
  node->prev = list->last;
  list->last = node;
 }
 list->count++;
error:
 return;
}

void *List_remove(List *list, ListNode *node)
{
  void *result = NULL;

  check(list->first && list->last, "The list is empty.");
  check(node, "Node can't be null.");
  if (node == list->first && node == list->last) {
   list->first = NULL;
   list->last = NULL;
  } else if (node == list->first) {
   list->first = node->next;
   check(list->first != NULL, "Invalid list - somehow, the head is null.");
   list->first->prev = NULL;
  } else if (node == list->last) {
   list->last = node->prev;
   check(list->last != NULL, "Invalid list - somehow, got a next is null.");
   list->last->next = NULL;
  } else {
   ListNode *after = node->next;
   ListNode *before = node->prev;
   before->next = after;
   after->prev = before;
  }
  list->count--;
  result = node->value;
  free(node);
  node = NULL;
error:
  return result;
}

void *List_pop(List *list)
{
 ListNode *node = list->last;
 return node != NULL ? List_remove(list, node) : NULL;
}

void List_unshift(List *list, void *value)
{
 ListNode *node = calloc(1, sizeof(ListNode));
 check_mem(node);
 node->value = value;
 if (list->first == NULL) {
   list->first = node;
   list->last = node;
 } else {
  node->next = list->first;
  list->first->prev = node;
  list->first = node;
 }
 list->count++;

error:
 return; 
}
// void * return value means that a pointer to _some_ data will be returned
// it's a catch-all pointer type
void *List_shift(List *list)
{
 ListNode *node = list->first;
 return node != NULL ? List_remove(list, node) : NULL;
}

// Splits doubly linked lists into single-node lists.
//
// [ list ] - a list to be split; 
// [ result ] - struct:
//  - List **lists_ptr: pointer to where pointers to split lists are stored, must not be NULL;
//  - int length: number of split lists, must be equal to list->count;
SplitList *List_split(List *list, SplitList *result)
{
  if (result == NULL) {
   printf("BAD INPUT: SplitList must not be NULL.\n");
   return result;
  };
  if (list->count > result->length) {
   printf("BAD INPUT: List and SplitList lengths must match.\n");
   return result;
  };
  if (list->count == 0) return result;

  ListNode *cur = list->first;
  for (int i = 0; i < list->count; i++) {
    // add an empty List ptr to a collection of List ptrs:
    result->lists_ptr[i] = List_create();
    // add a node to an empty list:
    List_push(result->lists_ptr[i], cur->value);
    cur = cur->next; 
  }
  free(cur);
  List_destroy(list);

  return result;
}

// ideally, we'll be able to join any number of linked lists in the given order 
void *List_join(List *list1, List *list2)
{
  if (list1 == NULL) return list2;
  if (list2 == NULL) return list1;
  list2->first->prev = list1->last;
  list1->last->next = list2->first;
  list1->last = list2->last;
  list2->first = list1->first;
  list1->count += list2->count;
  return list1;
}

void *List_cross_join(List *list1, List *list2)
{
  if (list1 == NULL) return list2;
  if (list2 == NULL) return list1;
  int count = list1->count > list2->count ? list1->count : list2->count; 
  int i = 0;
  ListNode *cur1 = list1->first;
  ListNode *cur2 = list2->first;
  ListNode *temp = cur1->next;
  for (i = 0; i < count; i++) {
   cur1->next = cur2;
   cur2->prev = cur1;
   if (temp == NULL) break;
   cur1 = temp;
   temp = cur2->next;
   cur2->next = cur1;
   cur1->prev = cur2;
   if (temp == NULL) break;
   cur2 = temp;
   temp = cur1->next;
  }
 if (list1->count < list2->count) list1->last = list2->last;
 list1->count = list1->count += list2->count;
 return list1;
}

void *List_merge_sort(List *left, List *right)
{
 if (left == NULL) {
  if (right == NULL) return NULL;
  return right;
 } else if (right == NULL) return left;

 // When one list is empty and the other one isn't
 if (right->count == 0) {
  free(right);
  return left;
 } else if (left->count == 0) {
  free(left);
  return right;
 }

 List *result = List_create();
 
 while (left->count != 0 && right->count != 0) {
  if (atoi(left->first->value) <= atoi(right->first->value)) {
   List_push(result, left->first->value);
   List_shift(left);
  } else {
   List_push(result, right->first->value);
   List_shift(right);
  }
 }
 
 if (left->count != 0) {
  result = List_join(result, left);
 }
 if (right->count != 0) {
  result = List_join(result, right);
 }
 
 free(left);
 free(right);

 return result;
}



