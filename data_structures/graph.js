// Graphs are data structures composed of nodes connected with edges that can be directed or undirected.
// At first glance they have some similarities with binary trees
// especially when it comes with traversal that can be depth and breadth first.
// they can be represented in a variety of ways
// One way of representing a graph (in javascript) is with an object where every node is stores as a 
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
// Recursive graph traversal breadth first
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
// Has path problem depth first recursive
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
// Has undirected path - depth first
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

console.log(hasUndirectedPath_DepthFirst_Recursive(graph2, 'k', 'n', new Set()));

// "if n is the number of nodes, n^2 is the max number of edges" - how?