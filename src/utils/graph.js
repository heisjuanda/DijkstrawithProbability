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
      const weight = 1;
      const probability = 1

      graph[node].push([randomNode, weight, probability.toFixed(1)]);
    }
  }

  return graph;
}

export default generateRandomGraph;
