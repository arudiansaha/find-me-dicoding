import CONFIG from '../globals/config';
import ExpandContent from '../utils/expand-content';

class RestaurantItem extends HTMLElement {
  set restaurant(restaurant) {
    this._restaurant = restaurant;
    this._renderPage();
  }

  _renderPage() {
    const {
      name, description, pictureId, city, rating,
    } = this._restaurant;

    const chevronIcon = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="24"
        height="24"
      >
        <path
          fill-rule="evenodd"
          d="M20.03 4.72a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 11.69l6.97-6.97a.75.75 0 011.06 0zm0 6a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06L12 17.69l6.97-6.97a.75.75 0 011.06 0z"
          clip-rule="evenodd"
        />
      </svg>
    `;

    this.setAttribute('class', 'restaurant__item');
    this.innerHTML = `
      <div class="restaurant__cover">
        <div class="restaurant__rating">
          <p class="restaurant__score">${rating.toFixed(1)}</p>
        </div>
        <img
          src="${CONFIG.BASE_IMAGE_URL}/medium/${pictureId}"
          alt="${name}"
          class="restaurant__image"
          loading="lazy"
        >
      </div>
      <div class="restaurant__content">
        <a
          href="#/detail/${this._restaurant.id}"
          class="restaurant__link"
        >
          <h3 class="restaurant__title">${name}</h3>
        </a>
        <p class="restaurant__city">${city}</p>
        <div class="restaurant__expandable">
          <p class="restaurant__description">${description}</p>
        </div>
      </div>
      <button
        class="restaurant__button"
        type="button"
        aria-label="Expand restaurant description"
      >
        ${chevronIcon}
      </button>
    `;

    const scoreELement = this.querySelector('.restaurant__score');
    const percentage = (rating / 5.0) * 100;
    let color = '';

    if (percentage <= 2.0) color = '#e74c3c';
    if (percentage <= 3.5) color = '#f1c40f';
    if (percentage > 3.5) color = '#27ae60';

    scoreELement.style.color = color;

    ExpandContent.init({
      button: this.querySelector('.restaurant__button'),
      content: this.querySelector('.restaurant__expandable'),
      icon: this.querySelector('.restaurant__button>svg'),
    });
  }
}

customElements.define('restaurant-item', RestaurantItem);
