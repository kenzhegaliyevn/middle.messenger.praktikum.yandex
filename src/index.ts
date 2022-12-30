import { Block, renderDOM, registerComponent } from './core';
import { NotFoundPage } from './pages/notFound/notFound';
import statusContainer from './components/statusContainer';

// import OnboardingPage from './pages/onboarding';
// import LoginPage from './pages/login';

import './styles/style.scss';

// import Button from './components/button';
// import Link from './components/link';
// import Input from './components/input';
// import Layout from './components/layout';

registerComponent(statusContainer);
// registerComponent(Button);
// registerComponent(Input);
// registerComponent(Layout);

document.addEventListener('DOMContentLoaded', () => {
  // DEV: Расскоментировать нужно страницу для отображения

  //   const App = new LoginPage();
  // const App = new OnboardingPage({
  //   links: [
  //     {to: '#signup', text: 'signup'},
  //     {to: '#login', text: 'login'},
  //   ]
  // });

  renderDOM(new NotFoundPage());
});
