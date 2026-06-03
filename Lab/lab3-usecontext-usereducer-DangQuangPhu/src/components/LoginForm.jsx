// src/components/LoginForm.jsx    
    import { useState } from 'react';    
    import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';    
    import { useAuth } from '../context/AuthContext';
         
    const FAKE_USERS = [    
      { id: 1, username: 'admin', password: '123', name: 'Admin User', role: 'admin' },    
      { id: 2, username: 'user',  password: '123', name: 'Normal User', role: 'user'  },    
    ];    
         
    function LoginForm() {    
      const { state, dispatch } = useAuth();    
      const [form, setForm] = useState({ username: '', password: '' });    
         
      const handleChange = (e) => {    
        setForm({ ...form, [e.target.name]: e.target.value });    
      };    
         
      const handleSubmit = (e) => {    
        e.preventDefault();    
        const found = FAKE_USERS.find(    
          (u) => u.username === form.username && u.password === form.password    
        );    
        if (found) {    
          dispatch({ type: 'LOGIN_SUCCESS', payload: found });    
        } else {    
          dispatch({ type: 'LOGIN_FAILURE', payload: 'Sai username hoặc password!' });    
        }    
      };    
         
      return (    
        <Container className="mt-5">    
          <Row className="justify-content-center">    
            <Col xs={12} sm={8} md={5}>    
         
              <Card className="shadow-sm">    
                <Card.Header className="bg-primary text-white text-center py-3">    
                  <h4 className="mb-0">Đăng nhập</h4>    
                </Card.Header>    
         
                <Card.Body className="p-4">    
                  {/* Hiển thị lỗi nếu có */}    
                  {state.error && (    
                    <Alert variant="danger" dismissible    
                      onClose={() => dispatch({ type: 'CLEAR_ERROR' })}>    
                      {state.error}    
                    </Alert>    
                  )}    
         
                  <Form onSubmit={handleSubmit}>    
                    <Form.Group className="mb-3" controlId="username">    
                      <Form.Label>Username</Form.Label>    
                      <Form.Control    
                        type="text"    
                        name="username"    
                        placeholder="Nhập username"    
                        value={form.username}    
                        onChange={handleChange}    
                        required    
                      />    
                    </Form.Group>    
         
                    <Form.Group className="mb-4" controlId="password">    
                      <Form.Label>Password</Form.Label>    
                      <Form.Control    
                        type="password"    
                        name="password"    
                        placeholder="Nhập password"    
                        value={form.password}    
                        onChange={handleChange}    
                        required    
                      />    
                    </Form.Group>    
         
                    <div className="d-grid">    
                      <Button variant="primary" type="submit" size="lg">    
                        Đăng nhập    
                      </Button>    
                    </div>    
                  </Form>    
                </Card.Body>    
         
                <Card.Footer className="text-muted text-center small">    
                  Demo: admin/123 hoặc user/123    
                </Card.Footer>    
              </Card>    
         
            </Col>    
          </Row>    
        </Container>    
      );    
    }    
         
    export default LoginForm;    
