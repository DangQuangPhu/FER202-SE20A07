import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import LoginPage from "../pages/LoginPage";
import UsersPage from "../pages/UsersPage";

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" replace />;
}

function AppRouter() {
  const { currentUser } = useAuth();
  
  const defaultPath = currentUser ? '/users' : '/login';

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={defaultPath} replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to={defaultPath} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;