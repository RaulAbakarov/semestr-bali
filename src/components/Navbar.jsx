import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Navbar.css'

function Navbar() {
  const { t } = useTranslation()
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">📊</span>
          <span className="brand-text">{t('calculator.title')}</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
