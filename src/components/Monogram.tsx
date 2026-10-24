import mono160 from '../assets/monogram-160.webp';
import mono480 from '../assets/monogram-480.webp';
import { couple } from '../data/wedding';

/** The couple's monogram (A & T), served responsively. */
export function Monogram({ className = '', sizes = '160px', alt = `${couple.namesInProse} monogram`, eager = false }: {
  className?: string;
  sizes?: string;
  alt?: string;
  eager?: boolean;
}) {
  return (
    <img
      src={mono480}
      srcSet={`${mono160} 160w, ${mono480} 480w`}
      sizes={sizes}
      alt={alt}
      width={480}
      height={480}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      className={`select-none ${className}`}
    />
  );
}
