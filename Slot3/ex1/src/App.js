import './App.css';
import Hello from './components/Hello';
import ListPerson from './components/ListPerson';
import Footer from '../../../Slot4/ex1/src/components/Footer';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Hello />
      <ListPerson />
      <Footer 
        id="DE190951" 
        name="Dang Quang Phu"
        email="quagphu159@example.com"
        githubLink="https://github.com/DangQuangPhu" />
    </div>
  );
}

export default App;