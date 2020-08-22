//Objective is to find all edges in a graph that are critical (not bounded in a cycle)
//We are given 'n' servers and servers are denoted from 0 to n - 1

let n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]


//O(n) solution where n is the number of nodes in the graph
//DFS solution that uses Tarjan's algorithm

let visited = new Array(n).fill(-1)
let min = new Array(n)
let graph = new Map()

//Build graph
for (let connection of connections) {
    if (!graph.has(connection[0])) {
        graph.set(connection[0], [])
    }
    graph.get(connection[0]).push(connection[1])
    
    if (!graph.has(connection[1])) {
        graph.set(connection[1], [])
    }
    graph.get(connection[1]).push(connection[0])
}

let time = 0
let result = []

for (let i = 0; i < n; i++) {
    if (visited[i] == -1) {
        dfs(i, i)
    }
}

function dfs(u, parent) {
    visited[u] = min[u] = ++time
    for (let j = 0; j < graph.get(u).length; j++) {
        let vertex = graph.get(u)[j]
        
        if (vertex == parent) {
            continue
        }
        
        if (visited[vertex] == -1) {
            dfs(vertex, u)
            
            //Update the minimum time to get to parent
            min[u] = Math.min(min[u], min[vertex])
            
            //If the child's minimum time is greater than it's parent's discovery time,
            //there is no alternative path between u and v. Thus, it is a critical connection
            if (min[vertex] > visited[u]) {
                result.push([vertex, u])
            }
        } else {
            
            //If the vertex has been visited before, update it's minimum time using itself and
            //it's child's discovery time
            //There are other alternative paths to 'u'
            min[u] = Math.min(min[u], visited[vertex])
        }
    }
}

return result