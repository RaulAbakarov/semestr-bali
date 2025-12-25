import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Calculator from './components/Calculator'
import LanguageSwitcher from './components/LanguageSwitcher'
import Footer from './components/Footer'
import './App.css'

// Lazy load pages that aren't immediately needed
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
const Contact = lazy(() => import('./pages/Contact'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Copyright = lazy(() => import('./pages/Copyright'))

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <div className="language-switcher-container">
          <LanguageSwitcher />
        </div>
        <div className="container">
          <Suspense fallback={<div style={{textAlign: 'center', padding: '40px'}}>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Calculator />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/copyright" element={<Copyright />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
