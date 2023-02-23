declare global {
  export type Nullable<T> = T | null;
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
  export type TPropsWithEvents<T extends Record<string, unknown>> = T & {
    events?: TEvents;
  };
  export type TEvents = Record<
    Event["type"],
    | (((event: Event) => void) | undefined)
    | (((event: Event) => void) | undefined)[]
  >;
}

export {};
