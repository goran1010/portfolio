import {
  getSystemLanguage,
  isLanguage,
  readStoredLanguage,
  translate,
  writeStoredLanguage,
} from "../../../src/utils/language";
import {
  restoreNavigatorLanguages,
  setNavigatorLanguages,
} from "../../utils/navigatorLanguages";

import type { TranslationKey } from "../../../src/utils/language";

afterEach(() => {
  restoreNavigatorLanguages();
  vi.restoreAllMocks();
});

describe("getSystemLanguage", () => {
  test("returns en when the browser prefers English", () => {
    setNavigatorLanguages(["en-US"]);

    expect(getSystemLanguage()).toBe("en");
  });

  test("returns sr when the browser prefers Serbian", () => {
    setNavigatorLanguages(["sr-Latn"]);

    expect(getSystemLanguage()).toBe("sr");
  });

  test.each(["bs", "bs-BA", "hr", "hr-HR", "cnr", "cnr-ME"])(
    "maps browser locale %s to the sr bundle",
    (locale) => {
      setNavigatorLanguages([locale]);

      expect(getSystemLanguage()).toBe("sr");
    },
  );

  test("takes the first preference the site has a bundle for", () => {
    setNavigatorLanguages(["de-DE", "hr-HR", "en"]);
    expect(getSystemLanguage()).toBe("sr");

    setNavigatorLanguages(["de-DE", "en-GB", "sr"]);
    expect(getSystemLanguage()).toBe("en");
  });

  test("falls back to en when no preference has a bundle", () => {
    setNavigatorLanguages(["fr-FR", "de"]);

    expect(getSystemLanguage()).toBe("en");
  });
});

describe("isLanguage", () => {
  test.each(["system", "en", "sr"])("accepts %s", (value) => {
    expect(isLanguage(value)).toBe(true);
  });

  test.each(["", "bs", "EN", null, undefined, 1])("rejects %s", (value) => {
    expect(isLanguage(value)).toBe(false);
  });
});

describe("readStoredLanguage", () => {
  test("returns the stored language when it is valid", () => {
    localStorage.setItem("language", "sr");

    expect(readStoredLanguage()).toBe("sr");
  });

  test("falls back to system when nothing is stored", () => {
    expect(readStoredLanguage()).toBe("system");
  });

  test("falls back to system when the stored value is invalid", () => {
    localStorage.setItem("language", "garbage");

    expect(readStoredLanguage()).toBe("system");
  });

  test("falls back to system and warns when localStorage throws", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("storage denied");
    });

    expect(readStoredLanguage()).toBe("system");
    expect(warn).toHaveBeenCalledOnce();
  });
});

describe("writeStoredLanguage", () => {
  test("stores en and sr", () => {
    writeStoredLanguage("sr");
    expect(localStorage.getItem("language")).toBe("sr");

    writeStoredLanguage("en");
    expect(localStorage.getItem("language")).toBe("en");
  });

  test("removes the key for system", () => {
    localStorage.setItem("language", "sr");

    writeStoredLanguage("system");

    expect(localStorage.getItem("language")).toBeNull();
  });

  test("warns instead of throwing when localStorage throws", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("storage denied");
    });

    expect(() => {
      writeStoredLanguage("sr");
    }).not.toThrow();
    expect(warn).toHaveBeenCalledOnce();
  });
});

describe("translate", () => {
  test("returns the string for the given language", () => {
    expect(translate("en", "theme.dark")).toBe("Dark");
    expect(translate("sr", "theme.dark")).toBe("Tamna");
  });

  test("returns the key when it does not lead to a string", () => {
    expect(translate("en", "theme" as string as TranslationKey)).toBe("theme");
  });
});
