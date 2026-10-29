const KEYS = [
  ["1", ""],
  ["2", "ABC"],
  ["3", "DEF"],
  ["4", "GHI"],
  ["5", "JKL"],
  ["6", "MNO"],
  ["7", "PQRS"],
  ["8", "TUV"],
  ["9", "WXYZ"],
];

function Key({ children, onClick, ghost = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[46px] flex-col items-center justify-center rounded-[5px] ${
        ghost ? "" : "bg-white shadow-[0_1px_0_rgba(0,0,0,0.3)] active:bg-neutral-200"
      }`}
    >
      {children}
    </button>
  );
}

export default function Keypad({ onDigit, onDelete }) {
  return (
    <div className="mt-auto bg-[#D1D4D9] px-[6px] pb-8 pt-2">
      <div className="grid grid-cols-3 gap-x-[6px] gap-y-[8px]">
        {KEYS.map(([d, letters]) => (
          <Key key={d} onClick={() => onDigit?.(d)}>
            <span className="text-[22px] leading-6">{d}</span>
            <span className="text-[9px] font-semibold leading-3 tracking-widest text-neutral-700">
              {letters || " "}
            </span>
          </Key>
        ))}
        <span />
        <Key onClick={() => onDigit?.("0")}>
          <span className="text-[22px]">0</span>
        </Key>
        <Key ghost onClick={onDelete}>
          <svg width="24" height="18" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
            <path d="M8 1h13a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8L1 9l7-8Z" />
            <path d="m12 6 6 6m0-6-6 6" />
          </svg>
        </Key>
      </div>
    </div>
  );
}
