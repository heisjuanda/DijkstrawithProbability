function probabilisticShortestPath(graph, start, end, numIterations) {
  let bestPath = null;
  let bestPathCost = Infinity;

  for (let iteration = 0; iteration < numIterations; iteration++) {
    let current = start;
    const path = [current];
    let pathCost = 0;

    while (current !== end) {
      const neighbors = graph[current];
      if (!neighbors) break;

      const randomNumber = Math.random();
      let cumulativeProbability = 0;
      let nextNode = null;

      for (const neighbor of neighbors) {
        const [neighborNode, cost, probability] = neighbor;
        cumulativeProbability += parseFloat(probability);

        if (randomNumber <= cumulativeProbability) {
          nextNode = neighborNode;
          pathCost += cost;
          break;
        }
      }

      if (!nextNode) {
        break;
      }

      path.push(nextNode);
      current = nextNode;
    }

    if (pathCost < bestPathCost) {
      bestPath = path.slice();
      bestPathCost = pathCost;
    }
  }

  return { path: bestPath, cost: bestPathCost };
}

export default probabilisticShortestPath;
