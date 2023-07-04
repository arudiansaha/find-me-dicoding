class ContactSubscribe extends HTMLElement {
  connectedCallback() {
    this._renderPage();
  }

  _renderPage() {
    this.setAttribute('class', 'contact');
    this.innerHTML = `
      <h3 class="contact__title">Subscribe to our newsletter</h3>
      <form class="contact__form" id="contactForm">
        <input
          class="contact__input"
          id="contactEmail"
          name="contactEmail"
          type="email"
          placeholder="your@mail.com"
          required
        />
        <button class="contact__button" type="submit">Subscribe</button>
      </form>
      <p class="contact__copyright">&copy; 2023 Find Resto</p>
    `;
  }
}

customElements.define('contact-subscribe', ContactSubscribe);
