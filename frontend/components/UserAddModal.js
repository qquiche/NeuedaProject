import React, { useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Button from 'react-bootstrap/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Form from 'react-bootstrap/Form';
import './Modal.css'; 

const UserAddModal = ({ users, setUsers, setUser }) => {
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
        name: '',
        balance: 0
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
            name: '',
            balance: 0
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddUser = async () => {
        const { name, balance } = formData;
        const formDataToSend = new FormData();
        formDataToSend.append('name', name);
        formDataToSend.append('balance', balance.toString());

        try {
            const response = await axios.post('http://localhost:8080/api/users', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                const addedUser = { ...response.data, valuation: 0 };
                setUsers(prevUsers => [...prevUsers, addedUser]);
                setUser(addedUser);
                handleClose();
            } else {
                throw new Error('Failed to add user');
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddUser();
    };

    return (
        <div>
            <Button className="modal-button" onClick={handleOpen}>Add User</Button>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='modal-box'>
                    <Form className='form' onSubmit={handleSubmit}>
                        <Form.Group className='form-group' controlId="formUserName">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                className='form-input'
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className='form-group' controlId="formUserBalance">
                            <Form.Label>Balance:</Form.Label>
                            <Form.Control
                                className='form-input'
                                type="number"
                                step={0.01}
                                name="balance"
                                value={formData.balance}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <div className='action-buttons'>
                            <Button className='modal-submit' variant="primary" type="submit">
                                Submit
                            </Button>
                            <Button className='modal-cancel' variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Box>
            </Modal>
        </div>
    );
};

export default UserAddModal;
