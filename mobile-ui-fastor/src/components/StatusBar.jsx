export default function StatusBar() {
  return (
    <div className="flex h-11 items-center justify-between px-6 pt-1 text-[15px] font-semibold">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        {/* signal */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="0.8" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" />
          <rect x="10" y="3" width="3" height="9" rx="0.8" />
          <rect x="15" y="0" width="3" height="12" rx="0.8" />
        </svg>
        {/* wifi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 2.2c2.2 0 4.2.9 5.7 2.3l1-1.1A9.6 9.6 0 0 0 8 .7 9.6 9.6 0 0 0 1.300 3.400l1 1.100A8 8 0 0 1 8 2.200Z" />
          <path d="M8 5.600c1.300 0 2.500.5 3.400 1.300l1-1.100A6.700 6.700 0 0 0 8 4.100c-1.700 0-3.300.6-4.400 1.700l1 1.100c.9-.8 2.100-1.300 3.400-1.300Z" />
          <circle cx="8" cy="9.600" r="1.600" />
        </svg>
        {/* battery */}
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="19" height="8" rx="1.8" fill="currentColor" />
          <rect x="24" y="4" width="1.6" height="4" rx="0.8" fill="currentColor" opacity="0.5" />
        </svg>
      </div>
    </div>
  );
}
