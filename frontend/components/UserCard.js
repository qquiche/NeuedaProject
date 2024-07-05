import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'; 
import './UserCard.css'; 

function UserCard({ user, users, setUser, setUsers }) {
    const [newUserName, setNewUserName] = useState('');
    const [newUserBalance, setNewUserBalance] = useState('');
    const [newUserValuation, setNewUserValuation] = useState('');
    const [showAddUserForm, setShowAddUserForm] = useState(false);

    const handleUserChange = (e) => {
        if (e.target.value === "Add New User") {
            setShowAddUserForm(true);
            setUser(null); // Clear current user display
        } else {
            const selectedUser = users.find(u => u.name === e.target.value);
            setUser(selectedUser);
            setShowAddUserForm(false);
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        const newUser = {
            name: newUserName,
            balance: parseFloat(newUserBalance),
            valuation: parseFloat(newUserValuation),
            stockShares: {} // Assuming new users start with no stock shares
        };

        try {
            const response = await axios.put('http://localhost:8080/api/users', newUser, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                const addedUser = response.data;
                setUsers(prevUsers => [...prevUsers, addedUser]); // Update users list
                setUser(addedUser); // Set newly added user as the current user
                setShowAddUserForm(false); // Hide the form
                setNewUserName(''); // Reset the form values
                setNewUserBalance('');
                setNewUserValuation('');
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
                    {showAddUserForm && (
                        <Form className="add-user-form" onSubmit={handleAddUser}>
                            <Form.Control type="text" placeholder="Name" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} required />
                            <Form.Control type="number" placeholder="Balance" value={newUserBalance} onChange={(e) => setNewUserBalance(e.target.value)} required />
                            <Form.Control type="number" placeholder="Valuation" value={newUserValuation} onChange={(e) => setNewUserValuation(e.target.value)} required />
                            <Button variant="primary" type="submit">Add User</Button>
                        </Form>
                    )}
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
        </Card>
    );
}

export default UserCard;