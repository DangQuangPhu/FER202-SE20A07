import './App.css';

function App() {

  const person = {
    id: 1,
    name: "Đặng Quang Phú",
    age: 22,
    address: "67 Mai Chí Thọ, Thủ Đức, Thành phố Hồ Chí Minh"
  };

  const chao1 = (name) => {
    alert(`Xin chào, ${name}!`);
  };

  return (
    <div className="App">
      <h1>Xin chào, đây là bài tập trong React</h1>

      <h2>Tôi là Phú Big City Boiz</h2>

      <button onClick={() => chao1(person.name)}>
        Gọi hàm Chao1
      </button>

      <div className="card">
        <h3>Thông tin Person</h3>

        <p><strong>ID:</strong> {person.id}</p>

        <p><strong>Name:</strong> {person.name}</p>

        <p><strong>Age:</strong> {person.age}</p>

        <p><strong>Address:</strong> {person.address}</p>
      </div>
    </div>
  );
}

export default App;