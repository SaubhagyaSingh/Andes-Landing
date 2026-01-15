// src/context/AuthContext.js
import React, { createContext, useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Initial user from localStorage:', storedUser); // Debug statement
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isLoggedIn = !!user;
  console.log('Is user logged in:', isLoggedIn); // Debug statement

  const logout = async () => {
    try {
      console.log('Logging out user:', user);
      await signOut(auth);
      localStorage.removeItem('user');
      setUser(null);
      console.log('User after logout:', user);
    } catch (error) {
      console.error('Error during Firebase logout:', error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Checking localStorage for user on mount:', storedUser); // Debug statement
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log('User set from localStorage:', JSON.parse(storedUser)); // Debug statement
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, logout }}>
      {console.log('AuthContext.Provider rendered with user:', user)} {/* Debug statement */}
      {children}
    </AuthContext.Provider>
  );
};