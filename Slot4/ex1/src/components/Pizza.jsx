//Pizza component hiển thị thông tin về một loại pizza, bao gồm id, name, price , description, image. Sử dụng Card của Bootstrap để hiển thị thông tin một cách đẹp mắt và dễ nhìn, đảm bảo rằng hình ảnh được hiển thị rõ ràng và có kích thước phù hợp, sử dụng màu sắc và kiểu chữ phù hợp để làm nổi bật tên pizza và giá cả, đảm bảo rằng mô tả được hiển thị một cách rõ ràng và dễ đọc.
//hiển thị thông tin của pizza trong cùng 1 card
//sử dụng React Bootstrap để hiển thị thông tin của pizza một cách đẹp mắt và dễ nhìn
// css cho card để hiển thị thông tin của pizza gồm có nền sáng , chữ màu tối và căn giữa
import React from 'react';
import { Card, Button } from 'react-bootstrap';
function Pizza({ id, name, price, description, image })
 {
    return (
        <Card style={{ width: '18rem', margin: '20px auto' }}>
            <Card.Img variant="top" src={image} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', alignItems: 'center', marginTop: 'auto' }}>
                    <Card.Text style={{ margin: 0 }}><strong>Price: ${price}</strong></Card.Text>
                    <Button variant="primary" style={{ width: '100%' }}>Add to Cart</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default Pizza;