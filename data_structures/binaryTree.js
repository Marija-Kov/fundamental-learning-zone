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
const d = new Node("D");
const e = new Node("E");
const g = new Node("G");
const h = new Node("H");
const b = new Node("B", d, e);
const f = new Node("F", g, h);
const c = new Node("C", null, f);
const a = new Node("A", b, c);

//__________________________________________________
// Traversing a binary tree depth first iteratively
//__________________________________________________

function traversingBTreeDepthFirst(root){
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
    let visited = [];
    let stack = [];
    stack.push(root);
    getNode(stack, visited);
    return visited
}

function getNode(stack, visited){
    let curr = stack[stack.length - 1];
    stack.pop();
    visited.push(curr.value);
    curr.left && stack.push(curr.left);
    curr.right && stack.push(curr.right);
    stack.length && getNode(stack, visited);
    return
}




//__________________________________________________
// Traversing a binary tree breadth first // ** uses queue instead of stack
//__________________________________________________

function traversingBTreeBreadthFirst(root) {
  if(!root) return [];
  let visited = [root.value];
  let queue = [root];
  let curr = null;
  while (queue.length) {
   curr = queue[0];
  // queue.pop()
    queue.shift()
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


function findNodeDepthFirstRecursively(node, root){
   if (!root) return false;
   let stack = [root];
   return keepSearching(node, stack);
}

function keepSearching(node, stack){
   let curr = stack.pop();
   console.log(curr)
   if(curr === node){
    return true;
   } else {
    curr.left && stack.push(curr.left);
    curr.right && stack.push(curr.right);
    if(stack.length){
     return keepSearching(node, stack);
    } 
    return false   
  }
}

//__________________________________________________
// Finding a node in a binary tree breadth first iteratively
//__________________________________________________

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
// Finding a node in a binary tree breadth first iteratively
//___________________________________________________________

function findNodeBreadthFirstRecursively(node, root) {
  if (!root) return false;
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

console.log(findNodeBreadthFirstRecursively(c, a))