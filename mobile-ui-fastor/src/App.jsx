import { useEffect, useState } from "react";
import PhoneFrame from "./components/PhoneFrame.jsx";
import SignUp from "./screens/SignUp.jsx";
import OtpScreen from "./screens/OtpScreen.jsx";
import Home from "./screens/Home.jsx";
import ProductDetail from "./screens/ProductDetail.jsx";

export default function App() {
  const [screen, setScreen] = useState("signup"); // signup | otp | home | product
  const [phone, setPhone] = useState("");
  const [productId, setProductId] = useState("pizza");
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const cartCount = cart.reduce((n, item) => n + item.qty, 0);

  const addToCart = (item) => {
    setCart((c) => [...c, item]);
    setToast(`${item.qty} × ${item.name} added to cart`);
    setScreen("home");
  };

  return (
    <PhoneFrame>
      {screen === "signup" && (
        <SignUp
          onSubmit={(p) => {
            setPhone(p);
            setScreen("otp");
          }}
        />
      )}

      {screen === "otp" && (
        <OtpScreen
          phone={phone}
          onBack={() => setScreen("signup")}
          onVerified={() => setScreen("home")}
        />
      )}

      {screen === "home" && (
        <Home
          cartCount={cartCount}
          onOpenProduct={(id) => {
            setProductId(id);
            setScreen("product");
          }}
        />
      )}

      {screen === "product" && (
        <ProductDetail
          key={productId}
          productId={productId}
          onBack={() => setScreen("home")}
          onAdd={addToCart}
        />
      )}

      {toast && (
        <div className="pointer-events-none absolute bottom-24 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}
    </PhoneFrame>
  );
}
