const ExpandContent = {
  init({ button, content, icon = null }) {
    button.addEventListener('click', (event) => {
      this._toggleContent(event, content);

      if (icon) this._toggleIcon(icon);
    });
  },

  _toggleContent(event, content) {
    event.stopPropagation();
    content.classList.toggle('expand');
  },

  _toggleIcon(icon) {
    icon.classList.toggle('rotate');
  },
};

export default ExpandContent;
