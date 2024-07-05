"use client";
import React, { useEffect, useState } from 'react';
import StockCard from "../components/StockCard";
import UserCard from '../components/UserCard';
import axios from 'axios';
import "../components/StockCard.css";
import "../components/UserCard.css";

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null); // Initialize user as null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stockResponse = await axios.get('http://localhost:8080/api/stocks');
        console.log('Data fetched Stocks:', stockResponse.data);
        setStocks(stockResponse.data);

        let userResponse = await axios.get('http://localhost:8080/api/users');
        console.log('Data fetched Users:', userResponse.data);
        userResponse.data = userResponse.data.map(user => {
          let valuation = 0;
          Object.keys(user.stockShares).forEach(stock => {
            console.log('Stock:', stock);
            let stockPrice = stockResponse.data.find(s => s.symbol === stock).price
            console.log('Stock price:', stockPrice);
            valuation += stockPrice * user.stockShares[stock];
          });
          return { ...user, valuation };
        });
        console.log('Data fetched Users after adding val:', userResponse.data);
        setUsers(userResponse.data);
        setUser(userResponse.data[0]); // Set the first user after fetching users
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []); // Empty dependency array to run only once

  if (!user || users.length === 0 || stocks.length === 0) {
    return <div>Loading...</div>; // Render loading state until data is fetched
  }

  return (
    <div>
      <h1 className="text-center header">Stocks</h1>
      <div>
        <UserCard user = {user} users={users} setUser={setUser}/>
      </div>
      <div className="stock-cards-container"> 
        {stocks.map(stock => (
          <StockCard key={stock.symbol} user={user} stock={stock} setUser = {setUser} setUsers={setUsers} users={users} />
        ))}
      </div>
    </div>
  );
}
