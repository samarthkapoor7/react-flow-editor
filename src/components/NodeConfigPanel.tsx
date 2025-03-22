"use client"

import { useState, useEffect } from "react"

function NodeConfigPanel({ node, updateConfig, onClose }) {
  const [config, setConfig] = useState({})

  useEffect(() => {
    if (node && node.data) {
      setConfig({
        label: node.data.label || "",
        description: node.data.description || "",
        threshold: node.data.threshold || 50,
        multiplier: node.data.multiplier || 2,
        ascending: node.data.ascending !== undefined ? node.data.ascending : true,
      })
    }
  }, [node])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setConfig((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number.parseFloat(value) : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateConfig(node.id, config)
  }

  if (!node) return null

  return (
    <div className="node-config-panel">
      <div className="panel-header">
        <h3>Configure Node</h3>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="label">Label</label>
          <input type="text" id="label" name="label" value={config.label || ""} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={config.description || ""}
            onChange={handleChange}
          />
        </div>

        {node.data.operation === "filter" && (
          <div className="form-group">
            <label htmlFor="threshold">Threshold Value</label>
            <input
              type="number"
              id="threshold"
              name="threshold"
              value={config.threshold || 0}
              onChange={handleChange}
            />
            <small>Filter values greater than this threshold</small>
          </div>
        )}

        {node.data.operation === "map" && (
          <div className="form-group">
            <label htmlFor="multiplier">Multiplier</label>
            <input
              type="number"
              id="multiplier"
              name="multiplier"
              value={config.multiplier || 1}
              step="0.1"
              onChange={handleChange}
            />
            <small>Multiply each value by this factor</small>
          </div>
        )}

        {node.data.operation === "sort" && (
          <div className="form-group checkbox-group">
            <label>
              <input type="checkbox" name="ascending" checked={config.ascending} onChange={handleChange} />
              Sort in ascending order
            </label>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="save-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default NodeConfigPanel

