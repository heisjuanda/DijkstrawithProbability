import { useState } from "react";

import { Graph } from "../../components/Graph";

import NODES from "../../constants";
import dijkstra from "../../utils/probabilityDijkstra";
import probabilisticShortestPath from "../../utils/probabilistic";
import generateRandomGraph from "../../utils/graph";

import "./style.css";

export const Home = () => {
  const [result, setResult] = useState(null);
  const [graph, setGraph] = useState(null);

  const handleCreateGraph = () => {
    const randomNum = Math.floor(Math.random() * (NODES.length - 4 + 1)) + 4;
    const graphGenerated = generateRandomGraph(randomNum);
    setGraph(graphGenerated);
  };

  const handleCalculate = () => {
    const startNode = "A";
    const lastNode = Object.entries(graph);
    const endNode = lastNode[lastNode.length - 1][0];

    setResult({});
    const calculatedDijkstraValue = dijkstra(graph, startNode, endNode);
    const calculatedProbabilisticValue = probabilisticShortestPath(
      graph,
      startNode,
      endNode,
      100
    );
    if (calculatedDijkstraValue.cost === -1) {
      setResult(() => ({
        dijkstra: {
          result: "I cannot calculate it",
        },
      }));
      return;
    }
    setResult(() => ({
      dijkstra: {
        result: `Best path: ${calculatedDijkstraValue.path.toString()} and its cost ${calculatedDijkstraValue.cost}`,
      },
      probabilistic: {
        result: `Best path: ${calculatedProbabilisticValue.path} and its cost ${calculatedProbabilisticValue.cost}`,
      },
    }));
  };

  return (
    <section className="sm-section">
      <header>
        <h1>Create Graph</h1>
        <center>
          <button onClick={handleCreateGraph}>create</button>
        </center>
        {console.log(graph)}
        {graph && <Graph graph={graph} />}
      </header>
      {graph && (
        <article>
          <button onClick={handleCalculate}>calculate</button>
          {result?.dijkstra ? (
            <div className="results">
              {result?.dijkstra && (
                <div>
                  <h6>Dijkstra</h6>
                  <p>{result.dijkstra?.result}</p>
                </div>
              )}
              {result?.probabilistic && (
                <div>
                  <h6>Probabilistic</h6>
                  <p>{result.probabilistic?.result}</p>
                </div>
              )}
            </div>
          ) : null}
        </article>
      )}
    </section>
  );
};
