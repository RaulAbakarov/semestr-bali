import { useTranslation } from 'react-i18next'
import './Contact.css'

function Contact() {
  const { t } = useTranslation()
  
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>{t('contact.title')}</h1>
        
        <section>
          <p>{t('contact.intro')}</p>
        </section>

        <section>
          <h2>📧 {t('contact.email')}</h2>
          <p><a href="mailto:userr776@proton.me">userr776@proton.me</a></p>
        </section>

        <section>
          <h2>💬 {t('contact.whatsapp')}</h2>
          <p><a href="https://wa.me/994513862212" target="_blank" rel="noopener noreferrer">+994 51 386 22 12</a></p>
        </section>

        <section>
          <h2>📱 {t('contact.social')}</h2>
          <p><a href="https://www.instagram.com/im.rau7/" target="_blank" rel="noopener noreferrer">{t('contact.followInstagram')}</a></p>
        </section>
      </div>
    </div>
  )
}

export default Contact
