import en from "../../src/locales/en.json";
import sr from "../../src/locales/sr.json";

import type { TranslationMap } from "../../src/utils/language";

function flatten(map: TranslationMap, prefix = ""): [string, string][] {
  return Object.entries(map).flatMap(([key, value]) =>
    typeof value === "string"
      ? [[`${prefix}${key}`, value] as [string, string]]
      : flatten(value, `${prefix}${key}.`),
  );
}

function keyPaths(map: TranslationMap) {
  return flatten(map)
    .map(([path]) => path)
    .sort();
}

describe("locales", () => {
  test("sr.json has exactly the keys of en.json", () => {
    expect(keyPaths(sr)).toEqual(keyPaths(en));
  });

  test.each([
    ["en", en],
    ["sr", sr],
  ])("%s.json has no empty strings", (_, locale) => {
    for (const [path, value] of flatten(locale)) {
      expect(value.trim(), path).not.toBe("");
    }
  });
});
