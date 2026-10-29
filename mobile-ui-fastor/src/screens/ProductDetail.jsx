import { useState } from "react";
import FoodImage from "../components/FoodImage.jsx";
import { getProduct, portions } from "../data.js";

export default function ProductDetail({ productId, onBack, onAdd }) {
  const product = getProduct(productId);
  const [qty, setQty] = useState(1);
  const [portion, setPortion] = useState(0);

  const unit = product.price + portions[portion].extra;
  const total = unit * qty;

  return (
    <>
      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pt-2">
        <div className="relative">
          <FoodImage
            src={product.src}
            alt={product.name}
            emoji={product.emoji}
            className="h-[200px] w-full rounded-[28px]"
          />
          <button
            onClick={onBack}
            aria-label="Back"
            className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-brand shadow"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5m6-6-6 6 6 6" />
            </svg>
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-3">
          <span className="text-[22px] font-extrabold text-brand">₹{unit.toFixed(2)}</span>
          <div className="flex items-center gap-3">
            <button
              aria-label="Decrease"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white"
            >
              <span className="-mt-0.5 text-sm leading-none">−</span>
            </button>
            <span className="w-3 text-center text-[15px] font-bold">{qty}</span>
            <button
              aria-label="Increase"
              onClick={() => setQty((q) => q + 1)}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white"
            >
              <span className="-mt-0.5 text-sm leading-none">+</span>
            </button>
          </div>
        </div>

        <h2 className="mt-4 border-b border-neutral-200 pb-2 text-[16px] font-extrabold text-neutral-800">
          {product.name}
        </h2>
        <p className="mt-2 text-[11px] leading-4 text-neutral-600">{product.description}</p>

        <h3 className="mt-6 text-[16px] font-extrabold">Personal portion</h3>
        <ul className="mt-3 space-y-3 pb-4">
          {portions.map((p, i) => (
            <li key={p.label}>
              <label className="flex cursor-pointer items-center justify-between border-b border-orange-100 pb-2 text-[11px] text-neutral-600">
                <span>{p.label}</span>
                <span className="flex items-center gap-3">
                  <span>${p.extra.toFixed(2)}</span>
                  <input
                    type="radio"
                    name="portion"
                    checked={portion === i}
                    onChange={() => setPortion(i)}
                    className="h-4 w-4 accent-brand"
                  />
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-4 pb-4 pt-3">
        <button
          onClick={() =>
            onAdd({
              id: product.id,
              name: product.name,
              qty,
              portion: portions[portion].label,
              total,
            })
          }
          className="h-12 w-full rounded-lg bg-brand text-[15px] font-bold text-white active:scale-[0.99]"
        >
          Add to cart · ₹{total.toFixed(2)}
        </button>
        <div className="mx-auto mt-4 h-1 w-32 rounded-full bg-black" />
      </div>
    </>
  );
}
