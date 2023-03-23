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

}

let list = new LinkedList()
list.append("A")
list.append("B")
list.prepend("C");
list.prepend("D")
list.search("A")
list.search("E")

console.log(list)



