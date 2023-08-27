import PriorityQueue from "./queue";

function dijkstraWithProbability(graph, startNode, endNode) {
  const distances = {};
  const probabilities = {};
  const visited = {};
  const queue = new PriorityQueue();

  for (const node in graph) {
    distances[node] = Infinity;
    probabilities[node] = 1;
  }

  distances[startNode] = 0;
  queue.enqueue(startNode, 0);

  while (!queue.isEmpty()) {
    const { node } = queue.dequeue();

    if (node === endNode) {
      return { distance: distances[node], probability: probabilities[node] };
    }

    if (!visited[node]) {
      visited[node] = true;

      for (const neighbor of graph[node]) {
        const [nextNode, weight, prob] = neighbor;
        const distanceToNeighbor = distances[node] + weight;
        const newProbability = probabilities[node] * prob;

        if (distanceToNeighbor < distances[nextNode]) {
          distances[nextNode] = distanceToNeighbor;
          probabilities[nextNode] = newProbability;
          queue.enqueue(nextNode, distanceToNeighbor);
        }
      }
    }
  }

  return { distance: -1, probability: 0 };
}

export default dijkstraWithProbability;