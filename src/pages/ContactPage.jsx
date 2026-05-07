import { useLanguage } from "../context/LanguageContext";

function ContactPage({ showToast }) {
  const { t } = useLanguage();

  function handleContactSubmit(event) {
    event.preventDefault();
    event.currentTarget.reset();
    showToast(t.messages.messageSent);
  }

  return (
    <section className="section-block contact-section">
      <div className="container">
        <div className="section-heading">
          <span>{t.contact.label}</span>
          <h2>{t.contact.title}</h2>
          <p>{t.contact.description}</p>
        </div>

        <form className="contact-form" onSubmit={handleContactSubmit}>
          <input type="text" placeholder={t.contact.name} required />
          <input type="email" placeholder={t.contact.email} required />
          <textarea placeholder={t.contact.message} rows="4" required></textarea>

          <button type="submit">{t.contact.send}</button>
        </form>
      </div>
    </section>
  );
}

export default ContactPage;