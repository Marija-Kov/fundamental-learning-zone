// Graphs are data structures composed of nodes connected with edges that can be directed or undirected.
// At first glance they have some similarities with binary trees
// especially when it comes to traversal that can be depth and breadth first.
// they can be represented in a variety of ways
// One way of representing a graph (in javascript) is with an object where every node is stored as a 
// key:value pair where key is node itself and value an array of adjacent nodes.

const graph = {
    a: ['b', 'c'],
    b: ['d'],
    c: ['e'],
    d: ['f'],
    e: [],
    f: []
}

//___________________________________________________________
// Graph traversal depth first
//___________________________________________________________

function depthFirstGraphTraversal(graph, source) {
    const stack = [source];
    const output = [];
    while(stack.length){
     let curr = stack.pop();
     output.push(curr)
     if (graph[curr].length){
        for(let i = 0; i<graph[curr].length; ++i){
          stack.push(graph[curr][i])
        }
      }
    }
  return output
}

//___________________________________________________________
// Recursive graph traversal depth first
//___________________________________________________________

function depthFirstGraphTraversalRecursive(graph, source){
    console.log(source)
  for (let i = 0; i < graph[source].length; ++i) {
    depthFirstGraphTraversalRecursive(graph, graph[source][i]);
  }
}


//___________________________________________________________
// Graph traversal breadth first
//___________________________________________________________

function breadthFirstGraphTraversal(graph, source){
    const queue = [source];
    const output = [source];
   while(queue.length){
      let curr = queue.shift();
    if(graph[curr].length){     
        for(let i = 0; i < graph[curr].length; ++i){
           queue.push(graph[curr][i]);
           output.push(graph[curr][i]); 
        }
      }
   } 
    return output
}

//___________________________________________________________

let graph1 = {
  f: ["g", "i"],
  g: ["h"],
  h: [],
  i: ["g", "k"],
  j: ["i"],
  k: [],
};

//___________________________________________________________
// Has path problem depth first
//___________________________________________________________
 
function hasPathDepthFirst(graph, src, dest){
 if(src === dest) return false
 const stack = [src];
   while(stack.length){
    let curr = stack.pop();
    if(curr === dest){
        return true
    }
    for(let i = 0; i< graph[curr].length; ++i){
        if (graph[curr][i] === dest) {
          return true;
        }
        stack.push(graph[curr][i])
    }
  }
 return false
}

//___________________________________________________________
// Has path problem depth first recursive
//___________________________________________________________

function hasPathDepthFirstRecursive(graph, src, dest) {
  if (src === dest) return true;
    for(let i = 0; i < graph[src].length; ++i){
         return hasPathDepthFirstRecursive(graph, graph[src][i], dest) === false
    }
}


//___________________________________________________________
// Has path problem breadth first 
//___________________________________________________________

function hasPath_BreadthFirst(graph, src, dest) {
  let queue = [ src ];
  while(queue.length){
    let curr = queue.shift();
     if(curr === dest) return true
        for(let i = 0; i < graph[curr].length; ++i){
         if (graph[curr][i] === dest) return true;
         queue.push(graph[curr][i]);
        }
   }
   return false
}

//___________________________________________________________
// Undirected path
//___________________________________________________________


const edges = [
    ['i','j'], ['k','i'], ['m','k'], ['k','l'], ['o','n']
];

function createAdjacencyList_Helper(edges){
    const graph = {};
    for(let i = 0; i<edges.length; ++i){
        const e = edges[i];
       if(graph[e[0]]){
           graph[e[0]].push(e[1]);
       } else {
          graph[e[0]] = [e[1]];
       }
       if(graph[e[1]]){
           graph[e[1]].push(e[0]);
       } else {
          graph[e[1]] = [e[0]];
       }
    }
    return graph
}


//___________________________________________________________
// Has undirected path - depth first
//___________________________________________________________

function hasUndirectedPath_DepthFirst(edges, src, dest){
 const graph = createAdjacencyList_Helper(edges);
 const stack = [src];
 const visited = [];
 while(stack.length){
  let curr = stack.pop();
  if (curr === dest) return true;
  visited.push(curr);
  for(let i = 0; i < graph[curr].length; ++i){
    const adjNode = graph[curr][i];
    if(adjNode === dest) return true 
    if(!visited.includes(adjNode)){ 
     stack.push(adjNode)
    }
  }
 }
 return false
}

//___________________________________________________________
// Has undirected path - depth first recursive
//__________________________________________________________

const graph2 = createAdjacencyList_Helper(edges);

function hasUndirectedPath_DepthFirst_Recursive(graph, src, dest, visited) {
  if(src===dest) return true
  if(visited.has(src)) return false 
  visited.add(src)
  for(let adj of graph[src]){
    if(hasUndirectedPath_DepthFirst_Recursive(graph, adj, dest, visited)) return true 
  }
  return false
}

//console.log(hasUndirectedPath_DepthFirst_Recursive(graph2, 'k', 'n', new Set()));

// "if n is the number of nodes, n^2 is the max number of edges" - how?

//______________________________________________________________
// Connected components count in an undirected graph
//______________________________________________________________

