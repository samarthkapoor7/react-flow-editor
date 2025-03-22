"use client"

import { useState, useCallback, useRef } from "react"
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  ConnectionMode,
  useNodesState,
  useEdgesState,
  Panel,
  MarkerType,
} from "reactflow"
import "reactflow/dist/style.css"
import TaskNode from "./TaskNode"

// Define custom node types
const nodeTypes = {
  task: TaskNode,
}

// Initial nodes for the workflow
const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 5 },
    style: {
      background: "#f3f4f6",
      color: "#111827",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      padding: "10px",
      width: 150,
    },
  },
  {
    id: "2",
    type: "task",
    data: { label: "Process Task" },
    position: { x: 250, y: 100 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "End" },
    position: { x: 250, y: 200 },
    style: {
      background: "#f3f4f6",
      color: "#111827",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      padding: "10px",
      width: 150,
    },
  },
]

// Initial edges connecting the nodes
const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    style: { stroke: "#64748b" },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
    style: { stroke: "#64748b" },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
]

function WorkflowEditor() {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  // Handle connections between nodes
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  // Add a new task node to the workflow
  const addTaskNode = useCallback(() => {
    if (!reactFlowInstance) return

    const id = `node_${nodes.length + 1}`
    const newNode = {
      id,
      type: "task",
      position: {
        x: Math.random() * 300 + 50,
        y: Math.random() * 300 + 50,
      },
      data: { label: `Task ${nodes.length + 1}` },
    }

    setNodes((nds) => nds.concat(newNode))
  }, [reactFlowInstance, nodes.length, setNodes])

  return (
    <div className="workflow-editor" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        onInit={setReactFlowInstance}
      >
        <Background variant="dots" gap={12} size={1} />
        <Controls />
        <Panel position="top-right">
          <button className="add-button" onClick={addTaskNode}>
            Add Task
          </button>
        </Panel>
      </ReactFlow>
    </div>
  )
}

export default WorkflowEditor

