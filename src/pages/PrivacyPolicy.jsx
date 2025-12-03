import { useTranslation } from 'react-i18next'
import './PrivacyPolicy.css'

function PrivacyPolicy() {
  const { t } = useTranslation()
  
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>{t('privacy.title')}</h1>
        <p className="last-updated">{t('privacy.lastUpdated')}</p>

        <section>
          <p>{t('privacy.intro')}</p>
        </section>

        <section>
          <h2>{t('privacy.section1Title')}</h2>
          <p>{t('privacy.section1Content')}</p>
        </section>

        <section>
          <h2>{t('privacy.section2Title')}</h2>
          <p>{t('privacy.section2Content')}</p>
        </section>

        <section>
          <h2>{t('privacy.section3Title')}</h2>
          <p>{t('privacy.section3Content')}</p>
        </section>

        <section>
          <h2>{t('privacy.section4Title')}</h2>
          <p>{t('privacy.section4Content')}</p>
        </section>

        <section>
          <h2>{t('privacy.section5Title')}</h2>
          <p>{t('privacy.section5Content')}</p>
        </section>
      </div>
    </div>
  )
}

export default PrivacyPolicy
