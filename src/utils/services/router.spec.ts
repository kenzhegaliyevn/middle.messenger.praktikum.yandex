import { expect } from 'chai';
import Block from '../block';
import Route from './route';
import Router from './router';

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

class Login extends Block {
  constructor(props:any) {
    super('div', props);
  }

  render() {
    const element = document.createElement('template');
    element.innerHTML = '<div>{{content}}</div>';
    return element.content;        
  }  
}

class Signup extends Block {
  constructor(props:any) {
    super('div', props);
  }

  render() {
    const element = document.createElement('template');
    element.innerHTML = '<div>{{content}}</div>';
    return element.content;        
  }  
}

const dom = new JSDOM(
  '<html><body><div id="app"></div></body></html>',
  { url: 'http://localhost' },
  { runScripts: 'dangerously' },
);

global.document = dom.window.document;
global.window = dom.window;
if (dom.window.document.defaultView) {
  global.DocumentFragment = dom.window.document.defaultView.DocumentFragment;
}

const login = new Login({ styles: {} });
const signup = new Signup({ styles: {} });


describe('Router', function () {
  const router = new Router('#app');
  router.start();
        
  it('Should add "/" page to routes list', function () {
    router.use('/', login);
    expect(router.getRoute('/')).instanceOf(Route);
  });

  it('Should add "/signup" page to routes list', function () {
    router.use('/signup', signup);
    expect(router.getRoute('/signup')).instanceOf(Route);
  });

  it('Should go to Login page', function () {
    router.go('/');
    expect(router.getCurrentRoute()._block).instanceOf(Login);
  });
  it('Should go to Signup page', function () {
    router.go('/signup');
    expect(router.getCurrentRoute()._block).instanceOf(Signup);
  });
  it('and affect history length', () => {
    const l = router.history.length;
    router.go('/');
    expect(window.history.length).equals(l + 1);
  });
});