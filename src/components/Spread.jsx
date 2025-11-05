export default function Spread({ spread }) {
  return (
    <div className="text-center text-gray-300">
      Spread: <span className="font-semibold">{spread.toFixed(2)} USDT</span>
    </div>
  );
}
