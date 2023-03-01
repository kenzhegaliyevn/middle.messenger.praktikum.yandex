import { expect } from 'chai';
import * as Handlebars from 'handlebars';
import Block from './block';
import compile from './compile';

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

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


class Component extends Block {
  constructor(props: any) {
    super('div', props);
  }  
    
  render() {
    const tmpl = Handlebars.compile('<div>{{content}}</div>');
    return compile(tmpl, this.props);
  }
}

describe('Component', () => {
  const component = new Component({ content: 'Test' });

  it('should render content', () => {
    expect(component.getContent().innerHTML).equals('Test');
  });

  it('should change content', () => {
    component.setProps({
      content: 'New test',
    });
    expect(component.getContent().innerHTML).equals('New test');
  });

});

