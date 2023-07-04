import '../../components/restaurant-list';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Favorite = {
  async render() {
    return '<restaurant-list></restaurant-list>';
  },

  async afterRender() {
    const navbarElement = document.querySelector('nav-bar');
    navbarElement.title = 'Favorite Restaurant';

    const restaurantListElement = document.querySelector('restaurant-list');
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    restaurantListElement.restaurants = restaurants;
    restaurantListElement.exploreTitle = 'Lovable Restaurants';
  },
};

export default Favorite;
