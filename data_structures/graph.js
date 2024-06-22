const test = (title, callback) => {
  console.log(` 🔹 ${title} 🔹 `);
  callback();
};

// Graphs are data structures composed of nodes connected with edges that can be directed or undirected.
// At first glance they have some similarities with binary trees
// especially when it comes to traversal that can be depth and breadth first.
// they can be represented in a variety of ways
// One way of representing a graph (in javascript) is with an object where every node is stored as a
// key:value pair where key is node itself and value an array of adjacent nodes.

//___________________________________________________________
// Directed graph traversal, iterative, depth first
//___________________________________________________________

(() => {
  function traverse(graph, source) {
    const stack = [source];
    const output = [];
    while (stack.length) {
      let curr = stack.pop();
      output.push(curr);
      if (graph[curr].length) {
        for (let adj of graph[curr]) {
          stack.push(adj);
        }
      }
    }
    return output;
  }

  test("Directed graph traversal, iterative, depth first", () => {
    const graph = {
      a: ["b", "c"],
      b: ["d"],
      c: ["e"],
      d: ["f"],
      e: [],
      f: [],
    };
    const result = traverse(graph, "a");
    if (result.join("") === "acebdf" || result.join("") === "abdfce") {
      console.log("✅ as expected");
    } else {
      console.log("❌ not as expected");
      console.log(result);
    }
  });
})();

//___________________________________________________________
// Directed graph traversal, recursive, depth first
//___________________________________________________________

(() => {
  function traverse(graph, curr) {
    console.log(curr);
    for (let adj of graph[curr]) {
      traverse(graph, adj);
    }
  }

  test("Directed graph traversal, recursive, depth first", () => {
    const graph = {
      a: ["b", "c"],
      b: ["d"],
      c: ["e"],
      d: ["f"],
      e: [],
      f: [],
    };
    traverse(graph, "a");
  });
})();

//___________________________________________________________
// Directed graph traversal, iterative, breadth first
//___________________________________________________________

(() => {
  function traverse(graph, source) {
    const queue = [source];
    const output = [source];
    while (queue.length) {
      let curr = queue.shift();
      if (graph[curr].length) {
        for (let adj of graph[curr]) {
          queue.push(adj);
          output.push(adj);
        }
      }
    }
    return output;
  }

  test("Directed graph traversal, iterative, breadth first", () => {
    const graph = {
      a: ["b", "c"],
      b: ["d"],
      c: ["e"],
      d: ["f"],
      e: [],
      f: [],
    };

    const result = traverse(graph, "a");
    if (result.join("") === "abcdef" || result.join("") === "acbedf") {
      console.log("✅ as expected");
    } else {
      console.log("❌ not as expected");
      console.log(result);
    }
  });
})();

//___________________________________________________________
// Has path in a directed graph, iterative, depth first
//___________________________________________________________

(() => {
  function hasPath(graph, src, dest) {
    if (src === dest) return false;
    const stack = [src];
    while (stack.length) {
      let curr = stack.pop();
      if (curr === dest) {
        return true;
      }
      for (let adj of graph[curr]) {
        if (adj === dest) {
          return true;
        }
        stack.push(adj);
      }
    }
    return false;
  }

  test("Has path in a directed graph, iterative, depth first", () => {
    const graph = {
      f: ["g", "i"],
      g: ["h"],
      h: [],
      i: ["g", "k"],
      j: ["i"],
      k: [],
    };

    test(` Finds a path`, () => {
      const result = hasPath(graph, "j", "h");
      if (result) {
        console.log("✅ as expected");
      } else {
        console.log("❌ not as expected");
        console.log(result);
      }
    });

    test(` Does not find a path`, () => {
      const result = hasPath(graph, "j", "f");
      if (!result) {
        console.log("✅ as expected");
      } else {
        console.log("❌ not as expected");
        console.log(result);
      }
    });
  });
})();

//___________________________________________________________
// Has path in a directed graph, recursive, depth first
//___________________________________________________________

