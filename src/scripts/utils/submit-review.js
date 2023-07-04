import RestaurantApi from '../data/restaurant-api';

const SubmitReview = {
  init({ form, name, review }) {
    form.addEventListener('submit', () => {
      this._submitData(name, review);
    });
  },

  async _submitData(name, review) {
    const id = window.location.hash.slice(9);
    const data = { id, name: name.value, review: review.value };
    await RestaurantApi.postRestaurantReview(data);
  },
};

export default SubmitReview;
