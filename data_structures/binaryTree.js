// create a node of a binary tree

class Node{
    constructor(value=null, left=null, right=null){
        this.value = value
        this.left = left 
        this.right = right 
    }
}


// Main properties of a binary tree:
// 1) only one root, i.e. only one node that has no parent
// 2) up to 2 children per node
// 3) only one way to get to any node from the root
// implicitly: 4) up to 1 parent per node i.e. all nodes have 1 parent except for the root

//_______________________________
// Creating a binary tree
//_______________________________

const d = new Node(4);
const e = new Node(5);
const g = new Node(7);
const h = new Node(8);
const b = new Node(2, d, e);
const f = new Node(6, g, h);
const c = new Node(3, null, f);
const a = new Node(1, b, c);

//__________________________________________________
// Traversing a binary tree depth first iteratively
//__________________________________________________

function traversingBTreeDepthFirstIteratively(root){
    let visited = [];
    let stack = [];
    let curr = null;
    stack.push(root);
    while(stack.length){
        curr = stack[stack.length-1];
        stack.pop();
        visited.push(curr.value);
        curr.left && stack.push(curr.left);
        curr.right && stack.push(curr.right);
    }
    return visited
}

//__________________________________________________
// Traversing a binary tree depth first recursively
//__________________________________________________

function traversingBTreeDepthFirstRecursively(root){ 
    let visited = [root.value];
    root.left && getNode(root.left, visited);
    root.right && getNode(root.right, visited);
    return visited
}

function getNode(curr, visited){
    visited.push(curr.value);
    curr.left && getNode(curr.left, visited);
    curr.right && getNode(curr.right, visited);
}


//__________________________________________________
// Traversing a binary tree breadth first // ** uses queue instead of stack
//__________________________________________________

function traversingBTreeBreadthFirstIteratively(root) {
  if(!root) return [];
  let visited = [root.value];
  let queue = [root];
  let curr = null;
  while (queue.length) {
   curr = queue[0];
  // queue.pop()
    queue.shift() // .shift() and .unshift() are O(n) time complexity !
   if(curr.left){
    visited.push(curr.left.value);
    //queue.unshift(curr.left);
    queue.push(curr.left);
   }
   if (curr.right) {
     visited.push(curr.right.value);
     //queue.unshift(curr.right);
     queue.push(curr.right);
   }
  }
  return visited;
}


//__________________________________________________
// Traversing a binary tree depth first recursively
//__________________________________________________

function traversingBTreeBreadthFirstRecursively(root) {
  if (!root) return [];
  let visited = [root.value];
  let queue = [root];
  getNodeR(queue, visited)
  return visited;
}

function getNodeR(queue, visited) {
      let curr = queue[0];
      queue.shift();
      if (curr.left) {
        visited.push(curr.left.value);
        queue.push(curr.left);
      }
      if (curr.right) {
        visited.push(curr.right.value);
        queue.push(curr.right);
      }
     queue.length && getNodeR(queue, visited);
  return;
}

//console.log(traversingBTreeBreadthFirstRecursively(a))

//__________________________________________________
// Finding a node in a binary tree depth first iteratively
//__________________________________________________


function findNodeDepthFirst(node, root){
   if (!root) return false;
   let stack = [];
   let curr;
   stack.push(root);
   while(stack.length){
    curr = stack.pop()
    if(curr===node) return true
    curr.left && stack.push(curr.left)
    curr.right && stack.push(curr.right);
   }
  return false
}


//__________________________________________________
// Finding a node in a binary tree depth first recursively
//__________________________________________________


function findNodeDepthFirstRecursively(targetNode, root){
   if (!root) return false;
   if(targetNode === root) return true
   return (
     findNodeDepthFirstRecursively(targetNode, root.left) ||
     findNodeDepthFirstRecursively(targetNode, root.right)
   );
}


//___________________________________________________________
// Finding a node in a binary tree breadth first iteratively
//___________________________________________________________

