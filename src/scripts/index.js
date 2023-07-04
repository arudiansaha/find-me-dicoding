import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import './components/nav-bar';
import './components/contact-subscribe';
import AppShell from './views/templates/app-shell';
import swRegister from './utils/sw-register';

const appShell = new AppShell(document.querySelector('#mainContent'));

window.addEventListener('hashchange', () => {
  appShell.renderPage();
});

window.addEventListener('load', () => {
  appShell.renderPage();
  swRegister();
});
