import './PrivacyPolicy.css'

function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Məxfilik Siyasəti</h1>
        <p className="last-updated">Son yenilənmə: 30 Noyabr 2025</p>

        <section>
          <h2>1. Məlumat Toplama</h2>
          <p>Semestr Balı Hesablama veb saytı heç bir şəxsi məlumat toplamır və saxlamır. Bütün hesablamalar brauzerinizdə yerli olaraq həyata keçirilir.</p>
        </section>

        <section>
          <h2>2. Kuki (Cookies)</h2>
          <p>Saytımız yalnız analitika məqsədləri üçün Vercel Analytics istifadə edir. Bu, anonim istifadəçi statistikası toplayır və heç bir şəxsi məlumat saxlamır.</p>
        </section>

        <section>
          <h2>3. Məlumatların Saxlanması</h2>
          <p>Daxil etdiyiniz bütün məlumatlar (seminar, kollokvium balları və s.) yalnız sizin cihazınızda qalır və heç bir serverə göndərilmir.</p>
        </section>

        <section>
          <h2>4. Üçüncü Tərəf Xidmətləri</h2>
          <p>Saytımız Vercel platformasında hostinq olunur və Vercel Analytics istifadə edir. Bu xidmətlərin öz məxfilik siyasətləri var.</p>
        </section>

        <section>
          <h2>5. Əlaqə</h2>
          <p>Məxfilik siyasəti ilə bağlı suallarınız varsa, bizimlə əlaqə saxlaya bilərsiniz.</p>
        </section>
      </div>
    </div>
  )
}

export default PrivacyPolicy
