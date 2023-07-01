class RestaurantReview extends HTMLElement {
  set review(review) {
    this._review = review;
    this._renderPage();
  }

  _renderPage() {
    this.setAttribute('class', 'review__item');
    this.innerHTML = `
      <div class="review__header">
        <h3 class="review__name">${this._review.name}</h3>
        <p class="review__date">${this._review.date}</p>
      </div>
      <p class="review__content">${this._review.review}</p>
    `;
  }
}

customElements.define('restaurant-review', RestaurantReview);
