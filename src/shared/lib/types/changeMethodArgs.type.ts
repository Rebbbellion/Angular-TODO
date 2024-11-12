export type ChangeMethodArgs<
  T,
  WithArgs extends Partial<Record<keyof T, any[]>>
> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? WithArgs extends void
      ? T[K]
      : (...args: WithArgs[K] extends any[] ? WithArgs[K] : A) => R
    : T[K];
};
