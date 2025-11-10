import React, { createContext, useEffect, useState } from 'react';
import API from '../api';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // When token changes, persist and fetch user profile
    if (token) {
      console.log('Token present:', token.substring(0, 20) + '...');
      localStorage.setItem('token', token);
      fetchProfile();
    } else {
      console.log('No token found');
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      console.log('Fetching user profile...');
      const res = await API.get('/user/me');
      console.log('Profile response:', res.data);
      
      if (res.data && res.data.data) {
        console.log('Setting user:', res.data.data);
        setUser(res.data.data);
      } else {
        console.warn('Invalid profile response format');
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err.response?.data || err.message);
      // Only clear auth if it's an authentication error
      if (err.response?.status === 401) {
        console.log('Clearing auth due to 401');
        setUser(null);
        setToken(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = (jwt) => {
    setToken(jwt);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
