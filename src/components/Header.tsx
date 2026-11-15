import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { useLanguage } from "../customHooks/useLanguage";
import { SECTION_IDS } from "../data/sections";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { CloseIcon, MenuIcon } from "./sharedComponents/icons";

const DESKTOP_MEDIA_QUERY = "(min-width: 48rem)";

function Header() {
  const { t } = useLanguage();
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia(DESKTOP_MEDIA_QUERY).matches,
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const resizeFocusRef = useRef<"toggle" | "navigation" | null>(null);
  const navigationId = useId();

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_MEDIA_QUERY);

    function handleBreakpointChange(event: MediaQueryListEvent) {
      const focused = document.activeElement;
      if (event.matches && focused === toggleRef.current) {
        resizeFocusRef.current = "navigation";
      } else if (!event.matches && navigationRef.current?.contains(focused)) {
        resizeFocusRef.current = "toggle";
      }
      setIsDesktop(event.matches);
      setIsMenuOpen(false);
    }

    media.addEventListener("change", handleBreakpointChange);
    return () => {
      media.removeEventListener("change", handleBreakpointChange);
    };
  }, []);

  useLayoutEffect(() => {
    if (resizeFocusRef.current === "navigation") {
      navigationRef.current?.querySelector("a")?.focus({ preventScroll: true });
    } else if (resizeFocusRef.current === "toggle") {
      toggleRef.current?.focus({ preventScroll: true });
    }
    resizeFocusRef.current = null;
  }, [isDesktop]);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleOutsidePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        if (navigationRef.current?.contains(document.activeElement)) {
          toggleRef.current?.focus({ preventScroll: true });
        }
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsidePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointerDown);
    };
  }, [isMenuOpen]);

  return (
    <header
      ref={headerRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsMenuOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (isMenuOpen && event.key === "Escape") {
          event.preventDefault();
          toggleRef.current?.focus();
          setIsMenuOpen(false);
        }
      }}
      className="relative mx-auto grid w-full max-w-5xl grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-x-2 p-4 sm:px-6 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-x-4"
    >
      <div className="col-start-1 row-start-1">
        <ThemeSwitcher />
      </div>
      {!isDesktop && (
        <button
          ref={toggleRef}
          type="button"
          aria-label={t(isMenuOpen ? "nav.closeMenu" : "nav.openMenu")}
          aria-expanded={isMenuOpen}
          aria-controls={navigationId}
          onClick={() => {
            setIsMenuOpen((open) => !open);
          }}
          className="col-start-3 row-start-1 inline-flex cursor-pointer items-center justify-center rounded-md border border-(--border-color) bg-(--surface-1) p-2 text-(--text-primary) shadow-(--card-shadow-soft) hover:bg-(--hover-surface) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring)"
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      )}
      <nav
        ref={navigationRef}
        id={navigationId}
        aria-label={t("nav.label")}
        hidden={!isDesktop && !isMenuOpen}
        className="absolute top-full right-4 left-4 z-20 rounded-md border border-(--border-color) bg-(--surface-popover) p-2 shadow-(--card-shadow) sm:right-6 sm:left-6 md:static md:col-start-2 md:row-start-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none"
      >
        <ul className="flex flex-col gap-1 text-sm font-medium md:flex-row md:flex-wrap md:justify-center md:gap-x-5 md:gap-y-1">
          {SECTION_IDS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className="block rounded-sm px-3 py-2.5 underline-offset-4 transition-colors hover:bg-(--hover-surface) hover:text-(--accent-text) hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring) md:p-0 md:hover:bg-transparent"
              >
                {t(`sections.${id}`)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="col-start-4 row-start-1 md:col-start-3">
        <LanguageSwitcher />
      </div>
    </header>
  );
}

export { Header };
