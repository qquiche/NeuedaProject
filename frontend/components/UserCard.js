import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import './UserCard.css';

function UserCard({ user, users, setUser, setUsers }) {
    const [newUserName, setNewUserName] = useState('');
    const [newUserBalance, setNewUserBalance] = useState('');
    const [newUserValuation, setNewUserValuation] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const handleUserChange = (e) => {
        if (e.target.value === "Add New User") {
            setShowModal(true); // Open the modal
        } else {
            const selectedUser = users.find(u => u.name === e.target.value);
            setUser(selectedUser);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewUserName('');
        setNewUserBalance('');
        setNewUserValuation('');
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newUserName);
        formData.append('balance', newUserBalance.toString());
        try {
            const response = await axios.post('http://localhost:8080/api/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                const addedUser = response.data;
                setUsers(prevUsers => [...prevUsers, addedUser]);
                setUser(addedUser);
                handleCloseModal(); // Close the modal and reset form
            } else {
                throw new Error('Failed to add user');
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <Card className="user-card text-center">
            <div className='user-card-container'>
                <div className='user-info'>
                    {user && (
                        <>
                            <Card.Title className="user-name">{user.name}</Card.Title>
                            <Card.Text className="user-bio">Balance: ${parseFloat(user.balance).toFixed(2)}</Card.Text>
                            <Card.Text className="user-bio">Valuation: ${parseFloat(user.valuation).toFixed(2)}</Card.Text>
                        </>
                    )}
                    <Form.Select className="user-select" onChange={handleUserChange} value={user ? user.name : ''}>
                        {users.map((u, index) => (
                            <option key={index} value={u.name}>{u.name}</option>
                        ))}
                        <option value="Add New User">Add New User</option>
                    </Form.Select>
                </div>
                <div className="user-stock">
                    {user && (
                        <ListGroup variant="flush">
                            {Object.keys(user.stockShares).map((stock, index) => (
                                <ListGroup.Item key={index} className="user-stock-item">
                                    {stock}: {user.stockShares[stock]} shares
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddUser}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Balance</Form.Label>
                            <Form.Control type="number" placeholder="Enter balance" value={newUserBalance} onChange={(e) => setNewUserBalance(e.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">Add User</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Card>
    );
}

export default UserCard;