import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Modal, Alert } from 'react-bootstrap';

const menuItems = [
  { id: 1, name: 'Burger', category: 'Fast Food', price: 8.99, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Pizza', category: 'Fast Food', price: 12.99, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Salad', category: 'Healthy', price: 6.99, image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Steak', category: 'Grill', price: 19.99, image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Pasta', category: 'Italian', price: 15.99, image: 'https://via.placeholder.com/150' },
];

const Customer = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleSelectItem = (itemId) => {
    const itemIndex = selectedItems.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      const selectedItem = menuItems.find(item => item.id === itemId);
      setSelectedItems([...selectedItems, selectedItem]);
    } else {
      const updatedItems = [...selectedItems];
      updatedItems.splice(itemIndex, 1);
      setSelectedItems(updatedItems);
    }
  };

  const handleConfirmOrder = () => {
    setShowOrderModal(true);
  };

  const handleCloseOrderModal = () => {
    setShowOrderModal(false);
    setOrderConfirmed(true); // Set order confirmed flag
  };

  const handleAddMoreItems = () => {
    setShowOrderModal(false); // Close the confirmation modal
    setOrderConfirmed(false); // Reset order confirmed flag
    setSelectedItems([]); // Clear selected items
  };

  return (
    <Container className="mt-5">
    <h1>Welcome, Customer!</h1>
      <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
      {orderConfirmed && (
        <Alert variant="success" className="mb-3">
          <h4>Your Ordered Items</h4>
          <p>{selectedItems.map(item => item.name).join(', ')}</p>
          <p>Preparing now, stay tuned!</p>
          <p>Total Price: ${selectedItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
          <Button variant="primary" onClick={handleAddMoreItems}>
            Add More Items
          </Button>
        </Alert>
      )}

      <Row xs={1} md={2} lg={3} className="g-4">
        {menuItems.map(item => (
          <Col key={item.id}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  Category: {item.category}
                </Card.Text>
                <Card.Text>
                  Price: ${item.price.toFixed(2)}
                </Card.Text>
                <Button variant={selectedItems.some(selected => selected.id === item.id) ? 'secondary' : 'primary'} onClick={() => handleSelectItem(item.id)}>
                  {selectedItems.some(selected => selected.id === item.id) ? 'Selected' : 'Select Item'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Button variant="success" className="mt-3" onClick={handleConfirmOrder} disabled={selectedItems.length === 0 || orderConfirmed}>
        Confirm Order ({selectedItems.length} items selected)
      </Button>

      {/* Order Modal */}
      <Modal show={showOrderModal} onHide={handleCloseOrderModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Selected Items:</h5>
          <ul>
            {selectedItems.map(item => (
              <li key={item.id}>{item.name} - ${item.price.toFixed(2)}</li>
            ))}
          </ul>
          <p>Total Price: ${selectedItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseOrderModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleCloseOrderModal}>
            Confirm Order
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Customer;
