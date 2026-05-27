//RegistrationForm.jsx cho phép đăng ký tài khoản người dùng gồm các thông tin: username, email, password. confirm password. Button Register, Cancel. 
//Yêu cầu: useState cho form. Xử lý validation trên form: không nhập, email đúng định dạng, password từ 6 kí tự trở lên (có hoa/ thường/số kí tự đặc biệt), confirm password khớp.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

function RegistrationForm() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateEmail = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = password => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = {};
    if (!form.username) newErrors.username = 'Vui lòng nhập username.';
    if (!form.email) newErrors.email = 'Vui lòng nhập email.';
    else if (!validateEmail(form.email)) newErrors.email = 'Email không hợp lệ.';
    if (!form.password) newErrors.password = 'Vui lòng nhập mật khẩu.';
    else if (!validatePassword(form.password)) newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.';
    if (!form.confirm) newErrors.confirm = 'Vui lòng xác nhận mật khẩu.';
    else if (form.password !== form.confirm) newErrors.confirm = 'Xác nhận mật khẩu không khớp.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Registration success — navigate to blog home
      setForm({ username: '', email: '', password: '', confirm: '' });
      navigate('/');
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Đăng ký tài khoản</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Nhập username"
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Nhập email"
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Nhập password"
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" controlId="confirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            placeholder="Xác nhận password"
            isInvalid={!!errors.confirm}
          />
          <Form.Control.Feedback type="invalid">{errors.confirm}</Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex gap-2">
          <Button variant="primary" type="submit">
            Register
          </Button>
          <Button variant="secondary" onClick={() => setForm({ username: '', email: '', password: '', confirm: '' })}>
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default RegistrationForm;