function ResultsPanel({ results, selectedNodeId }) {
    if (!results || Object.keys(results).length === 0) {
      return (
        <div className="results-panel">
          <h3>Execution Results</h3>
          <p className="no-results">Execute the workflow to see results</p>
        </div>
      )
    }
  
    const nodeResults = selectedNodeId ? results[selectedNodeId] : null
  
    return (
      <div className="results-panel">
        <h3>Execution Results</h3>
  
        {selectedNodeId ? (
          nodeResults ? (
            <div className="node-results">
              <h4>Node Output</h4>
              <pre className="results-data">{JSON.stringify(nodeResults, null, 2)}</pre>
              <div className="results-summary">
                {Array.isArray(nodeResults) && <p>{nodeResults.length} items processed</p>}
              </div>
            </div>
          ) : (
            <p className="no-results">No results for this node yet</p>
          )
        ) : (
          <p className="select-prompt">Select a node to view its results</p>
        )}
      </div>
    )
  }
  
  export default ResultsPanel
  
  