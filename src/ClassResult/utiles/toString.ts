export const toString = (val: unknown) => {
  const value = String(val);

  if (value === '[object Object]') {
    return JSON.stringify(val);
  }

  return value;
};
