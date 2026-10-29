# Fastor UI (React + Tailwind)

A working demo flow with dummy data, one screen at a time:

Sign Up → OTP → Home → Product Detail → Add to cart (back to Home with a cart badge).

## Run

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Demo behaviour

- Enter any 10-digit number with the on-screen keypad, tap **Get OTP**.
- Any 6-digit OTP is accepted in demo mode.
- On Home, tap any dish, the pizza banner, or search by name.
- Pick a quantity and portion, then **Add to cart**.

## Structure

- `src/data.js` – dummy products, orders, portions and demo OTP
- `src/App.jsx` – simple screen state (no router needed)
- `src/screens/` – SignUp, OtpScreen, Home, ProductDetail
- `src/components/` – PhoneFrame, StatusBar, Keypad, FoodImage, BackArrow
- Brand color and font are set in `tailwind.config.js`

Food photos load from Unsplash; if one fails, an emoji placeholder is shown.
