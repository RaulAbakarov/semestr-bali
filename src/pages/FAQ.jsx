import './FAQ.css'

function FAQ() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Tez-tez Verilən Suallar (FAQ)</h1>
        
        <section className="faq-item">
          <h2>❓ Semestr balı necə hesablanır?</h2>
          <p>Seminar ortalama × 0.4 + Kollokvium ortalama × 0.6, sonra bunun 3-ə vurulması ilə əsas bal alınır. Davamiyyət və sərbəst iş balları əlavə edilir.</p>
        </section>

        <section className="faq-item">
          <h2>❓ Davamiyyət balı necə hesablanır?</h2>
          <p>10 - (10 × buraxılan saat / ümumi saat). Əgər buraxılan saat daxil etməsəniz, avtomatik 10 bal verilir.</p>
        </section>

        <section className="faq-item">
          <h2>❓ Neçə seminar və kollokvium əlavə edə bilərəm?</h2>
          <p>1-dən 10-a qədər istədiyiniz qədər seminar və kollokvium əlavə edə bilərsiniz.</p>
        </section>

        <section className="faq-item">
          <h2>❓ Məlumatlarım saxlanılır?</h2>
          <p>Xeyr! Bütün hesablamalar brauzerinizdə yerli olaraq həyata keçirilir. Heç bir məlumat serverə göndərilmir.</p>
        </section>

        <section className="faq-item">
          <h2>❓ Mobil telefondan istifadə edə bilərəm?</h2>
          <p>Bəli! Saytımız mobil, tablet və masaüstü cihazlar üçün tam uyğunlaşdırılıb.</p>
        </section>

        <section className="faq-item">
          <h2>❓ Hesablamada səhv varsa nə etməliyəm?</h2>
          <p>Əlaqə səhifəsindən bizimlə əlaqə saxlayın. Problemi tez bir zamanda həll edərik.</p>
        </section>

        <section className="faq-item">
          <h2>❓ Sayt pulsuzmu?</h2>
          <p>Bəli! Semestr Balı Hesablama tamamilə pulsuz və açıq mənbəlidir.</p>
        </section>

        <section className="faq-item">
          <h2>❓ Konfetti animasiyası nə zaman görünür?</h2>
          <p>45 bal və ya daha yuxarı nəticə aldıqda təbrik animasiyası görünür! 🎉</p>
        </section>
      </div>
    </div>
  )
}

export default FAQ
