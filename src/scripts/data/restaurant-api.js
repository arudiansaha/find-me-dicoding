import CONFIG from '../globals/config';

const RestaurantApi = {
  async restaurantList() {
    const response = await fetch(`${CONFIG.BASE_URL}/list`);
    const responseJson = await response.json();
    return responseJson.restaurants;
  },

  async restaurantDetail(id) {
    const response = await fetch(`${CONFIG.BASE_URL}/detail/${id}`);
    return response.json();
  },

  async restaurantSearch(query) {
    const response = await fetch(`${CONFIG.BASE_URL}/search?q=${query}`);
    const responseJson = await response.json();
    return responseJson.restaurants;
  },
};

export default RestaurantApi;