//Q: What do we know about this graph? Are nodes represented by numbers or other type of data?

const graph3 = {
  1:[2],
  2:[1],
  3:[],
  4:[6],
  5:[6],
  6:[4,5,7,8],
  7:[6],
  8:[6],
  9:[3],
  10:[]
}

//Important: ensure type consistency

function connectedComponents_DepthFirst(graph){
  let count = 0;
  const visited = new Set();
  for(let node in graph){
      if(!visited.has(node)){ 
          visited.add(node);
          if(!graph[node].length){
            ++count;
          } else {
           for(let adj of graph[node]){
            if(!visited.has(String(adj))) visited.add(String(adj));
           }  
          }  
       } else {
        ++count
       }
  }
  return count
}
//______________________________________________________________

const graph4 = {
  0:[1,5,8],
  1:[0],
  2:[3,4],
  3:[2,4,6],
  4:[2,3],
  5:[0,8,9],
  6:[3,7],
  7:[6,11],
  8:[0,5,9],
  9:[5,8],
  11:[7]
}
//______________________________________________________________
// Largest component in an undirected graph
//______________________________________________________________

//* In any scenario where we need to traverse a non-monolithic graph, we have to be able to go past the boundaries 
// of a single graph component so we won't be able to solve the problem with just recursion.
// Iteration lets us do cross-component exploration of the graph.

function largestComponent(graph){
  let largest = 0;
  let visited = new Set();
  for(let node in graph){
   const numOfNodesInComponent = countNodes(graph, node, visited);
   if(numOfNodesInComponent > largest){
    largest = numOfNodesInComponent
   }
  }
  return largest
}

function countNodes(graph, node, visited){
  if(visited.has(node)) return 0
  visited.add(node);
  let size = 1;
  for(let adj of graph[node]){   
    size+= countNodes(graph, String(adj), visited); 
  }
  return size
}

//console.log(largestComponent(graph4));

//______________________________________________________________
// Shortest path in an undirected graph
//______________________________________________________________
const edges1 = [
  ['w','x'], ['x','y'], ['z','y'], ['z','v'], ['w','v']
];
const graph5 = createAdjacencyList_Helper(edges1);

function shortestPath(graph, src, dest){
 const queue = [[src,0]];
 const visited = new Set()
 while(queue){
  const curr = queue.pop();
  if(curr[0]===dest) return curr[1];
  visited.add(curr[0]);
  const n = curr[0];
  const d = curr[1];
  for(let adj of graph[n]){
    if(!visited.has(adj)){
      queue.unshift([adj, d+1])
    } 
  }
 }
 return Infinity
}

// console.log(shortestPath(graph5, "w", "z"))

//______________________________________________________________
// Island count in an undirected graph
//______________________________________________________________

const graph6 = [
  [0,1,0,0,1,0],
  [1,1,0,1,1,0],
  [0,1,0,0,0,0],
  [0,0,0,1,1,0],
  [0,1,0,1,1,0],
  [0,1,0,0,0,0]
   ];

  // i - outer array element index
  //j - inner array element index

  function islandCount(graph){
    let count = 0;
    const visited = new Set();
    for(let i = 0; i < graph.length; ++i){
       for (let j = 0; j < graph[i].length; ++j) {
        if(isLand(graph, i, j, visited)){
         ++count 
        }
       }
    }
    return count
  }

function isLand(graph, i, j, visited){
  const isWithinRow = 0 <= i && i < graph.length;
  if (!isWithinRow) return false;
  const isWithinCol = 0 <= j && j < graph[i].length; 
  if(!isWithinCol) return false;
  if (visited.has(`${i},${j}`) || graph[i][j]===0) return false;
  visited.add(`${i},${j}`)
  isLand(graph, i-1, j, visited);
  isLand(graph, i+1, j, visited);
  isLand(graph, i, j-1, visited);
  isLand(graph, i, j+1, visited);
  return true
}

//console.log(islandCount(graph6))

//______________________________________________________________
// Smallest island in an undirected graph/grid
//______________________________________________________________

function smallestIsland(graph){
  let smallest = Infinity;
  const visited = new Set();
  for(let i = 0; i < graph.length; ++i){
    for(let j = 0; j < graph[i].length; ++j){
      const island = islandSize(graph, i, j, visited)
      if(island > 0 && island < smallest){
        smallest = island
      } 
    }
  }
  return smallest
}

function islandSize(graph, i, j, visited){
  const isValidRowIdx = 0 <= i && i < graph.length;
  if(!isValidRowIdx) return 0;
  const isValidColIdx = 0 <=j && j < graph[i].length;
  if (!isValidColIdx) return 0;
  if (visited.has(`${i},${j}`) || graph[i][j] === 0) return 0;
  visited.add(`${i},${j}`);
  let count = 1;
  count += islandSize(graph, i-1, j, visited)
  count += islandSize(graph, i + 1, j, visited);
  count += islandSize(graph, i, j - 1, visited);
  count += islandSize(graph, i, j + 1, visited);
  return count
}

//console.log(smallestIsland(graph6));