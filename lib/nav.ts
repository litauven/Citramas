export const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/companies", key: "companies" },
  { href: "/business-areas", key: "businessAreas" },
  { href: "/brands", key: "brands" },
  { href: "/clients", key: "clients" },
  { href: "/careers", key: "careers" },
  { href: "/contact", key: "contact" },
] as const;

export type NavKey = (typeof NAV_ITEMS)[number]["key"];
