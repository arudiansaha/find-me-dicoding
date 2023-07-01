const DrawerInitiator = {
  init({ openButton, closeButton, drawer }) {
    openButton.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
    });

    closeButton.addEventListener('click', (event) => {
      this._removeDrawer(event, drawer);
    });
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
  },

  _removeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
  },
};

export default DrawerInitiator;
