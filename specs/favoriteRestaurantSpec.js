/* eslint-disable no-undef */
import RestaurantApi from '../src/scripts/data/restaurant-api';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import createFavoriteButtonWithRestaurant from './helpers/testFactories';

describe('Favorite a Restaurant', () => {
  const addButtonContainer = () => {
    document.body.innerHTML = '<button id="favoriteButtonContainer"></button>';
  };

  beforeEach(() => {
    addButtonContainer();
  });

  it('should show the favorite button when the restaurant has not been favored before', async () => {
    const restaurants = await RestaurantApi.getRestaurants();
    await createFavoriteButtonWithRestaurant(restaurants[0]);

    expect(document.querySelector('[aria-label="Make it favorite"]'))
      .toBeTruthy();
  });

  it('should not show the unfavorite button when the restaurant has not been favored before', async () => {
    const restaurants = await RestaurantApi.getRestaurants();
    await createFavoriteButtonWithRestaurant(restaurants[0]);

    expect(document.querySelector('[aria-label="Remove from favorite"]'))
      .toBeFalsy();
  });

  it('should be able to favorite the restaurant', async () => {
    const restaurants = await RestaurantApi.getRestaurants();
    await createFavoriteButtonWithRestaurant(restaurants[0]);

    document.querySelector('#favoriteButtonContainer')
      .dispatchEvent(new Event('click'));

    const favoriteRestaurant = await FavoriteRestaurantIdb
      .getRestaurant(restaurants[0].id);
    expect(favoriteRestaurant).toEqual(restaurants[0]);

    FavoriteRestaurantIdb.deleteRestaurant(restaurants[0].id);
  });

  it('should not add a restaurant again when its already favored', async () => {
    const restaurants = await RestaurantApi.getRestaurants();
    await createFavoriteButtonWithRestaurant(restaurants[0]);

    await FavoriteRestaurantIdb.putRestaurant(restaurants[0]);

    document.querySelector('#favoriteButtonContainer')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants())
      .toEqual([restaurants[0]]);

    FavoriteRestaurantIdb.deleteRestaurant(restaurants[0].id);
  });

  it('should not add a restaurant when it has no id', async () => {
    await createFavoriteButtonWithRestaurant({});

    document.querySelector('#favoriteButtonContainer')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
