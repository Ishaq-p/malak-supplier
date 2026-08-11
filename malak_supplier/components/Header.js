"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
  { key: "contact", href: "/contact" },
];

function withLang(href, lang) {
  return `${href}?lang=${lang}`;
}

export default function Header({ lang, dict }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="topbar__info">
            <a href="tel:">{dict.topbar.phone}</a>
            <a href="mailto:">{dict.topbar.email}</a>
            <span>{dict.topbar.address}</span>
          </div>
          <div className="topbar__lang">
            <Link href={withLang(pathname, "en")} aria-current={lang === "en"}>EN</Link>
            <Link href={withLang(pathname, "tr")} aria-current={lang === "tr"}>TR</Link>
          </div>
        </div>
      </div>

      <header className={`site-header${isOpen ? " is-open" : ""}`}>
        <div className="container">
          <Link href={withLang("/", lang)} className="brand">
            <img className="brand__mark" src="/images/logo-placeholder.svg" alt="Company logo" style={{ border: "none" }} />
            <span className="brand__name">{dict.brand.name}</span>
          </Link>

          <nav className="nav-main">
            <ul className="nav-main__list">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={withLang(item.href, lang)}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {dict.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
            <Link className="btn btn--dark nav-main__cta" href={withLang("/contact", lang)}>
              {dict.nav.cta}
            </Link>
          </nav>

          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </header>
    </>
  );
}
