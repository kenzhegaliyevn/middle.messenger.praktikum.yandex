import Block from './block';

export default function compile(tmpl: (p: any) => string, props: any): DocumentFragment {
  const fragment = document.createElement('template');
  const components: Record<string, Block> = {};

  Object.entries(props).forEach(([key, value]) => {
    if (value instanceof Block) {
      components[value.getId()] = value;

      try {
        props[key] = `<div id="id-${value.getId()}"></div>`;
      } catch (err) {}
    }
    if (value instanceof Array) {
      const multiValues: string[] = [];
      Object.values(value).forEach((v) => {
        if (v instanceof Block) {
          components[v.getId()] = v;
          multiValues.push(`<div id="id-${v.getId()}"></div>`);
        }
      });
      if (multiValues.length) {
        props[key] = multiValues.join('');
      }
    }
  });

  fragment.innerHTML = tmpl(props);

  Object.entries(components).forEach(([id, component]) => {
    const stub = fragment.content.querySelector(`#id-${id}`);
    if (!stub) {
      return;
    }
    stub.replaceWith(component.getContent());
  });

  return fragment.content;
}
