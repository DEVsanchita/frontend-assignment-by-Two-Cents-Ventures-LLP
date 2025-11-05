export default function Trades({ trades }) {
  return (
    <div className="bg-gray-800 rounded-2xl p-4 w-1/3">
      <h2 className="text-yellow-400 font-bold mb-2">Recent Trades</h2>
      <div className="space-y-1 text-sm">
        {trades.map((t) => (
          <div
            key={t.id}
            className={`flex justify-between p-1 rounded ${
              t.isBuyerMaker ? "text-red-400" : "text-green-400"
            }`}
          >
            <span>{t.price.toFixed(2)}</span>
            <span>{t.qty.toFixed(5)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
