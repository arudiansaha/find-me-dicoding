import CONFIG from '../globals/config';

const RestaurantApi = {
  async getRestaurants() {
    const response = await fetch(`${CONFIG.BASE_URL}/list`);
    const responseJson = await response.json();

    return responseJson.restaurants;
  },

  async getRestaurantById(id) {
    const response = await fetch(`${CONFIG.BASE_URL}/detail/${id}`);

    return response.json();
  },

  async getRestaurantByQuery(query) {
    const response = await fetch(`${CONFIG.BASE_URL}/search?q=${query}`);
    const responseJson = await response.json();

    return responseJson.restaurants;
  },

  async postRestaurantReview(review) {
    const response = await fetch(`${CONFIG.BASE_URL}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });

    return response.json();
  },
};

export default RestaurantApi;
