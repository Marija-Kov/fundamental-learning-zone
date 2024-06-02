// Create a class Node that will be used to create node instances.
// Every node instance will need to have: 1) a value to hold, 2) a reference to the previous node, 3) a reference to the next node.
class ListNode {
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
  constructor() {
    this.head = this.tail = null;
  }
  append(value) {
    if (!this.tail) {
      this.head = this.tail = new ListNode(value); // ** this will cause every first node added to the list to appear twice in the list..
    }
    let oldTail = this.tail;
    this.tail = new ListNode(value);
    oldTail.next = this.tail;
    this.tail.prev = oldTail;
  }
  prepend(value) {
    if (!this.head) {
      this.head = this.tail = new ListNode(value);
    }
    let oldHead = this.head;
    this.head = new ListNode(value);
    oldHead.prev = this.head;
    this.head.next = oldHead;
  }
  deleteHead() {
    let removedHead = null;
    switch (this.head) {
      case !this.head:
        console.log("no nodes left");
        break;
      case this.head === this.tail:
        removedHead = this.head;
        this.head = null;
        break;
      default:
        removedHead = this.head;
        this.head = this.head.next;
        this.head.prev = null;
        break;
    }
  }
  deleteTail() {
    let removedTail = null;
    switch (this.tail) {
      case !this.tail:
        console.log("no nodes left");
        break;
      case this.tail === this.head:
        removedTail = this.tail;
        this.tail = null;
        break;
      default:
        removedTail = this.tail;
        this.tail = this.tail.prev;
        this.tail.next = null;
        break;
    }
  }
  search(value) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === value) {
        console.log(currentNode);
        return;
      }
      currentNode = currentNode.next;
    }
    console.log(`node ${value} not found`);
    return;
  }
  addMany(valuesArr) {
    for (let i = 0; i < valuesArr.length; ++i) {
      this.append(valuesArr[i]);
    }
  }
}

const test = (title, callback) => {
  console.log(` 🔹 ${title} 🔹 `);
  callback();
};

/*
 Traversing a linked list:
*/

(() => {
  function printLinkedList(head) {
    const nodeArr = [head.value];
    let curr = head.next;
    while (curr) {
      nodeArr.push(curr.value);
      curr = curr.next;
    }
    return nodeArr;
  }

  test("Traverse linked list iteratively", () => {
    const A = new ListNode("A");
    const B = new ListNode("B");
    const C = new ListNode("C");
    A.next = B;
    B.next = C;

    const list = printLinkedList(A);
    if (list[0] === "A" && list[1] === "B" && list[2] === "C") {
      console.log("✅ Printed list as expected");
    } else {
      console.log("❌ Printed list not as expected");
      console.log(list);
    }
  });
})();

// ** Note about recursion: every time a function is called, it's added to the call stack, which adds space complexity - O(n)

(() => {
  function printLinkedList(head) {
    if (head) {
      console.log(head.value);
      return printLinkedList(head.next);
    }
    return "done";
  }

  test("Traverse linked list recursively", () => {
    const A = new ListNode("A");
    const B = new ListNode("B");
    const C = new ListNode("C");
    A.next = B;
    B.next = C;

    printLinkedList(A);
  });
})();

(() => {
  function addNodeHelper(node, arr) {
    if (node) {
      arr.push(node.value);
      addNodeHelper(node.next, arr);
    }
  }

  function printLinkedList(head) {
    let nodeArr = [];
    addNodeHelper(head, nodeArr);
    return nodeArr;
  }

  test("Traverse linked list recursively returning an array of node values", () => {
    const A = new ListNode("A");
    const B = new ListNode("B");
    const C = new ListNode("C");
    A.next = B;
    B.next = C;

    const list = printLinkedList(A);

    if (list[0] === "A" && list[1] === "B" && list[2] === "C") {
      console.log("✅ List values as expected");
    } else {
      console.log("❌ List values not as expected");
    }
  });
})();

/*
 Calculating the sum of values of nodes in a linked list:
*/

(() => {
  function getSum(head) {
    if (!(head instanceof ListNode)) {
      return "invalid input";
    }
    let sum = head.value;
    let curr = head.next;
    while (curr) {
      sum += curr.value;
      curr = curr.next;
    }
    return sum;
  }

  test("Sum of linked list values iteratively", () => {
    const A = new ListNode(3);
    const B = new ListNode(6);
    const C = new ListNode(7);
    A.next = B;
    B.next = C;

    const sum = getSum(A);

    if (sum === 16) {
      console.log("✅ Sum of list values as expected");
    } else {
      console.log("❌ Sum of list values not as expected");
    }
  });
})();

(() => {
  function getSum(head) {
    if (!head) return null;
    let sum = 0;
    return sumHelper(head, sum);
  }

  function sumHelper(node, sum) {
    if (node) {
      sum += node.value;
      return sumHelper(node.next, sum);
    }
    return sum;
  }

  test("Sum of linked list values recursively", () => {
    const A = new ListNode(3);
    const B = new ListNode(6);
    const C = new ListNode(7);
    A.next = B;
    B.next = C;

    const sum = getSum(A);

    if (sum === 16) {
      console.log("✅ Sum of list values as expected");
    } else {
      console.log("❌ Sum of list values not as expected");
    }
  });
})();

/*
 Find a value in a linked list:
*/

