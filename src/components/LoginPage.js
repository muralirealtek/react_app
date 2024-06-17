import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import './LoginPage.css'; // Custom CSS for login page styles

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform authentication logic here (demo purposes only)
    if (username === 'manager' && password === 'password') {
      navigate('/manager');
    } else if (username === 'customer' && password === 'password') {
      navigate('/customer');
    } else if (username === 'cook' && password === 'password') {
      navigate('/cook');
    } else if(username === 'admin' && password === 'password'){
      navigate('/landingpage');
    }else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <Container>
        <Card className="shadow border-0">
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="username">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="input-field"
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-3 btn-login">
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default LoginPage;
