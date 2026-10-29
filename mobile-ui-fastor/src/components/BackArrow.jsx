export default function BackArrow({ onClick }) {
  return (
    <button type="button" onClick={onClick} aria-label="Back" className="text-brand">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5m6-6-6 6 6 6" />
      </svg>
    </button>
  );
}
