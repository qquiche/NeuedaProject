"use client";
import React from "react";
import StockCard from "../components/StockCard";

export default function Home() {
  return (
    <div>
      <StockCard stock={{symbol: "AAPL", name: "Apple Inc.", price: 123.45, priceChange: 1.23, priceChangePercent: 1.0}} />
    </div>
  );
}
