import useBinanceSocket from "./hooks/useBinanceSocket";
import OrderBook from "./components/OrderBook";
import Trades from "./components/Trades";

export default function App() {
  const { bids, asks, trades } = useBinanceSocket("btcusdt");

  return (
    <div className="flex gap-4 p-6">
      <OrderBook bids={bids} asks={asks} />
      <Trades trades={trades} />
    </div>
  );
}
