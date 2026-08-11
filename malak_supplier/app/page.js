import content from "@/data/content.json";
import { resolveLang } from "@/lib/lang";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import ImageWithFallback from "@/components/ImageWithFallback";
import { CategoryCard } from "@/components/SpecCard";

export async function generateMetadata({ searchParams }) {
  const lang = resolveLang(await searchParams);
  const dict = content[lang];
  return { title: dict.meta.title, description: dict.meta.description };
}

export default async function HomePage({ searchParams }) {
  const lang = resolveLang(await searchParams);
  const dict = content[lang];

  return (
    <>
      <Header lang={lang} dict={dict} />

      <section className="hero">
        <div className="container">
          <div className="hero__content">
            <div className="eyebrow hero__eyebrow">{dict.hero.eyebrow}</div>
            <h1>{dict.hero.headline}</h1>
            <p className="hero__sub">{dict.hero.subhead}</p>
            <div className="hero__actions">
              <a className="btn btn--primary" href={`/products?lang=${lang}`}>{dict.hero.cta_primary}</a>
              <a className="btn btn--ghost" href={`/contact?lang=${lang}`}>{dict.hero.cta_secondary}</a>
            </div>
          </div>
          <figure className="hero__figure">
            <ImageWithFallback src={dict.hero.image} alt={dict.hero.image_alt} />
          </figure>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container">
          {dict.trust_strip.map((t, i) => (
            <div className="trust-strip__item" key={i}>
              <div className="trust-strip__stat">{t.stat}</div>
              <div className="trust-strip__label">{t.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div className="two-col__figure">
            <ImageWithFallback src={dict.about_preview.image} alt={dict.about_preview.image_alt} />
          </div>
          <div className="two-col__body">
            <div className="eyebrow">{dict.about_preview.eyebrow}</div>
            <h2>{dict.about_preview.heading}</h2>
            <p>{dict.about_preview.body}</p>
            <a className="btn btn--ghost" href={`/about?lang=${lang}`}>{dict.about_preview.link}</a>
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">{dict.categories.eyebrow}</div>
            <h2>{dict.categories.heading}</h2>
            <p>{dict.categories.sub}</p>
          </div>
          <div className="grid grid--4">
            {dict.categories.items.map((item, i) => (
              <CategoryCard item={item} key={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col two-col--rev">
          <div className="two-col__figure placeholder-figure" style={{ aspectRatio: "5/4" }}>
            Certification / lab imagery placeholder
          </div>
          <div className="two-col__body">
            <div className="eyebrow">{dict.quality.eyebrow}</div>
            <h2>{dict.quality.heading}</h2>
            <p>{dict.quality.body}</p>
            <ul className="points-list">
              {dict.quality.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">{dict.process.eyebrow}</div>
            <h2>{dict.process.heading}</h2>
          </div>
          <div className="process-steps">
            {dict.process.steps.map((s, i) => (
              <div className="process-steps__step" key={i}>
                <div className="process-steps__num">0{i + 1}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand lang={lang} dict={dict} />
      <Footer lang={lang} dict={dict} />
    </>
  );
}
