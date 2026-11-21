import Image from "next/image";

/** Wordmark grup: simbol resmi Citramas (dari logo PT Citramas Alfa Sejahtera) + teks "CITRAMAS / Corporate Group". */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Image src="/cas/symbol.png" alt="" width={172} height={59} quality={85} className="h-6 w-auto" />
      <span className="flex flex-col leading-none">
        <span className="text-lg font-semibold tracking-[0.18em]">CITRAMAS</span>
        <span className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.3em] opacity-60">Corporate Group</span>
      </span>
    </span>
  );
}
