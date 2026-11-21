// Fallback global (di luar segmen locale) — mis. path yang tidak lolos proxy.
export default function GlobalNotFound() {
  return (
    <html lang="id">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "4rem 1.5rem", background: "#080808", color: "#f2f1f1" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 500 }}>404</h1>
        {/* Di luar segmen locale tidak ada router next-intl; tautan biasa disengaja. */}
        {/* eslint-disable @next/next/no-html-link-for-pages */}
        <p>
          <a href="/id" style={{ color: "#e08a4e" }}>Beranda (ID)</a> · <a href="/en" style={{ color: "#e08a4e" }}>Home (EN)</a>
        </p>
      </body>
    </html>
  );
}
