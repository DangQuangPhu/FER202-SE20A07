import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'

// TODO: Import AuthProvider từ context/AuthContext.jsx
// import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* TODO: Bọc <App /> bên trong <AuthProvider> */}
    <App />
  </React.StrictMode>
)
