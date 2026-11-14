import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageProvider } from "../../src/contextData/LanguageProvider";
import { ThemeProvider } from "../../src/contextData/ThemeProvider";

import type { ReactNode } from "react";

function renderWithProviders(ui: ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(
      <ThemeProvider>
        <LanguageProvider>{ui}</LanguageProvider>
      </ThemeProvider>,
    ),
  };
}

export { renderWithProviders };
