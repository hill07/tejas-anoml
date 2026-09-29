import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const KEY = 'at-install-dismissed';

function dismissedBefore() {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * "Add to Home Screen" banner. It only appears when the browser can actually install
 * the site (Chrome/Edge/Android fire `beforeinstallprompt`), or on iPhone Safari,
 * where it explains the Share → Add to Home Screen steps instead.
 */
export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [iosHint, setIosHint] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (dismissedBefore()) return;
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone) return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      window.setTimeout(() => setOpen(true), 2500);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);

    const ua = navigator.userAgent;
    const isIos = /iPhone|iPad|iPod/.test(ua) && /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
    let t: number | undefined;
    if (isIos) {
      setIosHint(true);
      t = window.setTimeout(() => setOpen(true), 2500);
    }
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      if (t) window.clearTimeout(t);
    };
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, '1');
    } catch {
      /* private mode — ignore */
    }
    setOpen(false);
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    dismiss();
  };

  if (!open || (!deferred && !iosHint)) return null;

  return (
    <div className="fixed inset-x-0 bottom-[calc(var(--nav-h)+max(env(safe-area-inset-bottom),0.6rem)+0.5rem)] z-50 flex justify-center px-3 animate-rise">
      <div
        role="dialog"
        aria-label="Install this site"
        className="flex w-full max-w-md items-center gap-3 rounded-2xl px-4 py-3 shadow-[0_20px_60px_-20px_rgba(120,60,60,0.45)] ring-1 ring-[hsl(var(--gold-deep)/0.3)]"
        style={{ background: 'linear-gradient(180deg,#fbf3e3 0%,#f3e6cc 100%)' }}
      >
        <img src="/icons/icon-192.png" alt="" className="h-11 w-11 shrink-0 rounded-xl ring-1 ring-white/70" />
        <div className="min-w-0 flex-1">
          <p className="font-serif text-[15px] leading-snug text-maroon-deep">Add A &amp; T Forever to your Home Screen</p>
          {!deferred && iosHint ? (
            <p className="mt-0.5 font-serif text-[13px] italic text-maroon/80">Tap Share, then “Add to Home Screen”</p>
          ) : null}
        </div>
        {deferred ? (
          <button onClick={install} className="btn-primary shrink-0 px-3 py-2 text-[11px]">
            Install
          </button>
        ) : null}
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-xl text-maroon hover:bg-white/50"
        >
          ×
        </button>
      </div>
    </div>
  );
}
