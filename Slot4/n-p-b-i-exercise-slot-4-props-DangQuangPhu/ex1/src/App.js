import './App.css';
import Hello from './components/Hello';
import ListPerson from './components/ListPerson';
import Footer from './components/Footer';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import Pizza from './components/Pizza'
import PizzaList from './components/PizzaList';

function App() {
  return (
    <div className="App">
      <PizzaList
      
      />

      <Footer 
      id="DE190951" 
      name="Dang Quang Phu"
      email="quagphu159@example.com"
      githubLink="https://github.com/DangQuangPhu" />
    </div>
  );
}

export default App; 