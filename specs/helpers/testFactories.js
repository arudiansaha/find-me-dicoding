import MakeFavorites from '../../src/scripts/utils/make-favorites';

const createFavoriteButtonWithRestaurant = async (restaurant) => {
  await MakeFavorites.init({
    restaurant,
    button: document.getElementById('favoriteButtonContainer'),
  });
};

export default createFavoriteButtonWithRestaurant;
