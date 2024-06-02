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

function tree() {
  const d = new Node(4);
  const e = new Node(5);
  const g = new Node(7);
  const h = new Node(8);
  const b = new Node(2, d, e);
  const f = new Node(6, g, h);
  const c = new Node(3, null, f);
  const a = new Node(1, b, c); // root

  return {
    root: a,
    nodes: { b, c, d, e, f, g, h },
  };
}

// Main properties of a binary tree:
// 1) only one root, i.e. only one node that has no parent
// 2) up to 2 children per node
// 3) only one way to get to any node from the root
// implicitly: 4) up to 1 parent per node i.e. all nodes have 1 parent except for the root

// ** Depth-first -> LIFO -> stack ; breadth-first -> FIFO -> queue;

/*
 Depth-first recursive traversal: 
*/
(() => {
  function traverse(node, visited) {
    if (!node) return visited;
    visited.push(node.value);
    if (node.left) traverse(node.left, visited);
    if (node.right) traverse(node.right, visited);
    return visited;
  }

  test("Depth-first recursive traversal", () => {
    const { root } = tree();
    const visited = traverse(root, []);
    if (visited.join(",") === "1,2,4,5,3,6,7,8") {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

/*
 Depth-first iterative traversal:
*/
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

  test("Depth-first iterative traversal", () => {
    const { root } = tree();
    const visited = traverse(root);
    if (visited.join(",") === "1,3,6,8,7,2,5,4") {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

/*
 Depth-first iterative traversal with a helper function:
*/
(() => {
  function traverse(root) {
    let visited = [root.value];
    root.left && getNode(root.left, visited);
    root.right && getNode(root.right, visited);
    return visited; // must return at the top level because getNode only runs conditionally
  }

  function getNode(curr, visited) {
    visited.push(curr.value);
    curr.left && getNode(curr.left, visited);
    curr.right && getNode(curr.right, visited);
  }

  test("Depth-first iterative traversal with a helper function", () => {
    const { root } = tree();
    const visited = traverse(root);
    if (visited.join(",") === "1,2,4,5,3,6,7,8") {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

/*
 Breadth-first iterative traversal:
*/
(() => {
  function traverse(root) {
    if (!root) return [];
    let visited = [root.value];
    let queue = [root];
    let curr = null;
    while (queue.length) {
      curr = queue.shift();
      if (curr.left) {
        visited.push(curr.left.value);
        queue.push(curr.left);
      }
      if (curr.right) {
        visited.push(curr.right.value);
        queue.push(curr.right);
      }
    }
    return visited;
  }

  test("Breadth-first iterative traversal", () => {
    const { root } = tree();
    const visited = traverse(root);
    if (visited.join(",") === "1,2,3,4,5,6,7,8") {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

/*
 Breadth-first iterative traversal using a helper function:
 */
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

  test("Breadth-first iterative traversal using a helper function", () => {
    const { root } = tree();
    const visited = traverse(root);
    if (visited.join(",") === "1,2,3,4,5,6,7,8") {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

/*
 Depth-first iterative node search:
*/
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

  test("Depth-first iterative node search", () => {
    const { root, nodes } = tree();
    const aNode = nodes[Object.keys(nodes)[3]];
    const target = findNode(aNode, root);
    if (target) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });

  test("Depth-first iterative node search, not found", () => {
    const { root } = tree();
    const target = findNode({ value: "x" }, root);
    if (!target) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

/*
 Depth-first recursive node search:
*/
(() => {
  function findNode(targetNode, root) {
    if (!root) return false;
    if (targetNode === root) return true;
    return findNode(targetNode, root.left) || findNode(targetNode, root.right);
  }

  test("Depth-first recursive node search", () => {
    const { root, nodes } = tree();
    const aNode = nodes[Object.keys(nodes)[3]];
    const target = findNode(aNode, root);
    if (target) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });

  test("Depth-first recursive node search, not found", () => {
    const { root } = tree();
    const target = findNode({ value: "x" }, root);
    if (!target) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

/*
 Breadth-first iterative node search:
*/
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

  test("Breadth-first iterative node search", () => {
    const { root, nodes } = tree();
    const aNode = nodes[Object.keys(nodes)[3]];
    const target = findNode(aNode, root);
    if (target) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });

  test("Breadth-first iterative node search, not found", () => {
    const { root } = tree();
    const target = findNode({ value: "x" }, root);
    if (!target) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

/*
 Breadth-first iterative node search using a helper function:
*/
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

  test("Breadth-first iterative node search using a helper function", () => {
    const { root, nodes } = tree();
    const aNode = nodes[Object.keys(nodes)[3]];
    const target = findNode(aNode, root);
    if (target) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });

  test("Breadth-first iterative node search using a helper function, not found", () => {
    const { root } = tree();
    const target = findNode({ value: "x" }, root);
    if (!target) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

/*
 Depth-first iterative sum/concat of node values:
*/
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

  test("Depth-first iterative sum/concat of node values", () => {
    const { root } = tree();
    const sum = sumNode(root);
    if (sum === "13687254") {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

/*
 Depth-first recursive sum/concat of node values:
*/
(() => {
  function sumNode(root) {
    if (!root) return "";
    return root.value + sumNode(root.left) + sumNode(root.right);
  }

  test("Depth-first recursive sum/concat of node values", () => {
    const { root } = tree();
    const sum = sumNode(root);
    if (sum === "12453678") {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

/*
 Breadth-first iterative sum/concat of node values:
*/
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

  test("Breadth-first iterative sum/concat of node values", () => {
    const { root } = tree();
    const sum = sumNode(root);
    if (sum === "12345678") {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

/*
 Depth-first iterative max value node search:
*/
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

  test("Depth-first iterative max value node search", () => {
    const { root } = tree();
    const max = maxNode(root);
    if (max === 8) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

/*
 Breadth-first iterative max value node search:
*/
(() => {
  function maxNode(root) {
    if (!root) return -Infinity;
    let max = -Infinity;
    let queue = [root];
    while (queue.length) {
      let curr = queue.shift();
      if (curr.value > max) max = curr.value;
      curr.left && queue.push(curr.left);
      curr.right && queue.push(curr.right);
    }
    return max;
  }

  test("Breadth-first iterative max value node search", () => {
    const { root } = tree();
    const max = maxNode(root);
    if (max === 8) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

/*
 Depth-first recursive max value node search:
*/
(() => {
  function maxNode(root) {
    if (!root) return -Infinity;
    const leftMax = maxNode(root.left);
    const rightMax = maxNode(root.right);
    return Math.max(root.value, leftMax, rightMax);
  }

  test("Depth-first recursive max value node search", () => {
    const { root } = tree();
    const max = maxNode(root);
    if (max === 8) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

/*
 Depth-first recursive max sum path search:
*/
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

  test("Depth-first recursive max sum path search", () => {
    const { root } = tree();
    const max = maxSumPath(root);
    if (max === 18) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();
