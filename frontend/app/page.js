"use client";
import React, { useEffect, useState } from 'react';
import StockCard from "../components/StockCard";
import UserCard from '../components/UserCard';
import axios from 'axios';
import "../components/StockCard.css";
import "../components/UserCard.css";
import "./page.css";

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Step 1: Add a search state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stockResponse = await axios.get('http://localhost:8080/api/stocks');
        setStocks(stockResponse.data);
        let userResponse = await axios.get('http://localhost:8080/api/users');
        userResponse.data = userResponse.data.map(user => {
          let valuation = 0;
          Object.keys(user.stockShares).forEach(stock => {
            let stockPrice = stockResponse.data.find(s => s.symbol === stock)?.price || 0;
            valuation += stockPrice * user.stockShares[stock];
          });
          return { ...user, valuation };
        });
        setUsers(userResponse.data);
        setUser(userResponse.data[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  if (!user || users.length === 0 || stocks.length === 0) {
    return <div>Loading...</div>;
  }

  // Step 3: Filter stocks based on search query
  const filteredStocks = stocks.filter(stock =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase()) || stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-center header">Stocks</h1>
      <div >
        <UserCard user={user} users={users} setUser={setUser}/>
      </div>
      <div className='search-wrapper'>
        <input
          type="text"
          placeholder="Search stocks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='search-input'
        />
      </div>
      <div className="stock-cards-container">
        {filteredStocks.map(stock => (
          <StockCard key={stock.symbol} user={user} stock={stock} setUser={setUser} setUsers={setUsers} users={users} />
        ))}
      </div>
    </div>
  );
}