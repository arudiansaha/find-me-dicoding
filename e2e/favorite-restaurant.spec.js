/* eslint-disable no-undef */
const assert = require('assert');

Feature('Favorite a Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorite restaurants', ({ I }) => {
  I.seeElement('restaurant-list');
  I.see('', '.restaurant__list');
});

Scenario('Make a restaurant as favorite', async ({ I }) => {
  I.seeElement('restaurant-list');
  I.see('', '.restaurant__list');

  I.amOnPage('/');
  I.waitForElement('.restaurant__link', 30);
  I.seeElement('.restaurant__link');

  const firstRestaurant = locate('.restaurant__title').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('.detail__favorite', 30);
  I.seeElement('.detail__favorite');
  I.click('.detail__favorite');

  I.amOnPage('/#/favorite');
  I.seeElement('restaurant-item');

  const favoredRestaurantTitle = await I.grabTextFrom('.restaurant__title');
  assert.strictEqual(firstRestaurantTitle, favoredRestaurantTitle);
});

Scenario('Remove a restaurant from favorite', async ({ I }) => {
  I.seeElement('restaurant-list');
  I.see('', '.restaurant__list');

  I.amOnPage('/');
  I.waitForElement('.restaurant__link', 30);
  I.seeElement('.restaurant__link');

  const firstRestaurant = locate('.restaurant__title').first();
  I.click(firstRestaurant);

  I.waitForElement('.detail__favorite', 30);
  I.seeElement('.detail__favorite');
  I.click('.detail__favorite');

  I.amOnPage('/#/favorite');
  I.seeElement('restaurant-item');

  I.amOnPage('/');
  I.waitForElement('.restaurant__link', 30);
  I.seeElement('.restaurant__link');

  I.click(firstRestaurant);

  I.waitForElement('.detail__favorite', 30);
  I.seeElement('.detail__favorite');
  I.click('.detail__favorite');

  I.amOnPage('/#/favorite');
  I.see('', '.restaurant__list');
});
