import WorkflowEditor from "./components/WorkflowEditor"
import "./App.css"

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Simple Workflow Editor</h1>
      </header>
      <main className="app-main">
        <WorkflowEditor />
      </main>
    </div>
  )
}

export default App

