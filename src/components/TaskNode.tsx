"use client"

import { useState } from "react"
import { Handle, Position } from "reactflow"

function TaskNode({ data, isConnectable }) {
  const [editing, setEditing] = useState(false)
  const [taskName, setTaskName] = useState(data.label)

  const handleSave = () => {
    data.label = taskName
    setEditing(false)
  }

  return (
    <div className="task-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="task-handle task-handle-top"
      />

      <div className="task-content">
        <div className="task-header">
          {editing ? (
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="task-input"
              autoFocus
              onBlur={handleSave}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
          ) : (
            <div className="task-title">{data.label}</div>
          )}

          <div className="task-actions">
            <button className="task-button edit-button" onClick={() => setEditing(!editing)}>
              ✏️
            </button>
            <button className="task-button delete-button">🗑️</button>
          </div>
        </div>
        <div className="task-details">Task details go here</div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="task-handle task-handle-bottom"
      />
    </div>
  )
}

export default TaskNode

