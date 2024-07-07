import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserAddModal from './UserAddModal';
import './UserCard.css';

function UserCard({ user, users, setUser, setUsers }) {
    const handleUserChange = (e) => {
        const selectedUser = users.find(u => u.name === e.target.value);
        if (selectedUser) {
            setUser(selectedUser);
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
            <UserAddModal users={users} setUsers={setUsers} setUser={setUser} />
        </Card>
    );
}

export default UserCard;
