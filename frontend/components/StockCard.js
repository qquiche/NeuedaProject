import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './StockCard.css'; // Import the custom CSS

function StockCard({user, stock }) {
  const [showInput, setShowInput] = useState(false);
  const [action, setAction] = useState('');
  const [quantity, setQuantity] = useState(0);
  const isPriceUp = stock.priceChange >= 0;

  const handleBuyClick = () => {
    setAction('buy');
    setShowInput(true);
  };

  const handleSellClick = () => {
    setAction('sell');
    setShowInput(true);
  };

  const handleQuantityChange = (e) => {
    if(action ==='buy'){
    setQuantity(e.target.value);
    } else {
      setQuantity(-e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Placeholder for the PUT call using axios
    // Example:
    try {
      const response = await axios.put(`http://localhost:8080/api/users/{id}/stock/{stockID}?id=${user.id}&stockID=${stock.id}&quantity=${quantity}`);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error making PUT request:', error);
    }
    setShowInput(false);
    setQuantity(0);
  };

  return (
    <Card className="stock-card text-center">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <span>{stock.symbol}</span>
          <Badge bg={isPriceUp ? "success" : "danger"}>
            {isPriceUp ? `+${stock.priceChange}` : stock.priceChange}
          </Badge>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{stock.name}</Card.Subtitle>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <span role="img" aria-label="price">💵</span>
            Price: ${stock.price.toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item className={isPriceUp ? 'text-success' : 'text-danger'}>
            <span role="img" aria-label="change" style={{ color: isPriceUp ? 'green' : 'red' }}>
              {isPriceUp ? '▲' : '▼'}
            </span>
            {' '}
            {Math.abs(stock.priceChange)} ({stock.priceChangePercent}%)
          </ListGroup.Item>
        </ListGroup>
        <div className="action-buttons">
          <Button className="btn btn-buy" onClick={handleBuyClick}>Buy</Button>
          <Button className="btn btn-sell" onClick={handleSellClick}>Sell</Button>
        </div>
        {showInput && (
          <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group controlId="formQuantity">
              <Form.Label className = "stock-card-label">{action === 'buy' ? 'Buy' : 'Sell'} Quantity</Form.Label>
              <Form.Control 
                className="stock-card-input" 
                type="number" 
                value={Math.abs(quantity)} 
                onChange={handleQuantityChange} 
                min="1"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2 stock-card-submit">
              Submit
            </Button>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
}

export default StockCard;
