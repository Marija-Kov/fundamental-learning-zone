#include <lcthw/list.h>
#include <lcthw/dbg.h>

List *List_create()
{
 return calloc(1, sizeof(List));
}

void List_destroy(List *list)
{
 // TODO: make sure that list isn't NULL
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

//void List_split()
//{
 // do we split at n-th node or at node->value ?  
//}

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




