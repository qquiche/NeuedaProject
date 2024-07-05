import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import './UserCard.css'; // Import the custom CSS
import AvatarPic from '../assets/avatar.png';
import Form from 'react-bootstrap/Form';

function UserCard({user, users, setUser }) {  

    const handleUserChange = (e) => {
        const selectedUser = users.find(u => u.name === e.target.value);
        setUser(selectedUser);
    };
    return (
        <Card className="user-card text-center">

        <div className='user-card-container'>
        <div className='user-info'>
        <div className="user-avatar"></div>
                <Card.Title className="user-name">{user.name}</Card.Title>
                <Card.Text className="user-bio">Balance: ${parseFloat(user.balance).toFixed(2)}</Card.Text>
                <Card.Text className="user-bio">Valuation: ${parseFloat(user.valuation).toFixed(2)}</Card.Text>
                <Form.Select className="user-select" onChange={handleUserChange}>
                    {users.map((u, index) => (user,
                        <option key={index}>{u.name}</option>
                    ))}
                </Form.Select>
        </div>
        <div className="user-stock">
                    <h4 className = "user-stock-title" >Stock Shares</h4>
                    <ListGroup variant="flush">
                        {Object.keys(user.stockShares).map((stock, index) => (
                            <ListGroup.Item key={index} className="user-stock-item">
                                {stock}: {user.stockShares[stock]} shares
                            </ListGroup.Item>
                        ))}
                </ListGroup>
        </div>
        </div>
        </Card>
    );
}

export default UserCard;
