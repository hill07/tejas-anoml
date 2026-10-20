import { useDocumentTitle } from '../lib/useDocumentTitle';

export function Home() {
  useDocumentTitle();
  return (
    <main id="main" className="min-h-[100svh] bg-paper">
      <img
        src="/home.jpeg"
        alt="Anmol and Tejas"
        className="block h-auto w-full object-contain"
        decoding="async"
      />
    </main>
  );
}
