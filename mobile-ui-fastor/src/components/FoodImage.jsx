import { useState } from "react";

/**
 * Image with an emoji fallback so the layout never breaks
 * if a remote photo fails to load (or you are offline).
 */
export default function FoodImage({ src, alt = "", emoji = "🍕", className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300 ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="text-3xl">{emoji}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
