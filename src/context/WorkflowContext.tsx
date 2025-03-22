"use client"

import { createContext, useContext, useState } from "react"

const WorkflowContext = createContext()

export function useWorkflow() {
  return useContext(WorkflowContext)
}

export function WorkflowProvider({ children }) {
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [executionResults, setExecutionResults] = useState({})
  const [isExecuting, setIsExecuting] = useState(false)

  // Save the current workflow configuration
  const saveWorkflow = (newNodes, newEdges) => {
    setNodes(newNodes)
    setEdges(newEdges)
  }

  // Execute the workflow with input data
  const executeWorkflow = async (inputData) => {
    setIsExecuting(true)
    setExecutionResults({})

    // Create a map of nodes by ID for easier access
    const nodesMap = nodes.reduce((acc, node) => {
      acc[node.id] = node
      return acc
    }, {})

    // Create an adjacency list to represent the graph
    const graph = {}
    edges.forEach((edge) => {
      if (!graph[edge.source]) {
        graph[edge.source] = []
      }
      graph[edge.source].push(edge.target)
    })

    // Find start nodes (input nodes with no incoming edges)
    const startNodeIds = nodes.filter((node) => node.type === "input").map((node) => node.id)

    // Initialize results with input data
    const results = {
      ...startNodeIds.reduce((acc, nodeId) => {
        acc[nodeId] = inputData
        return acc
      }, {}),
    }

    // Process each node in topological order (simplified for this demo)
    const processedNodes = new Set(startNodeIds)
    const queue = [...startNodeIds]

    while (queue.length > 0) {
      const currentNodeId = queue.shift()
      const currentNode = nodesMap[currentNodeId]

      // Process current node based on its type or operation
      if (currentNode.type !== "input") {
        results[currentNodeId] = await processNode(
          currentNode,
          results[currentNodeId] || results[Object.keys(results).pop()],
        )
      }

      // Add delay to simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update execution results after each node
      setExecutionResults((prev) => ({
        ...prev,
        [currentNodeId]: results[currentNodeId],
      }))

      // Add child nodes to the queue
      if (graph[currentNodeId]) {
        graph[currentNodeId].forEach((childId) => {
          if (!processedNodes.has(childId)) {
            processedNodes.add(childId)
            queue.push(childId)
          }
        })
      }
    }

    setIsExecuting(false)
    return results
  }

  // Process a single node based on its operation
  const processNode = async (node, inputData) => {
    // Default to passing through data if no operation is specified
    if (!node.data || !node.data.operation) {
      return inputData
    }

    switch (node.data.operation) {
      case "filter":
        return inputData.filter((item) => item.value > node.data.threshold)

      case "map":
        return inputData.map((item) => ({
          ...item,
          value: item.value * node.data.multiplier,
        }))

      case "sort":
        return [...inputData].sort((a, b) => (node.data.ascending ? a.value - b.value : b.value - a.value))

      case "aggregate":
        const sum = inputData.reduce((acc, item) => acc + item.value, 0)
        return [{ id: "aggregate", value: sum }]

      default:
        return inputData
    }
  }

  const value = {
    nodes,
    edges,
    executionResults,
    isExecuting,
    saveWorkflow,
    executeWorkflow,
  }

  return <WorkflowContext.Provider value={value}>{children}</WorkflowContext.Provider>
}

