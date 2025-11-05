import React, { useMemo } from "react";
import Spread from "./Spread";

export default function OrderBook({ bids, asks }) {
  const sortedBids = useMemo(() => [...bids].sort((a, b) => b.price - a.price), [bids]);
  const sortedAsks = useMemo(() => [...asks].sort((a, b) => a.price - b.price), [asks]);

  const highestBid = sortedBids[0]?.price || 0;
  const lowestAsk = sortedAsks[0]?.price || 0;
  const spread = lowestAsk - highestBid;

  const maxBidTotal = sortedBids.reduce((acc, b) => acc + b.qty, 0);
  const maxAskTotal = sortedAsks.reduce((acc, a) => acc + a.qty, 0);

  return (
    <div className="flex flex-col bg-gray-800 rounded-2xl p-4 w-full">
      <div className="grid grid-cols-2 text-sm font-bold mb-2">
        <span className="text-green-400">Bids</span>
        <span className="text-red-400 text-right">Asks</span>
      </div>

      <div className="flex justify-between text-sm mb-2">
        <Spread spread={spread} />
      </div>

      <div className="flex gap-4 text-xs">
        <div className="flex-1 space-y-1">
          {sortedBids.map((b, i) => {
            const total = sortedBids.slice(0, i + 1).reduce((a, c) => a + c.qty, 0);
            return (
              <div key={i} className="relative flex justify-between bg-gray-900 p-1 rounded">
                <div
                  className="absolute inset-y-0 left-0 bg-green-600 opacity-20 rounded-l"
                  style={{ width: `${(total / maxBidTotal) * 100}%` }}
                ></div>
                <span>{b.price.toFixed(2)}</span>
                <span>{b.qty.toFixed(5)}</span>
                <span>{total.toFixed(5)}</span>
              </div>
            );
          })}
        </div>

        <div className="flex-1 space-y-1">
          {sortedAsks.map((a, i) => {
            const total = sortedAsks.slice(0, i + 1).reduce((a, c) => a + c.qty, 0);
            return (
              <div key={i} className="relative flex justify-between bg-gray-900 p-1 rounded">
                <div
                  className="absolute inset-y-0 right-0 bg-red-600 opacity-20 rounded-r"
                  style={{ width: `${(total / maxAskTotal) * 100}%` }}
                ></div>
                <span>{a.price.toFixed(2)}</span>
                <span>{a.qty.toFixed(5)}</span>
                <span>{total.toFixed(5)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
