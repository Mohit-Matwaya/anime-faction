export const sw = (cond: number | string) => (cases: Object): JSX.Element =>
  cases[cond];
