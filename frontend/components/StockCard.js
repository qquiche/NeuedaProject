import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import './StockCard.css';

function StockCard({ stock, stocks, setStock, setStocks }) {
    const [newStockSymbol, setNewStockSymbol] = useState('');
    const [newStockPrice, setNewStockPrice] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleStockChange = (e) => {
        if (e.target.value === "Add New Stock") {
            setShowModal(true); // Open the modal
        } else {
            const selectedStock = stocks.find(s => s.symbol === e.target.value);
            setStock(selectedStock);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewStockSymbol('');
        setNewStockPrice('');
    };

    const handleAddStock = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/stocks', {
                symbol: newStockSymbol,
                price: newStockPrice
            });
            if (response.status === 200) {
                const addedStock = { ...response.data };
                setStocks(prevStocks => [...prevStocks, addedStock]);
                setStock(addedStock);
                handleCloseModal(); // Close the modal and reset form
            } else {
                throw new Error('Failed to add stock');
            }
        } catch (error) {
            console.error('Error adding stock:', error);
        }
    };

    return (
        <Card className="stock-card text-center">
            <div className='stock-card-container'>
                <div className='stock-info'>
                    {stock && (
                        <>
                            <Card.Title className="stock-name">{stock.symbol}</Card.Title>
                            <Card.Text className="stock-price">Price: ${parseFloat(stock.price).toFixed(2)}</Card.Text>
                        </>
                    )}
                    <Form.Select className="stock-select" onChange={handleStockChange} value={stock ? stock.symbol : ''}>
                        {stocks.map((s, index) => (
                            <option key={index} value={s.symbol}>{s.symbol}</option>
                        ))}
                        <option value="Add New Stock">Add New Stock</option>
                    </Form.Select>
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Stock</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddStock}>
                        <Form.Group>
                            <Form.Label>Stock Symbol</Form.Label>
                            <Form.Control type="text" placeholder="Enter symbol" value={newStockSymbol} onChange={(e) => setNewStockSymbol(e.target.value)} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Stock Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter price" value={newStockPrice} onChange={(e) => setNewStockPrice(e.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">Add Stock</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Card>
    );
}

export default StockCard;
