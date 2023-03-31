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


console.log(breadthFirstGraphTraversal(graph, 'a'));