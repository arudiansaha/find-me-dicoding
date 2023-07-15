import routes from '../../routes/routes';
import urlParser from '../../routes/url-parser';

class AppShell {
  constructor(content) {
    this._content = content;

    this.renderPage();
  }

  async renderPage() {
    const url = urlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();

    const skipLinkElement = document.querySelector('.skip-link');
    skipLinkElement.addEventListener('click', (event) => {
      event.preventDefault();
      document.getElementById('mainContent').focus();
    });
  }
}

export default AppShell;
