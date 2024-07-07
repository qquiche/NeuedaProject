import React, { useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Button from 'react-bootstrap/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Form from 'react-bootstrap/Form';
import './Modal.css'; // Import the custom CSS

const StockAddModal = ({ stocks, setStocks }) => {
    const [isOpen, setIsOpen] = useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#333',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: '10px',
        alignContent: 'center',
      };

    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        symbol: '',
        price: 0,
        priceChange: 0,
        priceChangePercent: 0
    });

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            id: 0,
            name: '',
            symbol: '',
            price: 0,
            priceChange: 0,
            priceChangePercent: 0
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddStock = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/stocks', formData);
            if (response.status === 200) {
                console.log('Stock added successfully');
                console.log(response.data);
                setStocks([...stocks, response.data]);
                handleCloseModal();
            } else {
                throw new Error('Failed to add stock');
            }
        } catch (error) {
            console.error('Error adding stock:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddStock();
        handleClose();
    };

    return (
        <div>
        <Button className="modal-button" onClick={handleOpen}>Add Stock</Button>
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} classNam='modal-box'>
          <Form className='form' onSubmit={handleSubmit}>
                        <Form.Group className='form-group' controlId="formCompanyName">
                            <Form.Label>Company:</Form.Label>
                            <Form.Control
                                className='form-input'
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className='form-group'  controlId="formCompanySymbol">
                            <Form.Label>Symbol:</Form.Label>
                            <Form.Control
                            className='form-input'
                                type="text"
                                name="symbol"
                                value={formData.symbol}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group  className='form-group' controlId="formPrice">
                            <Form.Label>Price:</Form.Label>
                            <Form.Control
                            className='form-input'
                                type="number"
                                step={0.01}
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className='form-group'  controlId="formPriceChange">
                            <Form.Label>Price Change:</Form.Label>
                            <Form.Control
                            className='form-input'
                                type="number"
                                step={0.01}
                                name="priceChange"
                                value={formData.priceChange}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className='form-group' controlId="formPriceChangePercent">
                            <Form.Label>Price Change Percent:</Form.Label>
                            <Form.Control
                            className='form-input'
                                type="number"
                                step={0.01}
                                name="priceChangePercent"
                                value={formData.priceChangePercent}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <div className='action-buttons'>
                        <Button className = 'modal-submit' variant="primary" type="submit">
                            Submit
                        </Button>
                        <Button className = 'modal-cancel'variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        </div>
                    </Form>
          </Box>
        </Modal>
      </div>
    );
};

export default StockAddModal;
