/** Invite artwork, in carousel order. Loaded before the schedule cards paint. */
export const INVITE_PHOTOS = [
  '/optimized/mehndi.webp',
  '/optimized/haldi.webp',
  '/optimized/wedding.webp',
  '/optimized/reception.webp',
] as const;

const ready = new Set<string>();
const pending = new Map<string, Promise<boolean>>();

function load(src: string): Promise<boolean> {
  const existing = pending.get(src);
  if (existing) return existing;

  const task = new Promise<boolean>((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    const finish = (ok: boolean) => {
      if (ok) ready.add(src);
      resolve(ok);
    };
    img.onload = () => {
      const decoded = img.decode?.();
      if (decoded) decoded.then(() => finish(true), () => finish(true));
      else finish(true);
    };
    img.onerror = () => finish(false);
    img.src = src;
  });
  pending.set(src, task);
  return task;
}

/** Start fetching invite art as early as the app boots. */
export function primeInvitePhotos() {
  for (const src of INVITE_PHOTOS) void load(src);
}

export function invitePhotoReady(src: string) {
  return ready.has(src);
}

export function whenInvitePhotoReady(src: string) {
  return load(src);
}
