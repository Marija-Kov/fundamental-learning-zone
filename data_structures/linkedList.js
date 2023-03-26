// Create a class Node that will be used to create node instances. 
// Every node instance will need to have: 1) a value to hold, 2) a reference to the previous node, 3) a reference to the next node.

class Node {
    constructor(value, prev, next) {
        this.value = value;
        this.prev = prev || null;
        this.next = next || null;
    }
}

//Create a class LinkedList that will contain the node instances
//It should be initialized to contain no nodes
//It should have all the methods to add, remove and find the nodes

class LinkedList {
    constructor(){
        this.head = this.tail = null; 

    }
    append(value){
     if(!this.tail) {
         this.head = this.tail = new Node(value) // ** this will cause every first node added to the list to appear twice in the list..
     }
     let oldTail = this.tail;
     this.tail = new Node(value);
     oldTail.next = this.tail;
     this.tail.prev = oldTail;
     }
     prepend(value){
       if(!this.head){
         this.head = this.tail = new Node(value)
       }
       let oldHead = this.head;
       this.head = new Node(value);
       oldHead.prev = this.head;
       this.head.next = oldHead;  
    }
    deleteHead(){
        let removedHead = null;
       switch (this.head) {
         case !this.head:
            console.log("no nodes left");
           break;
         case this.head===this.tail:
            removedHead = this.head
            this.head = null
           break;
         default:
            removedHead = this.head;
            this.head = this.head.next;
            this.head.prev = null;
           break;
       }
       console.log(removedHead)
    }
    deleteTail(){
        let removedTail = null;
        switch (this.tail) {
          case !this.tail:
            console.log("no nodes left");
            break;
          case this.tail===this.head:
            removedTail = this.tail
            this.tail = null
            break;
          default:
            removedTail = this.tail;
            this.tail = this.tail.prev;
            this.tail.next = null;
            break;
        }
    }
    search(value){
        let currentNode = this.head;
        while(currentNode){
            if(currentNode.value === value){
                console.log(currentNode) 
                return
            }
             currentNode = currentNode.next
        }
        console.log(`node ${value} not found`)
        return 
    }
    addMany(valuesArr){
      for (let i = 0; i < valuesArr.length; ++i) {
        this.append(valuesArr[i]);
      }
    }
}

let list = new LinkedList()
list.addMany(["A", "B", "C", "D"])
//console.log(list.head, list.head.next)

let a = new Node("A");
let b = new Node("B");
let c = new Node("C");
let d = new Node("D");

a.next=b
b.next=c
c.next=d

//_________________________________________________________
// Traversing a linked list iteratively:
//_________________________________________________________

function printLinkedList(head){
  const nodeArr = [head.value];
  let curr = head.next;
  while(curr){
    nodeArr.push(curr.value)
    curr = curr.next;
  }
  return nodeArr
}

//console.log(printLinkedList(a))

// ** Note about recursion: every time a function is called, it's added to the call stack, which adds space complexity - O(n)

//_________________________________________________________
// Traversing a linked list recursively returning values one by one:
//_________________________________________________________

function printLinkedList0(head){
  if(head){
    console.log(head.value)
    return printLinkedList0(head.next)
  }
  return "done"
}

//console.log(printLinkedList0(a));

//_________________________________________________________
// Traversing the linked list recursively returning values as an array:
//_________________________________________________________

 function addNodeHelper(node, arr){ 
  if(node){
    arr.push(node.value);
    addNodeHelper(node.next, arr);
  }
 }

function printLinkedList1(head) {
  let nodeArr = [];
  addNodeHelper(head, nodeArr);
  return nodeArr;
}

//console.log(printLinkedList1(a))

//_________________________________________________________
//////Calculating the sum of values of nodes in a linked list
//_________________________________________________________

const aa = new Node(3)
const bb = new Node(6);
const cc = new Node(7);

aa.next = bb;
bb.next = cc;