(() => {
  function hasPath(graph, src, dest) {
    if (src === dest) return true;
    for (let adj of graph[src]) {
      return hasPath(graph, adj, dest);
    }
    return false;
  }

  test("Has path in a directed graph, recursive, depth first", () => {
    const graph = {
      f: ["g", "i"],
      g: ["h"],
      h: [],
      i: ["g", "k"],
      j: ["i"],
      k: [],
    };

    test(` Finds a path`, () => {
      const result = hasPath(graph, "j", "h");
      if (result) {
        console.log("✅ as expected");
      } else {
        console.log("❌ not as expected");
        console.log(result);
      }
    });

    test(` Does not find a path`, () => {
      const result = hasPath(graph, "j", "f");
      if (!result) {
        console.log("✅ as expected");
      } else {
        console.log("❌ not as expected");
        console.log(result);
      }
    });
  });
})();

//___________________________________________________________
// Has path in a directed graph, iterative, breadth first
//___________________________________________________________

(() => {
  function hasPath(graph, src, dest) {
    let queue = [src];
    while (queue.length) {
      let curr = queue.shift();
      if (curr === dest) return true;
      for (let adj of graph[curr]) {
        if (adj === dest) return true;
        queue.push(adj);
      }
    }
    return false;
  }

  test("Has path in a directed graph, iterative, breadth first", () => {
    const graph = {
      f: ["g", "i"],
      g: ["h"],
      h: [],
      i: ["g", "k"],
      j: ["i"],
      k: [],
    };

    test(` Finds a path`, () => {
      const result = hasPath(graph, "j", "h");
      if (result) {
        console.log("✅ as expected");
      } else {
        console.log("❌ not as expected");
        console.log(result);
      }
    });

    test(` Does not find a path`, () => {
      const result = hasPath(graph, "j", "f");
      if (!result) {
        console.log("✅ as expected");
      } else {
        console.log("❌ not as expected");
        console.log(result);
      }
    });
  });
})();

//___________________________________________________________
// Has path in an undirected graph, iterative, depth first
//___________________________________________________________

(() => {
  function hasPath(edges, src, dest) {
    const graph = createAdjacencyListHelper(edges);
    const stack = [src];
    const visited = [];
    while (stack.length) {
      let curr = stack.pop();
      if (curr === dest) return true;
      visited.push(curr);
      for (let adj of graph[curr]) {
        if (adj === dest) return true;
        if (!visited.includes(adj)) {
          stack.push(adj);
        }
      }
    }
    return false;
  }

  test("Has path in an undirected graph, iterative, depth first", () => {
    const edges = [
      ["i", "j"],
      ["k", "i"],
      ["m", "k"],
      ["k", "l"],
      ["o", "n"],
    ];

    test(` Finds a path`, () => {
      const result = hasPath(edges, "k", "j");
      if (result) {
        console.log("✅ as expected");
      } else {
        console.log("❌ not as expected");
        console.log(result);
      }
    });

    test(` Does not find a path`, () => {
      const result = hasPath(edges, "k", "n");
      if (!result) {
        console.log("✅ as expected");
      } else {
        console.log("❌ not as expected");
        console.log(result);
      }
    });
  });
})();

//___________________________________________________________
// Has path in an undirected graph, recursive, depth first
//__________________________________________________________

(() => {
  function hasPath(graph, src, dest, visited) {
    const v = !visited ? new Set() : visited;
    if (src === dest) return true;
    if (v.has(src)) return false;
    v.add(src);
    for (let adj of graph[src]) {
      return hasPath(graph, adj, dest, v);
    }
    return false;
  }

  test("Has path in an undirected graph, recursive, depth first", () => {
    const edges = [
      ["i", "j"],
      ["k", "i"],
      ["m", "k"],
      ["k", "l"],
      ["o", "n"],
    ];

    test(` Finds a path`, () => {
      const result = hasPath(createAdjacencyListHelper(edges), "k", "j");
      if (result) {
        console.log("✅ as expected");
      } else {
        console.log("❌ not as expected");
        console.log(result);
      }
    });

    test(` Does not find a path`, () => {
      const result = hasPath(createAdjacencyListHelper(edges), "k", "o");
      if (!result) {
        console.log("✅ as expected");
      } else {
        console.log("❌ not as expected");
        console.log(result);
      }
    });
  });
})();

