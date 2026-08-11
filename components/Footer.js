export default function Footer({ lang, dict }) {
  const q = `?lang=${lang}`;
  return (
    <footer className="site-footer">
      <div className="container">
        <div>
          <a href={`/${q}`} className="brand">
            <img
              className="brand__mark"
              src="/images/logo-placeholder.svg"
              alt="Company logo"
              style={{ borderColor: "rgba(255,255,255,0.5)" }}
            />
            <span className="brand__name">{dict.brand.name}</span>
          </a>
          <p>{dict.footer.about}</p>
        </div>
        <div>
          <h4>{dict.footer.nav_heading}</h4>
          <ul>
            <li><a href={`/${q}`}>{dict.nav.home}</a></li>
            <li><a href={`/about${q}`}>{dict.nav.about}</a></li>
            <li><a href={`/products${q}`}>{dict.nav.products}</a></li>
            <li><a href={`/contact${q}`}>{dict.nav.contact}</a></li>
          </ul>
        </div>
        <div>
          <h4>{dict.footer.contact_heading}</h4>
          <ul>
            <li>{dict.topbar.address}</li>
            <li>{dict.topbar.phone}</li>
            <li>{dict.topbar.email}</li>
          </ul>
        </div>
        <div>
          <h4>{dict.footer.social_heading}</h4>
          <ul>
            <li><a href="#">[LinkedIn]</a></li>
            <li><a href="#">[Instagram]</a></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>{dict.footer.legal}</span>
        <span>Site by [Your Name / Agency]</span>
      </div>
    </footer>
  );
}
