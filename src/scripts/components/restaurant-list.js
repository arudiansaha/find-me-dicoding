import './restaurant-item';

class RestaurantList extends HTMLElement {
  set restaurants(restaurants) {
    this._restaurants = restaurants;
    this._renderPage();
  }

  set exploreTitle(title) {
    this._exploreTitle = title;
    this._renderPage();
  }

  _renderPage() {
    this.setAttribute('class', 'restaurant');
    this.innerHTML = `
      <h2 class="restaurant__explore">${this._exploreTitle}</h2>
      <div class="restaurant__list"></div>
    `;

    this._restaurants.forEach((restaurant) => {
      const restaurantListELement = document.querySelector('.restaurant__list');
      const restaurantItemElement = document.createElement('restaurant-item');
      restaurantItemElement.restaurant = restaurant;
      restaurantListELement.appendChild(restaurantItemElement);
    });
  }
}

customElements.define('restaurant-list', RestaurantList);
