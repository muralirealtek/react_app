import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Tab, Container, Table, Button, Modal, Form, Badge } from 'react-bootstrap';

const Manager = () => {

  const navigate = useNavigate();
  // State for tabs and menu items
  const [key, setKey] = useState('viewMenuItems');
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Burger', category: 'Fast Food', price: 8.99, quantity: 10 },
    { id: 2, name: 'Pizza', category: 'Fast Food', price: 12.99, quantity: 15 },
    { id: 3, name: 'Salad', category: 'Healthy', price: 6.99, quantity: 20 },
  ]);

  // State for customer orders
  const [customerOrders, setCustomerOrders] = useState([
    { id: 1, customerName: 'John Doe', items: [{ id: 1, name: 'Burger', quantity: 2 }, { id: 2, name: 'Pizza', quantity: 1 }], totalCost: 30.97, status: 'Preparing', preparingTime: '15 mins' },
    { id: 2, customerName: 'Jane Smith', items: [{ id: 3, name: 'Salad', quantity: 1 }], totalCost: 6.99, status: 'Pending', preparingTime: '-' },
  ]);

  // State for cook preparing items
  const [cookPreparingItems, setCookPreparingItems] = useState([
    { id: 1, item: 'Burger', status: 'Preparing', preparingTime: '5 mins' },
    { id: 2, item: 'Pizza', status: 'Pending', preparingTime: '-' },
  ]);

  // State for add menu item modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
  });

  // State for edit menu item modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState({
    id: null,
    name: '',
    category: '',
    price: '',
    quantity: '',
  });

  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  // Handle input change in add menu item form
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewMenuItem({ ...newMenuItem, [name]: value });
  };

  // Handle submit of add menu item form
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: menuItems.length + 1,
      ...newMenuItem,
    };
    setMenuItems([...menuItems, newItem]);
    setNewMenuItem({
      name: '',
      category: '',
      price: '',
      quantity: '',
    });
    setShowAddModal(false);
  };

  // Handle opening edit modal
  const handleShowEditModal = (item) => {
    setEditItem(item);
    setShowEditModal(true);
  };

  // Handle closing edit modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  // Handle input change in edit menu item form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditItem({ ...editItem, [name]: value });
  };

  // Handle save changes in edit menu item modal
  const handleSaveEdit = () => {
    const updatedItems = menuItems.map((item) =>
      item.id === editItem.id ? { ...editItem } : item
    );
    setMenuItems(updatedItems);
    setShowEditModal(false);
  };

  // Handle opening delete modal
  const handleShowDeleteModal = (itemId) => {
    setDeleteItemId(itemId);
    setShowDeleteModal(true);
  };

  // Handle closing delete modal
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteItemId(null);
  };

  // Handle delete menu item
  const handleDeleteItem = () => {
    const updatedItems = menuItems.filter((item) => item.id !== deleteItemId);
    setMenuItems(updatedItems);
    setShowDeleteModal(false);
    setDeleteItemId(null);
  };


  

  return (

    <Container className="mt-5">
    <h1>Welcome, Customer!</h1>
      <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
      <Tabs
        id="manager-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="viewMenuItems" title="View Menu Items">
          <Button variant="primary" className="mb-3" onClick={() => setShowAddModal(true)}>
            Add New Item
          </Button>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {/* Edit button */}
                    <Button variant="info" size="sm" className="me-2" onClick={() => handleShowEditModal(item)}>
                      Edit
                    </Button>
                    {/* Delete button */}
                    <Button variant="danger" size="sm" onClick={() => handleShowDeleteModal(item.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Add Item Modal */}
          <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Menu Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleAddSubmit}>
                <Form.Group controlId="formItemName">
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={newMenuItem.name}
                    onChange={handleAddChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formItemCategory">
                  <Form.Label>Item Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    value={newMenuItem.category}
                    onChange={handleAddChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formItemPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={newMenuItem.price}
                    onChange={handleAddChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formItemQuantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={newMenuItem.quantity}
                    onChange={handleAddChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Add Item
                </Button>
              </Form>
            </Modal.Body>
          </Modal>

          {/* Edit Item Modal */}
          <Modal show={showEditModal} onHide={handleCloseEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Menu Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formEditItemName">
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={editItem.name}
                    onChange={handleEditChange}
                  />
                </Form.Group>

                <Form.Group controlId="formEditItemCategory">
                  <Form.Label>Item Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    value={editItem.category}
                    onChange={handleEditChange}
                  />
                </Form.Group>

                <Form.Group controlId="formEditItemPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={editItem.price}
                    onChange={handleEditChange}
                  />
                </Form.Group>

                <Form.Group controlId="formEditItemQuantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={editItem.quantity}
                    onChange={handleEditChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Delete Confirmation Modal */}
          <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this item?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeleteModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteItem}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          </Tab>

        {/* Customer Ordered Items Tab */}
        <Tab eventKey="customerOrderedItems" title="Customer Ordered Items">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Customer Name</th>
                <th>Ordered Items</th>
                <th>Total Cost</th>
                <th>Order Status</th>
                <th>Preparing Time</th>
              </tr>
            </thead>
            <tbody>
              {customerOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>
                    <ul>
                      {order.items.map((item) => (
                        <li key={item.id}>{item.name} - {item.quantity}</li>
                      ))}
                    </ul>
                  </td>
                  <td>${order.totalCost.toFixed(2)}</td>
                  <td>
                    <Badge bg={order.status === 'Preparing' ? 'warning' : order.status === 'Pending' ? 'primary' : 'success'}>
                      {order.status}
                    </Badge>
                  </td>
                  <td>{order.preparingTime}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        {/* Cook Preparing Items Tab */}
        <Tab eventKey="cookPreparingItems" title="Cook Preparing Items">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Item Name</th>
                <th>Status</th>
                <th>Preparing Time</th>
              </tr>
            </thead>
            <tbody>
              {cookPreparingItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.item}</td>
                  <td>
                    <Badge bg={item.status === 'Preparing' ? 'warning' : item.status === 'Pending' ? 'primary' : 'success'}>
                      {item.status}
                    </Badge>
                  </td>
                  <td>{item.preparingTime}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Manager;

