import '../../components/restaurant-list';
import RestaurantApi from '../../data/restaurant-api';
import LocalState from '../../data/local-state';

const Favorite = {
  async render() {
    return '<restaurant-list></restaurant-list>';
  },

  async afterRender() {
    const navbarElement = document.querySelector('nav-bar');
    navbarElement.title = 'Favorite Restaurant';

    const restaurantListElement = document.querySelector('restaurant-list');
    const restaurants = await RestaurantApi.getRestaurants();
    const favorites = LocalState
      .getData()
      .filter(({ isFavorite }) => isFavorite)
      .map(({ id }) => id);
    const filteredRestaurant = restaurants
      .filter(({ id }) => favorites.includes(id));

    restaurantListElement.restaurants = filteredRestaurant;
    restaurantListElement.exploreTitle = 'Lovable Restaurants';
  },
};

export default Favorite;