function findNodeBreadthFirst(node, root){
   if(!root) return false
   let queue = [];
   queue.push(root);
   let curr;
   while(queue.length){
    curr = queue.shift();
    if(curr === node) return true
    curr.left && queue.push(curr.left)
    curr.right && queue.push(curr.right);
   }
    return false
}


//___________________________________________________________
// Finding a node in a binary tree breadth first recursively
//___________________________________________________________

function findNodeBreadthFirstRecursively(node, root) {
  if (!root) return false;
  if(root === node) return true
  let queue = [root];
  return keepSearchingBreadthFirst(node, queue)
}

function keepSearchingBreadthFirst(node, queue){
  let curr = queue.shift();
  if(curr===node) return true
  curr.left && queue.push(curr.left);
  curr.right && queue.push(curr.right);
  if(queue.length) return keepSearchingBreadthFirst(node, queue);
  return false
}


//____________________________________________________________________________
// Getting the sum/concatenation of node values in a binary tree depth first
//____________________________________________________________________________

function sumNodeValuesDepthFirst(root){
    if(!root) return ""
    let str = "";
    let stack = [root];
    while(stack.length){
     let curr = stack.pop();
     str+=curr.value;
     curr.left && stack.push(curr.left)
     curr.right && stack.push(curr.right);    
    }
    return str
}

//_______________________________________________________________________________________
// Getting the sum/concatenation of node values in a binary tree depth first recursively
//_______________________________________________________________________________________

function sumNodeValuesDepthFirstRecursively(root){
 if(!root) return ""
 return (
   root.value +
   sumNodeValuesDepthFirstRecursively(root.left) +
   sumNodeValuesDepthFirstRecursively(root.right)
 );
}

//____________________________________________________________________________
// Getting the sum/concatenation of node values in a binary tree breadth first
//____________________________________________________________________________

function sumNodeValuesBreadthFirst(root){
    if(!root) return ""
    let str = "";
    let queue = [root];
    let curr;
    while(queue.length){
      curr = queue.shift();
      str += curr.value; 
      if(curr.left){
       queue.push(curr.left)
      }  
      if(curr.right){ 
       queue.push(curr.right)
      }    
    }
    return str
}


//____________________________________________________________________________
// Getting the max node value in a binary tree depth first iteratively
//____________________________________________________________________________

function maxValueNodeDepthFirst(root){
  let max = -Infinity;
  let stack = [root];
  while(stack.length){
  let curr = stack.pop();
  if(curr.value > max) max = curr.value;
  if(curr.left) stack.push(curr.left);
  if(curr.right) stack.push(curr.right);  
  }
  return max
} 

//____________________________________________________________________________
// Getting the max node value in a binary tree Breadth first iteratively
//____________________________________________________________________________

function maxValueNodeBreadthFirst(root){
   if(!root) return -Infinity
   let max = -Infinity;
   let queue = [root];
  while(queue.length){
   let curr = queue.shift();
   if(queue.value > max) max = queue.value;
   curr.left && queue.push(curr.left)
   curr.right && queue.push(curr.right); 
  }
   return max
}



//____________________________________________________________________________
// Getting the max node value in a binary tree recursively
//____________________________________________________________________________

function maxValueNodeRecursively(root){
 if(!root) return -Infinity
 const leftMax = maxValueNodeRecursively(root.left);
 const rightMax = maxValueNodeRecursively(root.right);
 return Math.max(root.value, leftMax, rightMax)
}

//____________________________________________________________________________
// Getting the max root-to-leaf path sum value in a binary tree recursively
//____________________________________________________________________________

function maxPathSum(node){
    if(!node) return -Infinity;
    if(!node.left && !node.right) return node.value;
    const greaterChildPathVal = Math.max(maxPathSum(node.left), maxPathSum(node.right))
    return node.value + greaterChildPathVal
}

console.log(maxPathSum(a));


