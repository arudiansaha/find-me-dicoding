import LocalState from '../data/local-state';

const MakeFavorites = {
  init({
    settings, button, outlineIcon, solidIcon,
  }) {
    const data = LocalState.getData().filter(({ id }) => id === settings.id)[0];

    if (!data) LocalState.saveData(settings);
    if (data && data.isFavorite) this._addIcon(button, solidIcon);

    button.addEventListener('click', () => {
      if (button.classList.contains('active')) {
        this._removeIcon(button, outlineIcon);
        this._makeUnfavored(settings);
      } else {
        this._addIcon(button, solidIcon);
        this._makeFavored(settings);
      }
    });
  },

  _addIcon(button, solidIcon) {
    button.classList.add('active');
    button.innerHTML = `${solidIcon} Favored`;
  },

  _removeIcon(button, outlineIcon) {
    button.classList.remove('active');
    button.innerHTML = `${outlineIcon} Favorite`;
  },

  _makeFavored(settings) {
    settings.isFavorite = true;
    LocalState.saveData(settings);
  },

  _makeUnfavored(settings) {
    settings.isFavorite = false;
    LocalState.saveData(settings);
  },
};

export default MakeFavorites;
