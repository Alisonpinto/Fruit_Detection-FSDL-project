import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ScanPage from './pages/ScanPage'
import ResultPage from './pages/ResultPage'
import DevelopersPage from './pages/DevelopersPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/developers" element={<DevelopersPage />} />
      </Routes>
    </Router>
  )
}

export default App
