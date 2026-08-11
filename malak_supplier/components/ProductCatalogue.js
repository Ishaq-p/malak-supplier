"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "./SpecCard";

export default function ProductCatalogue({ items, filterAllLabel, sampleBadgeText }) {
  const categories = useMemo(
    () => [filterAllLabel, ...Array.from(new Set(items.map((i) => i.category)))],
    [items, filterAllLabel]
  );
  const [active, setActive] = useState(filterAllLabel);

  const visible = active === filterAllLabel ? items : items.filter((i) => i.category === active);

  return (
    <>
      <div className="filters">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={active === cat ? "is-active" : ""}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid--3">
        {visible.map((item, i) => (
          <ProductCard key={`${item.name}-${i}`} item={item} sampleBadgeText={sampleBadgeText} />
        ))}
      </div>
    </>
  );
}
