/* eslint-disable no-undef */
import RestaurantApi from '../src/scripts/data/restaurant-api';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import createFavoriteButtonWithRestaurant from './helpers/testFactories';

describe('Unfavorite a Restaurant', () => {
  const addButtonContainer = () => {
    document.body.innerHTML = '<button id="favoriteButtonContainer"></button>';
  };

  beforeEach(async () => {
    addButtonContainer();
    const restaurants = await RestaurantApi.getRestaurants();
    await FavoriteRestaurantIdb.putRestaurant(restaurants[0]);
  });

  afterEach(async () => {
    const restaurants = await RestaurantApi.getRestaurants();
    await FavoriteRestaurantIdb.deleteRestaurant(restaurants[0].id);
  });

  it('should display unfavorite button when the restaurant has been favored', async () => {
    const restaurants = await RestaurantApi.getRestaurants();
    await createFavoriteButtonWithRestaurant(restaurants[0]);

    expect(document.querySelector('[aria-label="Remove from favorite"]'))
      .toBeTruthy();
  });

  it('should not display favorite button when the restaurant has been favored', async () => {
    const restaurants = await RestaurantApi.getRestaurants();
    await createFavoriteButtonWithRestaurant(restaurants[0]);

    expect(document.querySelector('[aria-label="Make it favorite"]'))
      .toBeFalsy();
  });

  it('should be able to remove favored restaurant from the list', async () => {
    const restaurants = await RestaurantApi.getRestaurants();
    await createFavoriteButtonWithRestaurant(restaurants[0]);

    document.querySelector('#favoriteButtonContainer')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error if the unfavored restaurant is not in the list', async () => {
    const restaurants = await RestaurantApi.getRestaurants();
    await createFavoriteButtonWithRestaurant(restaurants[0]);

    await FavoriteRestaurantIdb.deleteRestaurant(restaurants[0].id);

    document.querySelector('#favoriteButtonContainer')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
