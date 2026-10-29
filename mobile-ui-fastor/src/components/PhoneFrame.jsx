import StatusBar from "./StatusBar.jsx";

// Single phone-sized screen, centered on the page.
// On real phones (narrow viewports) it fills the whole screen.
export default function PhoneFrame({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center sm:p-6">
      <div className="relative flex h-screen w-full flex-col overflow-hidden bg-white sm:h-[812px] sm:max-h-[calc(100vh-3rem)] sm:w-[375px] sm:rounded-[36px] sm:shadow-2xl">
        <StatusBar />
        {children}
      </div>
    </div>
  );
}
