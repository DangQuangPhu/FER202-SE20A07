//Tạo hello.jsx dùn để hiển thị Hellp React trong thẻ p, Chữ React có màu xanh đậm
import React from 'react';

function Hello() {
  return (
    <p style={{ fontSize: '40px', marginBottom: '20px' }}>
      <span style={{ color: 'black' }}>Hello </span>
      <span style={{ color: 'darkblue', fontWeight: 'bold' }}>React</span>
    </p>
  );
}

export default Hello;