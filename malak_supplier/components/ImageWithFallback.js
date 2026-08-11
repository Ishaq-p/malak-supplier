"use client";

import { useState } from "react";

export default function ImageWithFallback({ src, alt, className }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="placeholder-figure">
        Image placeholder
        <br />
        {src}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || ""}
      loading="lazy"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
