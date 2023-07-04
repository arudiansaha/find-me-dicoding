import './restaurant-review';
import CONFIG from '../globals/config';
import MakeFavorites from '../utils/make-favorites';
import ExpandContent from '../utils/expand-content';
import SubmitReview from '../utils/submit-review';

class RestaurantDetail extends HTMLElement {
  set restaurant(restaurant) {
    this._restaurant = restaurant;
    this._renderPage();
  }

  _renderPage() {
    const {
      name,
      address,
      description,
      pictureId,
      city,
      categories,
      menus,
      customerReviews,
    } = this._restaurant;

    const pinIcon = `
      <svg
        xmlns="http://www.w3.org/2000/svg" 
        iewBox="0 0 24 24"
        fill="currentColor"
        width="24"
        height="24"
      >
        <path
          fill-rule="evenodd"
          d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
          clip-rule="evenodd"
        />
      </svg>
    `;

    const heartOutlineIcon = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        width="24"
        height="24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    `;

    const heartSolidIcon = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="24"
        height="24"
      >
        <path
          d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
        />
      </svg>
    `;

    const tagIcon = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="24"
        height="24"
      >
        <path
          fill-rule="evenodd"
          d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
          clip-rule="evenodd"
        />
      </svg>
    `;

    const pencilIcon = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="24"
        height="24"
      >
        <path
          d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"
        />
        <path
          d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"
        />
      </svg>
    `;

    const categoriesElement = categories.map((category) => (
      `<li class="detail__category">${tagIcon}${category.name}</li>`
    )).join('');

    const drinksElement = menus.drinks.map((drink) => (
      `<li class="detail__menu">${drink.name}</li>`
    )).join('');

    const foodsElement = menus.foods.map((food) => (
      `<li class="detail__menu">${food.name}</li>`
    )).join('');

    this.setAttribute('class', 'detail');
    this.innerHTML = `
      <img
        src="${CONFIG.BASE_IMAGE_URL}/large/${pictureId}"
        alt="${name}"
        class="detail__image"
        loading="lazy"
      />
      <div class="detail__content">
        <button class="detail__favorite" type="button">
          ${heartOutlineIcon}Favorite
        </button>
        <div class="detail__info">
          <p class="detail__address">${pinIcon} ${address}, ${city}</p>
          <hr class="solid">
          <ul class="detail__categories">${categoriesElement}</ul>
          <hr class="solid">
          <p class="detail__description">${description}</p>
          <hr class="solid">
          <div class="detail__menus">
            <div>
              <h3>Drinks</h3>
              <ul>${drinksElement}</ul>
            </div>
            <div>
              <h3>Foods</h3>
              <ul>${foodsElement}</ul>
            </div>
          </div>
        </div>
        <div class="review">
          <div class="review__header">
            <h2 class="review__title">Customer Reviews</h2>
            <button class="review__button" type="button">${pencilIcon}</button>
          </div>
          <div class="review__expandable">
            <form class="review__form" id="reviewForm">
              <input
                class="review__input"
                id="customerName"
                name="customerName"
                type="text"
                placeholder="Your name"
                required
              />
              <textarea
                class="review__textarea"
                id="customerReview"
                name="customerReview"
                rows="5" cols="50"
                placeholder="Your honest review!"
                required
              ></textarea>
              <button class="review__submit" type="submit">Submit</button>
            </form>
          </div>
          <div class="review__list"></div>
        </div>
      </div>
    `;

    MakeFavorites.init({
      restaurant: this._restaurant,
      button: this.querySelector('.detail__favorite'),
      outlineIcon: heartOutlineIcon,
      solidIcon: heartSolidIcon,
    });

    const reviewListElement = this.querySelector('.review__list');

    customerReviews.forEach((review) => {
      const restaurantReviewElement = document.createElement('restaurant-review');
      restaurantReviewElement.review = review;
      reviewListElement.appendChild(restaurantReviewElement);
    });

    ExpandContent.init({
      button: this.querySelector('.review__button'),
      content: this.querySelector('.review__expandable'),
    });

    SubmitReview.init({
      form: this.querySelector('#reviewForm'),
      name: this.querySelector('#customerName'),
      review: this.querySelector('#customerReview'),
    });
  }
}

customElements.define('restaurant-detail', RestaurantDetail);
