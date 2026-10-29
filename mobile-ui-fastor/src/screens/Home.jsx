import { useMemo, useState } from "react";
import FoodImage from "../components/FoodImage.jsx";
import { bestSellerIds, getProduct, popularOrders, products } from "../data.js";

export default function Home({ onOpenProduct, cartCount = 0 }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? products.filter((p) => p.name.toLowerCase().includes(q)) : [];
  }, [query]);

  return (
    <div className="no-scrollbar flex-1 overflow-y-auto">
      {/* location */}
      <div className="px-4 pt-1">
        <p className="text-[10px] text-neutral-400">Current Locations</p>
        <p className="text-[12px] font-semibold">Model Town, New Delhi</p>
      </div>

      {/* search + actions */}
      <div className="mt-3 flex items-center gap-3 px-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search food"
          className="h-11 min-w-0 flex-1 rounded-lg bg-neutral-100 px-3 text-[14px] font-semibold text-neutral-700 outline-none placeholder:font-normal placeholder:text-neutral-400 focus:ring-2 focus:ring-brand/40"
        />
        <button className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-brand text-white" aria-label="Call">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.600-3.100 19.500 19.500 0 0 1-6-6A19.800 19.800 0 0 1 2.100 4.200 2 2 0 0 1 4.100 2h3a2 2 0 0 1 2 1.700c.1 1 .4 1.900.7 2.800a2 2 0 0 1-.5 2.100L8.100 9.900a16 16 0 0 0 6 6l1.300-1.300a2 2 0 0 1 2.100-.4c.9.300 1.800.6 2.800.7a2 2 0 0 1 1.700 2Z" />
          </svg>
        </button>
        <button className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-indigo-600 text-white" aria-label="Cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="6" width="20" height="14" rx="3" />
            <path d="M16 13h2M6 6V5a2 2 0 0 1 2-2h8" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white ring-2 ring-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {query.trim() ? (
        /* search results */
        <div className="px-4 pb-6">
          <h2 className="mt-6 text-[15px] font-extrabold">Results</h2>
          {results.length === 0 && (
            <p className="mt-3 text-sm text-neutral-500">No dishes found for “{query}”.</p>
          )}
          <div className="mt-3 space-y-3">
            {results.map((p) => (
              <button key={p.id} onClick={() => onOpenProduct(p.id)} className="flex w-full items-center gap-3 text-left">
                <FoodImage src={p.src} alt={p.name} emoji={p.emoji} className="h-14 w-14 rounded-xl" />
                <span className="flex-1 text-[14px] font-bold">{p.name}</span>
                <span className="text-[14px] font-bold text-brand">₹{p.price.toFixed(2)}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* best seller */}
          <h2 className="mt-6 px-4 text-[15px] font-extrabold">Best Seller</h2>
          <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-4">
            {bestSellerIds.map((id) => {
              const item = getProduct(id);
              return (
                <button
                  key={id}
                  onClick={() => onOpenProduct(id)}
                  className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl"
                  aria-label={item.name}
                >
                  <FoodImage src={item.src} alt={item.name} emoji={item.emoji} className="h-full w-full" />
                  <span className="absolute bottom-1 right-1 rounded-md bg-brand px-1.5 py-0.5 text-[9px] font-bold text-white">
                    ${item.price.toFixed(2)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* promo banner */}
          <button
            onClick={() => onOpenProduct("pizza")}
            className="relative mx-4 mt-4 flex h-[120px] w-[calc(100%-2rem)] overflow-hidden rounded-2xl bg-brand text-left"
          >
            <span className="absolute -left-3 top-3 h-8 w-8 rounded-full border-4 border-yellow-400/70" />
            <div className="z-10 flex w-1/2 flex-col justify-center pl-4 text-white">
              <p className="text-[10px] leading-3">Experience our delicious new dish</p>
              <p className="mt-1 text-[26px] font-extrabold leading-7">30% OFF</p>
            </div>
            <FoodImage
              src={getProduct("pizza").src}
              alt="Pizza"
              emoji="🍕"
              className="absolute -right-6 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full"
            />
          </button>
          <div className="mt-2 flex justify-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className={`h-1 rounded-full ${i === 2 ? "w-4 bg-brand" : "w-3 bg-brand/30"}`} />
            ))}
          </div>

          {/* popular */}
          <h2 className="mt-6 px-4 text-[15px] font-extrabold">Popular Items</h2>
          <div className="mt-3 space-y-4 px-4 pb-6">
            {popularOrders.map((o) => {
              const item = getProduct(o.productId);
              return (
                <div key={o.productId} className="flex gap-3">
                  <button onClick={() => onOpenProduct(item.id)} className="shrink-0">
                    <FoodImage src={item.src} alt={item.name} emoji={item.emoji} className="h-[78px] w-[64px] rounded-xl" />
                  </button>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <p className="text-[15px] font-bold">{item.name}</p>
                      <p className="text-[15px] font-bold text-brand">₹{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-neutral-500">
                      <span>{o.date}</span>
                      <span>{o.items}</span>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <button className="rounded-full bg-brand px-3 py-1 text-[10px] font-bold text-white">Cancel Order</button>
                      <button className="rounded-full bg-brand-light px-3 py-1 text-[10px] font-bold text-brand">Track Driver</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
