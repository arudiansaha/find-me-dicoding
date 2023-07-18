class HeroImages extends HTMLElement {
  connectedCallback() {
    this._renderPage();
  }

  _renderPage() {
    this.setAttribute('class', 'hero');
    this.innerHTML = `
      <picture>
        <source
          media="(min-width: 600px)"
          srcset="./images/heros/hero-image-large.jpg"
        >
        <img
          src="./images/heros/hero-image-small.jpg"
          alt="Hero image"
          class="hero__image"
        >
      </picture>
    `;
  }
}

customElements.define('hero-images', HeroImages);
