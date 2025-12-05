import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Navbar.css'

function Navbar() {
  const { t } = useTranslation()
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src="/logo.svg" alt="Semestr Balı" className="brand-logo" />
          <span className="brand-text">{t('calculator.title')}</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
