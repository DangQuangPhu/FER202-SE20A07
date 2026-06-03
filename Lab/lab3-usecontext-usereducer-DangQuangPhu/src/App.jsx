// src/App.jsx    
import { useAuth } from './hooks/useAuth';    
import AppNavbar from './components/AppNavbar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {    
  const { state } = useAuth();    
     
  return state.isAuthenticated ? (
    <>
      <AppNavbar />
      <DashboardPage />
    </>
  ) : (
    <LoginPage />
  );
}    
     
export default App;
