from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from neo4j import GraphDatabase
import networkx as nx

app = FastAPI()

# Correct CORS middleware usage
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Neo4j driver setup
driver = GraphDatabase.driver("bolt://neo4j:7687", auth=("neo4j", "12345678"))


# Fetching the graph from the Neo4j database
def fetch_graph_from_db():
    G = nx.DiGraph()
    with driver.session(database="neo4j") as session:  # updated here
        result = session.run("""
            MATCH (a:Aisle)-[r:CONNECTED]->(b:Aisle)
            RETURN a.id AS source, b.id AS target, r.distance AS weight
        """)
        for record in result:
            G.add_edge(record["source"], record["target"], weight=record["weight"])
    return G



@app.get("/graph")
def get_graph():
    G = fetch_graph_from_db()  # ✅ fixed function name
    nodes = [{"id": n} for n in G.nodes()]
    edges = [
        {"source": u, "target": v, "weight": d["weight"]}
        for u, v, d in G.edges(data=True)
    ]
    return {"nodes": nodes, "edges": edges}


@app.get("/shortest-path")
def shortest_path(source: str = Query(...), target: str = Query(...)):
    G = fetch_graph_from_db()  # ✅ fixed function name

    # Validate if source and target nodes exist
    if source not in G.nodes:
        return {"error": f"Source node '{source}' does not exist in the graph."}
    if target not in G.nodes:
        return {"error": f"Target node '{target}' does not exist in the graph."}

    # If source and target are the same
    if source == target:
        return {
            "path": [source],
            "edges": [],
            "cost": 0,
            "message": "Source and target are the same."
        }

    try:
        # Get shortest path and cost using Dijkstra
        path = nx.dijkstra_path(G, source, target)
        cost = nx.dijkstra_path_length(G, source, target)

        # Build edge path: pairs of (source, target, weight)
        edge_path = []
        for i in range(len(path) - 1):
            u, v = path[i], path[i + 1]
            weight = G[u][v]["weight"]
            edge_path.append({"source": u, "target": v, "weight": weight})

        return {
            "path": path,
            "edges": edge_path,
            "cost": cost
        }

    except nx.NetworkXNoPath:
        return {"error": f"No path found from '{source}' to '{target}'"}
