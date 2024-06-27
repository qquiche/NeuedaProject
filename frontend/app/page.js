"use client";
import React, { useEffect, useState } from 'react';
import StockCard from "../components/StockCard";
import axios from 'axios';
import "../components/StockCard.css";

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/stocks')
      .then(response => {
        console.log('Data fetched: ', response.data);
        setStocks(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });

    axios.get('http://localhost:8080/api/users')
      .then(response => {
        console.log('Data fetched: ', response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div>
      <h1 className="text-center">Stocks</h1>
      <div className="stock-cards-container"> 
        {stocks.map(stock => (
          <StockCard key={stock.symbol} user = {users[0]} stock={stock} />
        ))}
      </div>
    </div>
  );
}