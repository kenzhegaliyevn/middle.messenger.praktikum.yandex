import Block from './block';

export function renderDOM(query: string, block: Block<any>) {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error('Root element not found');
  }

  root.innerHTML = '';
 // block.element.removeAttribute('style');
  root.appendChild(block.getContent());

  return root;
}
