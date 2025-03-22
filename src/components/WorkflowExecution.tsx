"use client"

import { useState } from "react"
import { useWorkflow } from "../context/WorkflowContext"
import ReactFlow, { Background, Controls } from "reactflow"
import "reactflow/dist/style.css"
import TaskNode from "./TaskNode"
import ResultsPanel from "./ResultsPanel"

// Define custom node types
const nodeTypes = {
  task: TaskNode,
}

// Sample input data
const sampleData = [
  { id: 1, value: 30, label: "Item 1" },
  { id: 2, value: 45, label: "Item 2" },
  { id: 3, value: 60, label: "Item 3" },
  { id: 4, value: 75, label: "Item 4" },
  { id: 5, value: 90, label: "Item 5" },
]

function WorkflowExecution() {
  const { nodes, edges, executeWorkflow, executionResults, isExecuting } = useWorkflow()
  const [selectedNodeId, setSelectedNodeId] = useState(null)
  const [inputData, setInputData] = useState(sampleData)

  const handleExecute = async () => {
    await executeWorkflow(inputData)
  }

  const onNodeClick = (_, node) => {
    setSelectedNodeId(node.id)
  }

  const updateInputData = (newData) => {
    try {
      const parsedData = JSON.parse(newData)
      if (Array.isArray(parsedData)) {
        setInputData(parsedData)
      }
    } catch (error) {
      console.error("Invalid JSON data:", error)
    }
  }

  return (
    <div className="workflow-container">
      <div className="execution-sidebar">
        <div className="execution-panel">
          <h3>Input Data</h3>
          <textarea
            className="data-input"
            value={JSON.stringify(inputData, null, 2)}
            onChange={(e) => updateInputData(e.target.value)}
            disabled={isExecuting}
          />

          <button className="execute-button" onClick={handleExecute} disabled={isExecuting || nodes.length === 0}>
            {isExecuting ? "Executing..." : "Execute Workflow"}
          </button>
        </div>

        <ResultsPanel results={executionResults} selectedNodeId={selectedNodeId} />
      </div>

      <div className="workflow-viewer">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          fitView
          zoomOnScroll={false}
          panOnScroll={true}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
        >
          <Background variant="dots" gap={12} size={1} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </div>
  )
}

export default WorkflowExecution

