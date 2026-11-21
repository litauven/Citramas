/** Lencana teks melingkar yang berputar perlahan. */
export function RotatingBadge({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`relative grid size-32 place-items-center ${className}`} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="animate-spin-slow absolute inset-0 size-full">
        <defs>
          <path id="badge-circle" d="M60,60 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0" />
        </defs>
        <text className="fill-current font-mono text-[9.5px] uppercase tracking-[0.32em]">
          <textPath href="#badge-circle">{text.repeat(2)}</textPath>
        </text>
      </svg>
      <span className="grid size-12 place-items-center rounded-full bg-accent text-paper">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
        </svg>
      </span>
    </div>
  );
}
