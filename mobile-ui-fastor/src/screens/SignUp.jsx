import { useState } from "react";
import BackArrow from "../components/BackArrow.jsx";
import Keypad from "../components/Keypad.jsx";

export default function SignUp({ onSubmit }) {
  const [phone, setPhone] = useState("");

  const formatted = phone.length > 5 ? `${phone.slice(0, 5)} ${phone.slice(5)}` : phone;
  const valid = phone.length === 10;

  return (
    <>
      <div className="flex flex-1 flex-col px-6 pt-4">
        <BackArrow />

        <h1 className="mt-5 text-[26px] font-extrabold leading-8">Sign Up to Fastor</h1>
        <p className="mt-3 text-[13px] leading-5 text-neutral-500">
          Let us know your mobile number and we will send you an OTP for verification.
        </p>

        <div className="mt-10 flex h-[52px] items-center rounded-lg bg-neutral-100 px-4 text-[15px]">
          <span className="font-semibold">+91</span>
          <span className="mx-3 h-5 w-px bg-neutral-300" />
          <span className={formatted ? "text-neutral-900" : "text-neutral-400"}>
            {formatted || "00000 00000"}
          </span>
        </div>

        <div className="mt-auto pb-4">
          <button
            type="button"
            disabled={!valid}
            onClick={() => onSubmit?.(phone)}
            className="h-[46px] w-full rounded-lg bg-brand text-[15px] font-bold text-white transition active:scale-[0.99] disabled:opacity-50"
          >
            Get OTP
          </button>
          <p className="mt-3 text-center text-[10px] text-neutral-500">
            By clicking, I accept the <b className="text-neutral-800">Terms &amp; Conditions</b> and{" "}
            <b className="text-neutral-800">Privacy Policy</b>
          </p>
        </div>
      </div>

      <Keypad
        onDigit={(d) => setPhone((p) => (p.length < 10 ? p + d : p))}
        onDelete={() => setPhone((p) => p.slice(0, -1))}
      />
    </>
  );
}
