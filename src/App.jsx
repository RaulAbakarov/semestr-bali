import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Calculator from './components/Calculator'
import Footer from './components/Footer'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Copyright from './pages/Copyright'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <div className="container">
          <Routes>
            <Route path="/" element={<Calculator />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/copyright" element={<Copyright />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
