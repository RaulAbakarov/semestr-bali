import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Semestr Balı</h3>
          <p>Azərbaycan universitetləri üçün semestr balı hesablama kalkulyatoru</p>
        </div>
        
        <div className="footer-section">
          <h4>Səhifələr</h4>
          <ul>
            <li><Link to="/">Ana Səhifə</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Əlaqə</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Hüquqi</h4>
          <ul>
            <li><Link to="/privacy">Məxfilik Siyasəti</Link></li>
            <li><Link to="/terms">İstifadə Şərtləri</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Semestr Balı Hesablama. Bütün hüquqlar qorunur.</p>
      </div>
    </footer>
  )
}

export default Footer
