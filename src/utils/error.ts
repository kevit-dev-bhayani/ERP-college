export const newError = (code: number, error: Error): Error => {
  return new Error(JSON.stringify({code, error}));
};
