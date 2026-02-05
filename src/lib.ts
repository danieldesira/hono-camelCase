export const convertObjectKeysToCamelCase = (
  data: Record<string, unknown> | Array<unknown>,
): Record<string, unknown> | Array<unknown> => {
  if (Array.isArray(data)) {
    return data.map(convertCurrentValue);
  } else {
    const transformedData: Record<string, unknown> = {};
    for (const key in data) {
      transformedData[convertKeyToCamelCase(key)] = convertCurrentValue(
        data[key],
      );
    }
    return transformedData;
  }
};

const convertKeyToCamelCase = (key: string) =>
  key
    .split("_")
    .map((part, index) =>
      index
        ? `${part[0].toUpperCase()}${part.substring(1)}`
        : `${part[0].toLowerCase()}${part.substring(1)}`,
    )
    .join("");

const convertCurrentValue = (value: unknown) =>
  typeof value === "object" && value !== null
    ? convertObjectKeysToCamelCase(value as Record<string, unknown>)
    : value;
