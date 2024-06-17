import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs, Table, Button, Container } from 'react-bootstrap';
import './Cook.css'; // Import CSS for the tri-state toggle

const orders = [
  { id: 1, customerId: 'C001', customerName: 'John Doe', items: ['Burger', 'Pizza'], status: 'pending' },
  { id: 2, customerId: 'C002', customerName: 'Jane Smith', items: ['Salad', 'Steak'], status: 'pending' },
  { id: 3, customerId: 'C003', customerName: 'Alice Johnson', items: ['Pasta', 'Salad'], status: 'completed' },
  { id: 4, customerId: 'C004', customerName: 'Bob Brown', items: ['Pizza', 'Steak'], status: 'completed' },
];

const Cook = () => {
  const navigate = useNavigate();
  const [ordersData, setOrdersData] = useState(orders);

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = ordersData.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrdersData(updatedOrders);
  };

  return (
    <Container className="mt-5">
    <h1>Welcome, Customer!</h1>
      <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
      <h2 className="mb-4">Cook View</h2>
      <Tabs defaultActiveKey="pending" id="cook-tabs">
        <Tab eventKey="pending" title="Pending Orders">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer ID</th>
                <th>Customer Name</th>
                <th>Order Items</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ordersData.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerId}</td>
                  <td>{order.customerName}</td>
                  <td>{order.items.join(', ')}</td>
                  <td>{order.status}</td>
                  <td>
                    <div className="tri-state-toggle">
                      <button
                        className={`tri-state-toggle-button ${order.status === 'pending' ? 'active' : ''}`}
                        onClick={() => handleStatusChange(order.id, 'pending')}
                      >
                        Pending
                      </button>
                      <button
                        className={`tri-state-toggle-button ${order.status === 'preparing' ? 'active' : ''}`}
                        onClick={() => handleStatusChange(order.id, 'preparing')}
                      >
                        Preparing
                      </button>
                      <button
                        className={`tri-state-toggle-button ${order.status === 'completed' ? 'active' : ''}`}
                        onClick={() => handleStatusChange(order.id, 'completed')}
                      >
                        Completed
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="completed" title="Completed Orders">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer ID</th>
                <th>Customer Name</th>
                <th>Order Items</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ordersData.filter(order => order.status === 'completed').map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerId}</td>
                  <td>{order.customerName}</td>
                  <td>{order.items.join(', ')}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Cook;
