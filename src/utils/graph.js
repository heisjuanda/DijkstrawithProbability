import NODES from "../constants";

function generateRandomGraph(maxNodes) {
  const graph = {};
  if (maxNodes > NODES.length) graph;

  for (let i = 0; i < maxNodes; i++) {
    const node = NODES[i];
    graph[node] = [];

    const numEdges = Math.floor(Math.random() * (maxNodes - 1)) + 1;

    for (let j = 0; j < numEdges; j++) {
      const randomNode = NODES[Math.floor(Math.random() * maxNodes)];
      const weight = Math.floor(Math.random() * 10) + 1;
      const probability = 0.1 + Math.random() * (1 - 0.1)

      graph[node].push([randomNode, weight, probability.toFixed(1)]);
    }
  }

  return graph;
}

export default generateRandomGraph;
