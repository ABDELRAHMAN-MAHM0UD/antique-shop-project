function ContactPage({ showToast }) {
  function handleContactSubmit(event) {
    event.preventDefault();
    event.currentTarget.reset();
    showToast("Message sent successfully. We will contact you soon.");
  }

  return (
    <section className="section-block contact-section">
      <div className="container">
        <div className="section-heading">
          <span>Contact</span>
          <h2>Ask About A Piece</h2>
          <p>
            Send a message if you need help choosing, reserving, or handling a
            fragile item.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleContactSubmit}>
          <input type="text" placeholder="Your name" required />
          <input type="email" placeholder="Your email" required />
          <textarea placeholder="Your message" rows="4" required></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
}

export default ContactPage;