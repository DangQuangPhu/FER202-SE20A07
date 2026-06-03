// src/context/AuthContext.jsx
import { createContext, useReducer, useContext } from 'react';

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };

    case 'LOGIN_FAILURE':
      return {
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case 'LOGOUT':
      return initialState;

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}