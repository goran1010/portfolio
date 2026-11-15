import { useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "../customHooks/useLanguage";
import { ChevronDownIcon } from "./sharedComponents/icons";

const CV_LANGUAGES = [
  { code: "en", name: "English", lang: "en" },
  { code: "sr", name: "Srpski", lang: "sr-Latn" },
] as const;

function CvDownload() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const triggerId = useId();
  const optionsId = useId();

  useEffect(() => {
    if (!isOpen) return;

    function handleOutsidePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsidePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointerDown);
    };
  }, [isOpen]);

  function closeAndFocusTrigger() {
    triggerRef.current?.focus();
    setIsOpen(false);
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (isOpen && event.key === "Escape") {
          event.preventDefault();
          closeAndFocusTrigger();
        }
      }}
    >
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={optionsId}
        onClick={() => {
          setIsOpen((open) => !open);
        }}
        className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-(--accent) px-4 py-2.5 font-semibold text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--focus-ring)"
      >
        {t("hero.downloadCv")}
        <ChevronDownIcon />
      </button>
      <ul
        id={optionsId}
        aria-labelledby={triggerId}
        hidden={!isOpen}
        className="absolute top-full left-0 z-10 mt-2 min-w-48 rounded-md border border-(--border-color) bg-(--surface-popover) p-1 shadow-(--card-shadow)"
      >
        {CV_LANGUAGES.map(({ code, name, lang }) => (
          <li key={code}>
            <a
              href={`/Goran-Jovic-CV-${code}.pdf`}
              lang={lang}
              hrefLang={lang}
              download
              onClick={closeAndFocusTrigger}
              className="block rounded-sm px-3 py-2.5 text-(--text-primary) hover:bg-(--hover-surface) focus-visible:bg-(--hover-surface) focus-visible:outline-2 focus-visible:outline-(--focus-ring)"
            >
              {name} (PDF)
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { CvDownload };
