declare module '*.hbs' {
  const templateFunction: (param?: unknown) => string;
  export default templateFunction;
}

declare module '*.handlebars' {
  const templateFunction: (param?: unknown) => string;
  export default templateFunction;
}
