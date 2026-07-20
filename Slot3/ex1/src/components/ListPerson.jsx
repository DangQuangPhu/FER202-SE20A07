//2. Hiển thị thông tin của từng người trong một danh sách gồm 10 người, 
// mỗi người có tên và tuổi ra danh sách ul
import React from 'react';

function ListPerson() {
    const people = [
        { name: 'Alice', age: 15 },
        { name: 'Bob', age: 30 },
        { name: 'Charlie', age: 25 },
        { name: 'Avid', age: 40 },
        { name: 'Eve', age: 18 },
        { name: 'Frank', age: 18 },
        { name: 'Grace', age: 55 },
        { name: 'Ceidi', age: 20 },
        { name: 'Ivan', age: 25 },
        { name: 'Budy', age: 50 }   
    ];

    //3. Tìm người đầu tiên trong mảng people là thanh thiếu niên
    const firstTeenager = people.find(person => 
        person.age >= 13 && person.age <= 19
    );

    //6. Sắp xếp danh sách people theo tên tăng dần, tuổi giảm dần
    const sortedPeople = [...people].sort((a, b) => {
        if (a.name !== b.name) {
            return a.name.localeCompare(b.name);
        }
        return b.age - a.age;
    });

    return (
        <>
            <h1>1.List of People</h1>
            <div>
                <ul>
                    {people.map((person, index) => (
                        <li key={index}>
                            {person.name} - {person.age} years old
                        </li>
                    ))}
                </ul>
            </div>

            <h3>2.Find the first person off the people array is teenager</h3>
            <div>
                {firstTeenager ? (
                    <p>{firstTeenager.name} - {firstTeenager.age} years old</p>
                ) : (
                    <p>No teenager found.</p>
                )}
            </div>

            <h3>3.Find all people of the people array is teenager</h3>
            <div>
                <ul>
                    {people
                        .filter(person => person.age >= 13 && person.age <= 19)
                        .map((person, index) => (
                            <li key={index}>
                                {person.name} - {person.age} years old
                            </li>
                        ))}
                </ul>
            </div>

            <h3>4.Check if every person of the people array is teenager</h3>
            <div>
                <p>
                    {people.every(person => person.age >= 13 && person.age <= 19)
                        ? 'Yes, every person is a teenager.'
                        : 'No, not every person is a teenager.'}
                </p>
            </div>

            <h3>5.Check if any person of the people array is teenager</h3>
            <div>
                <p>
                    {people.some(person => person.age >= 13 && person.age <= 19)
                        ? 'Yes, there is at least one teenager.'
                        : 'No, there are no teenagers.'}
                </p>
            </div>

            <h3>6.Display people sorted by name ascending and age descending</h3>
            <div>
                <table
                    border="1"
                    cellPadding="10"
                    cellSpacing="0"
                    style={{
                        borderCollapse: 'collapse',
                        width: '500px',
                        textAlign: 'center'
                    }}
                >
                    <thead>
                        <tr style={{ backgroundColor: '#ddd' }}>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Age</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortedPeople.map((person, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{person.name}</td>
                                <td>{person.age}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListPerson;