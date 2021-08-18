export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discrimated union member: ${JSON.stringify(value)}`
  );
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};