//1. Footer component hiển thị thông tin bản quyền và liên kết
// đến trang chủ của tác giả: ID, Tên, Email, Link Github
//Hiển thị Footer ở cuối trang web, đảm bảo rằng nó luôn nằm ở cuối trang, ngay cả khi nội dung chính không đủ để đẩy nó xuống dưới cùng của cửa sổ trình duyệt.
//Thông tin hiển thị container, Row, Col của Bootstrap để bố trí thông tin một cách gọn gàng và dễ đọc, bố cục đẹp mắt và dễ nhìn, sử dụng màu sắc và kiểu chữ phù hợp để làm nổi bật thông tin bản quyền và liên kết, đảm bảo rằng các liên kết có thể nhấp được và mở đúng trang web khi người dùng nhấp vào chúng.
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer({ id, name, email, githubLink }) {
    return (
        <Container fluid className="bg-light text-dark text-center py-3">
            <Row>
                <Col>
                    <p>&copy; ID: {id}</p>
                    <p>Name: {name}</p>
                    <p>Email: {email}</p>
                    <p>
                        <a href={githubLink} target="_blank" rel="noopener noreferrer">
                            GitHub Profile
                        </a>
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;