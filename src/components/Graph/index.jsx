import PropTypes from "prop-types";
import { useEffect } from "react";
import cytoscape from "cytoscape";

import "./style.css";

export const Graph = ({ graph }) => {
  useEffect(() => {
    const nodesAndEdges = [];
    Object.entries(graph).forEach(([source, edges]) => {
      nodesAndEdges.push({ data: { id: source } });
      edges.forEach(([target, weight, probability]) => {
        nodesAndEdges.push({
          data: { source, target, weight, probability },
          classes: "edge-class",
        });
      });
    });

    const cy = cytoscape({
      container: document.getElementById("cy"),
      elements: nodesAndEdges,
      style: [
        {
          selector: "node",
          style: {
            "background-color": "#3498db",
            label: "data(id)",
            width: "5px",
            height: "5px",
            shape: "ellipse",
            "font-size": "5px",
          },
        },
        {
          selector: "edge",
          style: {
            label: "data(probability)",
            "font-size": "5px",
            width: "1",
            "line-color": "#95a5a6", 
            "target-arrow-color": "#95a5a6",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
          },
        },
      ],
    });

    cy.layout({ name: "cose", randomize: true}).run();
    cy.fit();
  }, [graph]);

  return <div id="cy" />;
};

Graph.propTypes = {
  graph: PropTypes.object.isRequired,
};
