import Block from './block';

export function renderDOM(query: string, block: Block) {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error('Root element not found');
  }

  root.innerHTML = '';
  root.appendChild(block.getContent());

  return root;
}
