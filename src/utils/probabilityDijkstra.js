import PriorityQueue from "./queue";

function dijkstra(graph, startNode, endNode) {
  const distances = {};
  const previousNodes = {};
  const visited = {};
  const queue = new PriorityQueue();

  for (const node in graph) {
    distances[node] = Infinity;
  }

  distances[startNode] = 0;
  queue.enqueue(startNode, 0);

  while (!queue.isEmpty()) {
    const { node } = queue.dequeue();

    if (node === endNode) {
      return {
        path: constructPath(previousNodes, endNode),
        cost: distances[endNode],
      };
    }

    if (!visited[node]) {
      visited[node] = true;

      for (const neighbor of graph[node]) {
        const [nextNode, weight] = neighbor;
        const distanceToNeighbor = distances[node] + weight;

        if (distanceToNeighbor < distances[nextNode]) {
          distances[nextNode] = distanceToNeighbor;
          previousNodes[nextNode] = node;
          queue.enqueue(nextNode, distanceToNeighbor);
        }
      }
    }
  }

  return { path: [], cost: -1 };
}

function constructPath(previousNodes, endNode) {
  const path = [];
  let currentNode = endNode;
  while (previousNodes[currentNode]) {
    path.unshift(currentNode);
    currentNode = previousNodes[currentNode];
  }
  path.unshift(currentNode);
  return path;
}

export default dijkstra;
