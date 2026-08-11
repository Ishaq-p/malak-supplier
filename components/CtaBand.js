import Link from "next/link";

export default function CtaBand({ lang, dict }) {
  return (
    <section className="cta-band">
      <div className="container">
        <div>
          <h2>{dict.cta_band.heading}</h2>
          <p>{dict.cta_band.body}</p>
        </div>
        <Link className="btn btn--primary" href={`/contact?lang=${lang}`}>
          {dict.cta_band.cta}
        </Link>
      </div>
    </section>
  );
}
