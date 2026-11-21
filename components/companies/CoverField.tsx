import Image from "next/image";

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * Cover perusahaan. Bila coverImage belum ada, tampil bidang gradien abstrak yang
 * deterministik per slug (dekoratif, bukan foto perusahaan).
 */
export function CoverField({ seed, image, alt = "", className = "", preload = false }: { seed: string; image?: string | null; alt?: string; className?: string; preload?: boolean }) {
  // `absolute` dari pemanggil tidak boleh bentrok dengan `relative` default.
  const pos = /\b(absolute|fixed)\b/.test(className) ? "" : "relative";
  if (image) {
    return (
      <div className={`${pos} overflow-hidden ${className}`}>
        <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" quality={85} preload={preload} className="object-cover" />
      </div>
    );
  }
  const h = hash(seed);
  const x = 15 + (h % 60);
  const y = 10 + ((h >> 3) % 70);
  const rot = (h >> 5) % 360;
  return (
    <div className={`grain ${pos} overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="field absolute -inset-1/4"
        style={{ backgroundPosition: `${x}% ${y}%`, transform: `rotate(${rot}deg)` }}
      />
      <div className="lines absolute inset-0 opacity-60" />
    </div>
  );
}