// "if n is the number of nodes, n^2 is the max number of edges" - how?

//______________________________________________________________
// Components count in an undirected graph
//______________________________________________________________

/* 
 A component is a collection of interconnected nodes within a non-monolithic graph.
   Example: graph: A-B C-D F has 3 components.
                      \|
                       E
 NOTE: In any scenario where we need to traverse a non-monolithic graph, we have to be able to go past 
 the boundaries of a single graph component so we won't be able to solve the problem with just recursion.
 Iteration lets us do cross-component exploration of the graph. 

 Important: ensure type consistency, use type conversion when necessary;
 Important: in a valid graph, if graph[a].has(b) then graph[b].has(a);
*/
(() => {
  function componentCount(graph) {
    let count = 0;
    const visited = new Set();
    for (let node in graph) {
      if (!graph[node].length) ++count;
      for (let adj of graph[node]) {
        if (!visited.has(String(adj)) && !visited.has(node)) ++count;
        visited.add(node);
        visited.add(String(adj));
      }
    }
    return count;
  }

  test("Connected components count in an undirected graph", () => {
    const graph = {
      1: [2],
      2: [1],
      3: [9],
      4: [6],
      5: [6],
      6: [4, 5, 7, 8],
      7: [6],
      8: [6],
      9: [3],
      10: [],
    };

    test(` Finds the correct component count`, () => {
      const result = componentCount(graph);
      if (result === 4) {
        console.log("✅ as expected");
      } else {
        console.log("❌ not as expected");
        console.log(result);
      }
    });
  });
})();

// TODO: Revisit everything below this line

//______________________________________________________________
// Largest component in an undirected graph
//______________________________________________________________

(() => {
  function largestComponent(graph) {
    let largest = 0;
    let visited = new Set();
    for (let node in graph) {
      const numOfNodesInComponent = countNodesHelper(graph, node, visited);
      if (numOfNodesInComponent > largest) {
        largest = numOfNodesInComponent;
      }
    }
    return largest;
  }

  function countNodesHelper(graph, node, visited) {
    if (visited.has(node)) return 0;
    visited.add(node);
    let size = 1;
    for (let adj of graph[node]) {
      size += countNodesHelper(graph, String(adj), visited);
    }
    return size;
  }

  test("Largest component in an undirected graph", () => {
    const graph = {
      1: [2],
      2: [1],
      3: [9],
      4: [6],
      5: [6],
      6: [4, 5, 7, 8],
      7: [6],
      8: [6, 11],
      9: [3],
      10: [],
      11: [8],
    };

    test(` Finds the largest component`, () => {
      const result = largestComponent(graph);
      if (result === 6) {
        console.log("✅ as expected");
      } else {
        console.log("❌ not as expected");
        console.log(result);
      }
    });
  });
})();

//______________________________________________________________
// Shortest path in an undirected graph
//______________________________________________________________

(() => {
  function shortestPath(graph, src, dest) {
    const queue = [[src, 0]];
    const visited = new Set();
    while (queue) {
      const curr = queue.pop();
      if (curr[0] === dest) return curr[1];
      visited.add(curr[0]);
      const n = curr[0];
      const d = curr[1];
      for (let adj of graph[n]) {
        if (!visited.has(adj)) {
          queue.unshift([adj, d + 1]);
        }
      }
    }
    return Infinity;
  }

  test("Shortest path in an undirected graph", () => {
    const edges = [
      ["w", "x"],
      ["x", "y"],
      ["z", "y"],
      ["z", "v"],
      ["w", "v"],
    ];

    test(` Finds the shortest path`, () => {
      const result = shortestPath(createAdjacencyListHelper(edges));
      if (result === 6) {
        console.log("✅ as expected");
      } else {
        console.log("❌ not as expected");
        console.log(result);
      }
    });
  });
})();

