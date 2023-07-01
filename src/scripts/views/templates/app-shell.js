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
  }
}

export default AppShell;
