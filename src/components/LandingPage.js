// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <Container className="mt-5">
      <h1 className="text-center">Select Your Role</h1>
      <Row className="mt-4">
        <Col md={4} className="mb-4">
          <Card className="role-card">
            <Card.Body className="text-center">
              <Card.Title>Manager</Card.Title>
              <Link to="/manager">
                <Button variant="primary">Go to Manager Page</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="role-card">
            <Card.Body className="text-center">
              <Card.Title>Customer</Card.Title>
              <Link to="/customer">
                <Button variant="primary">Go to Customer Page</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="role-card">
            <Card.Body className="text-center">
              <Card.Title>Cook</Card.Title>
              <Link to="/cook">
                <Button variant="primary">Go to Cook Page</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