//______________________________________________________________
// Island count in an undirected graph/grid
//______________________________________________________________

(() => {
  function islandCount(graph) {
    let count = 0;
    const visited = new Set();
    for (let i = 0; i < graph.length; ++i) {
      for (let j = 0; j < graph[i].length; ++j) {
        if (isLand(graph, i, j, visited)) {
          ++count;
        }
      }
    }
    return count;
  }

  function isLand(graph, i, j, visited) {
    // i - outer array element index
    // j - inner array element index
    const isWithinRow = 0 <= i && i < graph.length;
    if (!isWithinRow) return false;
    const isWithinCol = 0 <= j && j < graph[i].length;
    if (!isWithinCol) return false;
    if (visited.has(`${i},${j}`) || graph[i][j] === 0) return false;
    visited.add(`${i},${j}`);
    isLand(graph, i - 1, j, visited);
    isLand(graph, i + 1, j, visited);
    isLand(graph, i, j - 1, visited);
    isLand(graph, i, j + 1, visited);
    return true;
  }

  test("Island count in an undirected graph/grid", () => {
    const graph = [
      [0, 1, 0, 0, 1, 0],
      [1, 1, 0, 1, 1, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0],
      [0, 1, 0, 1, 1, 0],
      [0, 1, 0, 0, 0, 0],
    ];

    test(` Finds the correct island count`, () => {
      const result = islandCount(graph);
      if (result === 4) {
        console.log("✅ as expected");
      } else {
        console.log("❌ not as expected");
        console.log(result);
      }
    });
  });
})();

//______________________________________________________________
// Smallest island in an undirected graph/grid
//______________________________________________________________

(() => {
  function smallestIsland(graph) {
    let smallest = Infinity;
    const visited = new Set();
    for (let i = 0; i < graph.length; ++i) {
      for (let j = 0; j < graph[i].length; ++j) {
        const island = islandSize(graph, i, j, visited);
        if (island > 0 && island < smallest) {
          smallest = island;
        }
      }
    }
    return smallest;
  }

  function islandSize(graph, i, j, visited) {
    const isValidRowIdx = 0 <= i && i < graph.length;
    if (!isValidRowIdx) return 0;
    const isValidColIdx = 0 <= j && j < graph[i].length;
    if (!isValidColIdx) return 0;
    if (visited.has(`${i},${j}`) || graph[i][j] === 0) return 0;
    visited.add(`${i},${j}`);
    let count = 1;
    count += islandSize(graph, i - 1, j, visited);
    count += islandSize(graph, i + 1, j, visited);
    count += islandSize(graph, i, j - 1, visited);
    count += islandSize(graph, i, j + 1, visited);
    return count;
  }

  test("Smallest island in an undirected graph/grid", () => {
    const graph = [
      [0, 1, 0, 0, 1, 0],
      [1, 1, 0, 1, 1, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0],
      [0, 1, 0, 1, 1, 0],
      [0, 1, 0, 0, 0, 0],
    ];

    test(` Finds the smallest island`, () => {
      const result = smallestIsland(graph);
      if (result === 2) {
        console.log("✅ as expected");
      } else {
        console.log("❌ not as expected");
        console.log(result);
      }
    });
  });
})();

function createAdjacencyListHelper(edges) {
  const graph = {};
  for (let e of edges) {
    if (graph[e[0]]) {
      graph[e[0]].push(e[1]);
    } else {
      graph[e[0]] = [e[1]];
    }
    if (graph[e[1]]) {
      graph[e[1]].push(e[0]);
    } else {
      graph[e[1]] = [e[0]];
    }
  }
  return graph;
}
