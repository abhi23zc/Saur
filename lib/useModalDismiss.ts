import { useEffect } from "react";

/**
 * Shared modal behaviour: closes on Escape and locks body scroll while open.
 * Safe to call unconditionally (before any early return) to respect the
 * Rules of Hooks.
 */
export function useModalDismiss(active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [active, onClose]);
}
