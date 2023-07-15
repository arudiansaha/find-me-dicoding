/* eslint-disable no-alert */
import CONFIG from '../globals/config';
import NotificationHelper from './notification-helper';

const SubscribeInitiator = {
  async init(subscribeButton, unsubscribeButton) {
    this._subscribeButton = subscribeButton;
    this._unsubscribeButton = unsubscribeButton;
    this._registrationServiceWorker = null;

    if ('serviceWorker' in navigator) {
      this._registrationServiceWorker = await navigator
        .serviceWorker
        .getRegistration();
    }

    await this._initialState();
    await this._initialListener();
  },

  async _initialListener() {
    this._subscribeButton.addEventListener('click', async (event) => {
      await this._subscribeMessage(event);
    });

    this._unsubscribeButton.addEventListener('click', async (event) => {
      await this._unsubscribeMessage(event);
    });
  },

  async _initialState() {
    this._showSubscribeButton();
  },

  async _subscribeMessage(event) {
    event.stopPropagation();

    if (await this._isCurrentSubscriptionAvailable()) {
      window.alert('Already subscribed');
      return;
    }

    if (!(await this._isNotificationReady())) {
      console.log('Notification is not ready!');
      return;
    }

    console.log('Subscribing to push notification');
    const pushSubscription = await this._registrationServiceWorker
      ?.pushManager
      .subscribe(this._generateSubscribeOptions());

    if (!pushSubscription) {
      console.log('Failed to subscribe push notification!');
      return;
    }

    try {
      const url = CONFIG.PUSH_MSG_SUBSCRIBE_URL;
      await this._postDataToServer(url, pushSubscription);

      console.log('Successfully subscribed!');
    } catch (error) {
      console.error('Push subscription failed: ', error.message);

      await pushSubscription?.unsubscribe();
    }

    this._showSubscribeButton();
  },

  async _unsubscribeMessage(event) {
    event.stopPropagation();

    const pushSubscription = await this._registrationServiceWorker
      ?.pushManager
      .getSubscription();

    if (!pushSubscription) {
      window.alert('Haven\'t subscribed yet');
      return;
    }

    try {
      const url = CONFIG.PUSH_MSG_SUBSCRIBE_URL;
      await this._postDataToServer(url, pushSubscription);

      const isHasBeenUnsubscribed = await pushSubscription?.unsubscribe();
      console.log('It is has been unsubscribed: ', isHasBeenUnsubscribed);

      if (!isHasBeenUnsubscribed) {
        console.log('Failed to unsubscribe push notification!');
        await this._postDataToServer(url, pushSubscription);
        return;
      }

      console.log('Successfully unsubscribed!');
    } catch (error) {
      console.error('Failed to remove push notification', error.message);
    }

    this._showSubscribeButton();
  },

  _urlB64ToUint8Array: (base64String) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; i += 1) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  },

  _generateSubscribeOptions() {
    const base64Key = CONFIG.PUSH_MSG_VAPID_PUBLIC_KEY;

    return {
      userVisibleOnly: true,
      applicationServerKey: this._urlB64ToUint8Array(base64Key),
    };
  },

  async _postDataToServer(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },

  _isSubscribedToServer(state = false) {
    if (state) {
      this._subscribeButton.style.display = 'none';
      this._unsubscribeButton.style.display = 'inline-block';
    } else {
      this._subscribeButton.style.display = 'inline-block';
      this._unsubscribeButton.style.display = 'none';
    }
  },

  async _isCurrentSubscriptionAvailable() {
    const checkSubscription = await this
      ._registrationServiceWorker
      ?.pushManager
      .getSubscription();

    return Boolean(checkSubscription);
  },

  async _isNotificationReady() {
    if (!NotificationHelper._checkAvailability()) {
      console.error('Notification not supported in this browser!');
      return false;
    }

    if (!NotificationHelper._checkPermission()) {
      console.log('User did not yet granted permission!');
      const status = await NotificationHelper._requestPermission();

      if (status === 'denied') {
        window.alert('You denied the notification!');
        return false;
      }

      if (status === 'default') {
        window.alert('You closed the notification dialog!');
        return false;
      }
    }

    return true;
  },

  async _showSubscribeButton() {
    this._isSubscribedToServer(await this._isCurrentSubscriptionAvailable());
  },
};

export default SubscribeInitiator;
