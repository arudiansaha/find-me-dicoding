import '../../components/hero-images';
import '../../components/restaurant-list';
import RestaurantApi from '../../data/restaurant-api';

const Home = {
  async render() {
    return `
      <hero-images></hero-images>
      <restaurant-list></restaurant-list>
    `;
  },

  async afterRender() {
    const navbarElement = document.querySelector('nav-bar');
    navbarElement.title = 'Find Me';

    const restaurantListElement = document.querySelector('restaurant-list');
    const restaurants = await RestaurantApi.restaurantList();
    restaurantListElement.restaurants = restaurants;
    restaurantListElement.exploreTitle = 'Explore Restaurant';
  },
};

export default Home;
