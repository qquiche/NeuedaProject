"use client";
import React, { useEffect, useState } from 'react';
import StockCard from "../components/StockCard";
import UserCard from '../components/UserCard';
import axios from 'axios';
import "../components/StockCard.css";
import "../components/UserCard.css";
import "./page.css";
import MultiRangeSlider from "multi-range-slider-react";
import StockAddModal from '../components/StockAddModal';

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [showPositive, setShowPositive] = useState(true);
  const [showNegative, setShowNegative] = useState(true);
  const [showAffordable, setShowAffordable] = useState(false);



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

  const filteredStocks = stocks.filter(stock =>
    (stock.name.toLowerCase().includes(searchQuery.toLowerCase()) || stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())) && stock.price >= minPrice && stock.price <= maxPrice && (showPositive && stock.priceChange >= 0 || showNegative && stock.priceChange < 0) && (showAffordable ? stock.price <= user.balance : true)
  );

  const findMaxPrice = () => {
    let max = 0;
    stocks.forEach(stock => {
      if (stock.price > max) {
        max = stock.price;
      }
    });
    //Round up to the nearest 100
    return Math.ceil(max / 100) * 100;
  }

  const handleInput = (e) => {
    setMinPrice(e.minValue);
    setMaxPrice(e.maxValue);
    console.log(e.minValue, e.maxValue);
  };



  return (
    <div>
      <h1 className="text-center header">Stocks</h1>
      <div >
        <UserCard user={user} users={users} setUser={setUser} setUsers = {setUsers}/>
      </div>
      <div className='filter-container'>
      <h3>Filters</h3>
      <div className='filters-container'>
      <div className='checkboxes-wrapper'>
        <div className='checkbox-wrapper'>
        <input type="checkbox" checked={showPositive} onChange={() => setShowPositive(!showPositive)} />
        <label className='checkbox-label'>Positive</label>
        </div>
        <div className='checkbox-wrapper'> 
        <input type="checkbox" checked={showNegative} onChange={() => setShowNegative(!showNegative)} />
        <label className='checkbox-label'>Negative</label>
        </div>
        <div className='checkbox-wrapper'>
        <input type="checkbox" checked={showAffordable} onChange={() => setShowAffordable(!showAffordable)} />
        <label  className='checkbox-label'>Affordable Only</label>
        </div>
      </div>
      <div className='filter-wrapper'>
      <h4>Filter by Price</h4>
        <MultiRangeSlider
			min={0}
			max={findMaxPrice()}
			step={250}
			minValue={minPrice}
			maxValue={maxPrice}
			onInput={(e) => handleInput(e)}
      minLabel="Min Price"
      maxLabel="Max Price"
      className='slider'
		/>
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
      </div>
      <StockAddModal stocks={stocks} setStocks={setStocks}/>
      </div>
      <div className="stock-cards-container">
        {filteredStocks.map(stock => (
          <StockCard key={stock.symbol} user={user} stock={stock} setUser={setUser} setUsers={setUsers} users={users} stocks = {stocks}/>
        ))}
      </div>
    </div>
  );
}