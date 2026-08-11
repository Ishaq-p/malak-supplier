import content from "@/data/content.json";
import { resolveLang } from "@/lib/lang";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import ProductCatalogue from "@/components/ProductCatalogue";

export async function generateMetadata({ searchParams }) {
  const lang = resolveLang(await searchParams);
  const dict = content[lang];
  return { title: `${dict.products_page.hero_heading} — ${dict.brand.name}`, description: dict.meta.description };
}

export default async function ProductsPage({ searchParams }) {
  const lang = resolveLang(await searchParams);
  const dict = content[lang];
  const page = dict.products_page;

  return (
    <>
      <Header lang={lang} dict={dict} />

      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <a href={`/?lang=${lang}`}>{dict.nav.home}</a> / <span>{dict.nav.products}</span>
          </div>
          <h1>{page.hero_heading}</h1>
          <p>{page.hero_sub}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ProductCatalogue
            items={page.items}
            filterAllLabel={page.filter_all}
            sampleBadgeText={page.sample_badge}
          />
        </div>
      </section>

      <CtaBand lang={lang} dict={dict} />
      <Footer lang={lang} dict={dict} />
    </>
  );
}
