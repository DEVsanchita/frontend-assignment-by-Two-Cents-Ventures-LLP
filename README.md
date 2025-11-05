# Real-Time Order Book Visualizer

A high-performance real-time BTC/USDT order book visualizer built using **React**, **TailwindCSS**, and the **Binance WebSocket API**.

This app subscribes to Binance's live market data feeds and displays live updates for bids, asks, and recent trades in real time.

---

## 🚀 Features

- 📡 Real-time WebSocket data from Binance  
- 💹 Live order book updates with cumulative depth visualization  
- 🔴 Asks and 🟢 Bids displayed in real-time with proper sorting  
- ⚡ Efficient state management for smooth, non-blocking UI  
- 📈 Spread calculation (Ask - Bid) shown dynamically  
- 🕒 Recent trades list (auto-updating)  
- 🎨 Clean, responsive UI built with TailwindCSS  

---

## 🧠 Tech Stack

- **Framework:** React.js
- **Language:** JavaScript
- **Styling:** Tailwind CSS  
- **API:** Binance WebSocket (`wss://stream.binance.com:9443/ws/btcusdt@depth20@100ms` and `@aggTrade`)  
- **State Management:** ( React Hooks )

---

## ⚙️ Installation & Setup

```bash
# Navigate into the project folder
cd orderbook-visualizer

# Install dependencies
npm install

# Start the development server
npm run dev
