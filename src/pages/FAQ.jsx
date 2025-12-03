import { useTranslation } from 'react-i18next'
import './FAQ.css'

function FAQ() {
  const { t } = useTranslation()
  
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>{t('faq.title')}</h1>
        
        <section className="faq-item">
          <h2>❓ {t('faq.q1')}</h2>
          <p>{t('faq.a1')}</p>
        </section>

        <section className="faq-item">
          <h2>❓ {t('faq.q2')}</h2>
          <p>{t('faq.a2')}</p>
        </section>

        <section className="faq-item">
          <h2>❓ {t('faq.q3')}</h2>
          <p>{t('faq.a3')}</p>
        </section>

        <section className="faq-item">
          <h2>❓ {t('faq.q4')}</h2>
          <p>{t('faq.a4')}</p>
        </section>

        <section className="faq-item">
          <h2>❓ {t('faq.q5')}</h2>
          <p>{t('faq.a5')}</p>
        </section>

        <section className="faq-item">
          <h2>❓ {t('faq.q6')}</h2>
          <p>{t('faq.a6')}</p>
        </section>

        <section className="faq-item">
          <h2>❓ {t('faq.q7')}</h2>
          <p>{t('faq.a7')}</p>
        </section>

        <section className="faq-item">
          <h2>❓ {t('faq.q8')}</h2>
          <p>{t('faq.a8')}</p>
        </section>
      </div>
    </div>
  )
}

export default FAQ
