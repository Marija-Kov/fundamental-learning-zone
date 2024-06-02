const test = (title, callback) => {
  console.log(` 🔹 ${title} 🔹 `);
  callback();
};

class Node {
  constructor(value = null, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

// Main properties of a binary tree:
// 1) only one root, i.e. only one node that has no parent
// 2) up to 2 children per node
// 3) only one way to get to any node from the root
// implicitly: 4) up to 1 parent per node i.e. all nodes have 1 parent except for the root

// ** queue --> loop, stack --> recursion

//__________________________________________________
// Traverse depth first using a loop
//__________________________________________________
(() => {
  function traverse(root) {
    let visited = [];
    let stack = [];
    let curr = null;
    stack.push(root);
    while (stack.length) {
      curr = stack[stack.length - 1];
      stack.pop();
      visited.push(curr.value);
      curr.left && stack.push(curr.left);
      curr.right && stack.push(curr.right);
    }
    return visited;
  }

  test("Traverse a binary tree using a loop depth-first", () => {
    const d = new Node(4);
    const e = new Node(5);
    const g = new Node(7);
    const h = new Node(8);
    const b = new Node(2, d, e);
    const f = new Node(6, g, h);
    const c = new Node(3, null, f);
    const a = new Node(1, b, c);

    const visited = traverse(a);

    if (visited.join(",") === "1,3,6,8,7,2,5,4") {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

//__________________________________________________
// Traverse depth first recursively
//__________________________________________________
(() => {
  function traverse(root) {
    let visited = [root.value];
    root.left && getNode(root.left, visited);
    root.right && getNode(root.right, visited);
    return visited;
  }

  function getNode(curr, visited) {
    visited.push(curr.value);
    curr.left && getNode(curr.left, visited);
    curr.right && getNode(curr.right, visited);
  }

  test("Traverse a binary tree recursively depth-first", () => {
    const d = new Node(4);
    const e = new Node(5);
    const g = new Node(7);
    const h = new Node(8);
    const b = new Node(2, d, e);
    const f = new Node(6, g, h);
    const c = new Node(3, null, f);
    const a = new Node(1, b, c);

    const visited = traverse(a);

    if (visited.join(",") === "1,2,4,5,3,6,7,8") {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

//__________________________________________________
// Traverse breadth first iteratively
//__________________________________________________
(() => {
  function traverse(root) {
    if (!root) return [];
    let visited = [root.value];
    let queue = [root];
    let curr = null;
    while (queue.length) {
      curr = queue[0];
      // queue.pop()
      queue.shift(); // .shift() and .unshift() are O(n) time complexity !
      if (curr.left) {
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

  test("Traverse a binary tree iteratively breadth-first", () => {
    const d = new Node(4);
    const e = new Node(5);
    const g = new Node(7);
    const h = new Node(8);
    const b = new Node(2, d, e);
    const f = new Node(6, g, h);
    const c = new Node(3, null, f);
    const a = new Node(1, b, c);

    const visited = traverse(a);

    if (visited.join(",") === "1,2,3,4,5,6,7,8") {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

//__________________________________________________
// Traverse depth first iteratively
//__________________________________________________
(() => {
  function traverse(root) {
    if (!root) return [];
    let visited = [root.value];
    let queue = [root];
    getNode(queue, visited);
    return visited;
  }

  function getNode(queue, visited) {
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
    queue.length && getNode(queue, visited);
    return;
  }

  test("Traverse a binary tree iteratively depth-first", () => {
    const d = new Node(4);
    const e = new Node(5);
    const g = new Node(7);
    const h = new Node(8);
    const b = new Node(2, d, e);
    const f = new Node(6, g, h);
    const c = new Node(3, null, f);
    const a = new Node(1, b, c);

    const visited = traverse(a);

    if (visited.join(",") === "1,2,3,4,5,6,7,8") {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

//__________________________________________________
// Find node depth first using loop
//__________________________________________________
(() => {
  function findNode(node, root) {
    if (!root) return false;
    let stack = [];
    let curr;
    stack.push(root);
    while (stack.length) {
      curr = stack.pop();
      if (curr === node) return true;
      curr.left && stack.push(curr.left);
      curr.right && stack.push(curr.right);
    }
    return false;
  }

  test("Find node using loop depth-first", () => {
    const d = new Node(4);
    const e = new Node(5);
    const g = new Node(7);
    const h = new Node(8);
    const b = new Node(2, d, e);
    const f = new Node(6, g, h);
    const c = new Node(3, null, f);
    const a = new Node(1, b, c);

    const node = findNode(a);

    if (0 !== 0) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

//__________________________________________________
// Find node depth first recursively
//__________________________________________________

(() => {
  function findNode(targetNode, root) {
    if (!root) return false;
    if (targetNode === root) return true;
    return findNode(targetNode, root.left) || findNode(targetNode, root.right);
  }

  test("Find node recursively depth-first", () => {
    const d = new Node(4);
    const e = new Node(5);
    const g = new Node(7);
    const h = new Node(8);
    const b = new Node(2, d, e);
    const f = new Node(6, g, h);
    const c = new Node(3, null, f);
    const a = new Node(1, b, c);

    const node = findNode(a);

    if (0 !== 0) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

//___________________________________________________________
// Find node breadth first iteratively
//___________________________________________________________
(() => {
  function findNode(node, root) {
    if (!root) return false;
    let queue = [];
    queue.push(root);
    let curr;
    while (queue.length) {
      curr = queue.shift();
      if (curr === node) return true;
      curr.left && queue.push(curr.left);
      curr.right && queue.push(curr.right);
    }
    return false;
  }

  test("Find node iteratively breadth-first", () => {
    const d = new Node(4);
    const e = new Node(5);
    const g = new Node(7);
    const h = new Node(8);
    const b = new Node(2, d, e);
    const f = new Node(6, g, h);
    const c = new Node(3, null, f);
    const a = new Node(1, b, c);

    const node = findNode(a);

    if (0 !== 0) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

//___________________________________________________________
// Find node breadth first recursively
//___________________________________________________________
(() => {
  function findNode(node, root) {
    if (!root) return false;
    if (root === node) return true;
    let queue = [root];
    return keepSearching(node, queue);
  }

  function keepSearching(node, queue) {
    let curr = queue.shift();
    if (curr === node) return true;
    curr.left && queue.push(curr.left);
    curr.right && queue.push(curr.right);
    if (queue.length) return keepSearching(node, queue);
    return false;
  }

  test("Find node recursively breadth-first", () => {
    const d = new Node(4);
    const e = new Node(5);
    const g = new Node(7);
    const h = new Node(8);
    const b = new Node(2, d, e);
    const f = new Node(6, g, h);
    const c = new Node(3, null, f);
    const a = new Node(1, b, c);

    const node = findNode(a);

    if (0 !== 0) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

//____________________________________________________________________________
// Get the sum/concatenation of node values depth first
//____________________________________________________________________________
(() => {
  function sumNode(root) {
    if (!root) return "";
    let str = "";
    let stack = [root];
    while (stack.length) {
      let curr = stack.pop();
      str += curr.value;
      curr.left && stack.push(curr.left);
      curr.right && stack.push(curr.right);
    }
    return str;
  }

  test("Sum/concat nodes iteratively depth-first", () => {
    const d = new Node(4);
    const e = new Node(5);
    const g = new Node(7);
    const h = new Node(8);
    const b = new Node(2, d, e);
    const f = new Node(6, g, h);
    const c = new Node(3, null, f);
    const a = new Node(1, b, c);

    const sum = sumNode(a);

    if (0 !== 0) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

//_______________________________________________________________________________________
// Get sum/concatenation of node values depth first recursively
//_______________________________________________________________________________________
(() => {
  function sumNode(root) {
    if (!root) return "";
    return root.value + sumNode(root.left) + sumNode(root.right);
  }

  test("Sum/concat nodes recursively depth-first", () => {
    const d = new Node(4);
    const e = new Node(5);
    const g = new Node(7);
    const h = new Node(8);
    const b = new Node(2, d, e);
    const f = new Node(6, g, h);
    const c = new Node(3, null, f);
    const a = new Node(1, b, c);

    const sum = sumNode(a);

    if (0 !== 0) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

//____________________________________________________________________________
// Get sum/concatenation of node values breadth first
//____________________________________________________________________________
(() => {
  function sumNode(root) {
    if (!root) return "";
    let str = "";
    let queue = [root];
    let curr;
    while (queue.length) {
      curr = queue.shift();
      str += curr.value;
      if (curr.left) {
        queue.push(curr.left);
      }
      if (curr.right) {
        queue.push(curr.right);
      }
    }
    return str;
  }

  test("Sum/concat nodes iteratively breadth-first", () => {
    const d = new Node(4);
    const e = new Node(5);
    const g = new Node(7);
    const h = new Node(8);
    const b = new Node(2, d, e);
    const f = new Node(6, g, h);
    const c = new Node(3, null, f);
    const a = new Node(1, b, c);

    const sum = sumNode(a);

    if (0 !== 0) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

//____________________________________________________________________________
// Get max node value depth first iteratively
//____________________________________________________________________________
(() => {
  function maxNode(root) {
    let max = -Infinity;
    let stack = [root];
    while (stack.length) {
      let curr = stack.pop();
      if (curr.value > max) max = curr.value;
      if (curr.left) stack.push(curr.left);
      if (curr.right) stack.push(curr.right);
    }
    return max;
  }

  test("Get max value node iteratively depth-first", () => {
    const d = new Node(4);
    const e = new Node(5);
    const g = new Node(7);
    const h = new Node(8);
    const b = new Node(2, d, e);
    const f = new Node(6, g, h);
    const c = new Node(3, null, f);
    const a = new Node(1, b, c);

    const max = maxNode(a);

    if (0 !== 0) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

//____________________________________________________________________________
// Get max node value breadth first iteratively
//____________________________________________________________________________
(() => {
  function maxNode(root) {
    if (!root) return -Infinity;
    let max = -Infinity;
    let queue = [root];
    while (queue.length) {
      let curr = queue.shift();
      if (queue.value > max) max = queue.value;
      curr.left && queue.push(curr.left);
      curr.right && queue.push(curr.right);
    }
    return max;
  }

  test("Get max value node iteratively breadth-first", () => {
    const d = new Node(4);
    const e = new Node(5);
    const g = new Node(7);
    const h = new Node(8);
    const b = new Node(2, d, e);
    const f = new Node(6, g, h);
    const c = new Node(3, null, f);
    const a = new Node(1, b, c);

    const max = maxNode(a);

    if (0 !== 0) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

//____________________________________________________________________________
// Get max node value recursively
//____________________________________________________________________________
(() => {
  function maxNode(root) {
    if (!root) return -Infinity;
    const leftMax = maxNode(root.left);
    const rightMax = maxNode(root.right);
    return Math.max(root.value, leftMax, rightMax);
  }

  test("Get max value node recursively", () => {
    const d = new Node(4);
    const e = new Node(5);
    const g = new Node(7);
    const h = new Node(8);
    const b = new Node(2, d, e);
    const f = new Node(6, g, h);
    const c = new Node(3, null, f);
    const a = new Node(1, b, c);

    const max = maxNode(a);

    if (0 !== 0) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

//____________________________________________________________________________
// Get max root-to-leaf path sum value recursively
//____________________________________________________________________________
(() => {
  function maxSumPath(node) {
    if (!node) return -Infinity;
    if (!node.left && !node.right) return node.value;
    const greaterChildPathVal = Math.max(
      maxSumPath(node.left),
      maxSumPath(node.right)
    );
    return node.value + greaterChildPathVal;
  }

  test("Get max sum path recursively", () => {
    const d = new Node(4);
    const e = new Node(5);
    const g = new Node(7);
    const h = new Node(8);
    const b = new Node(2, d, e);
    const f = new Node(6, g, h);
    const c = new Node(3, null, f);
    const a = new Node(1, b, c);

    const max = maxSumPath(a);

    if (0 !== 0) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();
