import { useEffect, useReducer } from "react";

const initialState = {
  bids: [],
  asks: [],
  trades: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ORDER_BOOK":
      return { ...state, bids: action.payload.bids, asks: action.payload.asks };
    case "TRADE":
      return {
        ...state,
        trades: [action.payload, ...state.trades.slice(0, 49)],
      };
    default:
      return state;
  }
}

export default function useBinanceSocket(symbol = "btcusdt") {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${symbol}@depth20@100ms/${symbol}@trade`
    );

    ws.onopen = () => console.log("✅ Connected to Binance WebSocket");

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        const { stream, data } = message;

        if (stream.endsWith("@depth20@100ms")) {
          dispatch({
            type: "ORDER_BOOK",
            payload: {
              bids: data.bids.map(([price, qty]) => ({
                price: parseFloat(price),
                qty: parseFloat(qty),
              })),
              asks: data.asks.map(([price, qty]) => ({
                price: parseFloat(price),
                qty: parseFloat(qty),
              })),
            },
          });
        }

        if (stream.endsWith("@trade")) {
          dispatch({
            type: "TRADE",
            payload: {
              id: data.t,
              price: parseFloat(data.p),
              qty: parseFloat(data.q),
              isBuyerMaker: data.m,
              time: new Date(data.T),
            },
          });
        }
      } catch (err) {
        console.error("WebSocket error:", err);
      }
    };

    ws.onclose = () => console.warn("⚠️ WebSocket disconnected, reconnecting...");
    return () => ws.close();
  }, [symbol]);

  return state;
}
