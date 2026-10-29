import { createContext, useContext, useState, useCallback } from 'react';
import { api } from './api';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [employee, setEmployee] = useState(() => JSON.parse(localStorage.getItem('employee') || 'null'));

  const persist = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('employee', JSON.stringify(data.employee));
    setEmployee(data.employee);
  };

  const login = async (email, password) => persist(await api('/auth/login', { method: 'POST', body: { email, password } }));
  const register = async (name, email, password) =>
    persist(await api('/auth/register', { method: 'POST', body: { name, email, password } }));

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('employee');
    setEmployee(null);
  }, []);

  return <AuthContext.Provider value={{ employee, login, register, logout }}>{children}</AuthContext.Provider>;
}
