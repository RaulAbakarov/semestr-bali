import { useTranslation } from 'react-i18next'
import './TermsOfService.css'

function TermsOfService() {
  const { t } = useTranslation()
  
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>{t('terms.title')}</h1>
        <p className="last-updated">{t('terms.lastUpdated')}</p>

        <section>
          <p>{t('terms.intro')}</p>
        </section>

        <section>
          <h2>{t('terms.section1Title')}</h2>
          <p>{t('terms.section1Content')}</p>
        </section>

        <section>
          <h2>{t('terms.section2Title')}</h2>
          <p>{t('terms.section2Content')}</p>
        </section>

        <section>
          <h2>{t('terms.section3Title')}</h2>
          <p>{t('terms.section3Content')}</p>
        </section>

        <section>
          <h2>{t('terms.section4Title')}</h2>
          <p>{t('terms.section4Content')}</p>
        </section>

        <section>
          <h2>{t('terms.section5Title')}</h2>
          <p>{t('terms.section5Content')}</p>
        </section>

        <section>
          <h2>{t('terms.section6Title')}</h2>
          <p>{t('terms.section6Content')}</p>
        </section>
      </div>
    </div>
  )
}

export default TermsOfService
