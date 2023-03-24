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
        this.head = this.tail = null
    }
    append(value){
     if(!this.tail) {
         this.head = this.tail = new Node(value)
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
        list.append(valuesArr[i]);
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

// Traversing a linked list with a loop:

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

// Traversing a linked list recursively returning values one by one:

function printLinkedList0(head){
  if(head){
    console.log(head.value)
    return printLinkedList0(head.next)
  }
  return "done"
}

//console.log(printLinkedList0(a));

// Traversing the linked list recursively returning values as an array:

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


// TASK: Calculating the sum of values of nodes in a linked list
// If you know how to traverse a linked list, you're in a good shape

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





