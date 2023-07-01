import DrawerInitiator from '../utils/drawer-initiator';

class NavBar extends HTMLElement {
  set title(value) {
    this._title = value;
    this._renderPage();
  }

  _renderPage() {
    const hamburgerIcon = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24" fill="currentColor"
        width="24"
        height="24"
      >
        <path
          fill-rule="evenodd"
          d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
          clip-rule="evenodd"
        />
      </svg>
    `;

    const xMarkIcon = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="24"
        height="24"
      >
        <path
          fill-rule="evenodd"
          d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
          clip-rule="evenodd"
        />
      </svg>  
    `;

    this.setAttribute('class', 'navbar');
    this.innerHTML = `
      <button class="navbar__button" id="hamburgerButton">
        ${hamburgerIcon}
      </button>
      <h1 class="navbar__title">${this._title}</h1>
      <nav class="navbar__drawer" id="navigationDrawer">
        <button class="navbar__button" id="xMarkButton">${xMarkIcon}</button>
        <ul class="navbar__list">
          <li class="navbar__item">
            <a href="#/home" class="navbar__link">Home</a>
          </li>
          <li class="navbar__item">
            <a href="#/favorite" class="navbar__link">Favorite</a>
          </li>
          <li class="navbar__item">
            <a
              href="https://www.linkedin.com/in/ky-ardiansyah/"
              class="navbar__link"
            >
              About Us
            </a>
          </li>
        </ul>
      </nav>
    `;

    DrawerInitiator.init({
      openButton: document.querySelector('#hamburgerButton'),
      closeButton: document.querySelector('#xMarkButton'),
      drawer: document.querySelector('#navigationDrawer'),
    });
  }
}

customElements.define('nav-bar', NavBar);
