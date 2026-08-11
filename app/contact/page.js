import content from "@/data/content.json";
import { resolveLang } from "@/lib/lang";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({ searchParams }) {
  const lang = resolveLang(await searchParams);
  const dict = content[lang];
  return { title: `${dict.contact_page.hero_heading} — ${dict.brand.name}`, description: dict.meta.description };
}

export default async function ContactPage({ searchParams }) {
  const lang = resolveLang(await searchParams);
  const dict = content[lang];
  const page = dict.contact_page;

  const infoRows = [
    [page.info.address_label, dict.topbar.address],
    [page.info.phone_label, dict.topbar.phone],
    [page.info.email_label, dict.topbar.email],
    [page.info.hours_label, dict.topbar.hours],
  ];

  return (
    <>
      <Header lang={lang} dict={dict} />

      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <a href={`/?lang=${lang}`}>{dict.nav.home}</a> / <span>{dict.nav.contact}</span>
          </div>
          <h1>{page.hero_heading}</h1>
          <p>{page.hero_sub}</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div>
            <h2 style={{ fontSize: 24, marginBottom: 22 }}>{page.form_heading}</h2>
            <ContactForm copy={page.form} />
          </div>

          <div>
            <h2 style={{ fontSize: 24, marginBottom: 22 }}>{page.info_heading}</h2>
            <div className="info-card">
              {infoRows.map(([label, value]) => (
                <div className="info-card__row" key={label}>
                  <div>
                    <div className="info-card__label">{label}</div>
                    <div className="info-card__value">{value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="map-frame">
              {/*
                Replace this src with your real Google Maps embed URL:
                Google Maps → Share → Embed a map → copy the src="..." value.
              */}
              <iframe
                src="https://www.google.com/maps?q=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location map"
              />
            </div>
            <p className="map-note">{page.map_note}</p>
          </div>
        </div>
      </section>

      <Footer lang={lang} dict={dict} />
    </>
  );
}
