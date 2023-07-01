import '../../components/restaurant-detail';
import RestaurantApi from '../../data/restaurant-api';

const Detail = {
  async render() {
    return '<restaurant-detail></restaurant-detail>';
  },

  async afterRender() {
    const id = window.location.hash.slice(9);
    const detail = await RestaurantApi.getRestaurantById(id);

    const navbarElement = document.querySelector('nav-bar');
    navbarElement.title = detail.restaurant.name;

    const restaurantDetailElement = document.querySelector('restaurant-detail');
    restaurantDetailElement.restaurant = detail.restaurant;
  },
};

export default Detail;
