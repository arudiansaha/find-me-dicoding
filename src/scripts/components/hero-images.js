class HeroImages extends HTMLElement {
  connectedCallback() {
    this._renderPage();
  }

  _renderPage() {
    this.setAttribute('class', 'hero');
    this.innerHTML = `
      <img src="./images/heros/hero-image_2.jpg" alt="hero image" class="hero__image">
    `;
  }
}

customElements.define('hero-images', HeroImages);