function getSum(head){
  if(!(head instanceof Node)){
    return "invalid input"
  }
  let sum = head.value;
  let curr = head.next;
  while(curr){
    sum+=curr.value;
    curr = curr.next;
  }
 return sum
}

// console.log(getSum(aa))

// Recursively: 

function getSum0(head) {
  if(!head) return null
  let sum = 0;
  return sumHelper(head, sum);
}

function sumHelper(node, sum) {
  if (node) {
    sum += node.value;
    return sumHelper(node.next, sum);
  }
  return sum
}

// console.log(getSum0(aa))

//_________________________________________________________
///////// Find a value in a linked list
//_________________________________________________________

let newList = new LinkedList();
newList.addMany(["P", "O", "O", "Z", "H"]);
//console.log(newList)

function find(list, val){
 let curr = list.head;
 let pos = 0;
 while(curr){
  if(curr.value===val) return `${val} found at position ${pos}`;
  curr = curr.next;
  ++pos;
 }
 return `value ${val} not found`
}

//console.log(find(newList, "u"))


//_________________________________________________________
//////// Reversing a singly linked list
//_________________________________________________________

const A = new Node("A")
const B = new Node("B");
const C = new Node("C");
const D = new Node("D");
A.next = B
B.next = C
C.next = D

 function reverseSinglyLinkedList(head){
  let prev = null;
  let next = head.next;
  while(curr){
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next; // the order of these reassignments is crucial
  }
 return 
 }

 //console.log(reverseSinglyLinkedList(A))

 function reverseSinglyLinkedListRecursively(curr, prev = null) {
   let next = curr.next;
   curr.next = prev;
   prev = curr;
   console.log(curr);
   if (next) reverseSinglyLinkedListRecursively(next, prev);
   return;
 }
  //console.log(reverseSinglyLinkedListRecursively(A));


//_________________________________________________________
// Finding Tail / Head in a list stored in an object
//_________________________________________________________

 function findTail(list) {
   for (let currNode in list){
     if (list[currNode].next === null){
      return list[currNode]  
   }
  }
 }

 function findHead(list){
  let head;
  for (let currNode in list) {
    for (let anyNode in list) {
      if (list[anyNode].next === list[currNode]) break;
      head = list[currNode];
    }
  }
  return head;
 }


//_________________________________________________________
//////// Create a zipper list out of 2 linked lists
//_________________________________________________________

  const Q = new Node("Q");
  const W = new Node("W");
  const E = new Node("E");
  const R = new Node("R");
  const T = new Node("T");
  const Y = new Node("Y");
  Q.next = W
  W.next = E
  E.next = R
  R.next = T
  T.next = Y

  const Z = new Node("Z");
  const S = new Node("S");
  const V = new Node("V");
  Z.next = S
  S.next = V
   
  //_________________________________________________________
  // Create a zipper list out of 2 linked lists via recursion
  //_________________________________________________________

  // function zipperList(curr, nextCurr){
  //  if (!curr.next) {
  //   curr.next = nextCurr
  //   return 
  //  }
  //  let next = curr.next;
  //  curr.next = nextCurr;
  //  return zipperList(nextCurr, next)
  // }

    function zipperList(head1, head2) {
      if (!head1.next) {
        head1.next = head2;
        return;
      }
      let next = head1.next;
      head1.next = head2;
      return zipperList(head2, next);
    }

//zipperList(Q, Z)

//_________________________________________________________
// Create a zipper list out of 2 linked lists iteratively
//_________________________________________________________

function zipperList0(head1, head2){
  let curr = head1;
  let currNext = curr.next;
  let nextCurr = head2;
  while(currNext){
    curr.next = nextCurr;
    curr = nextCurr;
    nextCurr = currNext
    currNext = curr.next
  }
  return
}

zipperList(Q,Z)

console.log(Q,Z,W,S,E,V,R,T,Y)



