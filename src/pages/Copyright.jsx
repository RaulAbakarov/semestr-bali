import { useTranslation } from 'react-i18next'
import './Copyright.css'

function Copyright() {
  const { t } = useTranslation()
  
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>{t('copyright.title')}</h1>
        <p className="last-updated">{t('copyright.lastUpdated')}</p>

        <section>
          <h2>{t('copyright.section1Title')}</h2>
          <p>{t('copyright.section1Content')}</p>
        </section>

        <section>
          <h2>{t('copyright.section2Title')}</h2>
          <p>{t('copyright.section2Content')}</p>
        </section>

        <section>
          <h2>{t('copyright.section3Title')}</h2>
          <p>{t('copyright.section3Content')}</p>
        </section>

        <section>
          <h2>{t('copyright.section4Title')}</h2>
          <p>{t('copyright.section4Content')}</p>
        </section>

        <section>
          <h2>{t('copyright.section5Title')}</h2>
          <p>{t('copyright.section5Content')}</p>
        </section>

        <section>
          <h2>{t('copyright.section6Title')}</h2>
          <p>{t('copyright.section6Content')}</p>
        </section>

        <section>
          <h2>{t('copyright.section7Title')}</h2>
          <p>{t('copyright.section7Content')}</p>
        </section>

        <section>
          <h2>{t('copyright.section8Title')}</h2>
          <p>{t('copyright.section8Content')}</p>
        </section>

        <section>
          <h2>{t('copyright.section9Title')}</h2>
          <p>{t('copyright.section9Content')}</p>
        </section>
      </div>
    </div>
  )
}

export default Copyright
