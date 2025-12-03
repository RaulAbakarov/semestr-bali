import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Calculator from './components/Calculator'
import LanguageSwitcher from './components/LanguageSwitcher'
import ThemeToggle from './components/ThemeToggle'
import Footer from './components/Footer'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Copyright from './pages/Copyright'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-wrapper">
          <Navbar />
          <div className="language-switcher-container">
            <LanguageSwitcher />
          </div>
          <ThemeToggle />
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
    </ThemeProvider>
  )
}

export default App
