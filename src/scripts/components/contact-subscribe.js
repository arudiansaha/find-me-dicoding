import SubscribeInitiator from '../utils/subscribe-initiator';

class ContactSubscribe extends HTMLElement {
  connectedCallback() {
    this._renderPage();
  }

  _renderPage() {
    this.setAttribute('class', 'contact');
    this.innerHTML = `
      <h3 class="contact__title">Subscribe to our newsletter</h3>
      <button
        class="contact__button"
        id="subscribeButton"
        type="button"
      >
        Subscribe
      </button>
      <button
        class="contact__button-unsubscribe"
        id="unsubscribeButton"
        type="button"
      >
        Subscribed
      </button>
      <p class="contact__copyright">&copy; 2023 Find Resto</p>
    `;

    const subscribeButtonELement = this.querySelector('#subscribeButton');
    const unsubscribeButtonELement = this.querySelector('#unsubscribeButton');
    SubscribeInitiator.init(subscribeButtonELement, unsubscribeButtonELement);
  }
}

customElements.define('contact-subscribe', ContactSubscribe);
