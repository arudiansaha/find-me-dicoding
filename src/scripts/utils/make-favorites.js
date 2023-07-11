import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb';

const MakeFavorites = {
  async init({
    restaurant, button, outlineIcon, solidIcon,
  }) {
    this._button = button;
    this._outlineIcon = outlineIcon;
    this._solidIcon = solidIcon;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isExisted(id)) {
      this._renderFavored();
    } else {
      this._renderFavorite();
    }
  },

  async _isExisted(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  },

  _renderFavorite() {
    this._button.classList.remove('active');
    this._button.innerText = `${this._outlineIcon} Favorite`;

    this._button.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },

  _renderFavored() {
    this._button.classList.add('active');
    this._button.innerText = `${this._solidIcon} Favored`;

    this._button.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default MakeFavorites;
