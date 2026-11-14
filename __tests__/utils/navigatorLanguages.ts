const originalLanguages = navigator.languages;

function setNavigatorLanguages(languages: string[]) {
  Object.defineProperty(window.navigator, "languages", {
    value: languages,
    configurable: true,
  });
}

function restoreNavigatorLanguages() {
  setNavigatorLanguages([...originalLanguages]);
}

export { setNavigatorLanguages, restoreNavigatorLanguages };
