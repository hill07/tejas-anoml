import { useEffect } from 'react';
import { couple, defaultSiteTitle } from '../data/wedding';

/** Sets the tab title (and description) for the current page. */
export function useDocumentTitle(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${couple.names}` : defaultSiteTitle;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
  }, [title, description]);
}
