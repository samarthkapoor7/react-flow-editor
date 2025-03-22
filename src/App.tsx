import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import WorkflowEditor from "./components/WorkflowEditor"
import WorkflowExecution from "./components/WorkflowExecution"
import { WorkflowProvider } from "./context/WorkflowContext"
import "./App.css"

function App() {
  return (
    <WorkflowProvider>
      <Router>
        <div className="app">
          <header className="app-header">
            <h1>Data Processing Workflow</h1>
            <nav className="app-nav">
              <Link to="/" className="nav-link">
                Editor
              </Link>
              <Link to="/execute" className="nav-link">
                Execute Workflow
              </Link>
            </nav>
          </header>
          <main className="app-main">
            <Routes>
              <Route path="/" element={<WorkflowEditor />} />
              <Route path="/execute" element={<WorkflowExecution />} />
            </Routes>
          </main>
        </div>
      </Router>
    </WorkflowProvider>
  )
}

export default App

