import { useState } from "react";

import { Graph } from "../../components/Graph";

import NODES from "../../constants";
import dijkstraWithProbability from "../../utils/probability";
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
    const calculatedValue = dijkstraWithProbability(graph, startNode, endNode);
    if (calculatedValue.distance === -1) {
      setResult(`There's no way to get there`);
      return;
    }
    setResult(`Distance ${result.distance} y Probability ${result.probability}`);
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
          {result ? (
            <p>
              {result}
            </p>
          ) : (
            <p></p>
          )}
        </article>
      )}
    </section>
  );
};
