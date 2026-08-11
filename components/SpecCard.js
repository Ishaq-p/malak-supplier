import ImageWithFallback from "./ImageWithFallback";

export function CategoryCard({ item }) {
  return (
    <div className="spec-card">
      <div className="spec-card__figure">
        <ImageWithFallback src={item.image} alt={item.name} />
      </div>
      <div className="spec-card__body">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </div>
    </div>
  );
}

export function ProductCard({ item, sampleBadgeText, showSampleBadge = true }) {
  return (
    <div className="spec-card" data-category={item.category} style={{ overflow: "hidden" }}>
      {showSampleBadge && <span className="sample-badge">{sampleBadgeText}</span>}
      <div className="spec-card__ref">
        <span>{item.code}</span>
        <span className="stamp">CoA</span>
      </div>
      <div className="spec-card__figure">
        <ImageWithFallback src={item.image} alt={item.name} />
      </div>
      <div className="spec-card__body">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="spec-card__meta">
          <span>{item.category}</span>
          <span>CAS {item.cas}</span>
        </div>
      </div>
    </div>
  );
}