(() => {
  function find(list, val) {
    let curr = list.head;
    let pos = 0;
    while (curr) {
      if (curr.value === val) return `${val} found at position ${pos}`;
      curr = curr.next;
      ++pos;
    }
    return `value ${val} not found`;
  }

  test("Find a value in a linked list", () => {
    const list = new LinkedList();
    list.append("A");
    list.append("B");
    list.deleteHead(); // ** see LinkedList append() for explanation
    list.append("C");
    list.append("D");

    const find1 = find(list, "C");
    const find2 = find(list, "U");

    if (find1 === "C found at position 2") {
      console.log("✅ Found a node value as expected");
    } else {
      console.log("❌ Did not find value as expected");
      console.log(find1);
    }
    if (find2 === "value U not found") {
      console.log("✅ Should not find non-existing node");
    } else {
      console.log("❌ Should not find non-existing node");
    }
  });
})();

/*
 Finding Tail / Head in a list stored in an object:
*/

(() => {
  function findHead(list) {
    let nonHeads = Object.keys(list).map((node) => {
      return list[node].next && list[node].next.value;
    });
    for (let node in list) {
      if (!nonHeads.includes(node)) {
        return node;
      }
    }
  }

  function findTail(list) {
    for (let currNode in list) {
      if (list[currNode].next === null) {
        return list[currNode];
      }
    }
  }

  test("Find tail and head of a singly linked list", () => {
    const list = {};
    list.B = new ListNode("B");
    list.A = new ListNode("A");
    list.C = new ListNode("C");
    list.A.next = list.B;
    list.B.next = list.C;

    const head = findHead(list);
    const tail = findTail(list);

    if (head === "A") {
      console.log("✅ Found head as expected");
    } else {
      console.log("❌ Found head not as expected");
      console.log(head);
    }
    if (tail.value === "C") {
      console.log("✅ Found tail as expected");
    } else {
      console.log("❌ Found tail not as expected");
    }
  });
})();

/*
 Reversing a singly linked list
*/

(() => {
  function reverseSinglyLinkedList(head) {
    let prev = null;
    let curr = head;
    let next = head.next;
    while (curr) {
      next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next; // the order of these reassignments is crucial
    }
    return;
  }
  test("Reverse a singly linked list iteratively", () => {
    const A = new ListNode("A");
    const B = new ListNode("B");
    const C = new ListNode("C");
    const D = new ListNode("D");
    A.next = B;
    B.next = C;
    C.next = D;

    reverseSinglyLinkedList(A);

    if (A.next === null && B.next === A && C.next === B && D.next === C) {
      console.log("✅ Reversed list as expected");
    } else {
      console.log("❌ Reversed list not as expected");
    }
  });
})();

(() => {
  function reverseSinglyLinkedList(curr, prev = null) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    if (next) reverseSinglyLinkedList(next, prev);
    return;
  }

  test("Reverse a singly linked list recursively", () => {
    const A = new ListNode("A");
    const B = new ListNode("B");
    const C = new ListNode("C");
    const D = new ListNode("D");
    A.next = B;
    B.next = C;
    C.next = D;

    reverseSinglyLinkedList(A);

    if (A.next === null && B.next === A && C.next === B && D.next === C) {
      console.log("✅ Reversed list as expected");
    } else {
      console.log("❌ Reversed list not as expected");
    }
  });
})();

/*
 Create a zipper list out of 2 linked lists:
*/

(() => {
  function zipperList(head1, head2) {
    let curr = head1;
    let currNext = curr.next;
    let nextCurr = head2;
    while (currNext) {
      curr.next = nextCurr;
      curr = nextCurr;
      nextCurr = currNext;
      currNext = curr.next;
    }
    return (curr.next = nextCurr);
  }

  test("Create a zipper list iteratively", () => {
    const Q = new ListNode("Q"); // head1
    const W = new ListNode("W"); // head2
    const E = new ListNode("E");
    const R = new ListNode("R");
    const T = new ListNode("T");
    const Y = new ListNode("Y");
    // list 1: Q->E->T
    // list 2: W->R->Y
    Q.next = E;
    E.next = T;
    W.next = R;
    R.next = Y;

    zipperList(Q, W);

    if (
      Q.next === W &&
      W.next === E &&
      E.next === R &&
      R.next === T &&
      T.next === Y
    ) {
      console.log("✅ Zipper list as expected");
    } else {
      console.log("❌ Zipper list not as expected");
      console.log(Q.value);
      console.log(Q.next.value);
      console.log(W.next.value);
      console.log(E.next.value);
      console.log(R.next.value);
      console.log(T.next.value);
    }
  });
})();

(() => {
  function zipperList(head1, head2) {
    if (!head1.next) {
      head1.next = head2;
      return;
    }
    let next = head1.next;
    head1.next = head2;
    return zipperList(head2, next);
  }

  test("Create a zipper list recursively", () => {
    const Q = new ListNode("Q"); // head1
    const W = new ListNode("W"); // head2
    const E = new ListNode("E");
    const R = new ListNode("R");
    const T = new ListNode("T");
    const Y = new ListNode("Y");
    // list 1: Q->E->T
    // list 2: W->R->Y
    Q.next = E;
    E.next = T;
    W.next = R;
    R.next = Y;

    zipperList(Q, W);

    if (
      Q.next === W &&
      W.next === E &&
      E.next === R &&
      R.next === T &&
      T.next === Y
    ) {
      console.log("✅ Zipper list as expected");
    } else {
      console.log("❌ Zipper list not as expected");
      console.log(Q.value);
      console.log(Q.next.value);
      console.log(W.next.value);
      console.log(E.next.value);
      console.log(R.next.value);
      console.log(T.next.value);
    }
  });
})();
