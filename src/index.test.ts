import { describe, expect, test } from "vitest";
import { convertObjectKeysToCamelCase } from ".";

describe("JSON camelCase enforcement", () => {
  test("Convert snake_case to camelCase", () => {
    const result = convertObjectKeysToCamelCase({
      dog_name: "Fido",
    });
    expect(JSON.stringify(result)).toEqual(`{"dogName":"Fido"}`);
  });

  test("Convert PascalCase to camelCase", () => {
    const result = convertObjectKeysToCamelCase({
      DogName: "Fido",
    });
    expect(JSON.stringify(result)).toEqual(`{"dogName":"Fido"}`);
  });

  test("Convert recursive snake_case to camelCase", () => {
    const result = convertObjectKeysToCamelCase({
      dog_details: {
        dog_name: "Fido",
      },
    });
    expect(JSON.stringify(result)).toEqual(`{"dogDetails":{"dogName":"Fido"}}`);
  });

  test("Convert recursive PascalCase to camelCase", () => {
    const result = convertObjectKeysToCamelCase({
      DogDetails: {
        DogName: "Fido",
      },
    });
    expect(JSON.stringify(result)).toEqual(`{"dogDetails":{"dogName":"Fido"}}`);
  });

  test("Convert array snake_case to camelCase", () => {
    const result = convertObjectKeysToCamelCase({
      dogs: [
        {
          dog_name: "Fido",
        },
      ],
    });
    expect(JSON.stringify(result)).toEqual(`{"dogs":[{"dogName":"Fido"}]}`);
  });

  test("Convert array PascalCase to camelCase", () => {
    const result = convertObjectKeysToCamelCase({
      dogs: [
        {
          DogName: "Fido",
        },
      ],
    });
    expect(JSON.stringify(result)).toEqual(`{"dogs":[{"dogName":"Fido"}]}`);
  });
});
