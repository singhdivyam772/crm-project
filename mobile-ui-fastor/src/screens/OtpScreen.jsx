import { useEffect, useState } from "react";
import BackArrow from "../components/BackArrow.jsx";
import Keypad from "../components/Keypad.jsx";

export default function OtpScreen({ phone = "", onBack, onVerified }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");  // kept for when real validation is added
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const shown = phone.length === 10 ? `${phone.slice(0, 5)} ${phone.slice(5)}` : phone;
  const boxes = Array.from({ length: 6 }, (_, i) => code[i] ?? "");

  const handleContinue = () => {
    // Demo mode: any 6-digit code is accepted.
    onVerified?.();
  };

  return (
    <>
      <div className="flex flex-1 flex-col px-6 pt-4">
        <BackArrow onClick={onBack} />

        <h1 className="mt-5 text-[26px] font-extrabold leading-8">6-digit code</h1>
        <p className="mt-3 text-[13px] leading-5 text-neutral-500">
          Please enter the code we've sent to
          <br />
          <span className="font-bold text-neutral-900">+91 {shown}</span>
        </p>

        <div className="mt-8 flex items-center gap-2">
          {boxes.map((digit, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`flex h-12 w-11 items-center justify-center rounded border text-lg font-bold ${
                  error ? "border-red-500" : i === code.length ? "border-brand" : "border-neutral-300"
                }`}
              >
                {digit}
              </div>
              {i === 2 && <span className="text-neutral-400">-</span>}
            </div>
          ))}
        </div>

        {error && <p className="mt-2 text-xs font-semibold text-red-500">{error}</p>}

        <p className="mt-4 text-[13px]">
          I didn't receive a code{" "}
          {seconds > 0 ? (
            <span className="text-brand">(00:{String(seconds).padStart(2, "0")})</span>
          ) : (
            <button className="font-bold text-brand" onClick={() => setSeconds(30)}>
              Resend
            </button>
          )}
        </p>

        <p className="mt-2 text-[11px] text-neutral-400">Demo mode: any 6-digit code works</p>

        <div className="mt-auto pb-6">
          <button
            type="button"
            disabled={code.length !== 6}
            onClick={handleContinue}
            className="h-[46px] w-full rounded-lg bg-brand text-[15px] font-bold text-white active:scale-[0.99] disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      </div>

      <Keypad
        onDigit={(d) => {
          setError("");
          setCode((c) => (c.length < 6 ? c + d : c));
        }}
        onDelete={() => {
          setError("");
          setCode((c) => c.slice(0, -1));
        }}
      />
    </>
  );
}
