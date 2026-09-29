import { useEffect } from 'react';

const DEFAULT_TITLE = 'Anmol & Tejas — 30 June 2027, Malta';

/** Sets the tab title (and description) for the current page. */
export function useDocumentTitle(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — Anmol & Tejas` : DEFAULT_TITLE;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
  }, [title, description]);
}
