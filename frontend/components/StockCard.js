import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import './StockCard.css'; // Import the custom CSS

function StockCard({ stock }) {
  const isPriceUp = stock.priceChange >= 0;

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
          <ListGroup.Item>Price: ${stock.price.toFixed(2)}</ListGroup.Item>
          <ListGroup.Item className={isPriceUp ? 'text-success' : 'text-danger'}>
            {isPriceUp ? '▲' : '▼'} {Math.abs(stock.priceChange)} ({stock.priceChangePercent}%)
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default StockCard;
