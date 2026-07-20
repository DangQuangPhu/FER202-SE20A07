//hiển thị danh sach thông các loại pizaa trong cùng 1 component PizzaList.jsx
//sử dụng React Bootstrap để hiển thị thông tin của pizza một cách đẹp mắt và dễ nhìn
// css cho card để hiển thị thông tin của pizza gồm có nền sáng , chữ màu tối và căn giữa
//gọi component Pizza trong component PizzaList để hiển thị thông tin của từng loại pizza trong mảng
//sử dụng dữ liệt từ 1 mảng PizzaData để hiển thị thông tin của từng loại pizza trong mảng, mỗi loại pizza có id, name, price , description, image
// file pizzaData.js chứa mảng pizzaData với thông tin của từng loại pizza, bao gồm id, name, price , description, image và PizzaList.jsx chỉ cần gọi ko cần gọi từng cái ra
import React from 'react';
import Pizza from './Pizza';
import { pizzaList } from '../data/PizzaData';

function PizzaList() {
    return (
        <div>
            <h1 className="text-center my-4">Pizza Menu</h1>
            <div className="d-flex flex-wrap justify-content-center">
                {pizzaList.map(pizza => (
                    <Pizza 
                        key={pizza.id}
                        id={pizza.id}
                        name={pizza.name}
                        price={pizza.price}
                        description={pizza.description}
                        image={pizza.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
}

export default PizzaList;