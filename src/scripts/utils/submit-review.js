import RestaurantApi from '../data/restaurant-api';

const SubmitReview = {
  init({ form, name, review }) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitReview(name, review);
    });
  },

  async _submitReview(name, review) {
    const id = window.location.hash.slice(9);
    const data = { id, name: name.value, review: review.value };

    await RestaurantApi.postRestaurantReview(data);
  },
};

export default SubmitReview;
