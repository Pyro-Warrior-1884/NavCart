import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

type Node = {
  id: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
};

type Edge = {
  source: string;
  target: string;
  weight: number;
};

interface D3Edge extends d3.SimulationLinkDatum<Node> {
  source: Node;
  target: Node;
  weight: number;
}

const Map1: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [source, setSource] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [totalDistance, setTotalDistance] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/graph")
      .then((res) => res.json())
      .then((data) => {
        setNodes(data.nodes);
        setEdges(data.edges);
        drawGraph(data.nodes, data.edges, []);
        setTotalDistance(null);
      });
  }, []);

  useEffect(() => {
    if (source && target) {
      fetch(`http://localhost:8000/shortest-path?source=${source}&target=${target}`)
        .then((res) => res.json())
        .then((data) => {
          drawGraph(nodes, edges, data.path || []);
          if (data.total_weight) {
            setTotalDistance(data.total_weight);
          } else {
            setTotalDistance(null);
          }
        });
    }
  }, [edges, nodes, source, target]);

  const drawGraph = (nodes: Node[], edges: Edge[], path: string[]) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const width = +svg.attr("width")!;
    const height = +svg.attr("height")!;

    const nodeMap = new Map<string, Node>();
    nodes.forEach((n) => nodeMap.set(n.id, n));

    const d3Edges: D3Edge[] = edges.map((e) => ({
      source: nodeMap.get(e.source)!,
      target: nodeMap.get(e.target)!,
      weight: e.weight,
    }));

    const simulation = d3
      .forceSimulation(nodes)
      .force("link", d3.forceLink<Node, D3Edge>(d3Edges).id((d) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Draw links
    const link = svg
      .append("g")
      .selectAll("line")
      .data(d3Edges)
      .enter()
      .append("line")
      .attr("stroke", (d) =>
        path.includes(d.source.id) && path.includes(d.target.id) ? "red" : "#ccc"
      )
      .attr("stroke-width", (d) =>
        path.includes(d.source.id) && path.includes(d.target.id) ? 3 : 1.5
      )
      .attr("stroke-dasharray", (d) =>
        path.includes(d.source.id) && path.includes(d.target.id) ? "0" : "4"
      );

    // Draw link weights (edge labels)
    const edgeLabels = svg
      .append("g")
      .selectAll("text")
      .data(d3Edges)
      .enter()
      .append("text")
      .text((d) => d.weight)
      .attr("font-size", 11)
      .attr("font-family", "sans-serif")
      .attr("fill", (d) =>
        path.includes(d.source.id) && path.includes(d.target.id) ? "red" : "#555"
      )
      .attr("text-anchor", "middle")
      .attr("dy", -5);

    // Draw nodes
    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", (d) => (path.includes(d.id) ? "#f97316" : "#3b82f6"))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .call(
        d3
          .drag<SVGCircleElement, Node>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    // Draw labels for nodes
    const label = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text((d) => d.id)
      .attr("font-size", 13)
      .attr("font-family", "sans-serif")
      .attr("dx", 14)
      .attr("dy", ".35em")
      .attr("fill", "#111");

    // Tick update
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x!)
        .attr("y1", (d) => d.source.y!)
        .attr("x2", (d) => d.target.x!)
        .attr("y2", (d) => d.target.y!);

      node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);
      label.attr("x", (d) => d.x!).attr("y", (d) => d.y!);

      edgeLabels
        .attr("x", (d) => (d.source.x! + d.target.x!) / 2)
        .attr("y", (d) => (d.source.y! + d.target.y!) / 2 - 5);
    });
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "1rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>📍 NavCart Path Finder</h2>
      <div style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <label>From:</label>
        <select onChange={(e) => setSource(e.target.value)} value={source}>
          <option value="">Select</option>
          {nodes.map((n) => (
            <option key={n.id} value={n.id}>
              {n.id}
            </option>
          ))}
        </select>

        <label>To:</label>
        <select onChange={(e) => setTarget(e.target.value)} value={target}>
          <option value="">Select</option>
          {nodes.map((n) => (
            <option key={n.id} value={n.id}>
              {n.id}
            </option>
          ))}
        </select>
      </div>

      {totalDistance !== null && (
        <div style={{ marginBottom: "1rem", fontSize: "1rem", color: "green" }}>
          ✅ Total Distance: <strong>{totalDistance}</strong>
        </div>
      )}

      <svg ref={svgRef} width={900} height={600} style={{ border: "1px solid #ddd" }}></svg>
    </div>
  );
};

export default Map1;
