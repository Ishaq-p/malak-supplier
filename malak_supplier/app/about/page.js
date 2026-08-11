import content from "@/data/content.json";
import { resolveLang } from "@/lib/lang";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";

export async function generateMetadata({ searchParams }) {
  const lang = resolveLang(await searchParams);
  const dict = content[lang];
  return { title: `${dict.about_page.hero_heading} — ${dict.brand.name}`, description: dict.meta.description };
}

export default async function AboutPage({ searchParams }) {
  const lang = resolveLang(await searchParams);
  const dict = content[lang];
  const page = dict.about_page;

  return (
    <>
      <Header lang={lang} dict={dict} />

      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <a href={`/?lang=${lang}`}>{dict.nav.home}</a> / <span>{dict.nav.about}</span>
          </div>
          <h1>{page.hero_heading}</h1>
          <p>{page.hero_sub}</p>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div className="two-col__figure">
            <div className="placeholder-figure">
              Facility / team photo placeholder
              <br />
              /images/about-story-placeholder.jpg
            </div>
          </div>
          <div className="two-col__body">
            <div className="eyebrow">{page.story_heading}</div>
            <h2>{page.story_heading}</h2>
            {page.story_body.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">{page.values_heading}</div>
            <h2>{page.values_heading}</h2>
          </div>
          <div className="grid grid--3 values-grid">
            {page.values.map((v, i) => (
              <div className="value-card" key={i}>
                <div className="value-card__num">0{i + 1}</div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="section-head">
            <div className="eyebrow">{page.milestones_heading}</div>
            <h2>{page.milestones_heading}</h2>
          </div>
          <div className="timeline">
            {page.milestones.map((m, i) => (
              <div className="timeline__item" key={i}>
                <div className="timeline__year">{m.year}</div>
                <p>{m.text}</p>
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
